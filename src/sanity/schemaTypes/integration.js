import {defineField, defineType} from 'sanity';
import {imageWithAlt, richText, seoFields} from './common';

export const integration = defineType({
  name: 'integration',
  title: 'Integration',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Integration Name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (Rule) => Rule.required()}),
    imageWithAlt('logo', 'Integration Logo'),
    defineField({name: 'category', title: 'Category', type: 'string'}),
    defineField({name: 'summary', title: 'Short Description', type: 'text', rows: 3}),
    {...richText, name: 'details', title: 'Integration Details'},
    defineField({name: 'websiteUrl', title: 'Website Link', type: 'url'}),
    defineField({name: 'status', title: 'Status', type: 'string', options: {list: ['Live', 'Coming soon', 'Draft']}}),
    ...seoFields,
  ],
});
