import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import { getWeddingBySlug, realWeddings } from '../data/realWeddings';

export default function RealWedding() {
  const { slug } = useParams();
  const wedding = getWeddingBySlug(slug);

  if (!wedding) {
    return <Navigate to="/real-weddings" replace />;
  }

  const related = realWeddings
    .filter((w) => w.slug !== wedding.slug)
    .slice(0, 3);

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'LocalBusiness',
      name: 'Quality Wedding DJ',
      url: 'https://qualityweddingdj.co.uk',
    },
    author: { '@type': 'Person', name: wedding.couple },
    datePublished: wedding.date,
    name: wedding.review.title,
    reviewBody: wedding.review.quote,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: wedding.review.rating,
      bestRating: 5,
      worstRating: 1,
    },
  };

  return (
    <>
      <SEO
        title={wedding.title}
        description={wedding.summary}
        keyword={wedding.tags.join(', ')}
        image={wedding.heroImage}
        imageAlt={wedding.title}
        type="article"
      />

      <Helmet>
        <script type="application/ld+json">{JSON.stringify(reviewSchema)}</script>
      </Helmet>

      <section className="page-hero">
        {wedding.heroVideo ? (
          <video
            src={wedding.heroVideo}
            autoPlay
            muted
            loop
            playsInline
            className="page-hero__bg"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <img
            src={wedding.heroImage}
            alt={wedding.title}
            className="page-hero__bg"
          />
        )}
        <div className="page-hero__overlay" />
        <div className="page-hero__content">
          <h1>{wedding.title}</h1>
          <div className="divider" style={{ background: 'rgba(255,255,255,0.4)' }} />
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '820px' }}>
          <ScrollReveal>
            <div style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-primary)', opacity: 0.6, marginBottom: '1rem' }}>
              {wedding.couple} · {wedding.dateLabel}
            </div>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.6, marginBottom: '2rem', fontStyle: 'italic', color: 'var(--color-primary)' }}>
              {wedding.summary}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
              {wedding.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.4rem 1rem',
                    background: 'var(--color-background)',
                    borderRadius: '999px',
                    color: 'var(--color-primary)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <h2>The Story</h2>
            <div className="divider" style={{ margin: '1.25rem 0' }} />
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>{wedding.story}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Review pulled out */}
      <section className="section section--alt">
        <div className="container" style={{ maxWidth: '820px' }}>
          <ScrollReveal>
            <div className="testimonial-card">
              <div style={{ color: '#d4a574', letterSpacing: '2px', marginBottom: '0.75rem' }}>
                {'★'.repeat(wedding.review.rating)}
              </div>
              <h3 style={{ marginBottom: '1rem' }}>{wedding.review.title}</h3>
              <p style={{ fontStyle: 'italic' }}>"{wedding.review.quote}"</p>
              <div className="author">— {wedding.couple}, {wedding.dateLabel}</div>
            </div>
            {wedding.review.reply && (
              <div style={{ marginTop: '2rem', padding: '1.5rem 2rem', borderLeft: '3px solid var(--color-accent)', background: 'var(--color-background)' }}>
                <div style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-primary)', opacity: 0.6, marginBottom: '0.5rem' }}>
                  Jan's Reply
                </div>
                <p style={{ marginBottom: 0, fontStyle: 'italic' }}>"{wedding.review.reply}"</p>
              </div>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* Services used */}
      <section className="section">
        <div className="container" style={{ maxWidth: '820px' }}>
          <ScrollReveal>
            <h2>Services Featured at This Wedding</h2>
            <div className="divider" style={{ margin: '1.25rem 0' }} />
            <ul style={{ columns: 2, columnGap: '2rem' }}>
              {wedding.relatedServices.map((s, i) => (
                <li key={i} style={{ marginBottom: '0.5rem', paddingLeft: '1.5rem', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent)' }}>◆</span>
                  {s}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* More weddings */}
      <section className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>More Real Weddings</h2>
              <div className="divider" />
            </div>
          </ScrollReveal>
          <div className="grid grid--3">
            {related.map((w, i) => (
              <ScrollReveal key={i}>
                <article style={{ background: 'var(--color-white)', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(74, 59, 48, 0.08)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Link to={`/real-weddings/${w.slug}`}>
                    <img src={w.heroImage} alt={w.title} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} />
                  </Link>
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-primary)', opacity: 0.55, marginBottom: '0.5rem' }}>
                      {w.dateLabel}
                    </div>
                    <h3 style={{ fontSize: '1.15rem', lineHeight: 1.3, marginBottom: '0.75rem', flex: 1 }}>
                      <Link to={`/real-weddings/${w.slug}`} style={{ color: 'var(--color-heading)', textDecoration: 'none' }}>
                        {w.title}
                      </Link>
                    </h3>
                    <Link
                      to={`/real-weddings/${w.slug}`}
                      style={{
                        color: 'var(--color-primary)',
                        fontSize: '0.75rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                        borderBottom: '1px solid var(--color-accent)',
                        paddingBottom: '0.25rem',
                        alignSelf: 'flex-start',
                      }}
                    >
                      Read →
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <ScrollReveal className="home__cta-center">
            <h2 style={{ color: 'var(--color-white)', marginBottom: '1.5rem' }}>
              Plan Your Own Unforgettable Night
            </h2>
            <Link to="/contact-us" className="btn btn--outline">
              Request a Consultation
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
