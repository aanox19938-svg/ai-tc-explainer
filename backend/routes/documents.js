const express = require('express');
const multer = require('multer');
const Document = require('../models/Document');
const Summary = require('../models/Summary');
const Clause = require('../models/Clause');
const { auth } = require('../middleware/auth');
const { extractText } = require('../services/documentParser');
const { analyzeDocument } = require('../services/geminiService');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    let text, fileType, fileName;
    
    if (req.file) {
      fileType = req.file.originalname.split('.').pop().toLowerCase();
      fileName = req.file.originalname;
      if (!['pdf', 'docx'].includes(fileType)) {
        return res.status(400).json({ error: 'Only PDF and DOCX files are supported' });
      }
      text = await extractText(req.file.buffer, fileType);
    } else if (req.body.text) {
      text = req.body.text;
      fileType = 'text';
      fileName = 'pasted-text';
    } else {
      return res.status(400).json({ error: 'No file or text provided' });
    }
    
    if (!text || text.trim().length < 50) {
      return res.status(400).json({ error: 'Document text is too short or could not be extracted' });
    }
    
    const doc = await Document.create({
      user_id: req.user._id,
      file_name: fileName,
      file_type: fileType,
      raw_text: text,
      status: 'processing'
    });
    
    const analysis = await analyzeDocument(text);
    
    await Summary.create({
      doc_id: doc._id,
      summary_text: analysis.summary
    });
    
    if (analysis.clauses && analysis.clauses.length > 0) {
      await Clause.insertMany(
        analysis.clauses.map(c => ({
          doc_id: doc._id,
          clause_text: c.clause_text,
          risk_level: c.risk_level,
          category: c.category,
          explanation: c.explanation
        }))
      );
    }
    
    doc.status = 'completed';
    await doc.save();
    
    res.json({
      success: true,
      documentId: doc._id,
      summary: analysis.summary,
      clauses: analysis.clauses || []
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message || 'Analysis failed' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const documents = await Document.find({ user_id: req.user._id })
      .select('-raw_text')
      .sort({ upload_date: -1 });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const doc = await Document.findOne({ _id: req.params.id, user_id: req.user._id });
    if (!doc) return res.status(404).json({ error: 'Document not found' });
    
    const summary = await Summary.findOne({ doc_id: doc._id });
    const clauses = await Clause.find({ doc_id: doc._id });
    
    res.json({ document: doc, summary, clauses });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch document' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Document.findOneAndDelete({ _id: req.params.id, user_id: req.user._id });
    await Summary.deleteOne({ doc_id: req.params.id });
    await Clause.deleteMany({ doc_id: req.params.id });
    res.json({ success: true, message: 'Document deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete document' });
  }
});

module.exports = router;