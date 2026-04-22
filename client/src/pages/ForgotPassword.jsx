import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';
import './Auth.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await forgotPassword(email);
      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Reset Password" description="Reset the password on your Quality Wedding DJ account." noindex />
      <div className="auth-page">
        <div className="auth-card">
          <h2>Reset your password</h2>
          {sent ? (
            <>
              <p className="auth-subtitle">
                If an account exists for <strong>{email}</strong>, a reset link is on its way.
                The link expires in 1 hour.
              </p>
              <p className="auth-switch" style={{ marginTop: '1.5rem' }}>
                <Link to="/login">Back to sign in</Link>
              </p>
            </>
          ) : (
            <>
              <p className="auth-subtitle">Enter your email and I'll send you a reset link.</p>
              {error && <div className="auth-error">{error}</div>}
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
                <button type="submit" className="btn btn--primary auth-submit" disabled={loading}>
                  {loading ? 'Sending…' : 'Send reset link'}
                </button>
              </form>
              <p className="auth-switch">
                Remembered it? <Link to="/login">Sign in</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
