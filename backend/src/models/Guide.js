const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Guide = sequelize.define('Guide', {
  email: {
    type: DataTypes.STRING,
    primaryKey: true,
    references: {
      model: User,
      key: 'email'
    },
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  department: {
    type: DataTypes.ENUM(
      'CSE',
      'AIML&DS',
      'ECE',
      'EEE',
      'Civil Engineering',
      'Mechanical Engineering'
    ),
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'guides'
});

module.exports = Guide;
