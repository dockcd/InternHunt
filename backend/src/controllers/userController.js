const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createStudent = async (req, res) => {
  try {
    const { email, password, isVerified } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      role: 'student',
      isVerified: isVerified || true,
    });

    res.status(201).json({ message: 'Student user created', user: newUser });
  } catch (err) {
    console.error('Error creating student user:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const createUserWithRole = async (req, res) => {
  try {
    const { email, password, role, isVerified } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Email, password, and role are required' });
    }

    if (!['faculty', 'placement', 'super_admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      role,
      isVerified: isVerified || false,
    });

    res.status(201).json({ message: `User with role '${role}' created`, user: newUser });
  } catch (err) {
    console.error('Error creating user with role:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createStudent,
  createUserWithRole
};