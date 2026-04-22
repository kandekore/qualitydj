// Venue data for /wedding-dj/venues/:slug pages.
// Each entry needs enough factual context for the templates to write
// venue-specific copy. Add `style` ("castle" | "barn" | "hotel" | "country house"
// | "marquee") so the template engine can pick the right setup recommendation.

export const venues = [
  {
    slug: 'eastnor-castle',
    name: 'Eastnor Castle',
    town: 'Ledbury',
    county: 'Herefordshire',
    postcode: 'HR8 1RL',
    style: 'castle',
    builtEra: 'Built in the early 1800s as a Gothic Revival castle',
    setting:
      'Set at the foot of the Malvern Hills in 5,000 acres of deer park, arboretum and lakes',
    keyRooms: ['Gothic Drawing Room', 'Octagon Saloon', 'Great Hall', 'State Dining Room'],
    capacityNote: 'State rooms host civil ceremonies, dinners and evening receptions for varied party sizes',
    distinctiveFeatures: [
      'Lakeside grounds with outdoor ceremony backdrops',
      'On-site castle bedrooms and holiday cottages',
      'Deer park and arboretum',
      'Dog-friendly venue',
    ],
    bestSetup: 'rustic',
    heroImage: '/assets/images/gallery-castle-party.webp',
    website: 'https://www.eastnorcastle.com/',
  },
];

export function getVenueBySlug(slug) {
  return venues.find((v) => v.slug === slug);
}

export function listVenues() {
  return venues.map(({ slug, name, town, county }) => ({ slug, name, town, county }));
}
