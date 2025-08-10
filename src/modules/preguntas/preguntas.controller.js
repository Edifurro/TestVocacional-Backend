const service = require('./preguntas.service');

exports.list = async (req, res) => {
	try {
		const tipo = req.query.tipo !== undefined ? Number(req.query.tipo) : undefined;
		const data = await service.list({ tipo, role: req.user?.role });
		res.json(data);
	} catch (err) {
		res.status(err.status || 500).json({ message: err.message || 'Error' });
	}
};

exports.getOne = async (req, res) => {
	try {
		const data = await service.getById(req.params.id);
		res.json(data);
	} catch (err) {
		res.status(err.status || 500).json({ message: err.message || 'Error' });
	}
};

exports.create = async (req, res) => {
	try {
		if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Solo admin' });
		const { pregunta, id_materia, tipo } = req.body;
		const created = await service.create({ pregunta, id_materia, tipo });
		res.status(201).json(created);
	} catch (err) {
		res.status(err.status || 500).json({ message: err.message || 'Error' });
	}
};

exports.update = async (req, res) => {
	try {
		if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Solo admin' });
		const { pregunta, id_materia, tipo } = req.body;
		const updated = await service.update(req.params.id, { pregunta, id_materia, tipo });
		res.json(updated);
	} catch (err) {
		res.status(err.status || 500).json({ message: err.message || 'Error' });
	}
};

exports.remove = async (req, res) => {
	try {
		if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Solo admin' });
		const result = await service.remove(req.params.id);
		res.json(result);
	} catch (err) {
		res.status(err.status || 500).json({ message: err.message || 'Error' });
	}
};
