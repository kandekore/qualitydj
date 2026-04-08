import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import './DJServices.css';

const packages = [
  {
    name: 'Wedding Reception DJ',
    desc: 'Ideal for evening celebrations',
    items: [
      'Live DJ performance',
      'Bespoke playlist planning',
      'Professional sound system',
      'Elegant white wedding DJ setup',
      'Atmospheric dancefloor lighting',
    ],
  },
  {
    name: 'All-Day Wedding DJ',
    desc: 'Complete coverage from ceremony to last dance',
    items: [
      'Ceremony music',
      'Drinks reception background music',
      'Wireless microphones for speeches',
      'Seamless transitions throughout the day',
      'Full evening DJ entertainment',
    ],
    featured: true,
  },
];

export default function DJServices() {
  return (
    <>
      <SEO
        title="Luxury Wedding DJ Services for Exclusive Venues"
        description="Discover bespoke DJ services tailored for elegant weddings at exclusive venues. Create unforgettable musical experiences."
        keyword="luxury wedding DJ services"
      />

      <section className="page-hero">
        <img
          src="/assets/images/dj-services/IMG_2857.jpg"
          alt="DJ Services"
          className="page-hero__bg"
        />
        <div className="page-hero__overlay" />
        <div className="page-hero__content">
          <h1>Craft Your Perfect Wedding Soundtrack</h1>
          <div className="divider" style={{ background: 'rgba(255,255,255,0.4)' }} />
          <p>Experience bespoke DJ services tailored for your elegant wedding at exclusive venues.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Unforgettable Musical Experiences</h2>
              <div className="divider" />
              <p>
                At Quality Wedding DJ, we understand that music is the heartbeat of your wedding
                celebration. Our bespoke DJ services are crafted to reflect the unique personality
                of your special day.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid--2">
            <ScrollReveal>
              <div className="dj__text-block">
                <h3>Custom-Tailored Playlists</h3>
                <p>
                  Our experienced DJs work closely with you to curate playlists that resonate
                  with your taste and style. From the first note to the last dance, we ensure
                  each song is thoughtfully selected. Whether you prefer timeless classics,
                  modern hits, or an eclectic mix, our live DJ mixing adapts seamlessly
                  to the energy of the room.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="dj__text-block">
                <h3>State-of-the-Art Equipment</h3>
                <p>
                  We pride ourselves on using state-of-the-art equipment to deliver unparalleled
                  sound and lighting quality. Our premium sound systems ensure crystal-clear
                  audio, while our elegant lighting setups enhance the ambiance of your venue.
                </p>
                <ul className="dj__list">
                  <li>Premium sound systems for impeccable audio</li>
                  <li>Stylish DJ booths that complement your venue</li>
                  <li>Atmospheric lighting to elevate the experience</li>
                  <li>Optional enhancements for added wow factor</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Wedding DJ Packages</h2>
              <div className="divider" />
              <p>Flexible, transparent, and centred around what you actually need.</p>
            </div>
          </ScrollReveal>
          <div className="grid grid--2 dj__packages">
            {packages.map((pkg, i) => (
              <ScrollReveal key={i}>
                <div className={`dj__package ${pkg.featured ? 'dj__package--featured' : ''}`}>
                  {pkg.featured && <span className="dj__package-badge">Most Popular</span>}
                  <h3>{pkg.name}</h3>
                  <p className="dj__package-desc">{pkg.desc}</p>
                  <ul className="dj__package-list">
                    {pkg.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                  <Link to="/contact-us" className="btn btn--primary">
                    Enquire Now
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Music Policy */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Music Policy & Live Mixing</h2>
              <div className="divider" />
              <p>
                All music is mixed live, never played from pre-recorded sets. This allows us
                to adapt to your guests, maintain momentum, and create a natural flow.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid--3">
            {[
              { title: 'Must-Play Songs', desc: 'Share your favourite tracks and we\'ll weave them into the perfect setlist.' },
              { title: 'Favourite Genres', desc: 'Tell us your preferred styles and we\'ll craft a sound that feels authentically you.' },
              { title: 'Do-Not-Play Requests', desc: 'Your preferences are respected absolutely — no surprise genres or inappropriate content.' },
            ].map((item, i) => (
              <ScrollReveal key={i}>
                <div className="feature-card">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section--dark">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Client Testimonials</h2>
              <div className="divider" style={{ background: 'rgba(255,255,255,0.3)' }} />
            </div>
          </ScrollReveal>
          <div className="grid grid--2">
            <ScrollReveal>
              <div className="testimonial-card" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <p style={{ color: 'rgba(255,255,255,0.85)' }}>
                  "Jan and his team made our wedding day perfect. The music was incredible, and the
                  transitions were seamless. Our guests couldn't stop raving about the energy and vibe."
                </p>
                <div className="author" style={{ color: 'var(--color-accent)' }}>Sarah & Michael, Castle Howard</div>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="testimonial-card" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <p style={{ color: 'rgba(255,255,255,0.85)' }}>
                  "From our initial meeting to the big day, Let The Music Play exceeded all expectations.
                  Their attention to detail and professionalism were outstanding."
                </p>
                <div className="author" style={{ color: 'var(--color-accent)' }}>Emma & Tom, The Ritz</div>
              </div>
            </ScrollReveal>
          </div>
          <ScrollReveal className="home__cta-center">
            <Link to="/contact-us" className="btn btn--outline">
              Get in Touch
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
