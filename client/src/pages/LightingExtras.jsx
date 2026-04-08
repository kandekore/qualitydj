import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';

const services = [
  {
    title: 'Venue Uplighting',
    desc: 'Transform your venue with colour-matched lighting that complements your decor and transitions beautifully from day to night.',
  },
  {
    title: 'Laser Sign Writing',
    desc: 'Personalised laser projections displaying names, dates, or messages such as Mr & Mrs or Just Married — a modern alternative to traditional signage.',
  },
  {
    title: 'Dry Ice First Dance',
    desc: 'A low-lying cloud effect that creates a magical first dance without fogging the room or triggering alarms.',
  },
  {
    title: 'Cold Spark Machines',
    desc: 'Stunning spark fountains without heat, smoke, or open flames. Safe for indoor use and accepted by most wedding venues. Up to 10 units available.',
  },
  {
    title: 'Enhanced Dancefloor Lighting',
    desc: 'Colour-matched ambient and dancefloor lighting that enhances the atmosphere and maintains the perfect ambiance throughout your event.',
  },
  {
    title: 'Extra DJ Time',
    desc: 'Extend your evening naturally without watching the clock. Keep the celebration going as long as you wish.',
  },
];

export default function LightingExtras() {
  return (
    <>
      <SEO
        title="Wedding Lighting & Extras | Transform Your Venue"
        description="Enhance your wedding with bespoke lighting and magical extras. Create unforgettable moments with our professional, venue-friendly services."
        keyword="wedding lighting and extras"
      />

      <section className="page-hero">
        <img
          src="/assets/images/lighting-extras/TYGZ4120-1280x1000.jpg"
          alt="Wedding lighting"
          className="page-hero__bg"
        />
        <div className="page-hero__overlay" />
        <div className="page-hero__content">
          <h1>Illuminate Your Wedding Day</h1>
          <div className="divider" style={{ background: 'rgba(255,255,255,0.4)' }} />
          <p>Transform your venue into a magical setting with our bespoke lighting and extras.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Transformative Wedding Lighting & Enhancements</h2>
              <div className="divider" />
              <p>
                We understand that the right lighting can elevate your wedding from beautiful to
                breathtaking. Our bespoke lighting solutions are tailored to complement the
                elegance of your venue.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid--3">
            {services.map((s, i) => (
              <ScrollReveal key={i}>
                <div className="feature-card">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Standalone Services</h2>
              <div className="divider" />
              <p>
                Many of our services are available independently — perfect for couples using
                live bands, venue DJs, or alternative entertainment. We work seamlessly with
                venues and suppliers.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid--2">
            {[
              { title: 'Seamless Integration', desc: 'Our team coordinates with your venue and other vendors, providing professional installation and support.' },
              { title: 'Safety First', desc: 'All equipment is venue-approved with full risk assessments provided. Professional operation guaranteed.' },
              { title: 'Direct Communication', desc: 'Work directly with our team for a stress-free experience, with no middlemen or agencies.' },
              { title: 'Venue-Friendly', desc: 'All enhancements are designed to work harmoniously with your venue\'s aesthetics and logistics.' },
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

      <section className="section section--dark">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Ready to Transform Your Venue?</h2>
              <div className="divider" style={{ background: 'rgba(255,255,255,0.3)' }} />
              <p style={{ color: 'rgba(255,255,255,0.8)' }}>
                Contact us today to discuss how our lighting and extras can make your wedding
                day extraordinary.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal className="home__cta-center">
            <Link to="/contact-us" className="btn btn--outline">
              Discover Our Lighting Magic
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
