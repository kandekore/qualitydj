import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import { realWeddings } from '../data/realWeddings';

export default function RealWeddings() {
  return (
    <>
      <SEO
        title="Real Weddings | DJ Stories from Jan Blazak"
        description="Explore real wedding stories: country western, drum and bass, rustic barns, castle parties, all-day wraparound weddings. Each one planned and mixed live by Jan Blazak."
        keyword="real weddings, wedding DJ case studies, wedding DJ examples"
      />

      <section className="page-hero">
        <img
          src="/assets/images/gallery-castle-party.webp"
          alt="Real weddings"
          className="page-hero__bg"
        />
        <div className="page-hero__overlay" />
        <div className="page-hero__content">
          <h1>Real Weddings</h1>
          <div className="divider" style={{ background: 'rgba(255,255,255,0.4)' }} />
          <p>Unforgettable nights. Real stories from real couples.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Every Wedding Is Different</h2>
              <div className="divider" />
              <p>
                From country western barn weddings to drum-and-bass raves, castle ceremonies to
                relaxed garden receptions — these are the real weddings I've had the honour of
                providing the entertainment for. Each one planned collaboratively and mixed live
                on the night.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid--2">
            {realWeddings.map((w, i) => (
              <ScrollReveal key={i}>
                <article style={{ background: 'var(--color-white)', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(74, 59, 48, 0.08)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Link to={`/real-weddings/${w.slug}`} style={{ display: 'block', overflow: 'hidden' }}>
                    <img
                      src={w.heroImage}
                      alt={w.title}
                      style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                  </Link>
                  <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-primary)', opacity: 0.55, marginBottom: '0.75rem' }}>
                      {w.couple} · {w.dateLabel}
                    </div>
                    <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem', lineHeight: 1.25 }}>
                      <Link to={`/real-weddings/${w.slug}`} style={{ color: 'var(--color-heading)', textDecoration: 'none' }}>
                        {w.title}
                      </Link>
                    </h3>
                    <p style={{ marginBottom: '1.25rem', flex: 1 }}>{w.summary}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                      {w.tags.map((t) => (
                        <span
                          key={t}
                          style={{
                            fontSize: '0.7rem',
                            padding: '0.25rem 0.7rem',
                            background: 'var(--color-background)',
                            borderRadius: '999px',
                            color: 'var(--color-primary)',
                            letterSpacing: '0.03em',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/real-weddings/${w.slug}`}
                      style={{
                        color: 'var(--color-primary)',
                        fontSize: '0.85rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                        borderBottom: '1px solid var(--color-accent)',
                        paddingBottom: '0.25rem',
                        alignSelf: 'flex-start',
                      }}
                    >
                      Read the Story →
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
              Could Your Wedding Be Next?
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
