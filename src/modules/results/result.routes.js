const express = require('express');
const router = express.Router();
const controller = require('./result.controller');
const auth = require('../../middlewares/auth.middleware');

// Alumno envía sus respuestas del test
router.post('/submit', auth, controller.submit);

// Alumno ve sus propios resultados; admin puede pasar ?curp= para ver los de alguien más
router.get('/', auth, controller.list);

module.exports = router;
