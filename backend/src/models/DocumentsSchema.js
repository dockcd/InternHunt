// src/models/documentModel.js
const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  studentEmail: { type: String, required: true, lowercase: true, trim: true, index: true },
  bonafideLetterUrl: { type: String, required: false },
  internshipOfferLetterUrl: { type: String, required: false },
  internshipAcceptanceLetterUrl: { type: String, required: false },
  internshipReportUrl: { type: String, required: false }
}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema);
