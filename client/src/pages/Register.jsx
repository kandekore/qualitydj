import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';
import './Auth.css';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    weddingDate: '',
    venue: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      await register({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        weddingDate: form.weddingDate,
        venue: form.venue,
      });
      navigate('/spotify-playlist');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Create Account" description="Create your Quality Wedding DJ account." />
      <div className="auth-page">
        <div className="auth-card auth-card--wide">
          <h2>Create Your Account</h2>
          <p className="auth-subtitle">Tell me about your big day</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="auth-row">
              <div className="auth-field">
                <label htmlFor="name">Full Name *</label>
                <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="auth-field">
                <label htmlFor="email">Email *</label>
                <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="auth-row">
              <div className="auth-field">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} />
              </div>
              <div className="auth-field">
                <label htmlFor="weddingDate">Wedding Date</label>
                <input type="date" id="weddingDate" name="weddingDate" value={form.weddingDate} onChange={handleChange} />
              </div>
            </div>
            <div className="auth-field">
              <label htmlFor="venue">Venue Name</label>
              <input type="text" id="venue" name="venue" value={form.venue} onChange={handleChange} />
            </div>
            <div className="auth-row">
              <div className="auth-field">
                <label htmlFor="password">Password *</label>
                <input type="password" id="password" name="password" value={form.password} onChange={handleChange} required />
              </div>
              <div className="auth-field">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <input type="password" id="confirmPassword" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
              </div>
            </div>
            <button type="submit" className="btn btn--primary auth-submit" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </>
  );
}
