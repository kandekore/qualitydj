import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import './Home.css';

const slides = [
  {
    video: '/assets/videos/freecompress-castle2-1-v2.mp4',
    poster: '/assets/images/gallery-castle-party.webp',
    slogan: 'Elevate Your Wedding with Elegance',
  },
  {
    video: '/assets/videos/freecompress-tent2-3-v2.mp4',
    poster: '/assets/images/gallery-white-tent-setup.webp',
    slogan: 'Ready for a Night to Remember?',
  },
  {
    video: '/assets/videos/freecompress-conga2-v2.mp4',
    poster: '/assets/images/gallery-bride-dancing.webp',
    slogan: 'Dance into Luxury with Me',
  },
];

const services = [
  {
    title: 'Premium Sound Systems',
    desc: 'Crystal-clear Electro-Voice systems tailored to your venue. Full-range stacks, wireless columns, battery-powered speakers and Shure radio mics — the right kit for every moment of your day.',
    bullets: [
      'EV Evolve 50 & Everse 12 wireless speakers',
      'EKX-18 subwoofers for a polished low end',
      'Full backup systems for total peace of mind',
    ],
    icon: (
      <svg viewBox="0 0 64 64" fill="currentColor">
        <path d="M20 18h-4v28h4V18zm6-6h-4v40h4V12zm6 10h-4v20h4V22zm6-4h-4v28h4V18zm6 6h-4v16h4V24z"/>
      </svg>
    ),
  },
  {
    title: 'Atmospheric Lighting',
    desc: 'Lighting that transforms your venue and enhances every key moment. Subtle, stylish, and perfectly matched to your decor.',
    bullets: [
      'Colour-matched ambient and dancefloor lighting',
      'Smooth transitions from day to night atmosphere',
      'Venue-friendly, professionally installed equipment',
    ],
    icon: (
      <svg viewBox="0 0 64 64" fill="currentColor">
        <path d="M32 6c-1 0-2 .8-2 2v4c0 1 .8 2 2 2s2-.8 2-2V8c0-1-.8-2-2-2zm0 10C24.3 16 18 22.3 18 30c0 5 2.6 9.4 6.5 12H28v6h8v-6h3.5c3.9-2.6 6.5-7 6.5-12 0-7.7-6.3-14-14-14zM26 52h12v4H26v-4zm-14.5-26H8c-1 0-2 .8-2 2s.8 2 2 2h3.5c1 0 2-.8 2-2s-1-2-2-2zm41 0H56c1 0 2 .8 2 2s-.8 2-2 2h-3.5c-1 0-2-.8-2-2s1-2 2-2z"/>
      </svg>
    ),
  },
  {
    title: 'Optional Enhancements',
    desc: 'Enhance key moments with stunning visual effects and upgrades. Designed to elevate atmosphere without overwhelming it.',
    bullets: [
      'Venue uplighting & personalised laser sign writing',
      'Dry ice first dance & cold spark machines',
      'Professionally operated and venue-approved',
    ],
    icon: (
      <svg viewBox="0 0 64 64" fill="currentColor">
        <path d="M44 8l-4 12h8L28 44l4-16h-8L36 4l8 4zm-20 48l2-6 4 4-6 2zm24-8l-2 6-4-4 6-2zM12 28l6 2-4 4-2-6zm4-16l2 6-6-2 4-4z"/>
      </svg>
    ),
  },
  {
    title: 'Live Music Mixing',
    desc: 'Every track is mixed live, not played from pre-recorded playlists. Music flows naturally and adapts to your guests in real time.',
    bullets: [
      'Seamless live DJ mixing throughout the evening',
      'Music adjusted instantly to crowd energy',
      'No rigid playlists or automated transitions',
    ],
    icon: (
      <svg viewBox="0 0 64 64" fill="currentColor">
        <path d="M14 20h8v24h-8V20zm14-8h8v40h-8V12zm14 12h8v16h-8V24z"/>
        <circle cx="18" cy="44" r="4"/>
        <circle cx="36" cy="52" r="4"/>
        <circle cx="50" cy="40" r="4"/>
      </svg>
    ),
  },
  {
    title: 'Stress-Free Planning',
    desc: 'Calm, clear planning with one dedicated DJ from start to finish. No agencies, no handovers, no last-minute surprises.',
    bullets: [
      'Direct communication with your DJ throughout',
      'Thoughtful music planning guided by experience',
      'Relaxed, organised support on the day',
    ],
    icon: (
      <svg viewBox="0 0 64 64" fill="currentColor">
        <path d="M32 6C17.6 6 6 17.6 6 32s11.6 26 26 26 26-11.6 26-26S46.4 6 32 6zm0 48C19.8 54 10 44.2 10 32S19.8 10 32 10s22 9.8 22 22-9.8 22-22 22z"/>
        <path d="M32 16c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zm6.4 22.4L30 34V20h4v12l7 3.8-2.6 2.6z"/>
      </svg>
    ),
  },
  {
    title: 'Elegant Setups',
    desc: 'Stylish DJ setups that complement your wedding aesthetic. Clean, modern, and designed to look as good as they sound.',
    bullets: [
      'Elegant white or rustic DJ booths',
      'Discreet cabling and tidy professional presentation',
      'Designed to blend seamlessly with your venue',
    ],
    icon: (
      <svg viewBox="0 0 64 64" fill="currentColor">
        <path d="M8 48h48v4H8v-4zm4-28h4v28h-4V20zm8 8h4v20h-4V28zm8-4h4v24h-4V24zm8 0h4v24h-4V24zm8-4h4v28h-4V20zm8 8h4v20h-4V28zM30 8l2-4 2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4z"/>
      </svg>
    ),
  },
];

