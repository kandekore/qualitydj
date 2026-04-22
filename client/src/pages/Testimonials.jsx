import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';

const testimonials = [
  {
    author: 'Olivia',
    date: '2026-03-14',
    dateLabel: 'Married 14/03/2026',
    title: 'Amazing DJ',
    rating: 5,
    quote: "From the moment we booked with Jan we couldn't have been happier. He was super kind and listened to what sort of music we wanted, giving us great tips and ideas dependent on our interests and also thought about the age ranges of the people attending our event. Our event had age range from 2 years old to over 80s and the dance floor was filled the whole time! He even surprised us with a live saxophonist during our favourite dance.",
    slug: 'olivia-sax-surprise',
  },
  {
    author: 'The Rawlings Family',
    date: '2025-10-01',
    dateLabel: 'Married 01/10/2025',
    title: 'Country Western Wedding Bells',
    rating: 5,
    quote: "We had the pleasure of having Jan perform at our country western style wedding, and we couldn't be happier with the experience. From the start, he was professional, responsive, and easy to communicate with. He kept in contact throughout the planning process, which gave us peace of mind. The music fit the country western vibe beautifully, and our guests had a great time.",
    slug: 'rawlings-country-western',
  },
  {
    author: 'Aaron',
    date: '2025-09-21',
    dateLabel: 'Married 21/09/2025',
    title: 'Wedding DJ',
    rating: 5,
    quote: 'Great DJ, arrived with loads of time to set up and was very attentive for music requests and preferences. Open communication which was great as we changed the genre a couple of times. Had everyone up dancing and controlled the atmosphere amazingly. Would definitely recommend to anyone wanting an affordable with a quality service!',
    slug: 'aaron-wedding',
  },
  {
    author: 'Ieuan',
    date: '2025-08-24',
    dateLabel: 'Married 24/08/2025',
    title: 'My Wedding',
    rating: 5,
    quote: 'Where do I begin, Jan and his team were absolutely superb from start to finish. They delivered everything they promised and it was to perfection!! I can\'t thank him enough for what he provided!! I highly recommend him for any party because he is absolutely brilliant.',
    slug: 'ieuan-wedding',
  },
  {
    author: 'Caroline',
    date: '2025-08-23',
    dateLabel: 'Married 23/08/2025',
    title: 'A Fun Guy!',
    rating: 5,
    quote: "It was made clear our requests weren't going to be easy but he worked his magic and got everyone on the dance floor all night. We used the rustic set and it was perfect for our venue! Jan is a chatty guy and shows a lot of enthusiasm for what he does!",
    slug: 'caroline-rustic',
  },
  {
    author: 'Happyivorycakes',
    date: '2025-08-26',
    dateLabel: 'Reviewed 27/08/2025',
    title: 'Jan was Fantastic!',
    rating: 5,
    quote: "From start to finish, Jan communicated and let me know everything he needed from me to create an appropriate playlist for our wedding — we had a super relaxed wedding and Jan perfectly matched the day with song choices. He communicated with me throughout the day and I didn't have to worry about a thing! He was super kind and accommodating and a super talented DJ! Hire Jan for your wedding, you won't be disappointed!",
    slug: 'relaxed-wedding',
  },
  {
    author: 'Luke',
    date: '2025-08-12',
    dateLabel: 'Married 12/08/2025',
    title: 'Jan Set the Place Alight',
    rating: 5,
    quote: 'Jan was absolutely incredible for our wedding, he set the place alight!! Jan has been amazing throughout, from taking our initial brief and then bringing it to reality, he has been engaged throughout and adaptive to our requests. I genuinely can\'t recommend Jan any more highly. Guests were absolutely buzzing and danced the night away! Jan was instrumental in setting the vibe!',
    slug: 'luke-wedding',
  },
  {
    author: 'Green',
    date: '2025-07-05',
    dateLabel: 'Married 05/07/2025',
    title: 'Wedding DJ',
    rating: 5,
    quote: 'Very nice and friendly and adapted really well with the day, equipment was incredible and I was just able to let them set up and do their own thing and not worry about anything. I would highly recommend.',
    slug: 'green-wedding',
  },
  {
    author: 'The Edwards Wedding',
    date: '2025-05-23',
    dateLabel: 'Married 23/05/2025',
    title: 'The Edwards Wedding',
    rating: 5,
    quote: 'We had the pleasure of having Jan be our DJ for the entire wedding day. From the welcome playlist to the party music. Everything played at the wedding was on point for each individual part of the day! Jan kept the guests on the feet and really in tune. We couldn\'t thank you enough for keeping the vibes coming and for catering for all that attended. The DJ set up was absolutely amazing and a perfect fit for any wedding! Perfectly styled!',
    slug: 'edwards-wedding',
  },
  {
    author: 'Bea',
    date: '2025-04-19',
    dateLabel: 'Married 19/04/2025',
    title: 'Jonny and Bea Wedding',
    rating: 5,
    quote: 'Jan communicated well and delivered a really fun eve of music that we requested / wanted! Everyone was on the dance floor all night loving it!',
    slug: 'bea-wedding',
  },
  {
    author: 'Holli',
    date: '2025-04-05',
    dateLabel: 'Married 05/04/2025',
    title: 'Drum and Bass Dream Wedding',
    rating: 5,
    quote: 'We were after a little something different for our wedding as we are drum and bass ravers. Jan was our perfect match. He absolutely smashed it and we were on the dance floor all night. Every tune was a banger and we had the best time.',
    slug: 'holli-drum-and-bass',
  },
  {
    author: 'Darren',
    date: '2024-06-15',
    dateLabel: 'Married 15/06/2024',
    title: 'A Professional, Flexible DJ Who Knows How to Keep Everyone Moving',
    rating: 5,
    quote: 'Jan created a brilliant atmosphere for our celebration. The crowd was very mixed, and somehow he managed to cater to all. I had an idea of the music I wanted to hear, but Jan read the room and played the music needed to keep people on the dance floor all night. I highly recommend Jan for a wedding or any celebration. 10/10.',
    slug: 'darren-mixed-crowd',
  },
];

