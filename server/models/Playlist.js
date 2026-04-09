const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  name: String,
  artist: String,
  duration: Number,
});

const playlistSchema = new mongoose.Schema(
  {
    spotifyPlaylistId: { type: String, required: true },
    playlistName: { type: String },
    thumbnailUrl: { type: String },
    spotifyUrl: { type: String },
    embedUrl: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userName: { type: String },
    userEmail: { type: String },
    tracks: [trackSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Playlist', playlistSchema);