const galleryItems = [
  { img: '/assets/images/gallery-laser-red.webp', title: 'Laser Show' },
  { img: '/assets/images/gallery-sax-player.webp', title: 'Saxy Vibes' },
  { img: '/assets/images/gallery-castle-party.webp', title: 'Castle Party' },
  { img: '/assets/images/adobe/adobestock_1841384988.webp', title: 'Love Is Love' },
  { img: '/assets/images/gallery-white-tent-setup.webp', title: 'White Setup' },
  { img: '/assets/images/gallery-rustic-setup.webp', title: 'Rustic Booth' },
  { img: '/assets/images/adobe/adobestock_226243526.webp', title: 'Dry Ice Magic' },
  { img: '/assets/images/gallery-bride-dancing.webp', title: 'Bride Boogie' },
  { img: '/assets/images/gallery-green-lasers.webp', title: 'Green Lasers' },
  { img: '/assets/images/adobe/adobestock_417571252.webp', title: 'Cold Sparks' },
  { img: '/assets/images/gallery-blue-lasers.webp', title: 'Blue Lasers' },
  { img: '/assets/images/gallery-hotel-setup.webp', title: 'Hotel Setup' },
  { img: '/assets/images/gallery-first-dance.webp', title: 'First Dance' },
  { img: '/assets/images/adobe/adobestock_1966018059.webp', title: 'Two Grooms' },
  { img: '/assets/images/gallery-tent-party.webp', title: 'Summer Tent' },
  { img: '/assets/images/gallery-saxy-vibes.webp', title: 'Saxy Performance' },
];

const signatureMoments = [
  {
    img: '/assets/images/adobe/adobestock_137506782.webp',
    title: 'First Dance',
    desc: "Build tension to breaking point, or subtly prompt the moment and let guests join after a short photo segment. Whatever suits your vibe — I create the joy and energy for you to feel the love in the room.",
    link: '/dj-services',
  },
  {
    img: '/assets/images/adobe/adobestock_567551298.webp',
    title: 'Dry Ice First Dance',
    desc: 'Genuine dry ice creates that iconic "dancing on the clouds" effect — a thick, elegant blanket of mist that stays low and won\'t obscure you in photos. Romantic, dreamlike, and stunning.',
    link: '/lighting-extras',
  },
  {
    img: '/assets/images/adobe/adobestock_417571252.webp',
    title: 'Cold Spark Machines',
    desc: 'Breathtaking fountains of sparkling light — no heat, no smoke, no mess. Completely venue-friendly. Perfect for arrivals, entrances, and photo moments your guests will be talking about for years.',
    link: '/lighting-extras',
  },
];

