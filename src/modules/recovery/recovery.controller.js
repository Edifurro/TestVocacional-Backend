const recoveryService = require('./recovery.service');

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    await recoveryService.sendResetCode(email);
    res.json({ message: 'Si el correo existe, se ha enviado un código de recuperación.' });
};


exports.verifyCode = async (req, res) => {
    const { email, code } = req.body;
    const valid = await recoveryService.verifyResetCode(email, code);
    if (!valid) {
        return res.status(400).json({ message: 'Código inválido o expirado.' });
    }
    res.json({ message: 'Código válido.' });
};


exports.resetPassword = async (req, res) => {
    const { email, code, password } = req.body;
    const ok = await recoveryService.resetPassword(email, code, password);
    if (!ok) {
        return res.status(400).json({ message: 'Código inválido, expirado o usuario no encontrado.' });
    }
    res.json({ message: 'Contraseña actualizada correctamente.' });
};