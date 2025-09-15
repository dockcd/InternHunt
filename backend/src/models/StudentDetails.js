const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');
const Guide = require('./Guide'); // Will be created below

const StudentDetails = sequelize.define('StudentDetails', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  register_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    primaryKey: true,
    references: {
      model: User,
      key: 'email'
    },
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
  },
  semester: {
    type: DataTypes.ENUM('1','2','3','4','5','6','7','8'),
    allowNull: false
  },
  class_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  guide_email: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: 'guides', // Must match tableName in Guide model
      key: 'email'
    }
  }
}, {
  timestamps: true,
  tableName: 'student_details'
});

module.exports = StudentDetails;
