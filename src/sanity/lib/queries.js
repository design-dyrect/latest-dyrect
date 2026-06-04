import {defineQuery} from 'next-sanity';

export const partnersQuery = defineQuery(`
  *[_type == "partner"] | order(title asc) {
    _id,
    title,
    slug,
    logo,
    websiteUrl,
    summary,
    type,
    country,
    featured
  }
`);

export const partnerBySlugQuery = defineQuery(`
  *[_type == "partner" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    logo,
    websiteUrl,
    summary,
    about,
    type,
    country,
    category,
    featured,
    seoTitle,
    seoDescription
  }
`);
