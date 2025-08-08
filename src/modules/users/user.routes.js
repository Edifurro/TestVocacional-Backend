const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

router.post('/register', userController.register);
router.post('/login', userController.login);

// Ruta protegida de ejemplo


module.exports = router;
