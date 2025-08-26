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

const resultService = require('./result.service');

exports.reportePorUsuario = async (req, res, next) => {
    try {
        const id_usuario = parseInt(req.params.id_usuario, 10);
        const data = await resultService.reportePorUsuario(id_usuario);
        res.json(data);
    } catch (err) {
        next(err);
    }
};

exports.reportePorCurp = async (req, res, next) => {
    try {
        const curp = req.params.curp;
        const data = await resultService.reportePorCurp(curp);
        res.json(data);
    } catch (err) {
        next(err);
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

// DELETE /api/resultados/curp/:curp - Eliminar todas las respuestas de un aspirante
exports.deleteResultsByUser = async (req, res) => {
	try {
		const requester = req.user;
		if (!requester) return res.status(401).json({ message: 'No autenticado' });
		if (requester.role !== 'admin') return res.status(403).json({ message: 'Solo admin puede eliminar respuestas' });
		
		const curp = req.params.curp;
		const result = await service.deleteResultsByUser(curp);
		res.json(result);
	} catch (err) {
		res.status(err.status || 500).json({ message: err.message || 'Error al eliminar respuestas' });
	}
};
