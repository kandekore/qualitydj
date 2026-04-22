// Hash-by-slug template rotation for area + venue landing pages.
// Each location gets one of N variant template functions, picked deterministically
// from its slug, so neighbouring locations don't read identically while every
// page stays unique and indexable.

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function pickVariant(slug, count) {
  return hashString(slug) % count;
}

// ---------- AREA TEMPLATES ----------
// Every variant opens with Jan's USPs and the bespoke/quality angle —
// not local geography. Local context is shown in a separate section
// further down the page.

const areaTemplates = [
  // Variant 1 — bespoke + live-mixing focus
  (area) => [
    {
      heading: `A wedding DJ for ${area.name} couples who want something better than a playlist`,
      body: `I'm Jan Blazak, a full-time wedding DJ. Every track of every wedding is mixed live — never queued from a playlist, never stitched together in advance. Live mixing is the difference between a generic disco and a wedding-night atmosphere that genuinely flows from the first dance through to the last.

For ${area.name} couples, that means a music plan built around your guests, your venue and your taste — then delivered in real time on the night, adjusted to the room as it changes. No agencies, no substitutions, no surprises.`,
    },
    {
      heading: `Premium kit. Elegant setups. Everything included.`,
      body: `Electro-Voice Evolve and Everse speakers, EKX-18 subwoofers for a polished low end, Shure radio mics for speeches, atmospheric lighting that builds with the energy of the room — all included as standard, all backed up, all venue-friendly.

Two DJ booth styles to choose from: clean white for elegant rooms, warm rustic for barns and country settings. Both designed to flatter the venue and stay out of the photos.`,
    },
    {
      heading: `Bespoke from the first conversation`,
      body: `When you book, you get me — directly, from the first email through to the final song. Together we build a music plan that reflects your story: your must-plays, your do-not-plays, your first dance, the surprise track for your dad. By the time I arrive at your ${area.name} venue I already know the day inside out.`,
    },
  ],

  // Variant 2 — quality + experience first
  (area) => [
    {
      heading: `Award-winning wedding DJ for ${area.name} weddings`,
      body: `Fifteen years, 250+ weddings, every track mixed live. I'm Jan Blazak, and I cover ${area.name} as a core part of my service area. One DJ, one direct line of communication, no agencies and no swap-outs on the day.

Every booking is built around you and your guests. There is no template, no rigid format, and no upselling — just an honest conversation about what makes your wedding feel like your wedding.`,
    },
    {
      heading: `Why "live mixing" actually matters`,
      body: `Pre-built playlists can run the first hour. After that you need ears in the room. Live mixing means I'm watching the dancefloor and adjusting in real time — extending the bangers when the room is in full flow, easing back when the moment calls for it, layering the next track in before the current one ends.

The flow is what gets people on the dancefloor and keeps them there. It's also why the second half of the night feels as good as the first.`,
    },
    {
      heading: `Premium sound, lighting and setups — included`,
      body: `Sound is Electro-Voice (Evolve and Everse for tighter rooms, EKX-18 subs for proper low end). Lighting builds gradually rather than blasting from track one. Choice of DJ booth — clean white for elegant venues, rustic for barns and outdoor settings — so the kit looks as good as it sounds. Backup equipment in the van for every gig.`,
    },
  ],

  // Variant 3 — story / personal first
  (area) => [
    {
      heading: `Hi, I'm Jan — your wedding DJ for ${area.name}`,
      body: `I'm a full-time wedding DJ. I don't moonlight as a club DJ between bookings, I don't take corporate gigs, and I don't farm jobs out to a roster of other DJs. Every wedding I book is one I personally plan, set up, and play.

For ${area.name} couples, that means a calm planning process, a music plan that reflects you and your guests, premium kit set up with care, and a dancefloor that fills early and stays full.`,
    },
    {
      heading: `What ${area.name} couples actually want from a DJ`,
      body: `Three things, in my experience: a dancefloor that fills early and stays full; a music plan that reflects the couple, not a template; and someone who can read the room when the plan needs to flex. Live mixing is the only way to deliver all three.

A pre-built playlist can do the first hour. After that you need someone behind the decks who is actually listening to the room.`,
    },
    {
      heading: `Premium sound, atmospheric lighting and elegant setups`,
      body: `Electro-Voice Evolve and Everse speakers (the wireless Everse 12s are a game-changer for venues with awkward power layouts), EKX-18 subwoofers for a polished low end, Shure radio mics for speeches, and atmospheric lighting that adapts as the night progresses. All venue-friendly, all backed up, all included.`,
    },
  ],

  // Variant 4 — direct + practical
  (area) => [
    {
      heading: `Wedding DJ ${area.name} — bespoke, live-mixed, all-included`,
      body: `I'm Jan Blazak. I'm a full-time wedding DJ and I cover ${area.name} as one of my home patches. Every booking includes me personally on the night, premium Electro-Voice sound, atmospheric lighting, and a DJ booth chosen to suit your venue's style.

Every track is mixed live. Every wedding is planned with you directly. Every detail of the kit is venue-friendly and fully backed up.`,
    },
    {
      heading: `One DJ from enquiry to last dance`,
      body: `When you book me, you get me. There's no junior DJ assigned closer to the date, no agency in the middle, no chance of a substitute on the night. We plan together, I show up early to set up properly, and I stay focused on your room from start to finish.

That's what bespoke means — built around you, not assembled from a template.`,
    },
    {
      heading: `Live mixing, not playlists`,
      body: `Pre-built playlists can't adapt. Live mixing can. The difference shows up most in the second half of the night, when a playlist runs out of ideas and a live DJ is just hitting their stride. Track-by-track decisions, smooth transitions, and the energy of the room as the brief — that's the standard you should expect from any wedding DJ.`,
    },
  ],
];

