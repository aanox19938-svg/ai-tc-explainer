const mongoose = require('mongoose');

const chatQuerySchema = new mongoose.Schema({
  doc_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChatQuery', chatQuerySchema);