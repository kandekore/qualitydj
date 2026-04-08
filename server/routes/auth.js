const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateToken, protect } = require('../middleware/auth');

// Register with email/password
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, weddingDate, venue } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ error: 'An account with this email already exists.' });
    }

    const user = await User.create({ name, email, phone, password, weddingDate, venue });
    const token = generateToken(user);

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone },
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Login with email/password
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !user.password) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = generateToken(user);

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Get current user
router.get('/me', protect, async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      role: req.user.role,
      weddingDate: req.user.weddingDate,
      venue: req.user.venue,
      spotifyId: req.user.spotifyId,
    },
  });
});

// Update profile
router.put('/me', protect, async (req, res) => {
  try {
    const { name, phone, weddingDate, venue } = req.body;
    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (weddingDate) user.weddingDate = weddingDate;
    if (venue) user.venue = venue;

    await user.save();

    res.json({
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role, weddingDate: user.weddingDate, venue: user.venue },
    });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
