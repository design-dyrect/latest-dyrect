import {createClient} from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '2clvfbpa',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-06-03',
  useCdn: false,
});

const SITE = 'https://dyrect.co';

// Fetch once and cache at module level during the request
let _cached = null;
async function getSiteSettings() {
  if (_cached) return _cached;
  _cached = await client.fetch(
    `*[_type == "siteSettings"][0]{
      siteTitle, siteUrl, defaultOgImage,
      seo_home, seo_features, seo_pricing, seo_faqs,
      seo_product_registration, seo_warranty_management, seo_extended_warranties,
      seo_partners, seo_case_studies, seo_showcase, seo_integrations,
      seo_sol_electronics, seo_sol_outdoors, seo_sol_baby, seo_sol_beauty,
      seo_sol_mobile, seo_sol_appliances, seo_sol_tv, seo_sol_fitness,
      seo_sol_furniture, seo_sol_smart_home, seo_sol_cycling
    }`
  ).catch(() => null);
  // Reset cache after 60s so edits show up quickly
  setTimeout(() => { _cached = null; }, 60_000);
  return _cached;
}

// Map of pageId → default title + description + path
const PAGE_DEFAULTS = {
  home:                   {title: 'Dyrect — The most seamless warranty management software',       desc: 'Warranty registration, claims management, tracking, and extended warranty workflows for modern product brands.', path: '/'},
  features:               {title: 'Features | Dyrect',                                             desc: 'Explore all Dyrect features: product registration, warranty claims, extended warranties, digital warranty cards, and more.', path: '/features'},
  pricing:                {title: 'Pricing | Dyrect',                                              desc: 'Simple, transparent pricing for Dyrect warranty management software.', path: '/pricing'},
  faqs:                   {title: "FAQ's | Dyrect",                                                desc: 'Frequently asked questions about Dyrect warranty management and product registration software.', path: '/faqs'},
  product_registration:   {title: 'Product Registration Software | Dyrect',                       desc: 'Omni-channel product registration software. Capture first-party customer data at scale.', path: '/product/product-registration-software'},
  warranty_management:    {title: 'Warranty Management Software | Dyrect',                        desc: 'Reduce costs and process claims faster. Trusted by 500+ brands globally.', path: '/product/warranty-management-software'},
  extended_warranties:    {title: 'Extended Warranties | Dyrect',                                 desc: 'Offer extended warranty plans. Keep 100% of revenue in-house.', path: '/product/extended-warranties'},
  partners:               {title: 'Partners | Dyrect',                                            desc: 'Explore technology, commerce, and warranty partners.', path: '/partners'},
  case_studies:           {title: 'Case Studies | Dyrect',                                        desc: 'See how top product brands use Dyrect to streamline warranty workflows.', path: '/case-studies'},
  showcase:               {title: 'Brand Showcase | Dyrect',                                      desc: 'See how top brands build post-purchase experiences with Dyrect.', path: '/showcase'},
  integrations:           {title: 'Integrations | Dyrect',                                        desc: "All your favourite tools, connected. Shopify, Klaviyo, HubSpot, Zendesk and 20+ more.", path: '/integrations'},
  sol_electronics:        {title: 'Warranty Management for Electronics Brands | Dyrect',          desc: 'Product registration and warranty management for electronics brands.', path: '/solutions/electronics'},
  sol_outdoors:           {title: 'Warranty Management for Outdoors & Recreation Brands | Dyrect', desc: 'Streamline warranty workflows for outdoor and recreation brands.', path: '/solutions/outdoors-recreation'},
  sol_baby:               {title: 'Warranty Management for Baby Gear Brands | Dyrect',             desc: 'Seamless product registration and warranty management for baby gear brands.', path: '/solutions/baby-gear'},
  sol_beauty:             {title: 'Warranty Management for Beauty & Personal Care Brands | Dyrect', desc: 'Product registration software for beauty and personal care brands.', path: '/solutions/beauty-personal-care'},
  sol_mobile:             {title: 'Warranty Management for Mobile Accessories Brands | Dyrect',    desc: 'Warranty registration and claims for mobile accessories brands.', path: '/solutions/mobile-accessories'},
  sol_appliances:         {title: 'Warranty Management for Home Appliance Brands | Dyrect',        desc: 'Streamline warranty workflows for home appliance brands.', path: '/solutions/home-appliances'},
  sol_tv:                 {title: 'Warranty Management for TV, Audio & Video Brands | Dyrect',     desc: 'Warranty management for TV, audio and video brands.', path: '/solutions/tv-audio-video'},
  sol_fitness:            {title: 'Warranty Management for Exercise & Fitness Brands | Dyrect',    desc: 'Product registration and warranty management for fitness brands.', path: '/solutions/exercise-fitness'},
  sol_furniture:          {title: 'Warranty Management for Furniture Brands | Dyrect',             desc: 'Warranty registration and claims for furniture brands.', path: '/solutions/furniture'},
  sol_smart_home:         {title: 'Warranty Management for Smart Home & Network Brands | Dyrect',  desc: 'Product registration for smart home and network device brands.', path: '/solutions/smart-home-and-network'},
  sol_cycling:            {title: 'Warranty Management for Cycling Brands | Dyrect',               desc: 'Product registration and warranty management for cycling brands.', path: '/solutions/cycling'},
};

/**
 * Get fully resolved Next.js metadata for a page.
 * Falls back to PAGE_DEFAULTS when Sanity fields are empty.
 *
 * @param {string} pageId  — key from PAGE_DEFAULTS map (e.g. 'home', 'features', 'sol_electronics')
 */
export async function getPageMetadata(pageId) {
  const settings = await getSiteSettings();
  const sanityField = settings?.[`seo_${pageId}`] || null;
  const defaults = PAGE_DEFAULTS[pageId] || {};

  const title       = sanityField?.title       || defaults.title       || 'Dyrect';
  const description = sanityField?.description || defaults.desc        || '';
  const noIndex     = sanityField?.noIndex     || false;
  const path        = defaults.path            || '/';
  const canonical   = `${SITE}${path}`;

  // OG image: page-specific → site default → fallback
  let ogImageUrl = `${SITE}/assets/og-default.png`;
  if (sanityField?.ogImage?.asset) {
    try {
      const ref = sanityField.ogImage.asset._ref;
      // Build Sanity CDN URL from asset ref
      const [, id, dims, ext] = ref.match(/^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/) || [];
      if (id) ogImageUrl = `https://cdn.sanity.io/images/2clvfbpa/production/${id}-${dims}.${ext}?w=1200&h=630&fit=crop`;
    } catch (_) {}
  } else if (settings?.defaultOgImage?.asset) {
    try {
      const ref = settings.defaultOgImage.asset._ref;
      const [, id, dims, ext] = ref.match(/^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/) || [];
      if (id) ogImageUrl = `https://cdn.sanity.io/images/2clvfbpa/production/${id}-${dims}.${ext}?w=1200&h=630&fit=crop`;
    } catch (_) {}
  }

  return {
    title,
    description,
    alternates: {canonical},
    robots: noIndex ? {index: false, follow: false} : {index: true, follow: true},
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Dyrect',
      images: [{url: ogImageUrl, width: 1200, height: 630, alt: title}],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}
