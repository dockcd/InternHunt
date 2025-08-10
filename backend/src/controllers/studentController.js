const StudentDetails = require('../models/StudentDetails');
const User = require('../models/User');

exports.createStudentDetails = async (req, res) => {
  try {
    const { name, register_number, email, department, semester, class_name, guide_email } = req.body;

    // 1. Ensure the email exists in the Users table and belongs to a student
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User with this email does not exist' });
    }
    if (user.role !== 'student') {
      return res.status(400).json({ message: 'This email does not belong to a student' });
    }

    // 2. Insert student details
    const studentDetails = await StudentDetails.create({
      name,
      register_number,
      email,
      department,
      semester,
      class_name,
      guide_email: guide_email || null
    });

    res.status(201).json({
      message: 'Student details saved successfully',
      data: studentDetails
    });
  } catch (err) {
    console.error('Error saving student details:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};
