const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');

// Rutas de módulos
const userRoutes = require('./modules/users/user.routes');
const resultRoutes = require('./modules/results/result.routes'); // nueva ruta
const { default: SequelizeAuto } = require('sequelize-auto');
const { initModels } = require('./models/init-models');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas API por módulo
app.use('/api/users', userRoutes);


// Test de conexión a la BD
sequelize.authenticate()

  .then(() => {

    console.log('✅ Conexión a BD exitosa');
  })

  .catch(err => console.error('❌ Error al conectar BD:', err));

module.exports = app;
