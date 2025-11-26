const express = require('express');
const router = express.Router();
const ctrl = require('./administrador.controller');
const auth = require('../../middlewares/auth.middleware');

// Todas requieren admin
router.get('/dashboard', auth, ctrl.dashboard);
router.get('/students', auth, ctrl.students);
router.get('/reports/export', auth, ctrl.export);

router.get('/users', auth, ctrl.listUsers);
router.get('/users/:id', auth, ctrl.getUser);
router.post('/users', auth, ctrl.createUser);
router.put('/users/:id', auth, ctrl.updateUser);
router.delete('/users/:id', auth, ctrl.deleteUser);

module.exports = router;
