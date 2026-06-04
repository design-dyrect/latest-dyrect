import {defineField, defineType} from 'sanity';
import {imageWithAlt, richText, seoFields} from './common';

export const brandWarranty = defineType({
  name: 'brandWarranty',
  title: 'Brand Warranty',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Brand Name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (Rule) => Rule.required()}),
    imageWithAlt('logo', 'Brand Logo'),
    defineField({name: 'summary', title: 'Warranty Policy Summary', type: 'text', rows: 4}),
    defineField({name: 'warrantyDuration', title: 'Warranty Duration', type: 'string'}),
    defineField({name: 'supportUrl', title: 'Support URL', type: 'url'}),
    {...richText, name: 'details', title: 'Warranty Details'},
    ...seoFields,
  ],
});
