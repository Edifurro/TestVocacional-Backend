const express = require('express');
const router = express.Router();
const recoveryController = require('./recovery.controller');

// Endpoint para enviar código de recuperación
router.post('/forgot-password', recoveryController.forgotPassword);
router.post('/verify-code', recoveryController.verifyCode);
router.post('/reset-password', recoveryController.resetPassword);

module.exports = router;