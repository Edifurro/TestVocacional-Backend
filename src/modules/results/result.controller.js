const service = require('./result.service');

// POST /api/resultados/submit
exports.submit = async (req, res) => {
	try {
		const { curp } = req.user || {};
		if (!curp) return res.status(401).json({ message: 'No autenticado' });
		const result = await service.submit(curp, req.body);
		res.status(201).json(result);
	} catch (err) {
		res.status(err.status || 500).json({ message: err.message || 'Error al guardar resultados' });
	}
};

// GET /api/resultados?curp=...
exports.list = async (req, res) => {
	try {
		const requester = req.user;
		if (!requester) return res.status(401).json({ message: 'No autenticado' });
	const data = await service.list(requester.role, requester.curp, req.query.curp, req.query.id_usuario ? Number(req.query.id_usuario) : undefined);
	res.json(data);
	} catch (err) {
		res.status(err.status || 500).json({ message: err.message || 'Error al obtener resultados' });
	}
};
