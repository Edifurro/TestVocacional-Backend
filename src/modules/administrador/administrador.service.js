const sequelize = require('../../config/db');
const bcrypt = require('bcrypt');
const initModels = require('../../models/init-models');
initModels(sequelize);

const curpRegex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]{2}$/i;

function bitToNumber(bitVal) {
	if (bitVal == null) return null;
	if (Buffer.isBuffer(bitVal)) return bitVal[0] & 0x03;
	if (typeof bitVal === 'number') return bitVal & 0x03;
	return Number(bitVal) || 0;
}

function toYesFromMeta(metaData) {
	try {
		const v = JSON.parse(metaData);
		return v === 1;
	} catch { return false; }
}

exports.getDashboard = async ({ page = 1, pageSize = 10, name, curp }) => {
	const where = { role: 'aspirante' };
	if (curp) where.curp = curp;
	if (name) {
		// Buscar por nombre o apellidos que contengan name
		where[sequelize.Op.or] = [
			{ nombre: { [sequelize.Op.like]: `%${name}%` } },
			{ apellidos: { [sequelize.Op.like]: `%${name}%` } }
		];
	}

	const { count, rows: users } = await sequelize.models.usuarios.findAndCountAll({
		where,
		attributes: ['id', 'curp', 'nombre', 'apellidos', 'email', 'role'],
		limit: pageSize,
		offset: (page - 1) * pageSize,
		order: [['id', 'ASC']]
	});

	if (users.length === 0) {
		return { items: [], page, pageSize, total: count, totalPages: Math.ceil(count / pageSize) };
	}

	const userIds = users.map(u => u.id);
	// Traer resultados + pregunta para distinguir aptitud/interes; no necesitamos materia para dashboard general
	const resultados = await sequelize.models.resultados.findAll({
		where: { id_usuario: userIds },
		include: [{ model: sequelize.models.pregunta, as: 'id_pregunta_preguntum', attributes: ['tipo'] }]
	});

	const byUser = new Map(users.map(u => [u.id, { usuario: u.toJSON(), resumen: { total_respuestas: 0, aptitud_si: 0, interes_si: 0 } }]));
	for (const r of resultados) {
		const bucket = byUser.get(r.id_usuario);
		if (!bucket) continue;
		const yes = toYesFromMeta(r.metaData);
		const tipoNum = bitToNumber(r.id_pregunta_preguntum?.tipo);
		bucket.resumen.total_respuestas += 1;
		if (yes) {
			if (tipoNum === 1) bucket.resumen.interes_si += 1; else bucket.resumen.aptitud_si += 1;
		}
	}

	return {
		items: Array.from(byUser.values()),
		page,
		pageSize,
		total: count,
		totalPages: Math.ceil(count / pageSize)
	};
};

exports.getStudents = async ({ page = 1, pageSize = 10, name, curp }) => {
	const where = { role: 'aspirante' };
	if (curp) where.curp = curp;
	if (name) {
		where[sequelize.Op.or] = [
			{ nombre: { [sequelize.Op.like]: `%${name}%` } },
			{ apellidos: { [sequelize.Op.like]: `%${name}%` } }
		];
	}
	const { count, rows } = await sequelize.models.usuarios.findAndCountAll({
		where,
		attributes: ['id', 'curp', 'nombre', 'apellidos', 'email', 'role'],
		limit: pageSize,
		offset: (page - 1) * pageSize,
		order: [['id', 'ASC']]
	});
	return { items: rows, page, pageSize, total: count, totalPages: Math.ceil(count / pageSize) };
};

function toCSV(rows) {
	const header = ['id', 'curp', 'nombre', 'apellidos', 'email', 'total_respuestas', 'aptitud_si', 'interes_si'];
	const lines = [header.join(',')];
	for (const r of rows) {
		const u = r.usuario; const s = r.resumen;
		lines.push([u.id, u.curp, JSON.stringify(u.nombre), JSON.stringify(u.apellidos), JSON.stringify(u.email), s.total_respuestas, s.aptitud_si, s.interes_si].join(','));
	}
	return lines.join('\n');
}

