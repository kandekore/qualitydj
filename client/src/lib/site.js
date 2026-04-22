// Shared site metadata used for SEO, OG, and schema.org output.

export const SITE_URL = 'https://qualityweddingdj.co.uk';
export const SITE_NAME = 'Quality Wedding DJ';
export const SITE_LEGAL = 'Let The Music Play Ltd';
export const SITE_TAGLINE = 'Your Wedding, Your Music: Expertly Mixed for an Unforgettable Celebration';
export const SITE_LOCALE = 'en_GB';
export const SITE_LOGO = `${SITE_URL}/assets/brand/logo-1024x1000.jpg`;
export const DEFAULT_OG_IMAGE = '/assets/images/adobe/adobestock_137506782.webp';

export const AREAS_SERVED = ['Worcestershire', 'Warwickshire', 'Herefordshire'];

// Known dimensions for images in /assets/images/adobe/ (used for og:image:width/height).
// All adobe images are 2000px wide; height varies.
export const OG_IMAGE_DIMENSIONS = {
  '/assets/images/adobe/adobestock_137506782.webp': { width: 2000, height: 1335 },
  '/assets/images/adobe/adobestock_138205915.webp': { width: 2000, height: 1335 },
  '/assets/images/adobe/adobestock_1841384988.webp': { width: 2000, height: 1125 },
  '/assets/images/adobe/adobestock_1948374433.webp': { width: 2000, height: 1091 },
  '/assets/images/adobe/adobestock_1966018059.webp': { width: 2000, height: 1333 },
  '/assets/images/adobe/adobestock_226243526.webp': { width: 2000, height: 1333 },
  '/assets/images/adobe/adobestock_226243697.webp': { width: 2000, height: 1333 },
  '/assets/images/adobe/adobestock_417571252.webp': { width: 2000, height: 764 },
  '/assets/images/adobe/adobestock_567551298.webp': { width: 2000, height: 1331 },
  '/assets/images/adobe/adobestock_762134491.webp': { width: 2000, height: 1333 },
  '/assets/images/adobe/adobestock_762135016.webp': { width: 2000, height: 1333 },
  '/assets/images/adobe/adobestock_857261396.webp': { width: 2000, height: 1121 },
  '/assets/images/adobe/adobestock_894754720.webp': { width: 2000, height: 1333 },
  '/assets/images/adobe/adobestock_903002824.webp': { width: 2000, height: 1191 },
};

export function toAbsoluteUrl(pathOrUrl, base = SITE_URL) {
  if (!pathOrUrl) return null;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  if (!pathOrUrl.startsWith('/')) return `${base}/${pathOrUrl}`;
  return `${base}${pathOrUrl}`;
}

// Default schema fragment injected on every page that doesn't override with its own `schema` prop.
// Uses @graph so multiple nodes can coexist cleanly.
export function defaultSchema({ pageUrl, title, description, image, breadcrumbs }) {
  const businessId = `${SITE_URL}/#business`;
  const websiteId = `${SITE_URL}/#website`;

  const graph = [
    {
      '@type': 'LocalBusiness',
      '@id': businessId,
      name: SITE_NAME,
      alternateName: SITE_LEGAL,
      url: SITE_URL,
      image: image || toAbsoluteUrl(DEFAULT_OG_IMAGE),
      logo: SITE_LOGO,
      priceRange: '£££',
      description: description || SITE_TAGLINE,
      areaServed: AREAS_SERVED.map((name) => ({ '@type': 'AdministrativeArea', name })),
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Worcestershire',
        addressCountry: 'GB',
      },
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { '@id': businessId },
      inLanguage: 'en-GB',
    },
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: title,
      description,
      isPartOf: { '@id': websiteId },
      about: { '@id': businessId },
      ...(image && { primaryImageOfPage: { '@type': 'ImageObject', url: image } }),
    },
  ];

  if (Array.isArray(breadcrumbs) && breadcrumbs.length > 0) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: b.name,
        item: toAbsoluteUrl(b.path),
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
