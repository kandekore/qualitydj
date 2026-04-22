import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import { getVenueBySlug } from '../data/venues';
import { getVenueContentBlocks, getLocationFAQs } from '../lib/locationTemplates';

const SITE_URL = 'https://qualityweddingdj.co.uk';

export default function VenuePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const venue = getVenueBySlug(slug);

  useEffect(() => {
    if (!venue) navigate('/', { replace: true });
  }, [venue, navigate]);

  if (!venue) return null;

  const blocks = getVenueContentBlocks(venue);
  const faqs = getLocationFAQs(venue.slug, venue.name, venue.county);
  const canonical = `${SITE_URL}/wedding-dj/venues/${venue.slug}`;
  const heroImage = venue.heroImage || '/assets/images/gallery-castle-party.webp';
  const ogImage = `${SITE_URL}${heroImage}`;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Wedding DJ Services',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Quality Wedding DJ',
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'Place',
      name: venue.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: venue.town,
        addressRegion: venue.county,
        postalCode: venue.postcode,
        addressCountry: 'GB',
      },
    },
    description: `Wedding DJ services at ${venue.name}, ${venue.town}, by Jan Blazak. Live mixing, premium Electro-Voice sound, atmospheric lighting, and elegant DJ setups.`,
    url: canonical,
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
        title={`Wedding DJ ${venue.name} | ${venue.town}, ${venue.county}`}
        description={`Wedding DJ at ${venue.name}, ${venue.town}. Jan Blazak — live mixing, premium sound, atmospheric lighting, and a setup tailored to ${venue.name}'s style.`}
        keyword={`wedding DJ ${venue.name}, ${venue.name} wedding DJ, wedding DJ ${venue.town}`}
        image={ogImage}
        canonical={canonical}
      />

      <Helmet>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <section className="page-hero">
        <img src={heroImage} alt={`Wedding DJ at ${venue.name}`} className="page-hero__bg" />
        <div className="page-hero__overlay" />
        <div className="page-hero__content">
          <h1>Wedding DJ at {venue.name}</h1>
          <div className="divider" style={{ background: 'rgba(255,255,255,0.4)' }} />
          <p>{venue.town}, {venue.county}{venue.postcode ? ` · ${venue.postcode}` : ''}</p>
          <div className="hero__buttons" style={{ marginTop: '2rem' }}>
            <Link to="/contact-us" className="btn btn--accent">Check Your Date</Link>
            <Link to="/wedding-dj-packages" className="btn btn--outline">View Packages</Link>
          </div>
        </div>
      </section>

      {/* Venue facts strip */}
      {(venue.builtEra || venue.setting || venue.distinctiveFeatures?.length) && (
        <section className="section section--alt">
          <div className="container" style={{ maxWidth: '900px' }}>
            <ScrollReveal>
              <div className="grid grid--2">
                {venue.builtEra && (
                  <div>
                    <h3 style={{ fontSize: '1.1rem' }}>About the venue</h3>
                    <p>{venue.builtEra}{venue.setting ? `. ${venue.setting}.` : '.'}</p>
                  </div>
                )}
                {venue.distinctiveFeatures?.length > 0 && (
                  <div>
                    <h3 style={{ fontSize: '1.1rem' }}>Distinctive features</h3>
                    <ul style={{ paddingLeft: '1.25rem' }}>
                      {venue.distinctiveFeatures.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

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
            <h2>Booking {venue.name}?</h2>
            <div className="divider" style={{ margin: '1.5rem auto' }} />
            <p>Send your date and I'll come back within 24 hours with availability and a quote.</p>
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
              <h2>What's included for {venue.name} weddings</h2>
              <div className="divider" style={{ margin: '1.5rem auto' }} />
            </div>
          </ScrollReveal>
          <div className="grid grid--3">
            {[
              { title: 'Premium Sound', desc: 'Electro-Voice Evolve and Everse speakers, EKX-18 subs, Shure radio mics, full backup kit.' },
              { title: 'Atmospheric Lighting', desc: 'Dancefloor lighting that builds with the energy of the room — venue-friendly and discreet.' },
              { title: 'Live DJ Mixing', desc: 'No playlists, no automated transitions. Every track mixed live, adapted to your guests in real time.' },
              { title: venue.bestSetup === 'rustic' ? 'Rustic DJ Booth' : venue.bestSetup === 'castle' ? 'Elegant DJ Booth' : 'Choice of DJ Booth', desc: venue.bestSetup === 'rustic' ? 'Warm wood booth with illuminated heart — natural fit for period and country settings.' : venue.bestSetup === 'castle' ? 'Clean white booth that complements stately interiors and keeps sightlines elegant.' : 'Choose between clean white or warm rustic, both designed to flatter the room.' },
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

      {/* FAQ */}
      <section className="section section--alt">
        <div className="container" style={{ maxWidth: '900px' }}>
          <ScrollReveal>
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2>{venue.name} wedding DJ — FAQs</h2>
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
      <section className="section">
        <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
          <ScrollReveal>
            <h2>Lock in your wedding DJ for {venue.name}</h2>
            <div className="divider" style={{ margin: '1.5rem auto' }} />
            <p>Send through your date and a few words about the day you're planning.</p>
            <div className="hero__buttons" style={{ justifyContent: 'center', marginTop: '2rem' }}>
              <Link to="/contact-us" className="btn btn--accent">Request a Consultation</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
