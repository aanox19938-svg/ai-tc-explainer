const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  file_name: { type: String, default: 'pasted-text' },
  file_type: { type: String, enum: ['pdf', 'docx', 'text'], required: true },
  raw_text: { type: String, required: true },
  upload_date: { type: Date, default: Date.now },
  status: { type: String, enum: ['processing', 'completed', 'failed'], default: 'processing' }
});

module.exports = mongoose.model('Document', documentSchema);
