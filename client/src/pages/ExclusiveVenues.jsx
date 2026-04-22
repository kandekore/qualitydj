import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';

export default function ExclusiveVenues() {
  return (
    <>
      <SEO
        title="High-End Wedding DJ for Exclusive Venues"
        description="Discover bespoke DJ services for weddings at exclusive venues. Elevate your special day with Quality Wedding DJ, where elegance meets exceptional sound."
        keyword="high-end wedding DJ for exclusive venues"
        image="/assets/images/adobe/adobestock_1841384988.webp"
        imageAlt="Brides kissing at golden hour at a luxury wedding venue"
      />

      <section className="page-hero">
        <img
          src="/assets/images/home/IMG_2907-scaled-e1770061107434-1200x675.webp"
          alt="Exclusive venue"
          className="page-hero__bg"
        />
        <div className="page-hero__overlay" />
        <div className="page-hero__content">
          <h1>Elevate Your Wedding Experience</h1>
          <div className="divider" style={{ background: 'rgba(255,255,255,0.4)' }} />
          <p>Unforgettable musical moments at exclusive venues, tailored for you.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Unmatched Elegance for Prestigious Venues</h2>
              <div className="divider" />
              <p>
                I specialise in transforming exclusive venues into vibrant celebrations of
                love and joy. Whether you're planning your dream wedding at a historic castle,
                a luxury hotel, or an upscale corporate location, my bespoke DJ services are
                designed to seamlessly blend with the grandeur of your chosen setting.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid--2">
            {[
              { title: 'State-of-the-Art Equipment', desc: 'Jan\'s sound systems provide crystal-clear audio that resonates perfectly in expansive venues.' },
              { title: 'Tailored Playlists', desc: 'Curated selections that reflect your unique taste and enhance your event\'s ambiance.' },
              { title: 'Professional Appearance', desc: 'Jan is always elegantly dressed to match the sophistication of your venue.' },
              { title: 'Seamless Coordination', desc: 'Jan works closely with venue staff to ensure flawless execution of your event.' },
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

      <section className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Venue Partnerships</h2>
              <div className="divider" />
              <p>
                I'm proud to be the preferred DJ for some of the most prestigious
                wedding venues across Worcestershire, Warwickshire, Herefordshire, and beyond.
                My deep understanding of these exceptional locations ensures I deliver a
                flawless experience every time.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid--3">
            {[
              { title: 'Castle Venues', desc: 'Historic grandeur deserves a soundtrack to match. Jan brings elegance and sophistication to castle celebrations.' },
              { title: 'Luxury Hotels', desc: 'From intimate ballrooms to grand reception halls, Jan tailors the service to each unique hotel setting.' },
              { title: 'Exclusive Estates', desc: 'Country estates and manor houses offer unique acoustics and atmospheres Jan knows how to enhance beautifully.' },
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

      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Client Testimonials</h2>
              <div className="divider" />
            </div>
          </ScrollReveal>
          <div className="grid grid--2">
            <ScrollReveal>
              <div className="testimonial-card">
                <p>
                  "Quality Wedding DJ transformed our wedding at a luxury hotel into a spectacular
                  event. The playlist was spot on, and the DJ's professionalism was unmatched."
                </p>
                <div className="author">Sarah & John</div>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="testimonial-card">
                <p>
                  "Our castle wedding was a fairy tale, thanks to the incredible music and
                  atmosphere created by Quality Wedding DJ. We couldn't have asked for more."
                </p>
                <div className="author">Emily & Mark</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <ScrollReveal className="home__cta-center">
            <h2 style={{ color: 'var(--color-white)', marginBottom: '1rem' }}>
              Create Your Unique Wedding Soundtrack
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Every couple has a unique love story, and I believe your wedding soundtrack
              should reflect that.
            </p>
            <Link to="/contact-us" className="btn btn--outline">
              Enquire About Your Venue
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
