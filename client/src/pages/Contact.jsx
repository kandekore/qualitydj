import { useState } from 'react';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import './Contact.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    venue: '',
    date: '',
    message: '',
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', venue: '', date: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Quality Wedding DJ | High-End Wedding DJ Services"
        description="Reach out to Quality Wedding DJ for premium, bespoke DJ services. Let's make your high-end wedding unforgettable. Contact us now!"
        keyword="high-end wedding DJ"
      />

      <section className="page-hero">
        <img
          src="/assets/images/IMG_2694-768x1200.jpg"
          alt="Contact us"
          className="page-hero__bg"
        />
        <div className="page-hero__overlay" />
        <div className="page-hero__content">
          <h1>Let's Create Your Perfect Day</h1>
          <div className="divider" style={{ background: 'rgba(255,255,255,0.4)' }} />
          <p>Get in touch to discover how we can elevate your wedding with our bespoke DJ services.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact__grid">
            <ScrollReveal>
              <div className="contact__info">
                <h2>Connect with Our Expert Team</h2>
                <div className="divider" style={{ margin: '1.5rem 0' }} />
                <p>
                  At Quality Wedding DJ, we understand that your wedding day should be nothing
                  short of spectacular. Our team is dedicated to crafting a musical experience
                  that perfectly complements the sophistication of your venue.
                </p>

                <div className="contact__details">
                  <h3>Why Choose Quality Wedding DJ?</h3>
                  <ul>
                    <li>Unparalleled Sound and Lighting</li>
                    <li>Professional and Polished Appearance</li>
                    <li>Seamless Coordination with Your Venue</li>
                    <li>Personalised Playlists</li>
                    <li>Exclusivity and Sophistication</li>
                  </ul>
                </div>

                <div className="contact__details">
                  <h3>Get in Touch</h3>
                  <p>We look forward to discussing your needs and how we can make your dream wedding a reality.</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <form className="contact__form" onSubmit={handleSubmit}>
                <h3>Request a Consultation</h3>
                <div className="contact__form-grid">
                  <div className="contact__field">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="contact__field">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="contact__field">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="contact__field">
                    <label htmlFor="date">Wedding Date</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="contact__field">
                  <label htmlFor="venue">Venue Name</label>
                  <input
                    type="text"
                    id="venue"
                    name="venue"
                    value={form.venue}
                    onChange={handleChange}
                  />
                </div>
                <div className="contact__field">
                  <label htmlFor="message">Tell Us About Your Day *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn--primary" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Enquiry'}
                </button>

                {status === 'success' && (
                  <div className="contact__status contact__status--success">
                    Thank you for your enquiry. We'll be in touch shortly.
                  </div>
                )}
                {status === 'error' && (
                  <div className="contact__status contact__status--error">
                    Something went wrong. Please try again or contact us directly.
                  </div>
                )}
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
