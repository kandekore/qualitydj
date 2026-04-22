import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';

const mainLightShow = [
  {
    title: 'Spectacular Main Light Show',
    stat: '20+',
    statLabel: 'Professional fixtures',
    desc: "My main light show contains at least 20 professional lighting fixtures, generally battery operated and wirelessly configured. This creates true versatility and ensures I always deliver a pleasing audio-visual display — sound-coordinated, with a range of spectacular effects. From demure and sophisticated to full-on rave.",
  },
  {
    title: 'Moving Heads',
    stat: '12',
    statLabel: 'Moving head fixtures',
    desc: 'A range of up to twelve professional moving head fixtures that generate huge energy and wow on the dance floor. I generally use four in any one show but will supply whatever takes your fancy and make it rock for you.',
  },
  {
    title: 'External Up Lighters',
    stat: '32',
    statLabel: 'Up lighters (16 wireless)',
    desc: 'A range of 32 up lighters including 16 powerful wireless units. Illuminate a garden, a castle wall, a marquee, a courtyard. Use them to enhance your colour scheme as static displays, or make them dance with the music synced with all the other lights — sweeps up an aisle or waves around the garden.',
  },
  {
    title: 'Colour Schemes',
    stat: 'Bespoke',
    statLabel: 'Matched to your day',
    desc: 'If you have a defined or general colour scheme I can ensure my lights provide those static colours early doors, with the actual shows reflecting them later on. Seamless transitions from soft, romantic daytime tones to a vibrant evening dancefloor.',
  },
];

const addons = [
  {
    title: 'Venue Uplighting',
    stat: '16 + 16',
    statLabel: 'Internal & weatherproof external',
    desc: 'Flexible lighting options include 16 internal and 16 weatherproof external fixtures, allowing you to transform both indoor and outdoor spaces. Colour schemes perfectly coordinated with your main light show, creating a seamless look throughout your venue.',
  },
  {
    title: 'Dry Ice First Dance',
    stat: '',
    statLabel: '',
    desc: 'Create a truly unforgettable first dance with the magic of genuine dry ice — that iconic "dancing on the clouds" effect. Unlike standard fog, it stays low to the floor, creating a thick, elegant blanket of mist that won\'t rise or obscure you in photos. Perfect for stunning photography.',
  },
  {
    title: 'Cold Spark Machines',
    stat: '10',
    statLabel: 'Sleek white units',
    desc: 'Add a breathtaking wow factor to arrivals, entrances, or photo moments with professional cold spark machines. Completely safe and venue-friendly — stunning fountains of sparkling light without heat, smoke, or mess. Ten sleek white units deliver a clean, elegant look.',
  },
  {
    title: 'Personalised Laser Sign Writing',
    stat: '5m',
    statLabel: 'Letters up to 5 metres tall',
    desc: 'Stunning laser projections that bring your names, date, or a custom message to life. Whether displayed on walls, ceilings, or even the exterior of your venue — including dramatic castle backdrops — the effect is bold, elegant, and completely unique. Vibrant neon-style lasers capable of creating letters up to 5 metres tall.',
  },
  {
    title: 'Smoke & Haze',
    stat: '',
    statLabel: '',
    desc: "Although smoke and haze undoubtedly enhance any lighting show, many venues won't allow them due to fire alarm concerns. I'm happy to add this to your show free of charge if your venue permits. Makes a barn or marquee look exceptional.",
  },
  {
    title: 'Extra DJ Time',
    stat: '',
    statLabel: '',
    desc: 'Extend your evening naturally without watching the clock. Keep the celebration going as long as you wish.',
  },
];

