import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';

const systems = [
  {
    title: 'Electro-Voice EV Evolve 50 Stacks',
    tagline: 'Crystal-clear flagship column system',
    desc: "The EV Evolve 50 delivers crystal-clear, elegant sound that's perfect for weddings of all sizes. Its sleek, modern design blends beautifully into any venue, while providing rich, balanced audio for your ceremony, speeches, and evening celebration. From emotional vows to a packed dancefloor, every word and song is heard exactly as it should be — clean, warm, and immersive. It's the kind of professional sound system that elevates your day without ever overpowering it.",
    image: '/assets/images/white-rig-square.jpg',
    imageAlt: 'Electro-Voice EV Evolve 50 stack at a wedding',
  },
  {
    title: 'Electro-Voice Everse 12 Wireless Speakers',
    tagline: 'Battery-powered, fully wireless outdoor solution',
    desc: 'The EV Everse 12 is the perfect solution for beautiful outdoor wedding moments. Fully battery-powered and completely wireless, it delivers clear, natural sound for garden ceremonies, drinks receptions, and relaxed background music — without the need for nearby power. Its discreet, modern design blends effortlessly into outdoor settings, while ensuring every vow, reading, and song is heard with warmth and clarity. Versatile and reliable, it allows your wedding to flow seamlessly from ceremony to celebration, wherever you choose to say "I do."',
    image: '/assets/images/gallery-sax-player.jpg',
    imageAlt: 'Outdoor wedding ceremony with wireless speakers',
  },
  {
    title: 'Electro-Voice EKX-18" Subwoofers',
    tagline: 'The solid bass foundation',
    desc: 'Electro-Voice EKX-18" subwoofers provide the solid bass foundation that allows your entire sound system to perform at its best. By delivering powerful, controlled low-end, they take the strain off the main speakers — resulting in crystal-clear vocals and music in any setting, from grand indoor venues to open-air gardens. Whether it\'s your first dance or a full dancefloor, they ensure every note feels rich, balanced, and effortlessly heard, creating a polished, professional sound throughout your wedding day.',
    image: '/assets/images/gallery-hotel-setup.jpg',
    imageAlt: 'EKX-18 subwoofer at a wedding venue',
  },
  {
    title: 'Shure Dynamic Wireless Radio Microphones',
    tagline: 'Professional wireless mics for speeches & ceremonies',
    desc: 'Shure dynamic wireless microphones give you the freedom to enjoy every moment without being tied down by cables. Perfect for ceremonies, speeches, and heartfelt toasts, they deliver clear, reliable sound so every word is heard beautifully by your guests. Discreet, professional, and easy to use, they allow you and your loved ones to move naturally and confidently. Whether indoors or outdoors, you can trust them to capture those once-in-a-lifetime moments with clarity and elegance.',
    image: '/assets/images/gallery-first-dance.jpg',
    imageAlt: 'Shure wireless microphone during wedding speeches',
  },
  {
    title: 'Yamaha MG12XU Mixing Desk',
    tagline: 'Live musicians and bands, seamlessly integrated',
    desc: 'The Yamaha MG12XU mixer brings everything together beautifully, making it easy for live musicians, singers, and bands to seamlessly connect into your wedding sound and lighting setup. Whether it\'s a solo acoustic set or a full band performance, every detail is handled with clarity and care. This means smooth transitions, balanced sound, and a polished experience for your guests — so you can enjoy the magic of live music alongside your DJ, all perfectly blended for your special day.',
    image: '/assets/images/gallery-saxy-vibes.jpg',
    imageAlt: 'Live saxophonist performing with DJ at wedding',
  },
];

export default function SoundSystem() {
  return (
    <>
      <SEO
        title="Premium Wedding Sound System | Electro-Voice, Shure, Yamaha"
        description="Crystal-clear Electro-Voice sound: EV Evolve 50 stacks, Everse 12 wireless speakers, EKX-18 subs, Shure radio mics, Yamaha mixing desk. Every piece of audio kit to cover every base on your big day."
        keyword="wedding sound system, wireless wedding speakers, Electro-Voice wedding DJ, outdoor ceremony speakers, wedding microphones"
      />

      <section className="page-hero">
        <img
          src="/assets/images/white-rig.jpg"
          alt="Premium wedding sound system"
          className="page-hero__bg"
        />
        <div className="page-hero__overlay" />
        <div className="page-hero__content">
          <h1>Premium Sound Systems</h1>
          <div className="divider" style={{ background: 'rgba(255,255,255,0.4)' }} />
          <p>Crystal-clear Electro-Voice systems tailored to your venue, your guests, and every moment of your day.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>I Only Work With the Best</h2>
              <div className="divider" />
              <p>
                All of my systems are crystal-clear Electro-Voice. Full-range stacks, columns,
                subwoofers, battery-powered wireless speakers, professional Shure radio mics for
                speeches and announcements: every piece of audio kit to cover every base on your
                big day. Every sound system is tailored to your venue, your guests, and every
                moment of your day — from small discreet systems to huge banging sound systems.
                Regardless, the sound is always balanced, powerful, and crystal-clear without
                harshness or distortion. The soundtrack is always picked by you.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {systems.map((s, i) => (
        <section key={i} className={`section ${i % 2 === 0 ? 'section--alt' : ''}`}>
          <div className="container">
            <div className="grid grid--2 installation__grid">
              <ScrollReveal>
                <div className="installation__image">
                  <img src={s.image} alt={s.imageAlt} />
                </div>
              </ScrollReveal>
              <ScrollReveal>
                <div className="installation__text">
                  <span className="section-tag">{s.tagline}</span>
                  <h2>{s.title}</h2>
                  <div className="divider" style={{ margin: '1.5rem 0' }} />
                  <p>{s.desc}</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      ))}

      {/* Live mixing section */}
      <section className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Professional Mixing & Sound Production</h2>
              <div className="divider" />
              <p>
                Every track is mixed live, not simply played from a pre-set playlist, allowing the
                music to flow naturally and respond to your guests in real time. Your sound is
                professionally calibrated for both speeches and music, with careful volume control
                throughout the day to suit every moment. With full backup systems in place, you can
                relax knowing everything is covered.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <ScrollReveal className="home__cta-center">
            <h2 style={{ color: 'var(--color-white)', marginBottom: '1.5rem' }}>
              Ready to Hear the Difference?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Let's discuss the perfect sound setup for your venue and your day.
            </p>
            <Link to="/contact-us" className="btn btn--outline">
              Request a Consultation
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
