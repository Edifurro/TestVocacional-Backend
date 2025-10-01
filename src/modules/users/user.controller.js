const userService = require('./user.service');

exports.register = async (req, res) => {
  const { curp, email, password, nombre, apellidos, escuela_procedencia, genero } = req.body;
  if (!curp || !email || !password || !nombre || !apellidos || !escuela_procedencia || !genero) {
    return res.status(400).json({ message: 'CURP, email, contraseña, nombre, apellidos, escuela de procedencia y género requeridos.' });
  }
  if (curp.length !== 18) {
    return res.status(400).json({ message: 'La CURP debe tener 18 caracteres.' });
  }
  try {
    debugger
    const result = await userService.register(curp, email, password, nombre, apellidos, escuela_procedencia, genero);
    res.status(201).json(result);
  } catch (err) {
    debugger
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { curp, password } = req.body;
  if (!curp || !password) {
    return res.status(400).json({ message: 'CURP y contraseña requeridos.' });
  }
  try {
    const result = await userService.login(curp, password);
    res.json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};