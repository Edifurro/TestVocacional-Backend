var DataTypes = require("sequelize").DataTypes;
var _materia = require("./materia");
var _password_resets = require("./password_resets");
var _pregunta = require("./pregunta");
var _resultados = require("./resultados");
var _usuarios = require("./usuarios");

function initModels(sequelize) {
  var materia = _materia(sequelize, DataTypes);
  var password_resets = _password_resets(sequelize, DataTypes);
  var pregunta = _pregunta(sequelize, DataTypes);
  var resultados = _resultados(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);

  pregunta.belongsTo(materia, { as: "id_materia_materium", foreignKey: "id_materia"});
  materia.hasMany(pregunta, { as: "pregunta", foreignKey: "id_materia"});
  resultados.belongsTo(pregunta, { as: "id_pregunta_preguntum", foreignKey: "id_pregunta"});
  pregunta.hasMany(resultados, { as: "resultados", foreignKey: "id_pregunta"});
  resultados.belongsTo(usuarios, { as: "id_usuario_usuario", foreignKey: "id_usuario"});
  usuarios.hasMany(resultados, { as: "resultados", foreignKey: "id_usuario"});

  return {
    materia,
    password_resets,
    pregunta,
    resultados,
    usuarios,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