const faqs = [
  {
    q: 'Do you work exclusively as a wedding DJ?',
    a: 'Yes. While my background includes radio, clubs, and live events, my focus today is entirely on weddings. This allows me to understand the flow, etiquette, and atmosphere that make wedding celebrations feel seamless and memorable.',
  },
  {
    q: 'Will I meet my DJ before the wedding?',
    a: 'Absolutely. You work directly with your DJ from the very first conversation through to the final song of the night. There are no handovers, agencies, or substitute DJs.',
  },
  {
    q: 'Do you use playlists or mix live?',
    a: "All music is mixed live. I don't rely on pre-recorded sets or automated playlists. Live mixing allows me to adapt to your guests, maintain energy, and create a natural flow throughout the evening.",
  },
  {
    q: 'Can I choose my own music?',
    a: "Yes. You're encouraged to share must-play songs, favourite genres, and do-not-play requests. Your preferences always come first and guide the entire music plan.",
  },
  {
    q: 'Do you take guest requests on the night?',
    a: 'Guest requests are welcome where appropriate, but they will never override your wishes. I carefully balance requests with your music plan and the overall flow of the evening.',
  },
  {
    q: 'What equipment do you provide?',
    a: 'I provide professional-grade sound systems, elegant DJ booths, and atmospheric lighting as standard. All equipment is venue-friendly, discreetly installed, and fully backed up for peace of mind.',
  },
];

