const express = require('express');
const router = express.Router();
const { createStudent, createUserWithRole } = require('../controllers/userController');
const {signIn} = require('../controllers/signinController');

// Route 1: Student creation (no role input)
router.post('/studentsignup', createStudent);
router.post('/signin', signIn)

// Route 2: Generic user creation with role
router.post('/signup', createUserWithRole);

module.exports = router;