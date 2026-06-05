import {urlFor} from './image';

const SITE_URL = 'https://dyrect.co';
const DEFAULT_OG = '/assets/logo-blue-wordmark.png';

/**
 * Build Next.js metadata from a Sanity document's SEO fields.
 * Covers: title, description, canonical, noIndex, OG image, robots.
 *
 * @param {object} doc  - Sanity document with seoTitle, seoDescription, etc.
 * @param {object} opts - { defaultTitle, defaultDescription, path }
 */
export function buildMetadata(doc, opts = {}) {
  if (!doc) return {title: opts.defaultTitle || 'Dyrect'};

  const title       = doc.seoTitle       || opts.defaultTitle       || doc.title || doc.customerName || doc.brandName || 'Dyrect';
  const description = doc.seoDescription || opts.defaultDescription || doc.summary || doc.excerpt     || '';
  const canonical   = doc.canonicalUrl   || (opts.path ? `${SITE_URL}${opts.path}` : undefined);
  const noIndex     = doc.noIndex        || false;

  // OG image
  let ogImageUrl = DEFAULT_OG;
  if (doc.ogImage) {
    try { ogImageUrl = urlFor(doc.ogImage).width(1200).height(630).fit('crop').url(); } catch (_) {}
  }

  return {
    title,
    description,
    ...(canonical && {
      alternates: {canonical},
    }),
    robots: noIndex
      ? {index: false, follow: false}
      : {index: true, follow: true},
    openGraph: {
      title,
      description,
      ...(canonical && {url: canonical}),
      images: [{url: ogImageUrl, width: 1200, height: 630, alt: title}],
      siteName: 'Dyrect',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}
