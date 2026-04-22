import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';
import './Auth.css';

export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const token = params.get('token');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!token) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <h2>Invalid reset link</h2>
          <p className="auth-subtitle" style={{ color: '#c00' }}>This link is missing its token.</p>
          <p><Link to="/forgot-password">Request a new link</Link></p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      await resetPassword(token, password);
      navigate('/spotify-playlist');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Choose a New Password" />
      <div className="auth-page">
        <div className="auth-card">
          <h2>Choose a new password</h2>
          <p className="auth-subtitle">Pick something you'll remember.</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="password">New password</label>
              <input type="password" id="password" value={password}
                     onChange={(e) => setPassword(e.target.value)} required minLength={6} />
            </div>
            <div className="auth-field">
              <label htmlFor="confirm">Confirm new password</label>
              <input type="password" id="confirm" value={confirm}
                     onChange={(e) => setConfirm(e.target.value)} required minLength={6} />
            </div>
            <button type="submit" className="btn btn--primary auth-submit" disabled={loading}>
              {loading ? 'Saving…' : 'Save new password'}
            </button>
          </form>

          <p className="auth-switch">
            <Link to="/login">Back to sign in</Link>
          </p>
        </div>
      </div>
    </>
  );
}
