import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';

const faqs = [
  {
    category: 'Booking & Planning',
    items: [
      {
        q: 'Do you work exclusively as a wedding DJ?',
        a: "Yes. I don't do birthdays, anniversaries, corporates, wakes, or engagements — I only do weddings. Because I do them with style and panache, making them joyful, full of laughter, fun, and truly memorable. That's why I don't need to do anything else.",
      },
      {
        q: 'Will I meet my DJ before the wedding?',
        a: "Absolutely. You work directly with Jan Blazak from the very first conversation through to the final song of the night. A face-to-face meeting is available if you'd like that extra reassurance. There are no handovers, agencies, or substitute DJs.",
      },
      {
        q: 'How far in advance should I book?',
        a: "Popular dates (especially Saturdays in peak wedding season) book up a year or more in advance. I'd recommend getting in touch as soon as you've settled on your venue and date — even if details are still flexible.",
      },
      {
        q: 'What areas do you cover?',
        a: 'My home territory is Worcestershire, Warwickshire, and Herefordshire, but I regularly travel further afield for the right wedding. Get in touch with your venue details and I\'ll confirm.',
      },
    ],
  },
  {
    category: 'The Music',
    items: [
      {
        q: 'Do you use playlists or mix live?',
        a: "All music is mixed live — every transition, every track timed to the energy in the room. I don't rely on pre-recorded sets or automated playlists. Live mixing allows me to adapt to your guests, maintain energy, and create a natural flow throughout the evening.",
      },
      {
        q: 'Can I choose my own music?',
        a: "Yes — and you're encouraged to. Share your must-play songs, favourite genres, first dance, and do-not-play requests. Your preferences come first and guide the entire music plan. It is YOUR wedding. You will be listening to YOUR soundtrack.",
      },
      {
        q: 'Do you take guest requests on the night?',
        a: 'Guest requests are welcomed and blended into the flow where appropriate — but they will never override your wishes. I carefully balance requests with your music plan and the overall energy of the evening.',
      },
      {
        q: 'How big is your music library?',
        a: 'Over 20,000 songs on hand, fully downloaded and tested in advance — no reliance on internet connections. Plus access to millions more online if needed for last-minute surprises.',
      },
      {
        q: 'Can you handle specific genres like drum and bass, country, or something niche?',
        a: "Yes. I've done country western weddings, drum and bass weddings, and everything in between. If it's the soundtrack that reflects you as a couple, I'll make it work.",
      },
    ],
  },
  {
    category: 'Equipment & Setup',
    items: [
      {
        q: 'What sound system do you use?',
        a: 'Crystal-clear Electro-Voice systems throughout: EV Evolve 50 stacks, battery-powered Everse 12 wireless speakers for outdoor ceremonies, EKX-18" subwoofers, and Shure radio microphones for speeches. Systems are tailored to each venue — small and discreet or large and powerful as needed.',
      },
      {
        q: 'Can you provide music for an outdoor ceremony?',
        a: "Yes. My EV Everse 12 speakers are fully battery-powered and wireless, so I can set up in gardens, courtyards, or anywhere that doesn't have power nearby — without compromising on sound quality.",
      },
      {
        q: 'Do you provide microphones for speeches?',
        a: 'Yes. Professional Shure dynamic wireless microphones are included — discreet, reliable, and easy to use. They give you and your speakers the freedom to move naturally without cables.',
      },
      {
        q: 'What does the DJ booth look like?',
        a: "I offer two setups: an elegant white Humpter B1 booth with matching moving-head podiums (perfect for castles and modern venues), and a custom rustic booth crafted from recycled wood with a signature illuminated heart (perfect for barns, boho, and vintage-style weddings).",
      },
      {
        q: 'What if something goes wrong with the equipment?',
        a: 'I carry spares of everything. Full backup systems are built into every setup — every base and eventuality covered. You won\'t know if there\'s an issue because I\'ll have already solved it.',
      },
    ],
  },
  {
    category: 'Lighting & Extras',
    items: [
      {
        q: 'Is lighting included as standard?',
        a: 'Yes. Every package includes atmospheric dancefloor lighting — at least 20 professional fixtures, generally battery operated and wirelessly configured. Additional lighting (venue uplighting, moving heads, external uplighters) can be added.',
      },
      {
        q: 'Can you do venue uplighting?',
        a: 'Yes — 16 internal and 16 weatherproof external fixtures available, colour-matched to your main show and your overall wedding colour scheme.',
      },
      {
        q: 'What is a dry ice first dance?',
        a: 'A low-lying cloud effect that creates a thick, elegant blanket of mist around you during your first dance — the iconic "dancing on the clouds" look. Unlike standard fog, it stays low and won\'t obscure you in photos.',
      },
      {
        q: 'Are cold spark machines safe for indoor venues?',
        a: "Yes. Cold sparks produce no heat, no smoke, and no flame — they're venue-approved for the vast majority of indoor spaces. I have ten sleek white units available.",
      },
      {
        q: 'What is laser sign writing?',
        a: 'Vibrant, neon-style laser projections that display your names, date, or a custom message — on walls, ceilings, or even the exterior of your venue. Letters up to 5 metres tall. A striking modern alternative to traditional signage.',
      },
    ],
  },
];

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

export default function FAQ() {
  const allItems = faqs.flatMap((c) => c.items);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <>
      <SEO
        title="Wedding DJ FAQs | Your Questions Answered"
        description="Answers to the most common questions about my wedding DJ services — booking, music, equipment, lighting, extras, and more."
        keyword="wedding DJ FAQ, wedding DJ questions"
      />

      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <section className="page-hero">
        <img
          src="/assets/images/gallery-white-tent-setup.webp"
          alt="Frequently Asked Questions"
          className="page-hero__bg"
        />
        <div className="page-hero__overlay" />
        <div className="page-hero__content">
          <h1>Frequently Asked Questions</h1>
          <div className="divider" style={{ background: 'rgba(255,255,255,0.4)' }} />
          <p>Got questions? I've tried to answer the most common ones below.</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          {faqs.map((category, i) => (
            <ScrollReveal key={i}>
              <div style={{ marginBottom: '4rem' }}>
                <h2 style={{ marginBottom: '2rem' }}>{category.category}</h2>
                <div className="divider" style={{ margin: '0 0 2rem' }} />
                <div className="faq__list">
                  {category.items.map((item, j) => (
                    <FAQItem key={j} q={item.q} a={item.a} />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <ScrollReveal className="home__cta-center">
            <h2 style={{ color: 'var(--color-white)', marginBottom: '1.5rem' }}>
              Still Have Questions?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto 2rem' }}>
              I'm ever so friendly and only too happy to discuss my services. Mainly because
              I like to get things right.
            </p>
            <Link to="/contact-us" className="btn btn--outline">
              Get in Touch
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
