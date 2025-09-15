const express = require('express');
const router = express.Router();
const internshipController = require('../controllers/internshipController');
const { authMiddleware } = require('../middleware/authMiddleware');

// POST: Add new internship
router.post('/add', authMiddleware, internshipController.addInternship);

// GET: Get all internships for logged-in student
router.get('/my', authMiddleware, internshipController.getMyInternships);

module.exports = router;