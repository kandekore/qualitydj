const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  name: String,
  artist: String,
  album: String,
});

const playlistSchema = new mongoose.Schema(
  {
    spotifyPlaylistId: { type: String, required: true },
    playlistName: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userName: { type: String },
    userEmail: { type: String },
    tracks: [trackSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Playlist', playlistSchema);
