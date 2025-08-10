const express = require('express');
const router = express.Router();
const { createStudentDetails } = require('../controllers/studentController');

// POST: Create student academic details
router.post('/', createStudentDetails);

module.exports = router;
