const express = require('express');
const router = express.Router();
const { createStudent, createUserWithRole } = require('../controllers/userController');

// Route 1: Student creation (no role input)
router.post('/student', createStudent);

// Route 2: Generic user creation with role
router.post('/', createUserWithRole);

module.exports = router;