exports.exportReport = async ({ format = 'csv', name, curp }) => {
	// Reutilizamos dashboard sin paginación (traer todo); en proyectos grandes usar streaming
	const where = { role: 'aspirante' };
	if (curp) where.curp = curp;
	if (name) {
		where[sequelize.Op.or] = [
			{ nombre: { [sequelize.Op.like]: `%${name}%` } },
			{ apellidos: { [sequelize.Op.like]: `%${name}%` } }
		];
	}
	const users = await sequelize.models.usuarios.findAll({ where, attributes: ['id', 'curp', 'nombre', 'apellidos', 'email'] });
	const userIds = users.map(u => u.id);
	const resultados = await sequelize.models.resultados.findAll({
		where: { id_usuario: userIds },
		include: [{ model: sequelize.models.pregunta, as: 'id_pregunta_preguntum', attributes: ['tipo'] }]
	});
	const byUser = new Map(users.map(u => [u.id, { usuario: u.toJSON(), resumen: { total_respuestas: 0, aptitud_si: 0, interes_si: 0 } }]));
	for (const r of resultados) {
		const bucket = byUser.get(r.id_usuario);
		if (!bucket) continue;
		const yes = toYesFromMeta(r.metaData);
		const tipoNum = bitToNumber(r.id_pregunta_preguntum?.tipo);
		bucket.resumen.total_respuestas += 1;
		if (yes) {
			if (tipoNum === 1) bucket.resumen.interes_si += 1; else bucket.resumen.aptitud_si += 1;
		}
	}
	const items = Array.from(byUser.values());
	if (format === 'csv') {
		return { type: 'csv', data: toCSV(items) };
	} else if (format === 'pdf') {
		// PDF se genera en controller usando pdfkit con estos items
		return { type: 'pdf', data: items };
	}
	throw { status: 400, message: 'format debe ser csv o pdf' };
};

// Users CRUD (admin)
exports.listUsers = async ({ page = 1, pageSize = 10 }) => {
	const { count, rows } = await sequelize.models.usuarios.findAndCountAll({
		attributes: ['id', 'curp', 'nombre', 'apellidos', 'email', 'role'],
		limit: pageSize,
		offset: (page - 1) * pageSize,
		order: [['id', 'ASC']]
	});
	return { items: rows, page, pageSize, total: count, totalPages: Math.ceil(count / pageSize) };
};

exports.getUser = async (id) => {
	const u = await sequelize.models.usuarios.findByPk(id, { attributes: ['id', 'curp', 'nombre', 'apellidos', 'email', 'role'] });
	if (!u) throw { status: 404, message: 'Usuario no encontrado' };
	return u;
};

exports.createUser = async ({ curp, email, password, nombre, apellidos, role = 'aspirante' }) => {
	if (!curp || !email || !password || !nombre || !apellidos) throw { status: 400, message: 'Campos requeridos: curp, email, password, nombre, apellidos' };
	if (!curpRegex.test(curp)) throw { status: 400, message: 'CURP inválida' };
	const exists = await sequelize.models.usuarios.findOne({ where: { curp } });
	if (exists) throw { status: 409, message: 'CURP ya registrada' };
	const existsEmail = await sequelize.models.usuarios.findOne({ where: { email } });
	if (existsEmail) throw { status: 409, message: 'Email ya registrado' };
	const hashed = await bcrypt.hash(password, 10);
	const u = await sequelize.models.usuarios.create({ curp, email, password: hashed, nombre, apellidos, role });
	return { id: u.id, curp: u.curp, email: u.email, nombre: u.nombre, apellidos: u.apellidos, role: u.role };
};

exports.updateUser = async (id, { email, password, nombre, apellidos, role }) => {
	const u = await sequelize.models.usuarios.findByPk(id);
	if (!u) throw { status: 404, message: 'Usuario no encontrado' };
	if (email !== undefined) u.email = email;
	if (nombre !== undefined) u.nombre = nombre;
	if (apellidos !== undefined) u.apellidos = apellidos;
	if (role !== undefined) u.role = role;
	if (password) u.password = await bcrypt.hash(password, 10);
	await u.save();
	return { id: u.id, curp: u.curp, email: u.email, nombre: u.nombre, apellidos: u.apellidos, role: u.role };
};

exports.deleteUser = async (id) => {
	const u = await sequelize.models.usuarios.findByPk(id);
	if (!u) throw { status: 404, message: 'Usuario no encontrado' };
	await u.destroy();
	return { message: 'Usuario eliminado', id };
};
