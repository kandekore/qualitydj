import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import './DJServices.css';

const packages = [
  {
    name: 'Evening Only Party',
    desc: 'Up to five hours of evening reception',
    items: [
      'High-quality sound and light show',
      'Live DJ performance up to 5 hours',
      'Bespoke playlist planning',
      'Elegant white or rustic DJ booth',
      'Atmospheric dancefloor lighting',
    ],
  },
  {
    name: 'All-Day Wraparound',
    desc: 'Ceremony to last dance',
    items: [
      'Ceremony music & PA',
      'Drinks reception background music',
      'Wireless Shure radio mics for speeches',
      'Seamless transitions throughout the day',
      'Full evening DJ entertainment',
    ],
    featured: true,
  },
  {
    name: 'VIP Deluxe',
    desc: 'The full wraparound with premium upgrades',
    items: [
      'Everything in All-Day Wraparound',
      'Venue uplighting (internal & external)',
      'Dry ice first dance',
      'Cold spark machines',
      'Personalised laser sign writing',
    ],
  },
];

const mixingPillars = [
  {
    title: 'DJ Mixing Live',
    desc: 'Every transition is seamless, every track timed perfectly. Music evolves with your guests in real time — no rigid playlists, just a curated experience that keeps the atmosphere vibrant from first dance to final track.',
  },
  {
    title: 'Bespoke Soundtrack',
    desc: "We don't use pre-made playlists or fixed routines. Your music is planned collaboratively, mixed live on the night, and adapted in real time. Modern, classic, alternative, or a blend — your wedding soundtrack will feel authentic and considered.",
  },
  {
    title: 'Reactive to the Dancefloor',
    desc: 'Every track is chosen in the moment, reading your guests and building the perfect flow. No guesswork — just the right music at the right time, creating a natural, effortless atmosphere.',
  },
  {
    title: 'Requests & Playlists',
    desc: 'Guest requests are welcomed and blended effortlessly without disrupting the flow. The perfect balance of personal touches and professional control, creating a soundtrack uniquely yours while keeping every guest engaged.',
  },
];

