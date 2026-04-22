// Area data for /wedding-dj/:slug pages.
// Add a new entry here to publish a new area landing page.
// Postcodes and population aren't strictly required but help the
// hash-rotated templates produce richer location-specific copy.

export const areas = [
  {
    slug: 'worcester',
    name: 'Worcester',
    county: 'Worcestershire',
    countySlug: 'worcestershire',
    postcodes: ['WR1', 'WR2', 'WR3', 'WR4', 'WR5'],
    population: 103000,
    areaType: 'city',
    intro:
      'Cathedral city on the River Severn, with Georgian streets, the Worcester Porcelain quarter, and a wedding scene that ranges from grand country estates on its outskirts to elegant city-centre hotels and historic riverside venues.',
    nearbyAreas: [
      { name: 'Droitwich Spa', slug: 'droitwich-spa' },
      { name: 'Malvern', slug: 'malvern' },
      { name: 'Pershore', slug: 'pershore' },
      { name: 'Bromsgrove', slug: 'bromsgrove' },
    ],
    heroImage: '/assets/images/gallery-castle-party.webp',
    nearbyVenues: ['stanbrook-abbey-hotel', 'birtsmorton-court', 'brockencote-hall-hotel'],
  },
];

export function getAreaBySlug(slug) {
  return areas.find((a) => a.slug === slug);
}

export function listAreas() {
  return areas.map(({ slug, name, county, countySlug }) => ({ slug, name, county, countySlug }));
}
