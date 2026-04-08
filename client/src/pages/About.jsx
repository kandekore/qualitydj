import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import './About.css';

export default function About() {
  return (
    <>
      <SEO
        title="High-End Wedding DJ Services"
        description="Discover high-end wedding DJ services tailored for luxury venues. Elevate your celebration with Quality Wedding DJ's bespoke musical experiences."
        keyword="high-end wedding DJ services"
      />

      <section className="page-hero">
        <img
          src="/assets/images/IMG_2961-scaled.jpg"
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
                <img src="/assets/images/about-us/jan-480x472.jpg" alt="DJ Jan Blazak" />
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="about__text">
                <h2>Our Commitment to Excellence</h2>
                <div className="divider" style={{ margin: '1.5rem 0' }} />
                <p>
                  At Quality Wedding DJ, we understand that your wedding day is one of the most
                  important occasions of your life. Our mission is to elevate your celebration
                  with a musical experience that is as unique and memorable as your love story.
                </p>
                <p>
                  Led by experienced wedding DJ Jan Blazak, with over 15 years of experience across
                  radio, clubs, festivals, and private events, we specialise in crafting personalised
                  music experiences that reflect your personal taste and the distinctive atmosphere
                  of your event.
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
              { title: 'Unmatched Expertise', desc: 'Our DJs are seasoned professionals who bring years of experience to your event, ensuring every moment is perfectly orchestrated.' },
              { title: 'State-of-the-Art Equipment', desc: 'We use cutting-edge technology to deliver crystal-clear sound and stunning visual lighting effects that enhance the elegance of your venue.' },
              { title: 'Tailored Musical Experiences', desc: 'We work closely with you to craft playlists that resonate with your style, ensuring every song played is meaningful and memorable.' },
              { title: 'Professional Presentation', desc: 'Our DJs dress in tailored suits, embodying the sophistication and elegance of your high-end wedding.' },
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
                Our clients include celebrities, business executives, and professional athletes
                who seek excellence and exclusivity. They trust us to deliver a musical backdrop
                that complements the grandeur of their wedding venue.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Our Process</h2>
              <div className="divider" style={{ background: 'rgba(255,255,255,0.3)' }} />
              <p style={{ color: 'rgba(255,255,255,0.8)' }}>
                We begin with an in-depth consultation to understand your vision and musical
                preferences. Throughout the planning process, we maintain open communication,
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
