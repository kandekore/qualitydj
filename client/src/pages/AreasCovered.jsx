import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import { areas } from '../data/areas';

const SITE_URL = 'https://qualityweddingdj.co.uk';

// Group areas by county for a cleaner index page.
function byCounty(list) {
  const map = new Map();
  list.forEach((a) => {
    const key = a.county;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(a);
  });
  return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
}

export default function AreasCovered() {
  const grouped = byCounty(areas);
  const canonical = `${SITE_URL}/areas-covered`;

  return (
    <>
      <SEO
        title="Areas Covered | Wedding DJ Services Across the West Midlands"
        description={`A full list of the ${areas.length} towns, cities and regions I cover as a wedding DJ — Worcestershire, Herefordshire, Gloucestershire, Warwickshire, Shropshire, West Midlands, Staffordshire and the Cotswolds.`}
        keyword="wedding DJ areas covered, West Midlands wedding DJ, Worcestershire wedding DJ"
        canonical={canonical}
        image="/assets/images/adobe/adobestock_762134491.webp"
        imageAlt="Bride and groom dancing joyfully at their reception"
      />

      <section className="page-hero">
        <img
          src="/assets/images/gallery-castle-party.webp"
          alt="Wedding DJ service area"
          className="page-hero__bg"
        />
        <div className="page-hero__overlay" />
        <div className="page-hero__content">
          <h1>Areas Covered</h1>
          <div className="divider" style={{ background: 'rgba(255,255,255,0.4)' }} />
          <p>Wedding DJ services across {areas.length} towns, cities and regions in the West Midlands and the neighbouring counties.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="section-tag">Service Area</span>
              <h2>Every town and city I cover</h2>
              <div className="divider" style={{ margin: '1.5rem auto' }} />
              <p style={{ maxWidth: '680px', margin: '0 auto' }}>
                If your venue is in one of the towns, cities or regions listed below, there's no
                travel surcharge — it's all part of my standard service area.
              </p>
            </div>
          </ScrollReveal>

          {grouped.map(([county, list]) => (
            <ScrollReveal key={county}>
              <div style={{ marginBottom: '3.5rem' }}>
                <h3>{county}</h3>
                <div className="divider" style={{ margin: '1rem 0 1.5rem' }} />
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '0.75rem',
                  }}
                >
                  {list.map((a) => (
                    <Link
                      key={a.slug}
                      to={`/wedding-dj/${a.slug}`}
                      style={{
                        display: 'block',
                        padding: '0.75rem 1.25rem',
                        background: 'var(--color-white)',
                        border: '1px solid rgba(0,0,0,0.12)',
                        borderRadius: '4px',
                        color: 'var(--color-primary)',
                        textDecoration: 'none',
                        fontWeight: 500,
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--color-primary)';
                        e.currentTarget.style.color = 'var(--color-white)';
                        e.currentTarget.style.borderColor = 'var(--color-primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'var(--color-white)';
                        e.currentTarget.style.color = 'var(--color-primary)';
                        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)';
                      }}
                    >
                      {a.name}
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}

          <ScrollReveal>
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <p>Your town not on the list? I still cover it — just get in touch.</p>
              <Link to="/contact-us" className="btn btn--accent" style={{ marginTop: '1rem' }}>
                Check Your Area
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