export function getAreaContentBlocks(area) {
  const variant = pickVariant(area.slug, areaTemplates.length);
  return areaTemplates[variant](area);
}

// ---------- VENUE TEMPLATES ----------

const venueTemplates = [
  // Variant A — bespoke + venue knowledge
  (venue) => [
    {
      heading: `A wedding DJ built around ${venue.name} and your day`,
      body: `I'm Jan Blazak, a full-time wedding DJ covering ${venue.county} and the surrounding counties. Every wedding I play is mixed live — never queued from a playlist, never stitched together in advance — and every wedding is planned around you, not a template.

${venue.name} brings a real character of its own to the day. The right DJ has to respect the setting while still delivering a proper dancefloor — and that's exactly the brief I work to.`,
    },
    {
      heading: `Sound and setup that fit ${venue.name}`,
      body: `Premium Electro-Voice sound sized for the room — never over-driven, never boomy. Atmospheric lighting that builds with the energy of the room rather than blasting from track one. ${venue.bestSetup === 'rustic' ? 'My rustic DJ booth, with its illuminated heart and warm wood, complements period interiors and country settings beautifully.' : venue.bestSetup === 'castle' ? 'My clean white DJ booth complements stately interiors and keeps the sightlines elegant.' : 'Choice of two DJ booth styles — clean white for elegant rooms, rustic for barns and country settings — both designed to flatter the venue.'}

By the time I arrive at ${venue.name} I'm fully across the load-in, the power, the sound limits, and the layout. Setup is calm, on time, and out of your way.`,
    },
    {
      heading: `One DJ, planning the whole day with you`,
      body: `When you book me you get me — directly, from the first email through to the final song. We talk through your must-plays, do-not-plays, the first dance moment, the surprise tracks, the family quirks. By the day itself everything is locked in, tested, and ready.`,
    },
  ],

  // Variant B — quality + experience first
  (venue) => [
    {
      heading: `${venue.name} weddings, mixed live by Jan Blazak`,
      body: `I'm a full-time wedding DJ. I don't do clubs, corporate gigs, or anything that isn't a wedding. Every booking gets the same depth of preparation and the same person standing behind the decks on the night.

${venue.name} sits in ${venue.town}, ${venue.county}${venue.postcode ? ` (${venue.postcode})` : ''}, and it's exactly the kind of venue where the difference between a generic disco and a properly mixed wedding night becomes obvious. Live mixing, premium kit, an elegant setup — that's the standard you should expect.`,
    },
    {
      heading: `The right setup for ${venue.name}`,
      body: `${venue.bestSetup === 'rustic' ? 'My rustic DJ booth was made for venues exactly like this — warm wood, illuminated heart, and a presence that suits period and country settings.' : venue.bestSetup === 'castle' ? 'For state rooms and grand interiors, my clean white booth keeps the sightlines elegant and complements the architecture.' : 'I bring two booth styles — clean white or rustic — and we pick the one that suits the venue.'}

Sound is Electro-Voice (Evolve and Everse for tighter rooms, EKX-18 subs for proper low end). Lighting builds gradually rather than dropping like a club entrance. All venue-friendly, all backed up, all included.`,
    },
    {
      heading: `Bespoke planning, not a template`,
      body: `Most of the work happens before the day. We talk through the must-plays, the do-not-plays, the first-dance moment, the surprise tracks, the family quirks. By the time I arrive at ${venue.name} I know what's happening at every part of the day, who's making the speeches, and what kind of dancefloor energy you want from track one.`,
    },
  ],

  // Variant C — direct + venue-savvy
  (venue) => [
    {
      heading: `Wedding DJ for ${venue.name} — bespoke, live-mixed, all-included`,
      body: `I'm Jan Blazak, a full-time wedding DJ. I cover ${venue.town} and ${venue.county} as a regular part of my service patch, and ${venue.name} is exactly the kind of venue where the difference between a playlist and a properly mixed wedding night shows up.

Every booking includes me personally on the night, premium Electro-Voice sound, atmospheric lighting, and a DJ booth chosen to suit the venue's style.`,
    },
    {
      heading: `Live mixing, not a playlist`,
      body: `Every track is mixed live, not played from a Spotify queue. That's the line that separates a wedding DJ from a "DJ service" — the ability to read the room, adjust the energy, and keep the dancefloor full once the obvious bangers have already played. Live mixing is what makes the back half of the night feel as good as the first half.`,
    },
    {
      heading: `What's included as standard at ${venue.name}`,
      body: `Premium Electro-Voice sound system sized for your room. Atmospheric lighting that builds with the night. ${venue.bestSetup === 'rustic' ? 'My rustic DJ booth — warm wood with an illuminated heart, a natural fit for period and country settings.' : venue.bestSetup === 'castle' ? 'My clean white DJ booth — designed to complement elegant interiors and keep sightlines clean.' : 'A choice of DJ booth — white for elegant rooms, rustic for barns and country settings.'} Shure radio mics for speeches. Full backup equipment. Direct communication with me throughout planning, and me personally behind the decks on the night.`,
    },
  ],
];

