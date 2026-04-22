import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';
import './Auth.css';

export default function RegisterSuccess() {
  const [params] = useSearchParams();
  const email = params.get('email') || '';
  const { resendVerification } = useAuth();
  const [status, setStatus] = useState('');

  const handleResend = async () => {
    setStatus('Sending…');
    try {
      await resendVerification(email);
      setStatus('Verification link sent. Check your inbox (and spam).');
    } catch (err) {
      setStatus(err.message);
    }
  };

  return (
    <>
      <SEO title="Check Your Email" description="Confirm your email address to activate your account." noindex />
      <div className="auth-page">
        <div className="auth-card">
          <h2>Check your email</h2>
          <p className="auth-subtitle">
            {email
              ? <>I've sent a confirmation link to <strong>{email}</strong>.</>
              : <>I've sent a confirmation link to your email address.</>}
          </p>
          <p style={{ color: '#555', marginBottom: '1.5rem' }}>
            Click the link in that email to activate your account. The link expires in 24 hours.
          </p>

          {email && (
            <button type="button" className="btn btn--outline" onClick={handleResend} style={{ marginBottom: '1rem' }}>
              Resend verification link
            </button>
          )}
          {status && <p style={{ color: '#666', fontSize: '0.9rem' }}>{status}</p>}

          <p className="auth-switch" style={{ marginTop: '1.5rem' }}>
            Already verified? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </>
  );
}
