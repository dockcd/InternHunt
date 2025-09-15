const { DataTypes } = require('sequelize');
const sequelize = require('../config/db').sequelize;

const Internship = sequelize.define('Internship', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  student_email: {
    type: DataTypes.STRING,
    allowNull: false,
    references: { model: 'users', key: 'email' },
    onDelete: 'CASCADE'
  },
  company_name: { type: DataTypes.STRING, allowNull: false },
  company_domain: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  work_type: { type: DataTypes.ENUM('Onsite','Remote','Hybrid'), allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false },
  company_address: { type: DataTypes.TEXT },
  duration: { type: DataTypes.STRING },
  reference_contact: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  status: {
  type: DataTypes.STRING,  // Use STRING to avoid Sequelize managing enum type
  allowNull: true,
  defaultValue: 'Ongoing',
  validate: {
    isIn: [['Ongoing', 'Completed']],  // Validate enum values at app level
  },
},
}, {
  timestamps: true,
  // Prevent Sequelize from trying to create the enum type (since it already exists)
  tableName:'internships',
  dialectOptions: {
    enumName: 'internship_status' 
  }
});

module.exports = Internship;
