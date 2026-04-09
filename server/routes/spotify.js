const express = require('express');
const router = express.Router();
const Playlist = require('../models/Playlist');
const { protect } = require('../middleware/auth');

// Extract Spotify playlist ID from various URL formats
function extractPlaylistId(input) {
  const trimmed = input.trim();
  // Direct ID (no slashes or dots)
  if (/^[a-zA-Z0-9]{22}$/.test(trimmed)) return trimmed;
  // URL formats: open.spotify.com/playlist/ID or spotify:playlist:ID
  const urlMatch = trimmed.match(/playlist[/:]([a-zA-Z0-9]{22})/);
  return urlMatch ? urlMatch[1] : null;
}

// Fetch playlist metadata and tracks from Spotify embed page (public, no auth needed)
async function fetchPlaylistData(playlistId) {
  // Get metadata from oEmbed
  const oembedRes = await fetch(`https://open.spotify.com/oembed?url=https://open.spotify.com/playlist/${playlistId}`);
  if (!oembedRes.ok) return null;
  const oembed = await oembedRes.json();

  // Get track data from embed page
  let tracks = [];
  try {
    const embedRes = await fetch(`https://open.spotify.com/embed/playlist/${playlistId}`);
    if (embedRes.ok) {
      const html = await embedRes.text();
      const match = html.match(/<script id="__NEXT_DATA__"[^>]*>([^<]+)<\/script>/);
      if (match) {
        const data = JSON.parse(match[1]);
        const trackList = data?.props?.pageProps?.state?.data?.entity?.trackList || [];
        tracks = trackList
          .filter((t) => t.title)
          .map((t) => ({
            name: t.title,
            artist: (t.subtitle || 'Unknown').replace(/\u00a0/g, ' '),
            duration: t.duration || 0,
          }));
      }
    }
  } catch (err) {
    console.error('Track extraction error:', err.message);
  }

  return {
    title: oembed.title,
    thumbnailUrl: oembed.thumbnail_url,
    embedUrl: `https://open.spotify.com/embed/playlist/${playlistId}`,
    spotifyUrl: `https://open.spotify.com/playlist/${playlistId}`,
    tracks,
  };
}

// Submit playlist links (requires auth)
router.post('/submit-playlists', protect, async (req, res) => {
  try {
    const { links } = req.body;

    if (!links || !Array.isArray(links) || links.length === 0) {
      return res.status(400).json({ error: 'At least one playlist link is required.' });
    }

    if (links.length > 20) {
      return res.status(400).json({ error: 'Maximum 20 playlists at a time.' });
    }

    const saved = [];
    const errors = [];

    for (const link of links) {
      const playlistId = extractPlaylistId(link);
      if (!playlistId) {
        errors.push({ link, reason: 'Invalid Spotify playlist link' });
        continue;
      }

      // Check if already submitted by this user
      const existing = await Playlist.findOne({ spotifyPlaylistId: playlistId, userId: req.user._id });
      if (existing) {
        errors.push({ link, reason: 'Already submitted' });
        continue;
      }

      const data = await fetchPlaylistData(playlistId);
      if (!data) {
        errors.push({ link, reason: 'Could not fetch playlist — is it public?' });
        continue;
      }

      const playlist = await Playlist.create({
        spotifyPlaylistId: playlistId,
        playlistName: data.title,
        thumbnailUrl: data.thumbnailUrl,
        spotifyUrl: data.spotifyUrl,
        embedUrl: data.embedUrl,
        tracks: data.tracks,
        userId: req.user._id,
        userName: req.user.name,
        userEmail: req.user.email,
      });

      saved.push(playlist);
    }

    res.json({ success: true, saved, errors });
  } catch (err) {
    console.error('Playlist submit error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Get user's submitted playlists (requires auth)
router.get('/my-playlists', protect, async (req, res) => {
  try {
    const playlists = await Playlist.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ playlists });
  } catch (err) {
    console.error('Fetch playlists error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Delete a submitted playlist (requires auth)
router.delete('/playlist/:id', protect, async (req, res) => {
  try {
    const playlist = await Playlist.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!playlist) return res.status(404).json({ error: 'Playlist not found.' });
    res.json({ success: true });
  } catch (err) {
    console.error('Delete playlist error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