export function getVenueContentBlocks(venue) {
  const variant = pickVariant(venue.slug, venueTemplates.length);
  return venueTemplates[variant](venue);
}

// ---------- TESTIMONIAL ROTATION ----------
// Real testimonials from realWeddings.js, rotated by slug hash so each
// location surfaces a different story.

const testimonials = [
  {
    couple: 'Olivia',
    date: '14 March 2026',
    quote:
      "From the moment we booked with Jan we couldn't have been happier. He listened to what sort of music we wanted, gave great tips and ideas, and thought about the age range of our guests. Our guests ranged from 2 years old to 80+ and the dance floor was filled the whole time.",
  },
  {
    couple: 'Caroline',
    date: '23 August 2025',
    quote:
      "It was made clear our requests weren't going to be easy but he worked his magic and got everyone on the dance floor all night. We used the rustic set and it was perfect for our venue! Jan shows a lot of enthusiasm for what he does!",
  },
  {
    couple: 'Holli',
    date: '5 April 2025',
    quote:
      "We were after a little something different for our wedding as we are drum and bass ravers. Jan was our perfect match. He absolutely smashed it and we were on the dance floor all night. Every tune was a banger.",
  },
  {
    couple: 'Luke',
    date: '12 August 2025',
    quote:
      "Jan was absolutely incredible for our wedding, he set the place alight!! From taking our initial brief through to bringing it to reality, he was engaged and adaptive. Guests were absolutely buzzing and danced the night away!",
  },
  {
    couple: 'Mr & Mrs Edwards',
    date: '23 May 2025',
    quote:
      "From the welcome playlist to the party music, everything played at the wedding was on point for each individual part of the day. Jan kept the guests on their feet and really in tune.",
  },
  {
    couple: 'Darren',
    date: '15 June 2024',
    quote:
      "Jan created a brilliant atmosphere for our celebration. The crowd was very mixed, and somehow he managed to cater to all. Jan read the room and played the music needed to keep people on the dance floor all night. 10/10.",
  },
];

