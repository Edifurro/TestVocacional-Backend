// Servicio para gestión de preguntas
// const sequelize = require('../../config/db');
// const initModels = require('../../models/init-models');
// const models = initModels(sequelize);
// const Pregunta = models.pregunta;

// Convierte el campo BIT(2) (Buffer) a número 0|1
function bitToNumber(bitVal) {
	if (bitVal == null) return null;
	// mysql2 devuelve Buffer para BIT
	if (Buffer.isBuffer(bitVal)) return bitVal[0] & 0x03;
	if (typeof bitVal === 'number') return bitVal & 0x03;
	return Number(bitVal) || 0;
}

function normalizePregunta(row) {
    const tipoNum = bitToNumber(row.tipo);
    return {
        id: row.id_pregunta,
        pregunta: row.pregunta,
        id_materia: row.id_materia,
        nombre_materia: row.id_materia_materium ? row.id_materia_materium.nombre : null,
        tipo: tipoNum, // 0 = aptitud, 1 = interes
        tipo_texto: tipoNum === 1 ? 'interes' : 'aptitud'
    };
}

exports.list = async ({ tipo, role, materia, page, pageSize, raw }) => {
    const where = {};
    if (tipo !== undefined) {
        if (!(tipo === 0 || tipo === 1)) throw { status: 400, message: 'tipo debe ser 0 o 1' };
        where.tipo = Buffer.from([tipo]);
    }
    if (materia !== undefined) {
        where.id_materia = materia;
    }

    // Paginación opcional
    const doPaging = Number.isInteger(page) && Number.isInteger(pageSize) && page > 0 && pageSize > 0;
    
    // Incluye la relación con materia para obtener el nombre
    const includeOptions = [
        {
            model: sequelize.models.materia,
            as: 'id_materia_materium', // Usa el alias correcto que Sequelize generó
            attributes: ['nombre'],
            required: false // LEFT JOIN en caso de que id_materia sea NULL
        }
    ];

    if (doPaging) {
        const { count, rows } = await Pregunta.findAndCountAll({
            where,
            include: includeOptions,
            limit: pageSize,
            offset: (page - 1) * pageSize,
            order: [['id_pregunta', 'ASC']]
        });
        const items = raw ? rows : rows.map(r => normalizePregunta(r));
        return {
            items,
            page,
            pageSize,
            total: count,
            totalPages: Math.ceil(count / pageSize)
        };
    }

    const rows = await Pregunta.findAll({ 
        where, 
        include: includeOptions,
        order: [['id_pregunta', 'ASC']] 
    });
    return raw ? rows : rows.map(r => normalizePregunta(r));
};
// exports.list = async ({ tipo, role, materia, page, pageSize, raw }) => {
// 	const where = {};
// 	if (tipo !== undefined) {
// 		if (!(tipo === 0 || tipo === 1)) throw { status: 400, message: 'tipo debe ser 0 o 1' };
// 		where.tipo = Buffer.from([tipo]);
// 	}
// 	if (materia !== undefined) {
// 		where.id_materia = materia;
// 	}

// 	// Paginación opcional
// 	const doPaging = Number.isInteger(page) && Number.isInteger(pageSize) && page > 0 && pageSize > 0;
// 	if (doPaging) {
// 		const { count, rows } = await Pregunta.findAndCountAll({
// 			where,
// 			limit: pageSize,
// 			offset: (page - 1) * pageSize,
// 			order: [['id_pregunta', 'ASC']]
// 		});
// 		const items = raw ? rows : rows.map(r => normalizePregunta(r));
// 		return {
// 			items,
// 			page,
// 			pageSize,
// 			total: count,
// 			totalPages: Math.ceil(count / pageSize)
// 		};
// 	}

// 	const rows = await Pregunta.findAll({ where, order: [['id_pregunta', 'ASC']] });
// 	return raw ? rows : rows.map(r => normalizePregunta(r));
// };

exports.getById = async (id) => {
	const row = await Pregunta.findByPk(id);
	if (!row) throw { status: 404, message: 'Pregunta no encontrada' };
	return normalizePregunta(row);
};

exports.create = async ({ pregunta, id_materia, tipo }) => {
	if (!pregunta || typeof pregunta !== 'string') throw { status: 400, message: 'pregunta requerida' };
	if (tipo !== 0 && tipo !== 1) throw { status: 400, message: 'tipo debe ser 0 (aptitud) o 1 (interes)' };
	const created = await Pregunta.create({
		pregunta,
		id_materia: id_materia || null,
		tipo: Buffer.from([tipo])
	});
	return normalizePregunta(created);
};

exports.update = async (id, { pregunta, id_materia, tipo }) => {
	const row = await Pregunta.findByPk(id);
	if (!row) throw { status: 404, message: 'Pregunta no encontrada' };
	if (pregunta !== undefined) {
		if (!pregunta) throw { status: 400, message: 'pregunta no puede ser vacía' };
		row.pregunta = pregunta;
	}
	if (id_materia !== undefined) row.id_materia = id_materia;
	if (tipo !== undefined) {
		if (tipo !== 0 && tipo !== 1) throw { status: 400, message: 'tipo debe ser 0 o 1' };
		row.tipo = Buffer.from([tipo]);
	}
	await row.save();
	return normalizePregunta(row);
};

exports.remove = async (id) => {
	const row = await Pregunta.findByPk(id);
	if (!row) throw { status: 404, message: 'Pregunta no encontrada' };
	await row.destroy();
	return { message: 'Pregunta eliminada', id };
};
