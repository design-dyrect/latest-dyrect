import {defineQuery} from 'next-sanity';

// ─── Partners ────────────────────────────────────────────────────────────────

export const partnersQuery = defineQuery(`
  *[_type == "partner" && status != "archived"] | order(featured desc, title asc) {
    _id, title, slug, logo, websiteUrl, summary, type, country, featured
  }
`);

export const partnerBySlugQuery = defineQuery(`
  *[_type == "partner" && slug.current == $slug][0] {
    _id, title, slug, logo, websiteUrl, summary, about,
    type, country, category, featured, seoTitle, seoDescription
  }
`);

// ─── Case Studies ─────────────────────────────────────────────────────────────

export const caseStudiesQuery = defineQuery(`
  *[_type == "caseStudy" && status != "archived"] | order(_createdAt desc) {
    _id, title, customerName, slug, customerLogo, heroImage,
    industry, country, solutionUsed, excerpt
  }
`);

export const caseStudyBySlugQuery = defineQuery(`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id, title, customerName, slug, customerLogo, heroImage,
    industry, country, solutionUsed,
    excerpt, challenge, solution, results, metrics,
    quote, quoteAuthor, quoteRole, quoteAuthorImage,
    videoUrl, story,
    seoTitle, seoDescription
  }
`);

// ─── Brand Showcases ──────────────────────────────────────────────────────────

export const brandShowcasesQuery = defineQuery(`
  *[_type == "brandShowcase" && status != "archived"] | order(sortOrder asc, brandName asc) {
    _id, brandName, slug, brandLogo, industry, country,
    solutionUsed, showcaseUrl, excerpt, sortOrder
  }
`);

export const brandShowcaseBySlugQuery = defineQuery(`
  *[_type == "brandShowcase" && slug.current == $slug][0] {
    _id, brandName, slug, brandLogo, heroImage,
    industry, country, solutionUsed, showcaseUrl,
    excerpt, highlights, testimonialPersonName, testimonialPersonDesignation,
    websiteUrl, story,
    seoTitle, seoDescription
  }
`);

// ─── Integrations ─────────────────────────────────────────────────────────────

export const integrationsQuery = defineQuery(`
  *[_type == "integration" && status != "archived"] | order(featured desc, title asc) {
    _id, title, slug, logo, category, summary, availability, featured
  }
`);

export const integrationBySlugQuery = defineQuery(`
  *[_type == "integration" && slug.current == $slug][0] {
    _id, title, slug, logo, category, summary, details,
    websiteUrl, setupGuideUrl, availability, relatedProducts, featured,
    seoTitle, seoDescription
  }
`);
