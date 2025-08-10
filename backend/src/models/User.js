// const { DataTypes } = require('sequelize');
// const { sequelize } = require('../config/db');

// const User = sequelize.define('User', {
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     primaryKey: true
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//     validate: {
//       isEmail: true
//     }
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   role: {
//     type: DataTypes.ENUM('student', 'faculty', 'placement', 'super_admin'),
//     defaultValue: 'student'
//   },
//   isVerified: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: false
//   }
// }, {
//   timestamps: true,
//   tableName: 'users'
// });

// module.exports = User;




const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('student', 'faculty', 'placement', 'super_admin'),
    defaultValue: 'student'
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true,
  tableName: 'users'
});

module.exports = User;
