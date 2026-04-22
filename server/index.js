const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/qualitydj';

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');
    // Grandfather accounts created before email verification existed
    try {
      const User = require('./models/User');
      const r = await User.updateMany(
        { emailVerified: { $exists: false } },
        { $set: { emailVerified: true } }
      );
      if (r.modifiedCount > 0) console.log(`Migrated ${r.modifiedCount} pre-existing users to emailVerified=true`);
    } catch (e) {
      console.error('User migration error:', e.message);
    }
  })
  .catch((err) => console.log('MongoDB connection error:', err.message));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/spotify', require('./routes/spotify'));
app.use('/api/admin', require('./routes/admin'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
