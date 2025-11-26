const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const helmet = require('helmet');

// Rutas de módulos
const userRoutes = require('./modules/users/user.routes');
const resultRoutes = require('./modules/results/result.routes'); // nueva ruta
const preguntasRoutes = require('./modules/preguntas/preguntas.routes');
const adminRoutes = require('./modules/administrador/administrador.routes');
const { default: SequelizeAuto } = require('sequelize-auto');
const { initModels } = require('./models/init-models');
const recoveryRoutes = require('./modules/recovery/recovery.routes');

const app = express();


app.use(cors());
app.use(express.json());
app.use(helmet());

// Rutas API por módulo
app.use('/api/users', userRoutes);
app.use('/api/preguntas', preguntasRoutes);
app.use('/api/resultados', resultRoutes);
app.use('/api/admin', adminRoutes);
app.use ('/api/recovery', recoveryRoutes);
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Error interno del servidor';
    res.status(status).json({ message });
});

// Test de conexión a la BD
sequelize.authenticate()

  .then(() => {

    console.log('✅ Conexión a BD exitosa');
  })

  .catch(err => console.error('❌ Error al conectar BD:', err));

module.exports = app;
