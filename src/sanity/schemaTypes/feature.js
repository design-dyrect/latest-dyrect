import {defineField, defineType} from 'sanity';
import {richText, seoFields} from './common';

export const feature = defineType({
  name: 'feature',
  title: 'Feature',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Feature Name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'Slug / Anchor ID', type: 'slug', options: {source: 'title'}, validation: (Rule) => Rule.required()}),
    defineField({name: 'navLabel', title: 'Short Nav Label', type: 'string'}),
    defineField({name: 'category', title: 'Category', type: 'string'}),
    defineField({name: 'headline', title: 'Headline', type: 'string'}),
    defineField({name: 'summary', title: 'Short Description', type: 'text', rows: 3}),
    {...richText, name: 'details', title: 'Detailed Content'},
    defineField({name: 'productPageUrl', title: 'Relevant Product Page URL', type: 'string'}),
    ...seoFields,
  ],
});
