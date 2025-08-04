const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const User = require('../users/user.model');

const Result = sequelize.define('Result', {
  score: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'results',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

// Relaciones
Result.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Result, { foreignKey: 'user_id' });

module.exports = Result;