export default function DJServices() {
  return (
    <>
      <SEO
        title="Wedding DJ Services | Live Mixing, Bespoke Soundtracks"
        description="Bespoke wedding DJ services by award-winning DJ Jan Blazak. Live mixing, three elegant packages, ceremony through to last dance. Book your consultation."
        keyword="wedding DJ services, live wedding DJ, bespoke wedding DJ"
      />

      <section className="page-hero">
        <img
          src="/assets/images/woodenheader.jpg"
          alt="Rustic wooden DJ booth setup"
          className="page-hero__bg"
        />
        <div className="page-hero__overlay" />
        <div className="page-hero__content">
          <h1>Craft Your Perfect Wedding Soundtrack</h1>
          <div className="divider" style={{ background: 'rgba(255,255,255,0.4)' }} />
          <p>Experience bespoke DJ services tailored for your elegant wedding at exclusive venues.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Professional Mixing & Sound Production</h2>
              <div className="divider" />
              <p>
                Every track is mixed live, not simply played from a pre-set playlist, allowing the
                music to flow naturally and respond to your guests in real time. The evening builds
                seamlessly with live DJ mixing, adapting instantly to the energy on the dancefloor.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid--2">
            {mixingPillars.map((m, i) => (
              <ScrollReveal key={i}>
                <div className="feature-card">
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Moments that matter */}
      <section className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>The Moments That Matter</h2>
              <div className="divider" />
              <p>
                From the walk down the aisle to the final track, the music carries the story of
                your day.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid grid--2 installation__grid" style={{ marginBottom: '4rem' }}>
              <div className="installation__image">
                <img src="/assets/images/adobe/adobestock_137506782.webp" alt="First dance at a wedding" />
              </div>
              <div className="installation__text">
                <span className="section-tag">The Centrepiece Moment</span>
                <h3>First Dance</h3>
                <div className="divider" style={{ margin: '1rem 0' }} />
                <p>
                  We are very experienced at first dances. We can build the tension to breaking
                  point if you want the limelight, or subtly prompt your first dance — maybe
                  inviting your guests to join you after a short photo segment, leaving you less
                  exposed. Whatever we do, it will suit your vibe and create real joy and energy
                  in which to feel the love in the room.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid--3">
            <ScrollReveal>
              <div className="dj__text-block">
                <h3>Introductions & Announcements</h3>
                <p>
                  We cover every announcement expected on the day and we're happy liaising with
                  venues, caterers, and other entertainers to ensure all bases are covered. We are
                  skilled at introducing people into your breakfast or evening reception — letting
                  everyone enter with their theme tune blasting. We whoop it up. We generate energy.
                  We fill the room with love.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="dj__text-block">
                <h3>Ceremony & Drinks Reception</h3>
                <p>
                  Battery-powered, completely wireless Electro-Voice Everse 12 speakers deliver
                  clear, natural sound for garden ceremonies, drinks receptions, and relaxed
                  background music — without needing nearby power. Every vow, reading, and song is
                  heard with warmth and clarity.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="dj__text-block">
                <h3>Advance Playlist Prep & Last-Minute Changes</h3>
                <p>
                  Everything you plan is ready to go, fully downloaded and tested — so there's no
                  reliance on internet connections. A library of over 20,000 songs is on hand, with
                  access to millions more online if needed. Complete flexibility, last-minute
                  changes welcomed effortlessly.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Three Elegant Wedding DJ Packages</h2>
              <div className="divider" />
              <p>Flexible, transparent, and centred around what you actually need.</p>
            </div>
          </ScrollReveal>
          <div className="grid grid--3 dj__packages">
            {packages.map((pkg, i) => (
              <ScrollReveal key={i}>
                <div className={`dj__package ${pkg.featured ? 'dj__package--featured' : ''}`}>
                  {pkg.featured && <span className="dj__package-badge">Most Popular</span>}
                  <h3>{pkg.name}</h3>
                  <p className="dj__package-desc">{pkg.desc}</p>
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
          <ScrollReveal className="home__cta-center">
            <Link to="/wedding-dj-packages" className="btn btn--primary" style={{ marginTop: '2rem' }}>
              Compare Packages in Detail
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Stress-free planning */}
      <section className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Stress-Free Planning</h2>
              <div className="divider" />
              <p>
                Calm, clear planning from start to finish with Jan Blazak — dealing directly with
                the person who'll be there on your big day. No agencies, no handovers, no
                last-minute surprises.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid--3">
            {[
              { title: 'Direct Communication', desc: "Enjoy direct communication with Jan throughout, including a face-to-face meeting if you'd like that extra reassurance. Your ideas are listened to, with advice offered where it matters most." },
              { title: 'Must-Play & Do-Not-Play', desc: 'Share your favourite tracks, preferred genres, and anything you definitely do not want. Your preferences always come first and guide the entire music plan.' },
              { title: 'One Dedicated DJ', desc: 'No sales teams, no substitute DJs. Jan will listen to what you want and deliver it on the night. Consistent, reliable communication every step of the way.' },
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

      {/* Testimonials */}
      <section className="section section--dark">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Real Weddings, Real Stories</h2>
              <div className="divider" style={{ background: 'rgba(255,255,255,0.3)' }} />
            </div>
          </ScrollReveal>
          <div className="grid grid--2">
            <ScrollReveal>
              <div className="testimonial-card" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <p style={{ color: 'rgba(255,255,255,0.85)' }}>
                  "We had the pleasure of having Jan perform at our country western style wedding.
                  From the start, he was professional, responsive, and easy to communicate with.
                  The music fit the country western vibe beautifully."
                </p>
                <div className="author" style={{ color: 'var(--color-accent)' }}>The Rawlings Family — 01/10/2025</div>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="testimonial-card" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <p style={{ color: 'rgba(255,255,255,0.85)' }}>
                  "Jan was absolutely incredible for our wedding, he set the place alight! He has
                  been amazing throughout, from taking our initial brief and then bringing it to
                  reality. Guests were absolutely buzzing and danced the night away."
                </p>
                <div className="author" style={{ color: 'var(--color-accent)' }}>Luke — 12/08/2025</div>
              </div>
            </ScrollReveal>
          </div>
          <ScrollReveal className="home__cta-center">
            <Link to="/real-weddings" className="btn btn--outline" style={{ marginRight: '1rem' }}>
              Read Real Weddings
            </Link>
            <Link to="/contact-us" className="btn btn--outline">
              Get in Touch
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
