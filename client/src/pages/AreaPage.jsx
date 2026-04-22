import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import { getAreaBySlug } from '../data/areas';
import { getVenueBySlug } from '../data/venues';
import { getAreaContentBlocks, getLocationFAQs } from '../lib/locationTemplates';

const SITE_URL = 'https://qualityweddingdj.co.uk';

export default function AreaPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const area = getAreaBySlug(slug);

  useEffect(() => {
    if (!area) navigate('/', { replace: true });
  }, [area, navigate]);

  if (!area) return null;

  const blocks = getAreaContentBlocks(area);
  const faqs = getLocationFAQs(area.slug, area.name, area.county);
  const canonical = `${SITE_URL}/wedding-dj/${area.slug}`;
  const heroImage = area.heroImage || '/assets/images/gallery-castle-party.webp';
  const ogImage = `${SITE_URL}${heroImage}`;
  const nearbyVenues = (area.nearbyVenues || [])
    .map((s) => getVenueBySlug(s))
    .filter(Boolean);

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${canonical}#business`,
    name: 'Quality Wedding DJ',
    description: `Wedding DJ services in ${area.name}, ${area.county} by Jan Blazak. Live mixing, premium Electro-Voice sound, atmospheric lighting, and elegant DJ setups.`,
    url: canonical,
    image: ogImage,
    areaServed: {
      '@type': 'City',
      name: area.name,
      containedInPlace: { '@type': 'AdministrativeArea', name: area.county },
    },
    serviceType: 'Wedding DJ Services',
    priceRange: '£££',
    founder: { '@type': 'Person', name: 'Jan Blazak' },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <SEO
        title={`Wedding DJ ${area.name} | Live-Mix Wedding DJ in ${area.county}`}
        description={`Wedding DJ in ${area.name}, ${area.county}. Jan Blazak — 250+ weddings, 15+ years, every track mixed live. Premium sound, atmospheric lighting, elegant setups. Get in touch.`}
        keyword={`wedding DJ ${area.name}, ${area.name} wedding DJ, wedding DJ ${area.county}`}
        image={ogImage}
        canonical={canonical}
      />

      <Helmet>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <section className="page-hero">
        <img src={heroImage} alt={`Wedding DJ in ${area.name}`} className="page-hero__bg" />
        <div className="page-hero__overlay" />
        <div className="page-hero__content">
          <h1>Wedding DJ in {area.name}</h1>
          <div className="divider" style={{ background: 'rgba(255,255,255,0.4)' }} />
          <p>Live-mixed wedding DJ for {area.county} couples. Premium sound, elegant setups, every booking personally handled by Jan Blazak.</p>
          <div className="hero__buttons" style={{ marginTop: '2rem' }}>
            <Link to="/contact-us" className="btn btn--accent">Check Your Date</Link>
            <Link to="/wedding-dj-packages" className="btn btn--outline">View Packages</Link>
          </div>
        </div>
      </section>

      {/* Main copy blocks */}
      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          {blocks.map((block, i) => (
            <ScrollReveal key={i}>
              <div style={{ marginBottom: '3.5rem' }}>
                <h2>{block.heading}</h2>
                <div className="divider" style={{ margin: '1.5rem 0' }} />
                {block.body.split('\n\n').map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="section section--alt">
        <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
          <ScrollReveal>
            <h2>Planning a wedding in {area.name}?</h2>
            <div className="divider" style={{ margin: '1.5rem auto' }} />
            <p>Send your date and venue and I'll come back within 24 hours with availability and a quote.</p>
            <div className="hero__buttons" style={{ justifyContent: 'center', marginTop: '2rem' }}>
              <Link to="/contact-us" className="btn btn--primary">Get In Touch</Link>
              <Link to="/real-weddings" className="btn btn--outline">See Real Weddings</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* What's included */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2>What's included as standard for {area.name} weddings</h2>
              <div className="divider" style={{ margin: '1.5rem auto' }} />
            </div>
          </ScrollReveal>
          <div className="grid grid--3">
            {[
              { title: 'Premium Sound', desc: 'Electro-Voice Evolve and Everse speakers, EKX-18 subs, Shure radio mics, full backup kit.' },
              { title: 'Atmospheric Lighting', desc: 'Dancefloor lighting that builds with the energy of the room — never overwhelming, always venue-friendly.' },
              { title: 'Live DJ Mixing', desc: 'No playlists, no automated transitions. Every track mixed live, adapted to your guests in real time.' },
              { title: 'Elegant DJ Booth', desc: 'Choose between clean white or warm rustic styling, both designed to flatter the room and stay out of photos.' },
              { title: 'Direct Communication', desc: 'You work with me from enquiry to last dance. No agencies, no substitutions, no surprises.' },
              { title: 'Stress-Free Planning', desc: 'A clear, calm planning process — must-plays, do-not-plays, timings, all locked in well before the day.' },
            ].map((item, i) => (
              <ScrollReveal key={i}>
                <div className="service-card">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby venues */}
      {nearbyVenues.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <ScrollReveal>
              <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2>Wedding venues I cover near {area.name}</h2>
                <div className="divider" style={{ margin: '1.5rem auto' }} />
              </div>
            </ScrollReveal>
            <div className="grid grid--3">
              {nearbyVenues.map((v) => (
                <ScrollReveal key={v.slug}>
                  <Link to={`/wedding-dj/venues/${v.slug}`} className="gallery-card" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                    <img src={v.heroImage} alt={v.name} loading="lazy" decoding="async" style={{ width: '100%', aspectRatio: '3/2', objectFit: 'cover' }} />
                    <div style={{ padding: '1.5rem', background: 'var(--color-white)' }}>
                      <h3 style={{ marginBottom: '0.5rem' }}>{v.name}</h3>
                      <p style={{ marginBottom: 0 }}>{v.town}, {v.county}</p>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <ScrollReveal>
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2>{area.name} wedding DJ — FAQs</h2>
              <div className="divider" style={{ margin: '1.5rem auto' }} />
            </div>
          </ScrollReveal>
          {faqs.map((f, i) => (
            <ScrollReveal key={i}>
              <div style={{ marginBottom: '2rem' }}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="section section--alt">
        <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
          <ScrollReveal>
            <h2>Ready to lock in your {area.name} wedding DJ?</h2>
            <div className="divider" style={{ margin: '1.5rem auto' }} />
            <p>Send through your date, venue, and a few words about the day you're planning.</p>
            <div className="hero__buttons" style={{ justifyContent: 'center', marginTop: '2rem' }}>
              <Link to="/contact-us" className="btn btn--accent">Request a Consultation</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
