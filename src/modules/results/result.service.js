const sequelize = require('../../config/db');
const initModels = require('../../models/init-models');
initModels(sequelize);

// Helper to safely parse JSON stored in TEXT
function safeParse(jsonStr) {
	try {
		return JSON.parse(jsonStr);
	} catch {
		return null;
	}
}

// Normaliza distintos formatos de respuesta a booleano: true = "sí"
function toYes(val) {
	if (val === true) return true;
	if (val === false) return false;
	if (typeof val === 'number') return val === 1;
	if (typeof val === 'string') {
		const s = val.trim().toLowerCase();
		return ['si', 'sí', 's', 'y', 'yes', '1', 'true'].includes(s);
	}
	return false;
}

// BIT(2) to number 0|1
function bitToNumber(bitVal) {
	if (bitVal == null) return null;
	if (Buffer.isBuffer(bitVal)) return bitVal[0] & 0x03;
	if (typeof bitVal === 'number') return bitVal & 0x03;
	return Number(bitVal) || 0;
}

// Create result rows per answer for the current user (metaData = 1|0). Only one attempt allowed.
exports.submit = async (userCurp, payload) => {
	const { answers } = payload || {};
	if (!Array.isArray(answers) || answers.length === 0) {
		throw { status: 400, message: 'answers debe ser un arreglo no vacío.' };
	}
	for (const a of answers) {
		if (!a || typeof a.id_pregunta !== 'number') {
			throw { status: 400, message: 'Cada item en answers debe incluir id_pregunta numérico.' };
		}
	}

	const usuario = await sequelize.models.usuarios.findOne({ where: { curp: userCurp } });
	if (!usuario) throw { status: 404, message: 'Usuario no encontrado.' };

	// Enforce single attempt: if user already has results, block submit
	const already = await sequelize.models.resultados.count({ where: { id_usuario: usuario.id } });
	if (already > 0) {
		throw { status: 409, message: 'El aspirante ya envió sus respuestas. Sólo se permite una vez.' };
	}

	const rows = answers.map(a => ({
		id_usuario: usuario.id,
		id_pregunta: a.id_pregunta,
		metaData: JSON.stringify(toYes(a.respuesta ?? a.answer ?? a.value) ? 1 : 0)
	}));
	const created = await sequelize.models.resultados.bulkCreate(rows);
	return { message: 'Respuestas guardadas', count: created.length };
};

// List results and aggregated counts per materia for a given curp
exports.list = async (requesterRole, requesterCurp, queryCurp, queryUserId) => {
	let usuario;
	if (requesterRole === 'admin' && Number.isInteger(queryUserId)) {
		usuario = await sequelize.models.usuarios.findByPk(queryUserId);
	} else {
		const targetCurp = requesterRole === 'admin' && queryCurp ? queryCurp : requesterCurp;
		usuario = await sequelize.models.usuarios.findOne({ where: { curp: targetCurp } });
	}
	if (!usuario) throw { status: 404, message: 'Usuario no encontrado.' };

	const include = [
		{
			model: sequelize.models.pregunta,
			as: 'id_pregunta_preguntum',
			attributes: ['id_pregunta', 'id_materia', 'tipo'],
			include: [
		{ model: sequelize.models.materia, as: 'id_materia_materium', attributes: ['id', 'nombre'] }
			]
		}
	];

	const rows = await sequelize.models.resultados.findAll({
		where: { id_usuario: usuario.id },
		include,
		order: [['id_resultado', 'DESC']]
	});

	// Normalize rows and aggregate per materia
	const results = [];
	const aggByMateria = new Map();
	let totalAptitudSi = 0;
	let totalInteresSi = 0;

	for (const r of rows) {
		const meta = safeParse(r.metaData) || {};
		const pregunta = r.id_pregunta_preguntum;
		const yes = toYes(meta.respuesta ?? meta);

			results.push({
				id_resultado: r.id_resultado,
				id_usuario: r.id_usuario,
				id_pregunta: r.id_pregunta,
				respuesta: yes
			});

		if (!pregunta) continue; // ignora registros antiguos sin pregunta
		const tipoNum = bitToNumber(pregunta.tipo);
		const mat = pregunta.id_materia_materium;
		const matId = (mat && mat.id) != null ? mat.id : pregunta.id_materia;
		const matNombre = mat?.nombre || null;

		if (!aggByMateria.has(matId)) {
			aggByMateria.set(matId, { id_materia: matId, materia: matNombre, aptitud_si: 0, interes_si: 0, total_respuestas: 0 });
		}
		const bucket = aggByMateria.get(matId);
		bucket.total_respuestas += 1;
		if (yes) {
			if (tipoNum === 1) { bucket.interes_si += 1; totalInteresSi += 1; }
			else { bucket.aptitud_si += 1; totalAptitudSi += 1; }
		}
	}

		// Build recommendation: top materias by interes and aptitud
		const materiasArr = Array.from(aggByMateria.values());
		const topBy = (key) => materiasArr.slice().sort((a,b) => b[key] - a[key]).filter(m => m[key] > 0).slice(0, 3);
		const resumen = {
			materias: materiasArr,
			totales: { aptitud_si: totalAptitudSi, interes_si: totalInteresSi },
			recomendacion: {
				top_interes: topBy('interes_si'),
				top_aptitud: topBy('aptitud_si')
			}
		};

	return { results, resumen };
};
