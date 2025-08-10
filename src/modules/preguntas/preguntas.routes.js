const express = require('express');
const router = express.Router();
const controller = require('./preguntas.controller');
const auth = require('../../middlewares/auth.middleware');
const { authorizeRoles } = require('../../middlewares/auth.middleware');

// Públicas (listado y detalle) - si quieres que requieran token, añade auth
router.get('/', auth, controller.list);
router.get('/:id', auth, controller.getOne);

// Protegidas admin
router.post('/', auth, authorizeRoles('admin'), controller.create);
router.put('/:id', auth, authorizeRoles('admin'), controller.update);
router.delete('/:id', auth, authorizeRoles('admin'), controller.remove);

module.exports = router;
