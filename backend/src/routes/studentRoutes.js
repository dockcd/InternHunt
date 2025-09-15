const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const {authMiddleware} = require('../middleware/authMiddleware');


// POST: Create student academic details
router.post('/createdetails', studentController.createStudentDetails);
router.get('/me', authMiddleware, studentController.getMyDetails);
router.put('/me', authMiddleware, studentController.updateDetails);
module.exports = router;