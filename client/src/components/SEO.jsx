import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import {
  SITE_URL,
  SITE_NAME,
  SITE_LOCALE,
  DEFAULT_OG_IMAGE,
  OG_IMAGE_DIMENSIONS,
  toAbsoluteUrl,
  defaultSchema,
} from '../lib/site';

export default function SEO({
  title,
  description,
  keyword,
  image,
  imageAlt,
  canonical,
  type = 'website',
  noindex = false,
  schema,      // custom JSON-LD object — replaces the default if provided
  breadcrumbs, // [{ name, path }] — appended to default schema when present
}) {
  const location = useLocation();
  const pathname = location?.pathname || '/';

  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const cleanDescription = (description || '').trim();

  const canonicalPath = canonical || pathname || '/';
  const canonicalUrl = toAbsoluteUrl(canonicalPath);

  const imagePath = image || DEFAULT_OG_IMAGE;
  const imageUrl = toAbsoluteUrl(imagePath);
  const imageDims = OG_IMAGE_DIMENSIONS[imagePath];

  const finalSchema = schema || defaultSchema({
    pageUrl: canonicalUrl,
    title: fullTitle,
    description: cleanDescription,
    image: imageUrl,
    breadcrumbs,
  });

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {cleanDescription && <meta name="description" content={cleanDescription} />}
      {keyword && <meta name="keywords" content={keyword} />}
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      {cleanDescription && <meta property="og:description" content={cleanDescription} />}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={SITE_LOCALE} />
      <meta property="og:image" content={imageUrl} />
      {imageDims && <meta property="og:image:width" content={String(imageDims.width)} />}
      {imageDims && <meta property="og:image:height" content={String(imageDims.height)} />}
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {cleanDescription && <meta name="twitter:description" content={cleanDescription} />}
      <meta name="twitter:image" content={imageUrl} />
      {imageAlt && <meta name="twitter:image:alt" content={imageAlt} />}

      {/* Structured data */}
      {finalSchema && (
        <script type="application/ld+json">{JSON.stringify(finalSchema)}</script>
      )}
    </Helmet>
  );
}