export function getTestimonial(slug) {
  return testimonials[pickVariant(`${slug}-tm`, testimonials.length)];
}

// ---------- FAQ BANK ----------

const faqBank = [
  {
    q: 'Do you cover {location}?',
    a: '{location} is a regular part of my service area. I cover {county} and the surrounding counties as standard, with no extra travel fee for venues in this region.',
  },
  {
    q: 'How far in advance should I book a wedding DJ for {location}?',
    a: 'Most couples book between 12 and 18 months ahead. Saturdays in summer go first, but weeknight and winter dates are often available with shorter notice. Get in touch with your date and I\'ll let you know straight away if it\'s free.',
  },
  {
    q: 'Do you work exclusively as a wedding DJ?',
    a: 'Yes. While my background includes radio, clubs, and live events, my focus today is entirely on weddings. That focus is what allows me to understand the flow, etiquette, and atmosphere that make wedding celebrations feel seamless and memorable.',
  },
  {
    q: 'Will I meet you before the wedding?',
    a: 'Absolutely. You work directly with me from the very first conversation through to the final song of the night. There are no handovers, no agencies, and no substitute DJs.',
  },
  {
    q: 'Do you use playlists or mix live?',
    a: 'Every track is mixed live. I don\'t rely on pre-recorded sets or automated playlists. Live mixing allows me to adapt to your guests, maintain energy, and create a natural flow throughout the evening.',
  },
  {
    q: 'Can we choose our own music?',
    a: 'Yes. You\'re encouraged to share must-play songs, favourite genres, and do-not-play requests. Your preferences come first and shape the entire music plan.',
  },
  {
    q: 'Do you take guest requests on the night?',
    a: 'Guest requests are welcome where appropriate, but they will never override your wishes. I balance requests with your music plan and the overall flow of the evening.',
  },
  {
    q: 'What equipment do you provide?',
    a: 'Professional Electro-Voice sound systems, elegant DJ booths (white or rustic), atmospheric lighting, and Shure radio mics for speeches as standard. All equipment is venue-friendly, discreetly installed, and fully backed up for peace of mind.',
  },
  {
    q: 'What happens if equipment fails on the night?',
    a: 'I carry full backup systems for every gig — duplicate sound and a separate set of lighting. In 250+ weddings I\'ve never lost a dancefloor to a kit issue, because the backup is always there ready to go.',
  },
  {
    q: 'Do you provide ceremony and drinks-reception music too?',
    a: 'Yes — many couples book the All-Day Wraparound package. One DJ, one setup, one consistent thread running from welcome music through ceremony, breakfast soundtrack, speeches, and the evening party.',
  },
];

export function getLocationFAQs(slug, locationName, county, count = 6) {
  const startIdx = pickVariant(`${slug}-faq`, faqBank.length - count);
  const faqs = [];
  for (let i = 0; i < count; i += 1) {
    const f = faqBank[(startIdx + i) % faqBank.length];
    faqs.push({
      q: f.q.replace(/\{location\}/g, locationName).replace(/\{county\}/g, county),
      a: f.a.replace(/\{location\}/g, locationName).replace(/\{county\}/g, county),
    });
  }
  return faqs;
}
