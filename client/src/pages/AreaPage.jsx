import { useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import { getAreaBySlug } from '../data/areas';
import { getVenueBySlug } from '../data/venues';
import {
  getAreaContentBlocks,
  getLocationFAQs,
  getTestimonial,
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

export default function AreaPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const area = getAreaBySlug(slug);

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
    if (!area) navigate('/', { replace: true });
  }, [area, navigate]);

  if (!area) return null;

  const blocks = getAreaContentBlocks(area);
  const faqs = getLocationFAQs(area.slug, area.name, area.county);
  const testimonial = getTestimonial(area.slug);
  const canonical = `${SITE_URL}/wedding-dj/${area.slug}`;
  const heroPoster = area.heroImage || '/assets/images/gallery-castle-party.webp';
  const ogImage = `${SITE_URL}${heroPoster}`;
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
            Wedding DJ · {area.county}
          </p>
          <h1 style={{ color: 'var(--color-white)', fontSize: 'clamp(2.4rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>
            Wedding DJ in {area.name}
          </h1>
          <div className="divider" style={{ background: 'rgba(255,255,255,0.4)', margin: '0 auto 1.5rem' }} />
          <p style={{ fontSize: '1.2rem', maxWidth: '680px', margin: '0 auto 2.5rem', opacity: 0.95 }}>
            Bespoke, live-mixed wedding DJ services. Premium Electro-Voice sound, atmospheric lighting,
            and elegant setups — every booking personally handled by Jan Blazak.
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

      {/* USP-first split — Jan + rig photo */}
      <section className="section">
        <div className="container">
          <div className="grid grid--2 installation__grid">
            <ScrollReveal>
              <div className="installation__image">
                <img
                  src="/assets/images/SIPX2521-wide.webp"
                  alt={`Premium white DJ installation for ${area.name} weddings`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="installation__text">
                <span className="section-tag">Why book me</span>
                <h2>Bespoke wedding DJ services for {area.name} couples</h2>
                <div className="divider" style={{ margin: '1.5rem 0' }} />
                <p>
                  I'm Jan Blazak, a full-time wedding DJ. Every track of every wedding is mixed live,
                  every booking is planned with you directly, and every detail of the kit is venue-friendly
                  and fully backed up.
                </p>
                <p>
                  No agencies, no substitute DJs, no off-the-shelf playlists — just one experienced wedding
                  specialist focused entirely on your day.
                </p>
                <Link to="/about-us" className="btn btn--primary">Meet Your DJ</Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* What's included — 6 USP cards */}
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
              { title: 'Two Booth Styles', desc: 'Choose between clean white or warm rustic — both designed to flatter the venue and stay out of the photos.' },
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
              <h2>White or rustic — designed to suit your {area.name} venue</h2>
              <div className="divider" style={{ margin: '1.5rem auto' }} />
            </div>
          </ScrollReveal>
          <div className="grid grid--2">
            <ScrollReveal>
              <div className="gallery-card" style={{ display: 'block' }}>
                <img src="/assets/images/white-rig-square.webp" alt="Elegant white DJ booth setup" loading="lazy" decoding="async" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
                <div style={{ padding: '1.75rem', background: 'var(--color-white)' }}>
                  <h3 style={{ marginBottom: '0.75rem' }}>Elegant White Setup</h3>
                  <p style={{ marginBottom: '1.25rem' }}>
                    Clean lines, integrated lighting, and a Mr &amp; Mrs façade option. A natural fit for hotels,
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
              Planning a wedding in {area.name}?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '640px', margin: '0 auto 2rem', fontSize: '1.1rem' }}>
              Send your date and venue and I'll come back within 24 hours with availability and an honest,
              no-pressure quote.
            </p>
            <div className="hero__buttons" style={{ justifyContent: 'center' }}>
              <Link to="/contact-us" className="btn btn--accent">Check Your Date</Link>
              <Link to="/lighting-extras" className="btn btn--outline">Lighting &amp; Extras</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Main copy blocks (USP-led, hash-rotated) */}
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

      {/* Real testimonial card */}
      <section className="section section--alt">
        <div className="container" style={{ maxWidth: '800px' }}>
          <ScrollReveal>
            <div className="testimonial-card" style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '1.15rem', lineHeight: 1.7 }}>"{testimonial.quote}"</p>
              <div className="author">{testimonial.couple} — Married {testimonial.date}</div>
              <div style={{ marginTop: '2rem' }}>
                <Link to="/testimonials" className="btn btn--primary">Read More Reviews</Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Local context — small, secondary */}
      {area.intro && (
        <section className="section">
          <div className="container" style={{ maxWidth: '800px' }}>
            <ScrollReveal>
              <h3>About wedding DJ work in {area.name}</h3>
              <div className="divider" style={{ margin: '1rem 0' }} />
              <p>{area.intro}</p>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Nearby venues */}
      {nearbyVenues.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <ScrollReveal>
              <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <span className="section-tag">Local Venues</span>
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
                      <p style={{ marginBottom: '1rem' }}>{v.town}, {v.county}</p>
                      <span className="btn btn--outline" style={{ fontSize: '0.85rem' }}>Venue Page</span>
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
              <span className="section-tag">FAQs</span>
              <h2>Wedding DJ {area.name} — frequently asked</h2>
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

      {/* Final video CTA — banner style */}
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
              From planning to perfection — let me make your {area.name} wedding seamless.
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
