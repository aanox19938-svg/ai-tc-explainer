const mongoose = require('mongoose');

const clauseSchema = new mongoose.Schema({
  doc_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: true },
  clause_text: { type: String, required: true },
  risk_level: { type: String, enum: ['low', 'medium', 'high', 'critical'], required: true },
  category: { type: String, enum: ['data_sharing', 'auto_renewal', 'liability', 'termination', 'privacy', 'other'], required: true },
  explanation: { type: String, required: true }
});

module.exports = mongoose.model('Clause', clauseSchema);
