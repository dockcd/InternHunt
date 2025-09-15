const express = require('express');
const router = express.Router();
const supabase = require('../config/supabaseClient');
const { authMiddleware } = require('../middleware/authMiddleware');
// const pool = require('../config/db').pool; // Assuming you have a PostgreSQL pool export for queries
const pool = require('../config/pgPool'); // not from db.js anymore
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// Helper: Map document type to column name
const docTypeToColumn = {
  bonafide: 'bonafide_letter_url',
  offer: 'internship_offer_letter_url',
  completion: 'internship_completion_letter_url',
  report: 'internship_report_url',
};

// Upload/update a document file
router.post(
  '/upload/:email/:internshipId/:docType',
  authMiddleware,
  upload.single('file'),
  async (req, res) => {
    try {
      const { email, internshipId, docType } = req.params;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      if (!docTypeToColumn[docType]) {
        return res.status(400).json({ message: 'Invalid document type' });
      }

      // Upload file to Supabase Storage bucket "internship-documents"
      // const extension = file.originalname.split('.').pop(); // e.g., 'pdf' or 'docx'
      // const filePath = `${email}/${internshipId}/${docType}/${docType}.${extension}`;

      const filePath = `${email}/${internshipId}/${docType}/${file.originalname}`;

      const { data, error: uploadError } = await supabase.storage
        .from('internship-documents')
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: true,
        });

      if (uploadError) {
        console.error('Supabase upload error:', uploadError);
        return res.status(500).json({ message: 'Failed to upload to storage' });
      }

      // Get public URL for uploaded file
      // const { publicURL, error: urlError } = supabase.storage
      const { data: urlData, error: urlError } = supabase.storage
        .from('internship-documents')
        .getPublicUrl(data.path);
      
      const publicUrl = urlData.publicUrl;

      if (urlError) {
        console.error('Supabase getPublicUrl error:', urlError);
        return res.status(500).json({ message: 'Failed to get file URL' });
      }

      // Update or insert document URL in internship_documents table
      const columnName = docTypeToColumn[docType];
      const query = `
        INSERT INTO internship_documents (student_email, internship_id, ${columnName}, created_at, updated_at)
        VALUES ($1, $2, $3, now(), now())
        ON CONFLICT (student_email, internship_id)
        DO UPDATE SET ${columnName} = EXCLUDED.${columnName}, updated_at = now()
        RETURNING *;
      `;

      const { rows } = await pool.query(query, [email.toLowerCase(), internshipId, publicUrl]); //publicURL

      return res.status(200).json({ message: 'File uploaded and URL saved', document: rows[0] });
    } catch (error) {
      console.error('Upload route error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
);

// Fetch document URLs for a student's internship
router.get('/:email/:internshipId', authMiddleware, async (req, res) => {
  try {
    const { email, internshipId } = req.params;

    const query = `
      SELECT bonafide_letter_url, internship_offer_letter_url, internship_completion_letter_url, internship_report_url
      FROM internship_documents
      WHERE student_email = $1 AND internship_id = $2
    `;

    const { rows } = await pool.query(query, [email.toLowerCase(), internshipId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No documents found for this internship' });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Fetch documents error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;