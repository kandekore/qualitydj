import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';

const testimonials = [
  {
    quote: 'The music was the highlight of the night. It felt like a scene from a movie, perfectly orchestrated.',
    author: 'Wedding at a Historic Castle',
  },
  {
    quote: 'Our wedding at the luxury hotel was an absolute dream. The DJ\'s meticulous attention to detail and professionalism were remarkable. Our guests can\'t stop talking about how perfect the evening was.',
    author: 'Wedding at a Luxury Hotel',
  },
  {
    quote: 'The DJ\'s ability to energize the crowd without overpowering the ambiance was precisely what we envisioned. It was an unforgettable experience.',
    author: 'Wedding at a Corporate Venue',
  },
  {
    quote: 'We wanted something unique for our wedding as we\'re drum and bass enthusiasts. Jan was the perfect match, absolutely smashing it with every tune. We danced all night and had the best time. Thank you so much.',
    author: 'Holli',
  },
  {
    quote: 'Our requests were challenging, but Jan worked his magic and kept everyone on the dance floor all night. The rustic set was the perfect complement to our venue! Jan\'s enthusiasm and passion for what he does are truly infectious.',
    author: 'Caroline',
  },
  {
    quote: 'From the personalised playlist to the seamless coordination with our venue, every aspect of their service was exceptional. Our guests were thrilled!',
    author: 'Emma & Daniel',
  },
  {
    quote: 'The team at Quality Wedding DJ transformed our wedding into an unforgettable celebration. Their professionalism and attention to detail were unparalleled.',
    author: 'Sarah & James',
  },
  {
    quote: 'Jan and his team made our wedding day perfect. The music was incredible, and the transitions were seamless. Our guests couldn\'t stop raving about the energy and vibe. Highly recommend!',
    author: 'Sarah & Michael, Castle Howard',
  },
];

export default function Testimonials() {
  return (
    <>
      <SEO
        title="High-End Wedding DJ Testimonials"
        description="Discover why affluent couples choose us for their exclusive wedding venues. Read testimonials from satisfied clients."
        keyword="high-end wedding DJ testimonials"
      />

      <section className="page-hero">
        <img
          src="/assets/images/SIPX2521-1280x1000.jpg"
          alt="Wedding celebration"
          className="page-hero__bg"
        />
        <div className="page-hero__overlay" />
        <div className="page-hero__content">
          <h1>Elevate Your Wedding Experience</h1>
          <div className="divider" style={{ background: 'rgba(255,255,255,0.4)' }} />
          <p>Discover why discerning couples choose us for their exclusive venues.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>The Hallmark of Sophistication</h2>
              <div className="divider" />
              <p>
                We are dedicated to crafting timeless and unforgettable musical experiences
                for weddings at the most prestigious venues. Our esteemed clients trust us
                to deliver a service that embodies the elegance and grandeur of their special day.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid--2">
            {testimonials.map((t, i) => (
              <ScrollReveal key={i}>
                <div className="testimonial-card">
                  <p>"{t.quote}"</p>
                  <div className="author">{t.author}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Personalised Playlists: Crafted to Perfection</h2>
              <div className="divider" />
              <p>
                Every couple has a unique story, and so does their taste in music. We excel
                in crafting playlists that reflect your individual preferences, ensuring the
                soundtrack to your wedding is as distinctive as your love.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid--3">
            {[
              { title: 'Custom Playlists', desc: 'Tailored to your specific tastes and the atmosphere you want to create.' },
              { title: 'Expert DJs', desc: 'Skilled at reading and energising the crowd while maintaining sophistication.' },
              { title: 'Seamless Collaboration', desc: 'Flawless coordination with venue staff for perfect execution every time.' },
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

      <section className="section section--dark">
        <div className="container">
          <ScrollReveal className="home__cta-center">
            <h2 style={{ color: 'var(--color-white)', marginBottom: '1.5rem' }}>
              Ready to Create Your Perfect Day?
            </h2>
            <Link to="/contact-us" className="btn btn--outline">
              Contact Us for a Consultation
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
