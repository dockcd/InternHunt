const User = require('../models/User');
const StudentDetails = require('../models/StudentDetails');
const Guide = require('../models/Guide');

// 1:1 - User (student) → StudentDetails
User.hasOne(StudentDetails, { foreignKey: 'email' });
StudentDetails.belongsTo(User, { foreignKey: 'email' });

// 1:1 - User (faculty) → Guide
User.hasOne(Guide, { foreignKey: 'email' });
Guide.belongsTo(User, { foreignKey: 'email' });

// 1:N - Guide → StudentDetails (guide supervises many students)
Guide.hasMany(StudentDetails, { foreignKey: 'guide_email' });
StudentDetails.belongsTo(Guide, { foreignKey: 'guide_email' });
