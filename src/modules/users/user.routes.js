const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

router.post('/register', userController.register);
router.post('/login', userController.login);

// Ruta protegida de ejemplo
const User = require('./user.model');

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ where: { curp: req.user.curp } });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({
      curp: user.curp,
      email: user.email,
      nombre: user.nombre,
      apellidos: user.apellidos,
      role: user.role
    });
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;
