const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const pool = require('../config/pgPool'); // your PostgreSQL pool

// GET all announcements - accessible by any authenticated user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const query = `
      SELECT id, title, content, posted_by, posted_at
      FROM announcements
      ORDER BY posted_at DESC
    `;
    const { rows } = await pool.query(query);
    res.json({ announcements: rows });
  } catch (error) {
    console.error('Failed to fetch announcements', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST new announcement - only guides (faculty) allowed
router.post('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'faculty') {
      return res.status(403).json({ message: 'Forbidden: only faculty can post announcements' });
    }

    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const postedBy = req.user.email;

    const query = `
      INSERT INTO announcements (title, content, posted_by)
      VALUES ($1, $2, $3)
      RETURNING id, title, content, posted_by, posted_at
    `;

    const { rows } = await pool.query(query, [title, content, postedBy]);
    res.status(201).json({ message: 'Announcement posted', announcement: rows[0] });
  } catch (error) {
    console.error('Failed to post announcement', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;