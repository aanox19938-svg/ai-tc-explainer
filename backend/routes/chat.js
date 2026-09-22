const express = require('express');
const ChatQuery = require('../models/ChatQuery');
const Document = require('../models/Document');
const { auth } = require('../middleware/auth');
const { chatWithDocument } = require('../services/geminiService');
const router = express.Router();

router.post('/:documentId', auth, async (req, res) => {
  try {
    const { question } = req.body;
    const doc = await Document.findOne({ _id: req.params.documentId, user_id: req.user._id });
    if (!doc) return res.status(404).json({ error: 'Document not found' });
    
    const history = await ChatQuery.find({ 
      doc_id: req.params.documentId, 
      user_id: req.user._id 
    }).sort({ timestamp: -1 }).limit(5);
    
    const answer = await chatWithDocument(question, doc.raw_text, history.reverse());
    
    const chat = await ChatQuery.create({
      doc_id: req.params.documentId,
      user_id: req.user._id,
      question: question.trim(),
      answer
    });
    
    res.json({ success: true, answer, chatId: chat._id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process question' });
  }
});

router.get('/:documentId/history', auth, async (req, res) => {
  try {
    const chats = await ChatQuery.find({ 
      doc_id: req.params.documentId, 
      user_id: req.user._id 
    }).sort({ timestamp: 1 });
    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
});

module.exports = router;