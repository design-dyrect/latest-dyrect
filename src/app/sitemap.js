import {createClient} from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '2clvfbpa',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-06-03',
  useCdn: false,
});

const SITE = 'https://dyrect.co';

// Static pages with their priorities and change frequencies
const STATIC_PAGES = [
  {url: '/',                                    priority: 1.0, changeFrequency: 'weekly'},
  {url: '/product/product-registration-software', priority: 0.9, changeFrequency: 'monthly'},
  {url: '/product/warranty-management-software',  priority: 0.9, changeFrequency: 'monthly'},
  {url: '/product/extended-warranties',           priority: 0.9, changeFrequency: 'monthly'},
  {url: '/features',                             priority: 0.8, changeFrequency: 'monthly'},
  {url: '/pricing',                              priority: 0.8, changeFrequency: 'monthly'},
  {url: '/partners',                             priority: 0.7, changeFrequency: 'weekly'},
  {url: '/case-studies',                         priority: 0.8, changeFrequency: 'weekly'},
  {url: '/showcase',                             priority: 0.7, changeFrequency: 'weekly'},
  {url: '/integrations',                         priority: 0.7, changeFrequency: 'weekly'},
  {url: '/faqs',                                 priority: 0.6, changeFrequency: 'monthly'},
  {url: '/solutions/electronics',                priority: 0.6, changeFrequency: 'monthly'},
  {url: '/solutions/outdoors-recreation',        priority: 0.6, changeFrequency: 'monthly'},
  {url: '/solutions/baby-gear',                  priority: 0.6, changeFrequency: 'monthly'},
  {url: '/solutions/beauty-personal-care',       priority: 0.6, changeFrequency: 'monthly'},
  {url: '/solutions/mobile-accessories',         priority: 0.6, changeFrequency: 'monthly'},
  {url: '/solutions/home-appliances',            priority: 0.6, changeFrequency: 'monthly'},
  {url: '/solutions/tv-audio-video',             priority: 0.6, changeFrequency: 'monthly'},
  {url: '/solutions/exercise-fitness',           priority: 0.6, changeFrequency: 'monthly'},
  {url: '/solutions/furniture',                  priority: 0.6, changeFrequency: 'monthly'},
  {url: '/solutions/smart-home-and-network',     priority: 0.6, changeFrequency: 'monthly'},
  {url: '/solutions/cycling',                    priority: 0.6, changeFrequency: 'monthly'},
];

export default async function sitemap() {
  const now = new Date().toISOString();

  // Static pages
  const staticEntries = STATIC_PAGES.map(({url, priority, changeFrequency}) => ({
    url: `${SITE}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  // Fetch dynamic CMS pages from Sanity
  const [partners, caseStudies, showcases, integrations] = await Promise.all([
    client.fetch(`*[_type == "partner" && status != "archived" && !noIndex]{slug, _updatedAt}`).catch(() => []),
    client.fetch(`*[_type == "caseStudy" && status != "archived" && !noIndex]{slug, _updatedAt}`).catch(() => []),
    client.fetch(`*[_type == "brandShowcase" && status != "archived" && !noIndex]{slug, _updatedAt}`).catch(() => []),
    client.fetch(`*[_type == "integration" && status != "archived" && !noIndex]{slug, _updatedAt}`).catch(() => []),
  ]);

  const partnerEntries = partners
    .filter(p => p.slug?.current)
    .map(p => ({
      url: `${SITE}/partners/${p.slug.current}`,
      lastModified: p._updatedAt || now,
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

  const caseStudyEntries = caseStudies
    .filter(c => c.slug?.current)
    .map(c => ({
      url: `${SITE}/case-studies/${c.slug.current}`,
      lastModified: c._updatedAt || now,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  const showcaseEntries = showcases
    .filter(s => s.slug?.current)
    .map(s => ({
      url: `${SITE}/showcase/${s.slug.current}`,
      lastModified: s._updatedAt || now,
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

  const integrationEntries = integrations
    .filter(i => i.slug?.current)
    .map(i => ({
      url: `${SITE}/integrations/${i.slug.current}`,
      lastModified: i._updatedAt || now,
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

  return [
    ...staticEntries,
    ...partnerEntries,
    ...caseStudyEntries,
    ...showcaseEntries,
    ...integrationEntries,
  ];
}
