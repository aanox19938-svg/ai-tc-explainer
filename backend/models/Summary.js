const mongoose = require('mongoose');

const summarySchema = new mongoose.Schema({
  doc_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: true },
  summary_text: { type: String, required: true },
  generated_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Summary', summarySchema);