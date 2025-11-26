const service = require('./administrador.service');
const auth = require('../../middlewares/auth.middleware');

exports.dashboard = async (req, res) => {
	try {
		if (req.user?.role !== 'admin') return res.status(403).json({ message: 'No autorizado' });
		const { page, pageSize, name, curp } = req.query;
		const data = await service.getDashboard({
			page: page ? Number(page) : 1,
			pageSize: pageSize ? Number(pageSize) : 10,
			name,
			curp
		});
		res.json(data);
	} catch (err) {
		res.status(err.status || 500).json({ message: err.message || 'Error' });
	}
};

exports.students = async (req, res) => {
	try {
		if (req.user?.role !== 'admin') return res.status(403).json({ message: 'No autorizado' });
		const { page, pageSize, name, curp } = req.query;
		const data = await service.getStudents({
			page: page ? Number(page) : 1,
			pageSize: pageSize ? Number(pageSize) : 10,
			name,
			curp
		});
		res.json(data);
	} catch (err) {
		res.status(err.status || 500).json({ message: err.message || 'Error' });
	}
};

exports.export = async (req, res) => {
	try {
		if (req.user?.role !== 'admin') return res.status(403).json({ message: 'No autorizado' });
		const { format = 'csv', name, curp } = req.query;
		const result = await service.exportReport({ format, name, curp });
		if (result.type === 'csv') {
			res.setHeader('Content-Type', 'text/csv');
			res.setHeader('Content-Disposition', 'attachment; filename="reporte.csv"');
			return res.send(result.data);
		}
		// PDF: render simple text if pdfkit isn't installed
		if (result.type === 'pdf') {
			try {
				const PDFDocument = require('pdfkit');
				const doc = new PDFDocument();
				res.setHeader('Content-Type', 'application/pdf');
				res.setHeader('Content-Disposition', 'attachment; filename="reporte.pdf"');
				doc.pipe(res);
				doc.fontSize(16).text('Reporte de Alumnos', { underline: true });
				doc.moveDown();
				result.data.forEach((r, i) => {
					const u = r.usuario; const s = r.resumen;
					doc.fontSize(12).text(`${i + 1}. ${u.curp} - ${u.nombre} ${u.apellidos} - ${u.email}`);
					doc.text(`Respuestas: ${s.total_respuestas} | Aptitud (sí): ${s.aptitud_si} | Interés (sí): ${s.interes_si}`);
					doc.moveDown(0.5);
				});
				doc.end();
			} catch {
				// Fallback sencillo si no hay pdfkit
				res.setHeader('Content-Type', 'text/plain; charset=utf-8');
				return res.send('Instala pdfkit para exportar PDF o usa format=csv');
			}
		}
	} catch (err) {
		res.status(err.status || 500).json({ message: err.message || 'Error' });
	}
};

// Users CRUD (admin)
exports.listUsers = async (req, res) => {
	try {
		if (req.user?.role !== 'admin') return res.status(403).json({ message: 'No autorizado' });
		const { page, pageSize } = req.query;
		const data = await service.listUsers({ page: page ? Number(page) : 1, pageSize: pageSize ? Number(pageSize) : 10 });
		res.json(data);
	} catch (err) { res.status(err.status || 500).json({ message: err.message || 'Error' }); }
};

exports.getUser = async (req, res) => {
	try {
		if (req.user?.role !== 'admin') return res.status(403).json({ message: 'No autorizado' });
		const data = await service.getUser(req.params.id);
		res.json(data);
	} catch (err) { res.status(err.status || 500).json({ message: err.message || 'Error' }); }
};

exports.createUser = async (req, res) => {
	try {
		if (req.user?.role !== 'admin') return res.status(403).json({ message: 'No autorizado' });
		const { curp, email, password, nombre, apellidos, role } = req.body;
		const data = await service.createUser({ curp, email, password, nombre, apellidos, role });
		res.status(201).json(data);
	} catch (err) { res.status(err.status || 500).json({ message: err.message || 'Error' }); }
};

exports.updateUser = async (req, res) => {
	try {
		if (req.user?.role !== 'admin') return res.status(403).json({ message: 'No autorizado' });
		const data = await service.updateUser(req.params.id, req.body);
		res.json(data);
	} catch (err) { res.status(err.status || 500).json({ message: err.message || 'Error' }); }
};

exports.deleteUser = async (req, res) => {
	try {
		if (req.user?.role !== 'admin') return res.status(403).json({ message: 'No autorizado' });
		const data = await service.deleteUser(req.params.id);
		res.json(data);
	} catch (err) { res.status(err.status || 500).json({ message: err.message || 'Error' }); }
};
