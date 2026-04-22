import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import { venues } from '../data/venues';

const SITE_URL = 'https://qualityweddingdj.co.uk';

// Group venues by style so the index reads like a curated directory.
function byStyle(list) {
  const order = ['castle', 'country house', 'hotel', 'barn', 'marquee'];
  const map = new Map();
  list.forEach((v) => {
    const key = v.style || 'other';
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(v);
  });
  return order
    .filter((k) => map.has(k))
    .map((k) => [k, map.get(k)])
    .concat(
      Array.from(map.entries()).filter(([k]) => !order.includes(k)),
    );
}

const STYLE_LABELS = {
  castle: 'Castles',
  'country house': 'Country Houses',
  hotel: 'Hotels',
  barn: 'Barns',
  marquee: 'Marquees & Tipis',
  other: 'Other Venues',
};

export default function VenuesIndex() {
  const grouped = byStyle(venues);
  const canonical = `${SITE_URL}/venues`;

  return (
    <>
      <SEO
        title="Wedding Venues | Wedding DJ Services Across the West Midlands"
        description={`A curated list of ${venues.length} wedding venues I regularly play — castles, country houses, hotels, barns, marquees and tipis across Worcestershire, Herefordshire, Gloucestershire, Shropshire and the West Midlands.`}
        keyword="wedding DJ venues, West Midlands wedding venues, country house wedding DJ"
        canonical={canonical}
      />

      <section className="page-hero">
        <img
          src="/assets/images/gallery-rustic-setup.webp"
          alt="Wedding venues"
          className="page-hero__bg"
        />
        <div className="page-hero__overlay" />
        <div className="page-hero__content">
          <h1>Wedding Venues I Cover</h1>
          <div className="divider" style={{ background: 'rgba(255,255,255,0.4)' }} />
          <p>{venues.length} venues I regularly play — castles, country houses, hotels, barns, marquees and tipis.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="section-tag">Venue Directory</span>
              <h2>Every venue has its own page</h2>
              <div className="divider" style={{ margin: '1.5rem auto' }} />
              <p style={{ maxWidth: '680px', margin: '0 auto' }}>
                Click any venue to see setup recommendations, style notes, and a wedding DJ plan
                tailored to the space. Your venue not listed? I still cover it — just get in touch.
              </p>
            </div>
          </ScrollReveal>

          {grouped.map(([style, list]) => (
            <ScrollReveal key={style}>
              <div style={{ marginBottom: '3.5rem' }}>
                <h3>{STYLE_LABELS[style] || style}</h3>
                <div className="divider" style={{ margin: '1rem 0 1.5rem' }} />
                <div className="grid grid--3">
                  {list.map((v) => (
                    <Link
                      key={v.slug}
                      to={`/wedding-dj/venues/${v.slug}`}
                      className="gallery-card"
                      style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
                    >
                      <img
                        src={v.heroImage}
                        alt={v.name}
                        loading="lazy"
                        decoding="async"
                        style={{ width: '100%', aspectRatio: '3/2', objectFit: 'cover' }}
                      />
                      <div style={{ padding: '1.25rem', background: 'var(--color-white)' }}>
                        <h4 style={{ marginBottom: '0.35rem' }}>{v.name}</h4>
                        <p style={{ marginBottom: 0, fontSize: '0.9rem', opacity: 0.75 }}>
                          {v.town}, {v.county}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}

          <ScrollReveal>
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <p>Not seeing your venue? Send me the details and I'll let you know straight away.</p>
              <Link to="/contact-us" className="btn btn--accent" style={{ marginTop: '1rem' }}>
                Ask About Your Venue
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