function Counter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = Date.now();
          const tick = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq__item ${open ? 'faq__item--open' : ''}`}>
      <button className="faq__question" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <svg
          className="faq__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="12" y1="5" x2="12" y2="19" className="faq__icon-v" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <div className="faq__answer">
        <p>{a}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const videoRefs = useRef([]);
  const bannerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (video) {
        if (i === activeIndex) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [activeIndex]);

  useEffect(() => {
    const video = bannerRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.preload === 'none') video.preload = 'auto';
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SEO
        title="Professional Wedding DJ Services by Let The Music Play"
        description="Award-winning wedding DJ Jan Blazak. 250+ weddings, 15+ years, live DJ mixing, premium Electro-Voice sound, atmospheric lighting. Worcestershire, Warwickshire, Herefordshire."
        keyword="wedding DJ, luxury wedding DJ, live wedding DJ mixing, wedding DJ Worcestershire"
      />

      {/* Hero Video Slider */}
      <section className="hero">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 7000, disableOnInteraction: false }}
          loop
          speed={1500}
          className="hero__swiper"
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="hero__slide">
                <video
                  ref={(el) => (videoRefs.current[i] = el)}
                  src={slide.video}
                  poster={slide.poster}
                  muted
                  loop
                  playsInline
                  preload={i === 0 ? 'auto' : 'metadata'}
                  className="hero__video"
                />
                <div className="hero__overlay" />
                <div className="hero__content">
                  <img
                    src="/assets/brand/hero-watermark.webp"
                    alt=""
                    className="hero__watermark"
                  />
                  <h1>{slide.slogan}</h1>
                  <div className="divider" style={{ background: 'rgba(255,255,255,0.4)' }} />
                  <p>Unforgettable music and ambiance tailored for luxury venues</p>
                  <div className="hero__buttons">
                    <Link to="/contact-us" className="btn btn--outline">
                      Request a Consultation
                    </Link>
                    <Link to="/dj-services" className="btn btn--accent">
                      My Services
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* DJ Installation Section - 2 col: image left, text right */}
      <section className="section installation">
        <div className="container">
          <div className="grid grid--2 installation__grid">
            <ScrollReveal>
              <div className="installation__image">
                <img src="/assets/images/SIPX2521-wide.webp" alt="Luxury white DJ installation" loading="lazy" decoding="async" />
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="installation__text">
                <h2>Luxury white and rustic DJ installations</h2>
                <div className="divider" style={{ margin: '1.5rem 0' }} />
                <p>
                  Architecturally styled DJ booths and lighting that enhance your wedding
                  aesthetic. A setup as elegant as the occasion.
                </p>
                <p>
                  At Let The Music Play Limited, I provide professional wedding DJ services
                  designed entirely around you, your guests, and the atmosphere you want to create.
                </p>
                <p>
                  With over 15 years of experience as a wedding DJ, I specialise in bespoke music
                  planning, live DJ mixing, and elegant wedding setups that look as good as they
                  sound.
                </p>
                <Link to="/about-us" className="btn btn--primary">
                  Meet Your DJ
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="stats">
        <div className="stats__overlay" />
        <div className="container stats__inner">
          <div className="stats__grid">
            <div className="stats__item">
              <div className="stats__number">
                <Counter end={15} suffix="+" />
              </div>
              <div className="stats__label">Years Experience</div>
            </div>
            <div className="stats__item">
              <div className="stats__number">
                <Counter end={250} suffix="+" />
              </div>
              <div className="stats__label">Weddings Delivered</div>
            </div>
            <div className="stats__item">
              <div className="stats__number">
                <Counter end={100} suffix="%" />
              </div>
              <div className="stats__label">Customer Satisfaction</div>
            </div>
            <div className="stats__item">
              <div className="stats__number">
                <Counter end={3} />
              </div>
              <div className="stats__label">Wedding Packages</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="services-header">
              <div className="services-header__left">
                <span className="section-tag">My Services</span>
                <h2>Elegant solutions for every detail of your big day.</h2>
              </div>
              <Link to="/dj-services" className="btn btn--primary">
                Learn More
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid grid--3 services-grid">
            {services.map((s, i) => (
              <ScrollReveal key={i}>
                <div className="service-card">
                  <div className="service-card__icon">{s.icon}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  {s.bullets && (
                    <ul className="service-card__bullets">
                      {s.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  )}
                  <Link to="/dj-services" className="btn btn--primary service-card__btn">
                    Learn More
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* "We provide premium sound systems" - split layout */}
      <section className="premium-section">
        <div className="premium-section__image">
          <img src="/assets/images/white-rig-square.webp" alt="Premium white DJ setup with Mr & Mrs signage" loading="lazy" decoding="async" />
        </div>
        <div className="premium-section__content">
          <ScrollReveal>
            <span className="section-tag">Why Choose Jan</span>
            <h2>I provide premium sound systems</h2>
            <p>
              Stylish white or Rustic DJ booths, atmospheric lighting, and optional enhancements
              such as uplighting, dry ice, laser sign writing, and cold spark machines.
            </p>

            <div className="premium-section__features">
              <div className="premium-feature">
                <div className="premium-feature__icon">
                  <svg viewBox="0 0 48 48" fill="currentColor">
                    <path d="M10 8h28v32H10V8zm4 4v24h20V12H14zm6 4h8v2h-8v-2zm0 6h8v2h-8v-2zm0 6h8v2h-8v-2z"/>
                  </svg>
                </div>
                <div>
                  <h4>All equipment is professionally installed</h4>
                  <p>Venue-friendly installation, supported by backup systems for complete peace of mind.</p>
                </div>
              </div>

              <div className="premium-feature">
                <div className="premium-feature__icon">
                  <svg viewBox="0 0 48 48" fill="currentColor">
                    <path d="M24 4C12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20S35.1 4 24 4zm0 36c-8.8 0-16-7.2-16-16S15.2 8 24 8s16 7.2 16 16-7.2 16-16 16zm-4-26l12 10-12 10V14z"/>
                  </svg>
                </div>
                <div>
                  <h4>You work directly with your DJ from start to finish</h4>
                  <p>No agencies, no substitutes, and no uncertainty.</p>
                </div>
              </div>

              <div className="premium-feature">
                <div className="premium-feature__icon">
                  <svg viewBox="0 0 48 48" fill="currentColor">
                    <path d="M24 2C11.8 2 2 11.8 2 24s9.8 22 22 22 22-9.8 22-22S36.2 2 24 2zm0 40C14 42 6 34 6 24S14 6 24 6s18 8 18 18-8 18-18 18zm-2-28v12l10 6-2 3-12-7V14h4z"/>
                  </svg>
                </div>
                <div>
                  <h4>Your music is planned collaboratively & mixed live</h4>
                  <p>Adapted in real time to keep energy flowing naturally.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery Grid - "Unforgettable nights" */}
      <section className="section gallery-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Unforgettable Nights</h2>
              <div className="divider" />
            </div>
          </ScrollReveal>
          <div className="gallery-grid">
            {galleryItems.map((item, i) => (
              <ScrollReveal key={i}>
                <div className="gallery-card">
                  <img src={item.img} alt={item.title} loading="lazy" decoding="async" />
                  <div className="gallery-card__overlay">
                    <h3>{item.title}</h3>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Signature moments */}
      <section className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Signature Moments</h2>
              <div className="divider" />
              <p>
                The details that turn a great wedding into one guests never stop talking about.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid--3">
            {signatureMoments.map((m, i) => (
              <ScrollReveal key={i}>
                <Link to={m.link} className="gallery-card" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                  <img
                    src={m.img}
                    alt={m.title}
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', aspectRatio: '3/2', objectFit: 'cover' }}
                  />
                  <div style={{ padding: '1.75rem', background: 'var(--color-white)' }}>
                    <h3 style={{ marginBottom: '0.75rem' }}>{m.title}</h3>
                    <p style={{ marginBottom: 0 }}>{m.desc}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Full-width video banner CTA */}
      <section className="home__banner">
        <video
          ref={bannerRef}
          src="/assets/videos/119431_img-2693-172838102348671-v2.mp4"
          muted
          loop
          playsInline
          preload="none"
          className="home__banner-video"
        />
        <div className="home__banner-overlay" />
        <div className="home__banner-content">
          <h2>From planning to perfection, I'm here to make it seamless.</h2>
          <Link to="/contact-us" className="btn btn--outline" style={{ marginTop: '2rem' }}>
            Get Started
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Real stories from brides and grooms who partied with Jan</h2>
              <div className="divider" />
            </div>
          </ScrollReveal>
          <div className="grid grid--3">
            <ScrollReveal>
              <div className="testimonial-card">
                <p>
                  "From the moment we booked with Jan we couldn't have been happier. Our event had
                  an age range from 2 years old to over 80s and the dance floor was filled the whole
                  time! He even surprised us with a live saxophonist during our favourite dance."
                </p>
                <div className="author">Olivia — Married 14/03/2026</div>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="testimonial-card">
                <p>
                  "We were after a little something different as we are drum and bass ravers. Jan
                  was our perfect match. He absolutely smashed it and we were on the dance floor
                  all night. Every tune was a banger."
                </p>
                <div className="author">Holli — Married 05/04/2025</div>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="testimonial-card">
                <p>
                  "Jan at Let The Music Play created a brilliant atmosphere for our celebration.
                  The crowd was very mixed, and somehow he managed to cater to all. He read the
                  room and kept people on the dance floor all night. 10/10."
                </p>
                <div className="author">Darren — Married 15/06/2024</div>
              </div>
            </ScrollReveal>
          </div>
          <ScrollReveal className="home__cta-center">
            <Link to="/testimonials" className="btn btn--primary">
              Read More Testimonials
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section section--alt faq-section">
        <div className="container">
          <div className="faq__layout">
            <ScrollReveal>
              <div className="faq__header">
                <h2>Frequently Asked Questions</h2>
                <div className="divider" style={{ margin: '1.5rem 0' }} />
                <p>
                  Everything you need to know about my wedding DJ services.
                  Can't find what you're looking for? Get in touch.
                </p>
                <Link to="/contact-us" className="btn btn--primary" style={{ marginTop: '1.5rem' }}>
                  Contact Jan
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="faq__list">
                {faqs.map((faq, i) => (
                  <FAQItem key={i} q={faq.q} a={faq.a} />
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

    </>
  );
}
