const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const pool = require('../config/pgPool'); // your PostgreSQL pool

// GET all students with current guide info
router.get('/students', authMiddleware, async (req, res) => {
  try {
    // Optional: only allow users with role 'faculty' (guide)
    if (req.user.role !== 'faculty') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const query = `
      SELECT department, register_number, name, guide_email as current_guide
      FROM student_details
      ORDER BY department, name
    `;

    const { rows } = await pool.query(query);
    res.json({ students: rows });
  } catch (error) {
    console.error('Failed to fetch students', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST assign guide_email to a student
router.post('/assign-student', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'faculty') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { studentRegNo, guideEmail } = req.body;

    if (req.user.email !== guideEmail) {
      return res.status(403).json({ message: 'You can only assign yourself as guide' });
    }

    const query = `
      UPDATE student_details
      SET guide_email = $1
      WHERE register_number = $2
      RETURNING department, register_number, name, guide_email;
    `;

    const { rows } = await pool.query(query, [guideEmail.toLowerCase(), studentRegNo]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Guide assigned successfully', student: rows[0] });
  } catch (error) {
    console.error('Failed to assign guide', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;