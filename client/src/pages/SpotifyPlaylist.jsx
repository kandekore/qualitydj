import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import './SpotifyPlaylist.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function SpotifyPlaylist() {
  const { user } = useAuth();
  const [linkInput, setLinkInput] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (user) fetchMyPlaylists();
  }, [user]);

  const fetchMyPlaylists = async () => {
    try {
      const res = await fetch(`${API_URL}/spotify/my-playlists`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (res.ok) {
        const data = await res.json();
        setPlaylists(data.playlists || []);
      }
    } catch { /* ignore */ }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!linkInput.trim()) return;

    setSubmitting(true);
    setStatus(null);
    setErrors([]);

    // Split by newlines or commas to allow multiple links
    const links = linkInput
      .split(/[\n,]+/)
      .map((l) => l.trim())
      .filter(Boolean);

    try {
      const res = await fetch(`${API_URL}/spotify/submit-playlists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ links }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.saved?.length > 0) {
          setStatus('success');
          setLinkInput('');
          fetchMyPlaylists();
        }
        if (data.errors?.length > 0) {
          setErrors(data.errors);
          if (!data.saved?.length) setStatus('error');
        }
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/spotify/playlist/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (res.ok) {
        setPlaylists((prev) => prev.filter((p) => p._id !== id));
      }
    } catch { /* ignore */ }
  };

  const needsAuth = !user;

  return (
    <>
      <SEO
        title="Submit Your Spotify Playlist"
        description="Share your favourite Spotify playlists with Jan so he can craft the perfect soundtrack for your wedding."
      />

      <section className="page-hero">
        <img src="/assets/images/IMG_3115-1152x1536.webp" alt="Music" className="page-hero__bg" />
        <div className="page-hero__overlay" />
        <div className="page-hero__content">
          <h1>Your Music, Your Way</h1>
          <div className="divider" style={{ background: 'rgba(255,255,255,0.4)' }} />
          <p>Share your favourite playlists and let me craft the perfect soundtrack for your day.</p>
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
                  Create an account or sign in to share your Spotify playlists with me. I'll use
                  your selections to craft a bespoke soundtrack for your wedding.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Link to="/login" className="btn btn--primary">Sign In</Link>
                  <Link to="/register" className="btn btn--accent">Create Account</Link>
                </div>
              </div>
            </ScrollReveal>
          )}

          {user && (
            <div className="spotify__content">
              <ScrollReveal>
                <div className="spotify__login">
                  <h2>Share Your Spotify Playlists</h2>
                  <div className="divider" />
                  <p>
                    Paste your Spotify playlist links below. Open Spotify, go to a playlist,
                    tap <strong>Share</strong> &rarr; <strong>Copy link</strong>, then paste it here.
                    You can add multiple links, one per line.
                  </p>
                </div>
              </ScrollReveal>

              <form onSubmit={handleSubmit} className="spotify__form">
                <textarea
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                  placeholder="https://open.spotify.com/playlist/..."
                  rows={3}
                  className="spotify__textarea"
                />
                <button type="submit" className="spotify__login-btn" disabled={submitting || !linkInput.trim()}>
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                  {submitting ? 'Submitting...' : 'Submit Playlists'}
                </button>
              </form>

              {status === 'success' && (
                <div className="contact__status contact__status--success" style={{ marginTop: '1rem' }}>
                  Playlists submitted successfully! You can see them below.
                </div>
              )}
              {status === 'error' && errors.length === 0 && (
                <div className="contact__status contact__status--error" style={{ marginTop: '1rem' }}>
                  Something went wrong. Please try again.
                </div>
              )}
              {errors.length > 0 && (
                <div className="contact__status contact__status--error" style={{ marginTop: '1rem' }}>
                  {errors.map((e, i) => (
                    <div key={i}>{e.reason}</div>
                  ))}
                </div>
              )}

              {playlists.length > 0 && (
                <>
                  <h3 style={{ marginTop: '3rem', marginBottom: '1.5rem' }}>Your Submitted Playlists</h3>
                  <div className="spotify__playlist-list">
                    {playlists.map((pl) => (
                      <div key={pl._id} className="spotify__playlist-item">
                        <div className="spotify__playlist-info">
                          {pl.thumbnailUrl && (
                            <img src={pl.thumbnailUrl} alt={pl.playlistName} className="spotify__playlist-thumb" />
                          )}
                          <div>
                            <h4>{pl.playlistName}</h4>
                            <span className="spotify__playlist-meta">{pl.tracks?.length || 0} tracks</span>
                            <a href={pl.spotifyUrl} target="_blank" rel="noopener noreferrer" className="spotify__playlist-link">
                              Open in Spotify
                            </a>
                          </div>
                        </div>
                        <button onClick={() => handleDelete(pl._id)} className="spotify__delete-btn" title="Remove playlist">
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="spotify__embeds">
                    {playlists.map((pl) => (
                      <div key={pl._id} className="spotify__embed-wrap">
                        <iframe
                          src={pl.embedUrl}
                          width="100%"
                          height="352"
                          frameBorder="0"
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          loading="lazy"
                          title={pl.playlistName}
                          style={{ borderRadius: '12px' }}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