function Stars({ rating }) {
  return (
    <div aria-label={`${rating} out of 5 stars`} style={{ color: '#d4a574', letterSpacing: '2px', marginBottom: '0.75rem' }}>
      {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
    </div>
  );
}

export default function Testimonials() {
  const avgRating = (
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
  ).toFixed(1);

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://qualityweddingdj.co.uk/#business',
    name: 'Quality Wedding DJ',
    url: 'https://qualityweddingdj.co.uk',
    image: 'https://qualityweddingdj.co.uk/assets/brand/logo-1024x1000.jpg',
    priceRange: '£££',
    areaServed: ['Worcestershire', 'Warwickshire', 'Herefordshire'],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avgRating,
      reviewCount: testimonials.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: testimonials.map((t) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: t.author },
      datePublished: t.date,
      name: t.title,
      reviewBody: t.quote,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: t.rating,
        bestRating: 5,
        worstRating: 1,
      },
    })),
  };

  return (
    <>
      <SEO
        title="Wedding DJ Reviews & Testimonials"
        description={`Read ${testimonials.length} real 5-star wedding reviews for Jan Blazak at Quality Wedding DJ. Country western, drum and bass, castle weddings, rustic barns and more.`}
        keyword="wedding DJ reviews, wedding DJ testimonials"
      />

      <Helmet>
        <script type="application/ld+json">{JSON.stringify(reviewSchema)}</script>
      </Helmet>

      <section className="page-hero">
        <img
          src="/assets/images/SIPX2521-1280x1000.webp"
          alt="Wedding celebration"
          className="page-hero__bg"
        />
        <div className="page-hero__overlay" />
        <div className="page-hero__content">
          <h1>Real Stories, Real Weddings</h1>
          <div className="divider" style={{ background: 'rgba(255,255,255,0.4)' }} />
          <p>Rated {avgRating}/5 by {testimonials.length} real couples who put their trust in Jan.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Real Stories from Brides and Grooms</h2>
              <div className="divider" />
              <p>
                All of the following are real testimonials from real people for whom I have had
                the honour of being entrusted to provide the entertainment at their weddings.
                Every review I have ever had in every location has been 5 stars bar one — and
                that was 4.5 due to a tech failure.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid--2">
            {testimonials.map((t, i) => (
              <ScrollReveal key={i}>
                <article className="testimonial-card" itemScope itemType="https://schema.org/Review">
                  <meta itemProp="datePublished" content={t.date} />
                  <div itemProp="itemReviewed" itemScope itemType="https://schema.org/LocalBusiness" style={{ display: 'none' }}>
                    <meta itemProp="name" content="Quality Wedding DJ" />
                  </div>
                  <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                    <meta itemProp="ratingValue" content={t.rating} />
                    <meta itemProp="bestRating" content="5" />
                  </div>
                  <Stars rating={t.rating} />
                  <h3 itemProp="name" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{t.title}</h3>
                  <p itemProp="reviewBody">"{t.quote}"</p>
                  <div className="author" itemProp="author" itemScope itemType="https://schema.org/Person">
                    <span itemProp="name">{t.author}</span> — {t.dateLabel}
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <ScrollReveal className="home__cta-center">
            <h2 style={{ color: 'var(--color-white)', marginBottom: '1.5rem' }}>
              Ready to Create Your Own Story?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Every wedding is unique — and every couple deserves a DJ who listens. Start the
              conversation today.
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
