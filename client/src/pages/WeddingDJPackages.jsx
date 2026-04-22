import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';

const packages = [
  {
    name: 'Evening Only Party',
    tagline: 'Up to five hours of evening celebration',
    desc: "Perfect for couples whose ceremony and wedding breakfast music is handled by the venue, a live band, or another arrangement — and who want a professional DJ to take over for the evening reception.",
    items: [
      'High-quality Electro-Voice sound system',
      'Live DJ performance up to 5 hours',
      'Bespoke playlist planning & consultation',
      'Elegant white or rustic DJ booth',
      'Atmospheric dancefloor lighting (20+ fixtures)',
      'Wireless microphone for any evening announcements',
      'Full backup equipment for peace of mind',
    ],
  },
  {
    name: 'All-Day Wraparound',
    tagline: 'Ceremony to last dance',
    desc: 'My most popular package. Complete musical coverage from the moment your first guest arrives to the final song of the night — one consistent setup, one consistent DJ, one seamless day.',
    items: [
      'Ceremony music (indoor or outdoor PA)',
      'Wireless Shure radio mics for vows & readings',
      'Drinks reception background music',
      'Wedding breakfast soundtrack',
      'Speeches support with wireless microphones',
      'Full evening DJ entertainment',
      'Atmospheric dancefloor lighting',
      'Seamless transitions across the entire day',
    ],
    featured: true,
  },
  {
    name: 'VIP Deluxe',
    tagline: 'The full wraparound with premium upgrades',
    desc: 'Everything in the All-Day Wraparound, plus the premium visual upgrades that make key moments unforgettable. For couples who want every detail — from cocktail hour to the final dance — handled with a real wow factor.',
    items: [
      'Everything in All-Day Wraparound',
      'Venue uplighting (16 internal + 16 weatherproof external)',
      'Dry ice first dance (low-lying cloud effect)',
      'Cold spark machines for entrances & photo moments',
      'Personalised laser sign writing (names, date, custom)',
      'Extended DJ time on the night',
      'Priority colour-scheme coordination',
    ],
  },
];

export default function WeddingDJPackages() {
  return (
    <>
      <SEO
        title="Wedding DJ Packages | Evening, All-Day & VIP Deluxe"
        description="Three elegant wedding DJ packages: Evening Only (5 hours), All-Day Wraparound (ceremony to last dance), VIP Deluxe (with uplighting, dry ice, cold spark & laser sign writing)."
        keyword="wedding DJ packages, all day wedding DJ, wedding DJ pricing, VIP wedding DJ"
      />

      <section className="page-hero">
        <img
          src="/assets/images/adobe/adobestock_1948374433.webp"
          alt="Wedding DJ packages"
          className="page-hero__bg"
        />
        <div className="page-hero__overlay" />
        <div className="page-hero__content">
          <h1>Three Elegant Wedding DJ Packages</h1>
          <div className="divider" style={{ background: 'rgba(255,255,255,0.4)' }} />
          <p>Elegant solutions for every detail of your big day.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Find the Right Fit for Your Day</h2>
              <div className="divider" />
              <p>
                Every wedding is different. My three packages are designed to cover the most
                common shapes a wedding day takes — and each one can be tailored further in
                conversation. Transparent, flexible, and centred entirely on what you actually
                need.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid--3 dj__packages">
            {packages.map((pkg, i) => (
              <ScrollReveal key={i}>
                <div className={`dj__package ${pkg.featured ? 'dj__package--featured' : ''}`}>
                  {pkg.featured && <span className="dj__package-badge">Most Popular</span>}
                  <h3>{pkg.name}</h3>
                  <p className="dj__package-desc" style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
                    {pkg.tagline}
                  </p>
                  <p>{pkg.desc}</p>
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

      {/* What's included in all packages */}
      <section className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Included in Every Package</h2>
              <div className="divider" />
              <p>
                No matter which package you choose, every wedding is backed by the same commitment
                to craft, communication, and care.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid--3">
            {[
              { title: 'One Dedicated DJ', desc: 'You work directly with Jan Blazak from initial enquiry to delivery. No agencies, no substitutes, no uncertainty.' },
              { title: 'Live Mixing', desc: 'All music mixed live — never a pre-set playlist. The evening adapts to your guests in real time.' },
              { title: 'Bespoke Playlist Planning', desc: 'Thoughtful consultation to shape your must-play, favourite genres, and do-not-play lists.' },
              { title: 'Premium Electro-Voice Sound', desc: 'Crystal-clear audio at every volume, calibrated for your venue and your guests.' },
              { title: 'Full Backup Equipment', desc: 'Spares of everything on the night. Every base and eventuality covered.' },
              { title: '20,000+ Song Library', desc: 'Downloaded and tested in advance, with access to millions more online if needed. Last-minute changes welcomed.' },
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

      {/* Couples I work with — diverse imagery, different combo from About/Testimonials */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Built around every couple</h2>
              <div className="divider" />
              <p>
                These packages flex around you. Whoever you are, whoever you love, and however you
                want your day to feel, the music plan starts with the conversation we have.
              </p>
            </div>
          </ScrollReveal>
          <div className="gallery-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {[
              { src: '/assets/images/adobe/adobestock_1841384988.webp', alt: 'Two brides at golden hour', tag: 'Love is love' },
              { src: '/assets/images/adobe/adobestock_762134491.webp', alt: 'Black bride and groom celebrating', tag: 'Joyful first dance' },
              { src: '/assets/images/adobe/adobestock_1966018059.webp', alt: 'Two grooms at a floral arch', tag: 'Two grooms' },
              { src: '/assets/images/white-rig-square.webp', alt: 'Elegant white DJ booth with Mr & Mrs facade', tag: 'Elegant white setup' },
              { src: '/assets/images/gallery-first-dance.webp', alt: 'Bride and groom sharing their first dance', tag: 'First dance' },
              { src: '/assets/images/adobe/adobestock_137506782.webp', alt: 'Couple sharing their first dance', tag: 'First dance' },
            ].map((img, i) => (
              <ScrollReveal key={i}>
                <div className="gallery-card">
                  <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
                  <div className="gallery-card__overlay">
                    <h3>{img.tag}</h3>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ position: 'relative', padding: '6rem 0', overflow: 'hidden' }}>
        <video
          src="/assets/videos/rusticvid.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(42, 31, 22, 0.7)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal className="home__cta-center">
            <h2 style={{ color: 'var(--color-white)', marginBottom: '1.5rem', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
              Not Sure Which Package Fits?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Every couple is different. Get in touch for a no-pressure consultation and I'll
              help you work out exactly what you need.
            </p>
            <Link to="/contact-us" className="btn btn--outline">
              Request a Consultation
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
