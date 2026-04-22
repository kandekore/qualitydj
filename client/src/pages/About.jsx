import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import './About.css';

export default function About() {
  return (
    <>
      <SEO
        title="About Jan Blazak | Wedding DJ Serving Worcestershire & the West Midlands"
        description="Meet Jan Blazak — 15+ years, 250+ weddings, live DJ mixing, premium Electro-Voice sound and atmospheric lighting across Worcestershire, Warwickshire and Herefordshire."
        keyword="wedding DJ Jan Blazak, about wedding DJ, luxury wedding DJ, Worcestershire wedding DJ"
        image="/assets/images/adobe/adobestock_138205915.webp"
        imageAlt="Couple sharing an emotional first dance"
      />

      <section className="page-hero">
        <img
          src="/assets/images/IMG_2961-scaled.webp"
          alt="Wedding venue"
          className="page-hero__bg"
        />
        <div className="page-hero__overlay" />
        <div className="page-hero__content">
          <h1>Elevate Your Wedding Experience</h1>
          <div className="divider" style={{ background: 'rgba(255,255,255,0.4)' }} />
          <p>Discover the artistry behind unforgettable, high-end wedding DJ services tailored for luxury venues.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid--2 about__grid">
            <ScrollReveal>
              <div className="about__image">
                <img src="/assets/images/about-us/jan-480x472.webp" alt="DJ Jan Blazak" />
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="about__text">
                <h2>My Commitment to Excellence</h2>
                <div className="divider" style={{ margin: '1.5rem 0' }} />
                <p>
                  At Quality Wedding DJ, I understand that your wedding day is one of the most
                  important occasions of your life. My mission is to elevate your celebration
                  with a musical experience that is as unique and memorable as your love story.
                </p>
                <p>
                  With over 15 years of experience across radio, clubs, festivals, and private
                  events, DJ Jan Blazak specialises in crafting personalised music experiences
                  that reflect your personal taste and the distinctive atmosphere of your event.
                </p>
                <p>
                  Rather than following trends or rigid formats, Jan focuses on what truly works:
                  listening carefully, planning thoughtfully, and adapting seamlessly on the day.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Why Choose Quality Wedding DJ</h2>
              <div className="divider" />
            </div>
          </ScrollReveal>
          <div className="grid grid--2">
            {[
              { title: 'Unmatched Expertise', desc: 'Jan is a seasoned professional who brings years of experience to your event, ensuring every moment is perfectly orchestrated.' },
              { title: 'State-of-the-Art Equipment', desc: 'Jan uses cutting-edge technology to deliver crystal-clear sound and stunning visual lighting effects that enhance the elegance of your venue.' },
              { title: 'Tailored Musical Experiences', desc: 'Jan works closely with you to craft playlists that resonate with your style, ensuring every song played is meaningful and memorable.' },
              { title: 'Professional Presentation', desc: 'Jan dresses in a tailored suit, embodying the sophistication and elegance of your high-end wedding.' },
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

      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Exclusive Client Experiences</h2>
              <div className="divider" />
              <p>
                Jan's clients include celebrities, business executives, and professional athletes
                who seek excellence and exclusivity. They trust him to deliver a musical backdrop
                that complements the grandeur of their wedding venue.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Real couples — diverse imagery */}
      <section className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Couples I'm proud to play for</h2>
              <div className="divider" />
              <p>
                Every couple deserves a music plan built around them. Whoever you are, whoever you
                love, and however you want your day to feel — I've got you.
              </p>
            </div>
          </ScrollReveal>
          <div className="gallery-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {[
              { src: '/assets/images/adobe/adobestock_762134491.webp', alt: 'Black bride and groom smiling at their wedding reception', tag: 'Joyful first dance' },
              { src: '/assets/images/adobe/adobestock_1841384988.webp', alt: 'Two brides sharing a tender moment at golden hour', tag: 'Love is love' },
              { src: '/assets/images/adobe/adobestock_1966018059.webp', alt: 'Two grooms at a floral wedding arch', tag: 'Two grooms' },
              { src: '/assets/images/adobe/adobestock_762135016.webp', alt: 'Bridal couple celebrating with their guests', tag: 'Celebration' },
              { src: '/assets/images/adobe/adobestock_894754720.webp', alt: 'Newlyweds sharing a joyful moment', tag: 'Pure joy' },
              { src: '/assets/images/adobe/adobestock_903002824.webp', alt: 'Couple celebrating their wedding with guests', tag: 'A full dancefloor' },
            ].map((img, i) => (
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
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Jan's Process</h2>
              <div className="divider" style={{ background: 'rgba(255,255,255,0.3)' }} />
              <p style={{ color: 'rgba(255,255,255,0.8)' }}>
                Jan begins with an in-depth consultation to understand your vision and musical
                preferences. Throughout the planning process, he maintains open communication,
                coordinating with your venue and other vendors to ensure everything aligns
                perfectly on your special day.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>
                By working directly with couples, Jan ensures consistency, trust, and a calm
                professional presence throughout. There are no sales teams, no handovers,
                and no surprises — just honest advice and a shared goal of creating an
                unforgettable celebration.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal className="home__cta-center">
            <Link to="/contact-us" className="btn btn--outline">
              Enquire Now
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
