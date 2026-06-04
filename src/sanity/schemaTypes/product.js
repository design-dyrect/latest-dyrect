import {defineField, defineType} from 'sanity';
import {imageWithAlt, richText, seoFields} from './common';

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Product Name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (Rule) => Rule.required()}),
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'heroHeadline', title: 'Hero Headline', type: 'string'}),
    defineField({name: 'heroText', title: 'Hero Supporting Text', type: 'text', rows: 4}),
    imageWithAlt('heroImage', 'Hero Image'),
    defineField({name: 'primaryCtaLabel', title: 'Primary CTA Label', type: 'string'}),
    defineField({name: 'primaryCtaUrl', title: 'Primary CTA URL', type: 'string'}),
    {...richText, name: 'body', title: 'Page Body'},
    ...seoFields,
  ],
});
