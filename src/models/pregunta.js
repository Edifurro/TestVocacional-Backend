const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pregunta', {
    id_pregunta: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    pregunta: {
      type: DataTypes.STRING(5000),
      allowNull: false
    },
    id_materia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'materia',
        key: 'id'
      }
    },
    tipo: {
      type: "BIT(2)",
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'pregunta',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_pregunta" },
        ]
      },
      {
        name: "id_materia",
        using: "BTREE",
        fields: [
          { name: "id_materia" },
        ]
      },
    ]
  });
};
