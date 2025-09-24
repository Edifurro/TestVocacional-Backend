const User = require('../../models/usuarios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../../config/db');
// Regex oficial para CURP mexicana
const curpRegex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]{2}$/i;

exports.register = async (curp, email, password, nombre, apellidos) => {
  // Validar formato de CURP
  if (!curpRegex.test(curp)) {
    throw { status: 400, message: 'La CURP no tiene un formato válido.' };
  }
  
   if (!password || password.length < 6) {
    throw { status: 400, message: 'La contraseña debe tener al menos 6 caracteres.' };
  }
  // Verificar que la curp y el email no existan
  const existsCurp = await sequelize.models.usuarios.findOne({ where: { curp } });

  

  if (existsCurp) {
    throw { status: 409, message: 'La CURP ya está registrada.' };
  }
  const existsEmail = await sequelize.models.usuarios.findOne({ where: { email } });

  debugger

  if (existsEmail) {
    throw { status: 409, message: 'El email ya está registrado.' };
  }
  // Encriptar la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);
  // Crear usuario aspirante

  const user = await sequelize.models.usuarios.create({
    curp,
    email,
    password: hashedPassword,
    nombre,
    apellidos,
    role: 'aspirante'
  });
  return {
    message: 'Registro exitoso',
    user: {
      curp: user.curp,
      email: user.email,
      nombre: user.nombre,
      apellidos: user.apellidos,
      role: user.role
    }
  };
};

exports.login = async (curp, password) => {
  const user = await sequelize.models.usuarios.findOne({ where: { curp } });
  if (!user) {
    throw { status: 401, message: 'Usuario o contraseña incorrectos.' };
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw { status: 401, message: 'Usuario o contraseña incorrectos.' };
  }
  const token = jwt.sign(
    { curp: user.curp, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  return {
    message: 'Login exitoso',
    token,
    user: {
      curp: user.curp,
      email: user.email,
      role: user.role
    }
  };
};