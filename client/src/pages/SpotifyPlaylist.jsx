import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import './SpotifyPlaylist.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function SpotifyPlaylist() {
  const { user, loginWithAppToken } = useAuth();
  const [spotifyToken, setSpotifyToken] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [spotifyUser, setSpotifyUser] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sToken = params.get('spotify_token');
    const appToken = params.get('app_token');

    if (sToken) {
      sessionStorage.setItem('spotify_token', sToken);
      setSpotifyToken(sToken);

      if (appToken) {
        // Fetch user info and set auth
        fetch(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${appToken}` },
        })
          .then((r) => r.json())
          .then((data) => {
            if (data.user) loginWithAppToken(appToken, data.user);
          })
          .catch(() => {});
      }

      window.history.replaceState({}, '', '/spotify-playlist');
    }

    const stored = sessionStorage.getItem('spotify_token');
    if (stored) {
      setSpotifyToken(stored);
      fetchPlaylists(stored);
      fetchSpotifyUser(stored);
    }
  }, []);

  const fetchSpotifyUser = async (token) => {
    try {
      const res = await fetch('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setSpotifyUser(await res.json());
    } catch { /* ignore */ }
  };

  const fetchPlaylists = async (token) => {
    try {
      const res = await fetch('https://api.spotify.com/v1/me/playlists?limit=50', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setPlaylists(data.items || []);
      } else {
        setSpotifyToken(null);
        sessionStorage.removeItem('spotify_token');
      }
    } catch {
      setSpotifyToken(null);
      sessionStorage.removeItem('spotify_token');
    }
  };

  const handleSpotifyConnect = () => {
    const token = localStorage.getItem('token');
    const url = token
      ? `${API_URL}/spotify/login?link_token=${token}`
      : `${API_URL}/spotify/login`;
    window.location.href = url;
  };

  const togglePlaylist = (id) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);
  };

  const handleSubmit = async () => {
    if (selected.length === 0) return;
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch(`${API_URL}/spotify/submit-playlists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ token: spotifyToken, playlistIds: selected }),
      });

      if (res.ok) {
        setStatus('success');
        setSelected([]);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = () => {
    sessionStorage.removeItem('spotify_token');
    setSpotifyToken(null);
    setPlaylists([]);
    setSpotifyUser(null);
    setSelected([]);
  };

  const needsAuth = !user;
  const needsSpotify = user && !spotifyToken;
  const ready = user && spotifyToken;

  return (
    <>
      <SEO
        title="Submit Your Spotify Playlist"
        description="Share your favourite Spotify playlists with us so we can craft the perfect soundtrack for your wedding."
      />

      <section className="page-hero">
        <img src="/assets/images/IMG_3115-1152x1536.jpg" alt="Music" className="page-hero__bg" />
        <div className="page-hero__overlay" />
        <div className="page-hero__content">
          <h1>Your Music, Your Way</h1>
          <div className="divider" style={{ background: 'rgba(255,255,255,0.4)' }} />
          <p>Share your favourite playlists and let us craft the perfect soundtrack for your day.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {needsAuth && (
            <ScrollReveal>
              <div className="spotify__login">
                <h2>Sign In to Share Your Playlists</h2>
                <div className="divider" />
                <p>
                  Create an account or sign in to share your Spotify playlists with us. We'll use
                  your selections to craft a bespoke soundtrack for your wedding.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Link to="/login" className="btn btn--primary">Sign In</Link>
                  <Link to="/register" className="btn btn--accent">Create Account</Link>
                </div>
                <div className="auth-divider" style={{ maxWidth: 300, margin: '1.5rem auto' }}>
                  <span>or</span>
                </div>
                <button onClick={handleSpotifyConnect} className="spotify__login-btn">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                  Continue with Spotify
                </button>
              </div>
            </ScrollReveal>
          )}

          {needsSpotify && (
            <ScrollReveal>
              <div className="spotify__login">
                <h2>Connect Your Spotify</h2>
                <div className="divider" />
                <p>Hi {user.name}! Connect your Spotify account to browse and share your playlists.</p>
                <button onClick={handleSpotifyConnect} className="spotify__login-btn">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                  Connect with Spotify
                </button>
              </div>
            </ScrollReveal>
          )}

          {ready && (
            <div className="spotify__content">
              <div className="spotify__header">
                <div>
                  <h2>Your Playlists</h2>
                  {spotifyUser && <p className="spotify__user">Spotify: {spotifyUser.display_name}</p>}
                </div>
                <button onClick={handleDisconnect} className="btn btn--primary" style={{ fontSize: '0.7rem', padding: '8px 20px' }}>
                  Disconnect Spotify
                </button>
              </div>

              {playlists.length === 0 ? (
                <p className="spotify__empty">No playlists found on your account.</p>
              ) : (
                <>
                  <p className="spotify__instructions">
                    Select the playlists you'd like to share with us, then click submit.
                  </p>
                  <div className="spotify__grid">
                    {playlists.map((pl) => (
                      <div
                        key={pl.id}
                        className={`spotify__card ${selected.includes(pl.id) ? 'spotify__card--selected' : ''}`}
                        onClick={() => togglePlaylist(pl.id)}
                      >
                        <div className="spotify__card-img">
                          {pl.images?.[0] ? (
                            <img src={pl.images[0].url} alt={pl.name} />
                          ) : (
                            <div className="spotify__card-placeholder" />
                          )}
                          {selected.includes(pl.id) && (
                            <div className="spotify__card-check">&#10003;</div>
                          )}
                        </div>
                        <h4>{pl.name}</h4>
                        <p>{pl.tracks?.total || 0} tracks</p>
                      </div>
                    ))}
                  </div>

                  {selected.length > 0 && (
                    <div className="spotify__submit">
                      <p>{selected.length} playlist{selected.length !== 1 ? 's' : ''} selected</p>
                      <button onClick={handleSubmit} className="btn btn--primary" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit Playlists'}
                      </button>
                    </div>
                  )}

                  {status === 'success' && (
                    <div className="contact__status contact__status--success" style={{ marginTop: '1rem' }}>
                      Thank you! Your playlists have been submitted successfully.
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="contact__status contact__status--error" style={{ marginTop: '1rem' }}>
                      Something went wrong. Please try again.
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
