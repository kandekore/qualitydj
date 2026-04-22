import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';
import './Auth.css';

export default function VerifyEmail() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { verifyEmail } = useAuth();
  const [state, setState] = useState({ status: 'pending', message: '' });
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const token = params.get('token');
    if (!token) {
      setState({ status: 'error', message: 'No verification token in the link.' });
      return;
    }
    (async () => {
      try {
        await verifyEmail(token);
        setState({ status: 'success', message: 'Your email is verified. Signing you in…' });
        setTimeout(() => navigate('/spotify-playlist'), 1500);
      } catch (err) {
        setState({ status: 'error', message: err.message, code: err.code });
      }
    })();
  }, [params, verifyEmail, navigate]);

  return (
    <>
      <SEO title="Verifying Email" />
      <div className="auth-page">
        <div className="auth-card">
          {state.status === 'pending' && (
            <>
              <h2>Verifying…</h2>
              <p className="auth-subtitle">One moment while I confirm your email.</p>
            </>
          )}
          {state.status === 'success' && (
            <>
              <h2>You're verified</h2>
              <p className="auth-subtitle">{state.message}</p>
            </>
          )}
          {state.status === 'error' && (
            <>
              <h2>Verification failed</h2>
              <p className="auth-subtitle" style={{ color: '#c00' }}>{state.message}</p>
              {state.code === 'EXPIRED' ? (
                <p><Link to="/login">Sign in to request a new link</Link></p>
              ) : (
                <p><Link to="/login">Back to sign in</Link></p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
