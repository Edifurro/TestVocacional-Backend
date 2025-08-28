const app = require('./app');
// const sequelize = require('./config/db');
// const  initModels  = require('./models/init-models');


// Importar modelos para registrar relaciones
// require('./modules/users/user.model');
// require('./modules/results/result.model');

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
  // try {
  //   await sequelize.sync();
  //       initModels(sequelize); // { force: true } si necesitas resetear
  //   console.log('🗃️  Tablas sincronizadas');
  // } catch (err) {
  //   console.error('Error al sincronizar BD:', err);
  // }
});
