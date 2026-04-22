const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const User = require('../models/User');
const Playlist = require('../models/Playlist');
const Contact = require('../models/Contact');
const Settings = require('../models/Settings');
const { sendMail } = require('../lib/mailer');

// All admin routes require auth + admin role
router.use(protect, adminOnly);

// ---- Settings ----

function redactSettings(s) {
  const obj = s.toObject ? s.toObject() : s;
  const { smtpPass, __v, _id, key, createdAt, updatedAt, ...rest } = obj;
  return { ...rest, smtpPassSet: !!smtpPass };
}

router.get('/settings', async (req, res) => {
  try {
    const s = await Settings.getSingleton();
    res.json(redactSettings(s));
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

router.put('/settings', async (req, res) => {
  try {
    const s = await Settings.getSingleton();
    const allowed = [
      'smtpHost', 'smtpPort', 'smtpSecure', 'smtpUser',
      'mailFromAddress', 'mailFromName',
      'adminNotifyEmails', 'customerEmailEnabled',
      'siteName', 'siteUrl',
    ];
    for (const k of allowed) {
      if (req.body[k] !== undefined) s[k] = req.body[k];
    }
    // Password: treat empty as "don't change"
    if (typeof req.body.smtpPass === 'string' && req.body.smtpPass.length > 0) {
      s.smtpPass = req.body.smtpPass;
    }
    // Normalise admin emails: accept string ("a@x, b@y") or array
    if (typeof s.adminNotifyEmails === 'string') {
      s.adminNotifyEmails = s.adminNotifyEmails.split(/[,\s]+/).map((e) => e.trim()).filter(Boolean);
    }
    await s.save();
    res.json(redactSettings(s));
  } catch (err) {
    console.error('Settings save error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

router.post('/settings/test-email', async (req, res) => {
  try {
    const to = (req.body && req.body.to) || req.user.email;
    if (!to) return res.status(400).json({ error: 'No recipient — provide "to" or set an email on the admin user.' });

    const result = await sendMail({
      to,
      subject: 'Test email from Quality Wedding DJ admin',
      text: 'If you are reading this, SMTP is configured correctly.',
      html: '<p>If you are reading this, SMTP is configured correctly.</p>',
    });
    res.json({ ok: true, result });
  } catch (err) {
    console.error('Test email failed:', err);
    res.status(500).json({ error: err.message || 'Send failed.' });
  }
});

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

// Export a single playlist as CSV (compatible with Soundiiz/TuneMyMusic for Tidal import)
router.get('/export/playlist/:id', async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ error: 'Playlist not found.' });

    const escCsv = (val) => {
      const s = String(val ?? '');
      return s.includes(',') || s.includes('"') || s.includes('\n') ? `"${s.replace(/"/g, '""')}"` : s;
    };

    const tracks = playlist.tracks || [];
    const rows = ['Track Name,Artist,Duration'];
    for (const t of tracks) {
      const mins = t.duration ? `${Math.floor(t.duration / 60000)}:${Math.floor((t.duration % 60000) / 1000).toString().padStart(2, '0')}` : '';
      rows.push([t.name, t.artist, mins].map(escCsv).join(','));
    }

    const safeName = playlist.playlistName.replace(/[^a-zA-Z0-9-_ ]/g, '').trim().replace(/\s+/g, '-');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=${safeName}.csv`);
    res.send(rows.join('\n'));
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
