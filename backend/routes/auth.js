const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { auth } = require('../middleware/auth');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { full_name, email, phone, password } = req.body;
    if (!full_name || !email || !password) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }
    
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(400).json({ error: 'User already exists with this email' });
    
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ 
      full_name, 
      email: email.toLowerCase(), 
      phone: phone || '', 
      password: hashed 
    });
    
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role }, 
      process.env.JWT_SECRET || 'fallbacksecret', 
      { expiresIn: '7d' }
    );
    
    res.status(201).json({ 
      token, 
      user: { id: user._id, full_name: user.full_name, email: user.email, role: user.role } 
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during registration' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role }, 
      process.env.JWT_SECRET || 'fallbacksecret', 
      { expiresIn: '7d' }
    );
    
    res.json({ 
      token, 
      user: { id: user._id, full_name: user.full_name, email: user.email, role: user.role } 
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during login' });
  }
});

router.get('/me', auth, async (req, res) => {
  res.json({ 
    user: { id: req.user._id, full_name: req.user.full_name, email: req.user.email, role: req.user.role } 
  });
});

module.exports = router;