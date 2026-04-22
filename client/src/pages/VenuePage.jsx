import { useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import { getVenueBySlug } from '../data/venues';
import {
  getVenueContentBlocks,
  getLocationFAQs,
  getTestimonial,
  getCoupleImages,
  getCoupleImage,
  getVenueHero,
  getWhyBookCopy,
} from '../lib/locationTemplates';

const SITE_URL = 'https://qualityweddingdj.co.uk';
const HERO_VIDEO = '/assets/videos/freecompress-castle2-1-v2.mp4';
const RUSTIC_VIDEO = '/assets/videos/rusticvid.mp4';
const BANNER_VIDEO = '/assets/videos/119431_img-2693-172838102348671-v2.mp4';

function useLazyVideo(ref) {
  useEffect(() => {
    const video = ref.current;
    if (!video) return undefined;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src && video.dataset.src) video.src = video.dataset.src;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(video);
    return () => obs.disconnect();
  }, [ref]);
}

export default function VenuePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const venue = getVenueBySlug(slug);

  const heroVideoRef = useRef(null);
  const ctaVideoRef = useRef(null);
  const finalVideoRef = useRef(null);
  useLazyVideo(ctaVideoRef);
  useLazyVideo(finalVideoRef);

  useEffect(() => {
    const v = heroVideoRef.current;
    if (v) v.play().catch(() => {});
  }, [slug]);

  useEffect(() => {
    if (!venue) navigate('/', { replace: true });
  }, [venue, navigate]);

  if (!venue) return null;

  const blocks = getVenueContentBlocks(venue);
  const faqs = getLocationFAQs(venue.slug, venue.name, venue.county);
  const testimonial = getTestimonial(venue.slug);
  const coupleGallery = getCoupleImages(venue.slug, 6);
  const testimonialCouple = getCoupleImage(venue.slug, 1);
  const hero = getVenueHero(venue);
  const whyBook = getWhyBookCopy(venue.slug, venue.name);
  const canonical = `${SITE_URL}/wedding-dj/venues/${venue.slug}`;
  const heroPoster = venue.heroImage || '/assets/images/gallery-castle-party.webp';
  const ogImage = `${SITE_URL}${heroPoster}`;

  // Tailor the booth callouts based on style
  const recommendedBoothImg =
    venue.bestSetup === 'rustic'
      ? '/assets/images/gallery-rustic-setup.webp'
      : '/assets/images/white-rig-square.webp';
  const splitImg = venue.bestSetup === 'rustic' ? '/assets/images/gallery-rustic-setup.webp' : '/assets/images/SIPX2521-wide.webp';

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

      {/* Deep video hero */}
      <section
        style={{
          position: 'relative',
          height: '78vh',
          minHeight: '620px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          overflow: 'hidden',
          color: 'var(--color-white)',
        }}
      >
        <video
          ref={heroVideoRef}
          src={HERO_VIDEO}
          poster={heroPoster}
          muted
          loop
          playsInline
          preload="auto"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(20,15,10,0.55) 0%, rgba(20,15,10,0.75) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px', padding: '0 2rem' }}>
          <p style={{ letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.85rem', opacity: 0.85, marginBottom: '1rem' }}>
            {hero.eyebrow}
          </p>
          <h1 style={{ color: 'var(--color-white)', fontSize: 'clamp(2.4rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>
            Wedding DJ at {venue.name}
          </h1>
          <div className="divider" style={{ background: 'rgba(255,255,255,0.4)', margin: '0 auto 1.5rem' }} />
          <p style={{ fontSize: '1.2rem', maxWidth: '680px', margin: '0 auto 2.5rem', opacity: 0.95 }}>
            {hero.subhead}
          </p>
          <div className="hero__buttons" style={{ justifyContent: 'center' }}>
            <Link to="/contact-us" className="btn btn--accent">Check Your Date</Link>
            <Link to="/wedding-dj-packages" className="btn btn--outline">View Packages</Link>
          </div>
        </div>
      </section>

      {/* Stats row */}
      <section style={{ background: 'var(--color-white)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="container" style={{ padding: '2.5rem 1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
            {[
              { n: '15+', l: 'Years experience' },
              { n: '250+', l: 'Weddings delivered' },
              { n: '100%', l: 'Live mixed, never queued' },
              { n: '5★', l: 'Average couple rating' },
            ].map((s) => (
              <div key={s.l}>
                <div style={{ fontSize: '2.4rem', fontWeight: 700, color: 'var(--color-primary)', lineHeight: 1 }}>{s.n}</div>
                <div style={{ marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.8rem', opacity: 0.7 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USP-first split */}
      <section className="section">
        <div className="container">
          <div className="grid grid--2 installation__grid">
            <ScrollReveal>
              <div className="installation__image">
                <img
                  src={splitImg}
                  alt={`${venue.bestSetup === 'rustic' ? 'Rustic' : 'White'} DJ setup for ${venue.name}`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="installation__text">
                <span className="section-tag">{whyBook.tag}</span>
                <h2>{whyBook.headline}</h2>
                <div className="divider" style={{ margin: '1.5rem 0' }} />
                {whyBook.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                <Link to="/about-us" className="btn btn--primary">Meet Your DJ</Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div className="services-header">
              <div className="services-header__left">
                <span className="section-tag">What's Included</span>
                <h2>Premium kit, elegant setup, every detail handled.</h2>
              </div>
              <Link to="/dj-services" className="btn btn--primary">All Services</Link>
            </div>
          </ScrollReveal>
          <div className="grid grid--3 services-grid">
            {[
              { title: 'Premium Sound', desc: 'Electro-Voice Evolve & Everse speakers, EKX-18 subs, Shure radio mics, full backup kit — all sized to your room.' },
              { title: 'Atmospheric Lighting', desc: 'Dancefloor lighting that builds with the room. Subtle, stylish, never overwhelming. Venue-friendly as standard.' },
              { title: 'Live DJ Mixing', desc: 'Every track mixed live. No automated playlists. The flow that actually fills a dancefloor and keeps it full.' },
              { title: venue.bestSetup === 'rustic' ? 'Rustic DJ Booth' : venue.bestSetup === 'castle' ? 'Elegant DJ Booth' : 'Two Booth Styles', desc: venue.bestSetup === 'rustic' ? 'Warm wood booth with illuminated heart — natural fit for period and country settings.' : venue.bestSetup === 'castle' ? 'Clean white booth that complements stately interiors and keeps sightlines clean.' : 'Choose between clean white or warm rustic — both designed to flatter the venue.' },
              { title: 'Direct Communication', desc: 'You work with me from enquiry to last dance. No agencies, no substitutions, no surprises on the day.' },
              { title: 'Stress-Free Planning', desc: 'A clear, calm planning process. Must-plays, do-not-plays, timings, all locked in well before the day.' },
            ].map((s) => (
              <ScrollReveal key={s.title}>
                <div className="service-card">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <Link to="/contact-us" className="btn btn--primary service-card__btn">Get In Touch</Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Two booth styles showcase */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="section-tag">Two Setups, One Standard</span>
              <h2>The right booth style for {venue.name}</h2>
              <div className="divider" style={{ margin: '1.5rem auto' }} />
              {venue.bestSetup && (
                <p style={{ maxWidth: '640px', margin: '0 auto' }}>
                  For {venue.name} I usually recommend the {venue.bestSetup === 'rustic' ? 'rustic' : 'clean white'} booth — but the choice is always yours.
                </p>
              )}
            </div>
          </ScrollReveal>
          <div className="grid grid--2">
            <ScrollReveal>
              <div className="gallery-card" style={{ display: 'block' }}>
                <img src="/assets/images/white-rig-square.webp" alt="Elegant white DJ booth setup" loading="lazy" decoding="async" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
                <div style={{ padding: '1.75rem', background: 'var(--color-white)' }}>
                  <h3 style={{ marginBottom: '0.75rem' }}>Elegant White Setup</h3>
                  <p style={{ marginBottom: '1.25rem' }}>
                    Clean lines, integrated lighting, optional Mr &amp; Mrs façade. A natural fit for hotels,
                    castles, country houses and modern venues.
                  </p>
                  <Link to="/dj-services" className="btn btn--outline">See Setup Details</Link>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="gallery-card" style={{ display: 'block' }}>
                <img src="/assets/images/gallery-rustic-setup.webp" alt="Rustic wood DJ booth with illuminated heart" loading="lazy" decoding="async" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
                <div style={{ padding: '1.75rem', background: 'var(--color-white)' }}>
                  <h3 style={{ marginBottom: '0.75rem' }}>Warm Rustic Setup</h3>
                  <p style={{ marginBottom: '1.25rem' }}>
                    Warm wood, illuminated heart and a tactile, country feel. Built for barns, marquees,
                    farm venues and outdoor weddings.
                  </p>
                  <Link to="/dj-services" className="btn btn--outline">See Setup Details</Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Video CTA — rusticvid background */}
      <section style={{ position: 'relative', padding: '6rem 0', overflow: 'hidden' }}>
        <video
          ref={ctaVideoRef}
          data-src={RUSTIC_VIDEO}
          muted
          loop
          playsInline
          preload="none"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(42, 31, 22, 0.7)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal className="home__cta-center">
            <h2 style={{ color: 'var(--color-white)', marginBottom: '1.5rem', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
              Booking {venue.name}?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '640px', margin: '0 auto 2rem', fontSize: '1.1rem' }}>
              Send your date and I'll come back within 24 hours with availability and an honest, no-pressure quote.
            </p>
            <div className="hero__buttons" style={{ justifyContent: 'center' }}>
              <Link to="/contact-us" className="btn btn--accent">Check Your Date</Link>
              <Link to="/lighting-extras" className="btn btn--outline">Lighting &amp; Extras</Link>
            </div>
          </ScrollReveal>
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
                <Link to="/contact-us" className="btn btn--primary" style={{ marginTop: '1rem' }}>Request a Quote</Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Real testimonial — couple image + quote split */}
      <section className="section section--alt">
        <div className="container">
          <div className="grid grid--2 installation__grid" style={{ alignItems: 'center' }}>
            <ScrollReveal>
              <div className="installation__image">
                <img src={testimonialCouple.src} alt={testimonialCouple.alt} loading="lazy" decoding="async" />
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div>
                <span className="section-tag">Real Couples</span>
                <h2>What couples say</h2>
                <div className="divider" style={{ margin: '1.5rem 0' }} />
                <p style={{ fontSize: '1.1rem', lineHeight: 1.7, fontStyle: 'italic' }}>"{testimonial.quote}"</p>
                <p style={{ marginTop: '1rem', fontWeight: 600 }}>{testimonial.couple} — Married {testimonial.date}</p>
                <Link to="/testimonials" className="btn btn--primary" style={{ marginTop: '1rem' }}>Read More Reviews</Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Couples I'm proud to play for — diverse imagery gallery */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="section-tag">Every Wedding, Every Couple</span>
              <h2>Weddings I'm proud to play for at {venue.name}</h2>
              <div className="divider" style={{ margin: '1.5rem auto' }} />
              <p style={{ maxWidth: '640px', margin: '0 auto' }}>
                Every couple deserves a music plan built around them. Whoever you are, whoever you love,
                and however you want your day at {venue.name} to feel — I've got you.
              </p>
            </div>
          </ScrollReveal>
          <div className="gallery-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {coupleGallery.map((img, i) => (
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
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <Link to="/contact-us" className="btn btn--accent">Tell Me About Your Day</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Venue facts strip — moved deeper, secondary */}
      {(venue.builtEra || venue.setting || venue.distinctiveFeatures?.length) && (
        <section className="section">
          <div className="container" style={{ maxWidth: '900px' }}>
            <ScrollReveal>
              <h3>About {venue.name}</h3>
              <div className="divider" style={{ margin: '1rem 0' }} />
              <div className="grid grid--2">
                {(venue.builtEra || venue.setting) && (
                  <div>
                    <p>{venue.builtEra}{venue.setting ? `. ${venue.setting}.` : '.'}</p>
                  </div>
                )}
                {venue.distinctiveFeatures?.length > 0 && (
                  <div>
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

      {/* FAQ */}
      <section className="section section--alt">
        <div className="container" style={{ maxWidth: '900px' }}>
          <ScrollReveal>
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="section-tag">FAQs</span>
              <h2>{venue.name} wedding DJ — frequently asked</h2>
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
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <Link to="/contact-us" className="btn btn--primary">Ask Me Anything</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final video CTA */}
      <section style={{ position: 'relative', padding: '6rem 0', overflow: 'hidden' }}>
        <video
          ref={finalVideoRef}
          data-src={BANNER_VIDEO}
          muted
          loop
          playsInline
          preload="none"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(20, 15, 10, 0.7)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <ScrollReveal>
            <h2 style={{ color: 'var(--color-white)', marginBottom: '1.5rem', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
              From planning to perfection — let me make {venue.name} seamless.
            </h2>
            <Link to="/contact-us" className="btn btn--outline" style={{ marginTop: '2rem' }}>
              Request a Consultation
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
