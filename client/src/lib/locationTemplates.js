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

const areaTemplates = [
  // Variant 1 — local context first, then USPs
  (area) => [
    {
      heading: `Wedding DJ in ${area.name} — Live Mixing, Premium Sound, Elegant Setups`,
      body: `Looking for a wedding DJ in ${area.name}? I'm Jan Blazak, a full-time wedding specialist covering ${area.county} and the surrounding counties. Every wedding I play is mixed live — no automated playlists, no stitched-together tracks, and no last-minute substitute DJs. You work directly with me from the first conversation through to the final dance.

${area.intro || ''}`.trim(),
    },
    {
      heading: `What you get when you book me for your ${area.name} wedding`,
      body: `Premium Electro-Voice sound, atmospheric lighting that shifts with the energy of the room, and a DJ booth — choose between elegant white or rustic — that complements the look of your venue. Setup is venue-friendly and discreet, with a full backup system already in the van.

I only do weddings. I don't moonlight as a club DJ between bookings. That focus is the difference between a generic disco and a wedding-night atmosphere.`,
    },
    {
      heading: `Live mixing — why it matters for ${area.name} weddings`,
      body: `Wedding crowds are mixed: different ages, different musical tastes, different energy levels through the night. A pre-built playlist can't read that. Live mixing means I'm watching the dancefloor and adjusting in real time — extending the bangers when the room is in full flow, easing back when the moment calls for it, layering the next track in before the current one ends. The flow is the bit that gets people dancing all night.`,
    },
  ],

  // Variant 2 — USPs first, then local angle
  (area) => [
    {
      heading: `Award-winning wedding DJ covering ${area.name} and ${area.county}`,
      body: `Fifteen years, 250+ weddings, every single track mixed live. I'm Jan Blazak, and I cover ${area.name} as a core part of my service area — from city-centre hotels to country house estates and barn venues just outside town. One DJ, one direct line of communication, no agencies and no swap-outs on the day.`,
    },
    {
      heading: `${area.name} weddings deserve more than a playlist`,
      body: `Most "DJ services" play tracks back to back from Spotify. That's a disco, not a wedding. Live mixing is a different craft — reading a mixed crowd, shifting genres without breaking the energy, knowing when to drop the obvious banger and when to surprise the room. You'll feel the difference within the first half hour.

${area.intro || ''}`.trim(),
    },
    {
      heading: `Sound, lighting and setup that fit the venue`,
      body: `I bring premium Electro-Voice systems sized for the room, not over-spec'd. Atmospheric lighting that builds gradually rather than blasting from track one. And a choice of DJ booth — clean white for elegant venues, rustic for barns and outdoor settings — so the kit looks as good as it sounds.`,
    },
  ],

  // Variant 3 — story-led intro
  (area) => [
    {
      heading: `Hi, I'm Jan — your wedding DJ for ${area.name}`,
      body: `${area.intro ? area.intro + ' ' : ''}Whatever the setting, the brief is the same: a packed dancefloor, an atmosphere that flows naturally through the night, and zero stress for you on the day.

I've played hundreds of weddings across ${area.county} and beyond, and I work with one couple at a time. There's no team, no franchise, no agency — just me, the kit, and a music plan we build together.`,
    },
    {
      heading: `What ${area.name} couples actually want from a DJ`,
      body: `Three things, in my experience: a dancefloor that fills early and stays full; a music plan that reflects the couple, not a template; and someone who can read the room when the plan needs to flex. Live mixing is the only way to deliver all three. A pre-built playlist can do the first hour — after that you need ears in the room.`,
    },
    {
      heading: `Premium sound and lighting included as standard`,
      body: `Electro-Voice Evolve and Everse speakers (the wireless Everse 12s are a game-changer for venues with awkward power layouts), EKX-18 subwoofers for a polished low end, Shure radio mics for speeches and toasts, and atmospheric lighting that adapts as the night progresses. All venue-friendly, all backed up, all included.`,
    },
  ],

  // Variant 4 — direct + practical
  (area) => [
    {
      heading: `Wedding DJ ${area.name} — straightforward, professional, focused on weddings`,
      body: `I'm Jan Blazak. I cover ${area.name} as one of my home patches and I only do weddings. That means the experience is built around what makes wedding nights work — not corporate gigs or club bookings squeezed in between.

Every booking includes me personally on the night, premium sound, atmospheric lighting, and a DJ booth chosen to suit your venue's style.`,
    },
    {
      heading: `One DJ from enquiry to last dance`,
      body: `When you book me, you get me. There's no junior DJ assigned closer to the date and no agency in the middle. We plan together, I show up early to set up properly, and I stay focused on your room from start to finish.

${area.intro ? `That matters in ${area.name} specifically because ${area.intro.charAt(0).toLowerCase() + area.intro.slice(1)}` : ''}`,
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
  // Variant A — castle/grand setting bias
  (venue) => [
    {
      heading: `Wedding DJ at ${venue.name}`,
      body: `${venue.name} is one of those venues that makes the music decision easier and harder at the same time. ${venue.builtEra}, ${venue.setting?.toLowerCase()}. The setting does half the work — but the right DJ has to do the other half. I'm Jan Blazak, an experienced wedding DJ covering ${venue.county} and the surrounding counties, and I've planned weddings for venues like this often enough to know exactly what works in the rooms and what doesn't.`,
    },
    {
      heading: `Sound and setup that fit ${venue.name}`,
      body: `Grand spaces with stone, glass and high ceilings need a different sound approach than a low-ceilinged barn or marquee. I size the system to the room — not over-driven, not boomy — and I run the lighting as a build, not a barrage. ${venue.bestSetup === 'rustic' ? 'My rustic DJ booth complements period interiors beautifully.' : 'My clean white DJ booth complements the elegance of the state rooms.'}

${venue.keyRooms?.length ? `Whether the dancing happens in the ${venue.keyRooms.slice(0, 2).join(' or the ')}, the kit is set up to flatter the space and stay out of the photos.` : ''}`.trim(),
    },
    {
      heading: `Why couples book me for ${venue.name}`,
      body: `Live mixing rather than pre-built playlists. Direct communication with me from enquiry to last dance — no agencies, no substitutes. Atmospheric lighting that builds with the energy of the room. And a level of preparation that means I'm fully across the venue's quirks before I arrive: load-in routes, power, sound limits, ceremony layouts, the lot.`,
    },
  ],

  // Variant B — barn/rustic bias (will still read fine for other styles)
  (venue) => [
    {
      heading: `${venue.name} weddings, mixed live by Jan Blazak`,
      body: `${venue.setting || `${venue.name} sits in ${venue.town}, ${venue.county}.`} If you're planning your wedding here and you're looking for a DJ who's going to bring atmosphere without overwhelming the venue, that's exactly the brief I work to.

I'm a full-time wedding DJ — I don't do clubs, corporate gigs, or anything that isn't a wedding. Every booking gets the same depth of preparation and the same person standing behind the decks on the night.`,
    },
    {
      heading: `The right setup for ${venue.name}`,
      body: `${venue.bestSetup === 'rustic' ? 'My rustic DJ booth was made for venues exactly like this — warm wood, illuminated heart, and a presence that suits period and country settings.' : venue.bestSetup === 'castle' ? 'For the state rooms, my clean white booth keeps the sightlines elegant.' : 'I bring two booth styles — clean white or rustic — and we pick the one that suits the venue.'} Sound is Electro-Voice (Evolve and Everse for tighter rooms, EKX-18 subs for proper low end). Lighting builds gradually rather than dropping like a club entrance — that's not the vibe for ${venue.name}.`,
    },
    {
      heading: `Planning, not just playing`,
      body: `Most of the work happens before the day. We talk through the must-plays, the do-not-plays, the first-dance moment, the surprise tracks, the family quirks. By the time I arrive at ${venue.name} I know what's happening at every part of the day, who's making the speeches, and what kind of dancefloor energy you want from track one.`,
    },
  ],

  // Variant C — direct + venue-knowledgeable
  (venue) => [
    {
      heading: `Wedding DJ for ${venue.name}, ${venue.town}`,
      body: `${venue.name} is in ${venue.town}, ${venue.county}${venue.postcode ? ` (${venue.postcode})` : ''} — and I cover this area as a regular part of my service patch. I'm Jan Blazak, a full-time wedding DJ. ${venue.distinctiveFeatures?.length ? `${venue.name} brings ${venue.distinctiveFeatures.slice(0, 2).join(' and ').toLowerCase()} into the mix, and the music has to respect the setting while still delivering a proper dancefloor.` : ''}`,
    },
    {
      heading: `Live mixing, not a playlist`,
      body: `Every track is mixed live, not played from a Spotify queue. That's the line that separates a wedding DJ from a "DJ service" — the ability to read the room, adjust the energy, and keep the dancefloor full once the obvious bangers have already played. Live mixing is what makes the back half of the night feel as good as the first half.`,
    },
    {
      heading: `What's included as standard`,
      body: `Premium Electro-Voice sound system sized for your room. Atmospheric lighting that builds with the night. A choice of DJ booth — white for elegant rooms, rustic for barns and country settings. Shure radio mics for speeches. Full backup equipment. Direct communication with me throughout planning, and me personally behind the decks on the night.`,
    },
  ],
];

export function getVenueContentBlocks(venue) {
  const variant = pickVariant(venue.slug, venueTemplates.length);
  return venueTemplates[variant](venue);
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
