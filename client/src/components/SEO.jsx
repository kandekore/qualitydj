import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, keyword, image, canonical }) {
  const siteName = 'Quality Wedding DJ';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || ''} />
      {keyword && <meta name="keywords" content={keyword} />}
      {canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || ''} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || ''} />
    </Helmet>
  );
}
