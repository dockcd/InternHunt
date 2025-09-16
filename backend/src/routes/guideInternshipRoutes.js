const express = require('express');
const router = express.Router();
const pool = require('../config/pgPool'); // PostgreSQL pool for raw queries

const StudentDetails = require('../models/StudentDetails');
const Internship = require('../models/Internship');

// GET all students assigned to a guide by guide's email
router.get('/students/:guideEmail', async (req, res) => {
  try {
    const { guideEmail } = req.params;
    console.log('Received guideEmail:', guideEmail);

    // Fetch students with matching guide_email
    const students = await StudentDetails.findAll({
      where: { guide_email: guideEmail.toLowerCase() },
      attributes: ['name', 'register_number', 'email', 'department', 'semester', 'class_name', 'guide_email'],
      order: [['name', 'ASC']],
    });

    res.json({ students });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET internships for a student by student email
router.get('/internships/:studentEmail', async (req, res) => {
  try {
    const { studentEmail } = req.params;

    // Fetch internships for the given student email
    const internships = await Internship.findAll({
      where: { student_email: studentEmail.toLowerCase() },
      order: [['createdAt', 'DESC']],
    });

    res.json({ internships });
  } catch (error) {
    console.error('Error fetching internships:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// PATCH update remarks & acceptance of a specific internship by internship ID
router.patch('/internship/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { remarks, acceptance } = req.body;

    // Optional validation for acceptance field
    const validAcceptanceValues = [null, '', 'Approved', 'Rejected'];
    if (acceptance && !validAcceptanceValues.includes(acceptance)) {
      return res.status(400).json({ message: 'Invalid acceptance value' });
    }

    // Find internship by id
    const internship = await Internship.findByPk(id);
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    // Update fields - only update if provided
    internship.remarks = remarks !== undefined ? remarks : internship.remarks;
    internship.acceptance = acceptance !== '' ? acceptance : null;

    await internship.save();

    res.json({ message: 'Internship updated', internship });
  } catch (error) {
    console.error('Error updating internship:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});






















router.get('/internship_with_doc/:studentEmail', async (req, res) => {
  try {
    const { studentEmail } = req.params;

    // Fetch internships for the given student email using Sequelize
    const internships = await Internship.findAll({
      where: { student_email: studentEmail.toLowerCase() },
      order: [['createdAt', 'DESC']],
      raw: true,  // get plain JSON objects for easy merging
    });

    // For each internship, fetch its documents from internship_documents
    const internshipsWithDocs = await Promise.all(
      internships.map(async (internship) => {
        const docQuery = `
          SELECT bonafide_letter_url, internship_offer_letter_url, internship_completion_letter_url, internship_report_url
          FROM internship_documents
          WHERE student_email = $1 AND internship_id = $2
          LIMIT 1
        `;
        const { rows } = await pool.query(docQuery, [
          studentEmail.toLowerCase(),
          internship.id,
        ]);

        // Attach documents info or null if not found
        return {
          ...internship,
          documents: rows[0] || null,
        };
      })
    );

    res.json({ internships: internshipsWithDocs });
  } catch (error) {
    console.error('Error fetching internships with documents:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



module.exports = router;
