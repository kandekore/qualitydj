import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';
import './Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [unverifiedEmail, setUnverifiedEmail] = useState('');
  const [resendStatus, setResendStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, resendVerification } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setUnverifiedEmail('');
    setResendStatus('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/spotify-playlist');
    } catch (err) {
      if (err.code === 'EMAIL_NOT_VERIFIED') {
        setUnverifiedEmail(err.email || email);
        setError(err.message);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendStatus('Sending…');
    try {
      await resendVerification(unverifiedEmail);
      setResendStatus('Verification link sent. Check your inbox (and spam).');
    } catch (err) {
      setResendStatus(err.message);
    }
  };

  return (
    <>
      <SEO title="Sign In" description="Sign in to your Quality Wedding DJ account." />
      <div className="auth-page">
        <div className="auth-card">
          <h2>Welcome Back</h2>
          <p className="auth-subtitle">Sign in to your account</p>

          {error && <div className="auth-error">{error}</div>}
          {unverifiedEmail && (
            <div style={{ background: '#faf7f2', border: '1px solid #e8dcc3', borderRadius: 4, padding: '0.75rem 1rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
              Didn't get the email?{' '}
              <button type="button" onClick={handleResend}
                      style={{ background: 'none', border: 'none', color: '#8a6b35', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>
                Resend verification link
              </button>
              {resendStatus && <div style={{ marginTop: '0.5rem', color: '#666' }}>{resendStatus}</div>}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="auth-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn--primary auth-submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Create one</Link>
          </p>
        </div>
      </div>
    </>
  );
}
