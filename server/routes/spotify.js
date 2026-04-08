const express = require('express');
const router = express.Router();
const Playlist = require('../models/Playlist');
const User = require('../models/User');
const { generateToken, protect } = require('../middleware/auth');

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI || 'http://localhost:5000/api/spotify/callback';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Step 1: Redirect to Spotify authorization
router.get('/login', (req, res) => {
  const scopes = 'playlist-read-private playlist-read-collaborative user-read-email';
  const state = req.query.link_token || '';
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: SPOTIFY_CLIENT_ID,
    scope: scopes,
    redirect_uri: SPOTIFY_REDIRECT_URI,
    state,
  });
  res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
});

// Step 2: Handle callback from Spotify
router.get('/callback', async (req, res) => {
  const { code, error, state } = req.query;

  if (error) {
    return res.redirect(`${CLIENT_URL}/spotify-playlist?error=${error}`);
  }

  try {
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: SPOTIFY_REDIRECT_URI,
      }),
    });

    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      return res.redirect(`${CLIENT_URL}/spotify-playlist?error=token_error`);
    }

    // Get Spotify user profile
    const profileRes = await fetch('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const profile = await profileRes.json();

    // If we have a link_token (state), link Spotify to existing account
    if (state) {
      try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(state, process.env.JWT_SECRET || 'qualitydj-secret-change-in-production');
        const user = await User.findById(decoded.id);
        if (user) {
          user.spotifyId = profile.id;
          user.spotifyDisplayName = profile.display_name;
          user.spotifyEmail = profile.email;
          await user.save();
          return res.redirect(`${CLIENT_URL}/spotify-playlist?spotify_token=${tokenData.access_token}&linked=true`);
        }
      } catch {
        // Invalid link token, continue with normal flow
      }
    }

    // Check if user exists by Spotify ID or email
    let user = await User.findOne({ spotifyId: profile.id });

    if (!user && profile.email) {
      user = await User.findOne({ email: profile.email.toLowerCase() });
      if (user) {
        user.spotifyId = profile.id;
        user.spotifyDisplayName = profile.display_name;
        user.spotifyEmail = profile.email;
        await user.save();
      }
    }

    if (!user) {
      user = await User.create({
        name: profile.display_name || 'Spotify User',
        email: profile.email || `spotify_${profile.id}@placeholder.local`,
        spotifyId: profile.id,
        spotifyDisplayName: profile.display_name,
        spotifyEmail: profile.email,
      });
    }

    const appToken = generateToken(user);

    res.redirect(
      `${CLIENT_URL}/spotify-playlist?spotify_token=${tokenData.access_token}&app_token=${appToken}`
    );
  } catch (err) {
    console.error('Spotify callback error:', err);
    res.redirect(`${CLIENT_URL}/spotify-playlist?error=server_error`);
  }
});

// Step 3: Submit selected playlists (requires auth)
router.post('/submit-playlists', protect, async (req, res) => {
  try {
    const { token, playlistIds } = req.body;

    if (!token || !playlistIds || playlistIds.length === 0) {
      return res.status(400).json({ error: 'Token and playlist IDs are required.' });
    }

    const savedPlaylists = [];

    for (const playlistId of playlistIds) {
      const plRes = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!plRes.ok) continue;

      const plData = await plRes.json();

      const tracks = (plData.tracks?.items || [])
        .filter((item) => item.track)
        .map((item) => ({
          name: item.track.name,
          artist: item.track.artists?.map((a) => a.name).join(', ') || 'Unknown',
          album: item.track.album?.name || 'Unknown',
        }));

      const playlist = await Playlist.create({
        spotifyPlaylistId: playlistId,
        playlistName: plData.name,
        userId: req.user._id,
        userName: req.user.name,
        userEmail: req.user.email,
        tracks,
      });

      savedPlaylists.push(playlist);
    }

    res.json({ success: true, count: savedPlaylists.length });
  } catch (err) {
    console.error('Playlist submit error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
