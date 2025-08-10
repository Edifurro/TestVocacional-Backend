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

// Create a result entry for the current user with the submitted answers
exports.submit = async (userCurp, payload) => {
	const { answers, tiempo } = payload || {};
	if (!Array.isArray(answers) || answers.length === 0) {
		throw { status: 400, message: 'answers debe ser un arreglo no vacío.' };
	}
	// Validar formato básico de cada respuesta
	for (const a of answers) {
		if (!a || typeof a.id_pregunta !== 'number') {
			throw { status: 400, message: 'Cada item en answers debe incluir id_pregunta numérico.' };
		}
	}

	// Obtener usuario por CURP para relacionar su id
	const usuario = await sequelize.models.usuarios.findOne({ where: { curp: userCurp } });
	if (!usuario) {
		throw { status: 404, message: 'Usuario no encontrado.' };
	}

	// Guardar todo el test como un sólo resultado (id_pregunta null) en metaData JSON
	const meta = {
		userCurp,
		answers,
		tiempo: typeof tiempo === 'number' ? tiempo : undefined,
		submittedAt: new Date().toISOString()
	};

	const created = await sequelize.models.resultados.create({
		id_usuario: usuario.id,
		id_pregunta: null,
		metaData: JSON.stringify(meta)
	});

	return {
		message: 'Respuestas guardadas',
		id_resultado: created.id_resultado
	};
};

// List results for a given curp (admin can request any curp; student only their own)
exports.list = async (requesterRole, requesterCurp, queryCurp) => {
	const targetCurp = requesterRole === 'admin' && queryCurp ? queryCurp : requesterCurp;

	const usuario = await sequelize.models.usuarios.findOne({ where: { curp: targetCurp } });
	if (!usuario) {
		// Si admin filtro por un CURP inválido, 404; si alumno no existe su registro, también 404
		throw { status: 404, message: 'Usuario no encontrado.' };
	}

	const rows = await sequelize.models.resultados.findAll({
		where: { id_usuario: usuario.id },
		order: [['id_resultado', 'DESC']]
	});

	return rows.map(r => ({
		id_resultado: r.id_resultado,
		id_usuario: r.id_usuario,
		metaData: safeParse(r.metaData) || r.metaData
	}));
};