export default function LightingExtras() {
  return (
    <>
      <SEO
        title="Wedding Lighting, Uplighting & Special Effects"
        description="Atmospheric wedding lighting: 20+ fixtures, 12 moving heads, 32 uplighters, dry ice, cold spark machines, 5m laser sign writing. Venue-friendly, professionally installed."
        keyword="wedding lighting, wedding uplighting, dry ice first dance, cold spark wedding, laser wedding sign"
        image="/assets/images/adobe/adobestock_226243697.webp"
        imageAlt="Dry ice first dance with cloud effect at a wedding"
      />

      <section className="page-hero">
        <img
          src="/assets/images/uplighters.webp"
          alt="Wedding venue illuminated with coloured uplighters"
          className="page-hero__bg"
        />
        <div className="page-hero__overlay" />
        <div className="page-hero__content">
          <h1>Atmospheric Light Shows</h1>
          <div className="divider" style={{ background: 'rgba(255,255,255,0.4)' }} />
          <p>Lighting that transforms your venue and enhances every key moment of your day.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Lighting That Transforms Your Venue</h2>
              <div className="divider" />
              <p>
                Subtle, stylish, and carefully matched to your décor, my lighting adds elegance
                without overpowering your setting. From soft, romantic daytime tones to a vibrant
                evening dancefloor, every transition is seamless. Professionally installed and
                completely venue-friendly — designed to look as stunning as it feels.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid--2">
            {mainLightShow.map((s, i) => (
              <ScrollReveal key={i}>
                <div className="feature-card">
                  {s.stat && (
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--color-accent)', lineHeight: 1 }}>
                      {s.stat}
                    </div>
                  )}
                  {s.statLabel && (
                    <div style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-primary)', opacity: 0.6, marginBottom: '1rem' }}>
                      {s.statLabel}
                    </div>
                  )}
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Signature visual moments */}
      <section className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Signature Visual Moments</h2>
              <div className="divider" />
              <p>
                The details guests remember for years. Each effect professionally operated,
                fully venue-approved, and designed to add impact in a stylish, understated way.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid grid--2 installation__grid" style={{ marginBottom: '4rem' }}>
              <div className="installation__text">
                <span className="section-tag">Transform Your Venue</span>
                <h3>Venue Uplighting</h3>
                <div className="divider" style={{ margin: '1rem 0' }} />
                <p>
                  Wash walls, arches, and architectural features in rich colour with 32 uplighters
                  — 16 internal and 16 weatherproof external units. Perfectly matched to your
                  colour scheme, they turn a blank room into a bespoke setting and bring the
                  outside of your venue to life after dark. Static during the daytime, then synced
                  with the main show once the dancefloor opens.
                </p>
              </div>
              <div className="installation__image">
                <img src="/assets/images/uplighter.webp" alt="Venue wall washed with coloured uplighting" />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid grid--2 installation__grid" style={{ marginBottom: '4rem' }}>
              <div className="installation__image">
                <img src="/assets/images/adobe/adobestock_226243697.webp" alt="Dry ice first dance effect" />
              </div>
              <div className="installation__text">
                <span className="section-tag">Dancing on the Clouds</span>
                <h3>Dry Ice First Dance</h3>
                <div className="divider" style={{ margin: '1rem 0' }} />
                <p>
                  Create a truly unforgettable first dance with the magic of genuine dry ice,
                  giving you that iconic "dancing on the clouds" effect. Unlike standard fog, it
                  stays low to the floor, creating a thick, elegant blanket of mist that won't
                  rise or obscure you in photos. The result is a romantic, dreamlike atmosphere
                  that enhances your moment without distraction — perfect for stunning
                  photographs, emotional impact, and a real wow factor.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid grid--2 installation__grid" style={{ marginBottom: '4rem' }}>
              <div className="installation__text">
                <span className="section-tag">Photo-Worthy Wow Factor</span>
                <h3>Cold Spark Machines</h3>
                <div className="divider" style={{ margin: '1rem 0' }} />
                <p>
                  Add a breathtaking wow factor to your arrivals, entrances, or photo moments
                  with professional cold spark machines. Completely safe and venue-friendly, they
                  create stunning fountains of sparkling light without heat, smoke, or mess.
                  Perfect for recreating the magic of handheld sparklers — only bigger, brighter,
                  and more reliable — my ten sleek white units deliver a clean, elegant look
                  that complements your styling while creating unforgettable, photo-worthy moments.
                </p>
              </div>
              <div className="installation__image">
                <img src="/assets/images/adobe/adobestock_417571252.webp" alt="Cold spark machines at a wedding" />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid grid--2 installation__grid">
              <div className="installation__image">
                <img src="/assets/images/adobe/adobestock_138205915.webp" alt="Romantic first dance" />
              </div>
              <div className="installation__text">
                <span className="section-tag">Personalised Laser Projections</span>
                <h3>Laser Sign Writing</h3>
                <div className="divider" style={{ margin: '1rem 0' }} />
                <p>
                  Make your wedding truly personal with stunning laser projections that bring
                  your names, date, or a custom message to life. Displayed on walls, ceilings,
                  or even the exterior of your venue — including dramatic castle backdrops — the
                  effect is bold, elegant, and completely unique. Vibrant, neon-style lasers
                  capable of creating letters up to 5 metres tall.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Add-ons */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Full Add-On Menu</h2>
              <div className="divider" />
              <p>
                Enhance key moments with stunning visual effects and carefully chosen upgrades
                that elevate the atmosphere without ever overwhelming it. Professionally operated
                and fully venue-approved — creating unforgettable moments your guests will be
                talking about long after the night ends.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid--3">
            {addons.map((s, i) => (
              <ScrollReveal key={i}>
                <div className="feature-card">
                  {s.stat && (
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--color-accent)', lineHeight: 1 }}>
                      {s.stat}
                    </div>
                  )}
                  {s.statLabel && (
                    <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-primary)', opacity: 0.6, marginBottom: '0.75rem' }}>
                      {s.statLabel}
                    </div>
                  )}
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* DJ Setups */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Two Elegant Setups Fit For Your Wedding</h2>
              <div className="divider" />
              <p>
                My stylish DJ setups are designed to complement your wedding aesthetic, not
                compete with it. Clean lines, modern finishes, and thoughtfully presented
                equipment ensure everything looks as beautiful as it sounds.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid--2">
            <ScrollReveal>
              <div className="feature-card">
                <h3>Elegant White — Humpter B1 Booth & Podiums</h3>
                <p>
                  My elegant white Humpter B1 booth paired with four matching moving head podiums
                  creates a sleek, high-end centrepiece for your evening reception. The clean,
                  all-white finish blends beautifully with modern wedding styling, while the
                  elevated lighting adds depth, movement, and a subtle wow factor. A refined,
                  visually striking setup — this rig looks incredible in a castle.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="feature-card">
                <h3>Rustic DJ Booth & Podiums</h3>
                <p>
                  My custom-built rustic DJ booth, crafted from recycled wood and paired with
                  four matching podiums, brings warm characterful charm to your wedding evening.
                  Soft white LED lighting adds subtle sparkle, while the signature illuminated
                  heart creates a beautiful focal point for your dancefloor. Perfect for barn,
                  boho, or vintage-style weddings.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Rustic booth video banner */}
      <section style={{ position: 'relative', height: '60vh', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <video
          src="/assets/videos/woodnew.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(42, 31, 22, 0.65)' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '800px', padding: '0 2rem' }}>
          <h2 style={{ color: 'var(--color-white)', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 300, lineHeight: 1.3, textShadow: '0 2px 20px rgba(0,0,0,0.3)', marginBottom: '1.5rem' }}>
            Crafted from recycled wood. The heart of your dancefloor.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '560px', margin: '0 auto 2rem' }}>
            My signature rustic booth with its illuminated heart — made for barn, boho, and
            vintage-style weddings.
          </p>
          <Link to="/contact-us" className="btn btn--outline">
            Enquire About the Rustic Set
          </Link>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Ready to Transform Your Venue?</h2>
              <div className="divider" style={{ background: 'rgba(255,255,255,0.3)' }} />
              <p style={{ color: 'rgba(255,255,255,0.8)' }}>
                Get in touch to discuss how my lighting and extras can make your wedding day
                extraordinary. Many services are available independently — perfect for couples
                using live bands, venue DJs, or alternative entertainment.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal className="home__cta-center">
            <Link to="/contact-us" className="btn btn--outline">
              Discuss Your Lighting
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
