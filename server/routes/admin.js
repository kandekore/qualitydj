const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const User = require('../models/User');
const Playlist = require('../models/Playlist');
const Contact = require('../models/Contact');

// All admin routes require auth + admin role
router.use(protect, adminOnly);

// Get all clients
router.get('/clients', async (req, res) => {
  try {
    const { search } = req.query;
    const filter = search
      ? { role: 'client', $or: [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }] }
      : { role: 'client' };

    const clients = await User.find(filter).select('-password').sort({ createdAt: -1 });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Get a single client with their playlists
router.get('/clients/:id', async (req, res) => {
  try {
    const client = await User.findById(req.params.id).select('-password');
    if (!client) return res.status(404).json({ error: 'Client not found.' });

    const playlists = await Playlist.find({ userId: client._id }).sort({ createdAt: -1 });

    res.json({ client, playlists });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Get all playlists
router.get('/playlists', async (req, res) => {
  try {
    const { search } = req.query;
    const filter = search
      ? { $or: [{ userName: { $regex: search, $options: 'i' } }, { userEmail: { $regex: search, $options: 'i' } }, { playlistName: { $regex: search, $options: 'i' } }] }
      : {};

    const playlists = await Playlist.find(filter).populate('userId', 'name email phone weddingDate venue').sort({ createdAt: -1 });
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Get all contact submissions
router.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Get dashboard summary
router.get('/dashboard', async (req, res) => {
  try {
    const [clientCount, playlistCount, contactCount, recentClients, recentContacts] = await Promise.all([
      User.countDocuments({ role: 'client' }),
      Playlist.countDocuments(),
      Contact.countDocuments(),
      User.find({ role: 'client' }).select('-password').sort({ createdAt: -1 }).limit(5),
      Contact.find().sort({ createdAt: -1 }).limit(5),
    ]);

    res.json({ clientCount, playlistCount, contactCount, recentClients, recentContacts });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
