import {defineField, defineType} from 'sanity';
import {imageWithAlt, richText, seoFields} from './common';

export const resource = defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (Rule) => Rule.required()}),
    defineField({name: 'resourceType', title: 'Resource Type', type: 'string', options: {list: ['Blog', 'Guide', 'Ebook', 'Playbook', 'Newsletter']}}),
    defineField({name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3}),
    imageWithAlt('coverImage', 'Cover Image'),
    {...richText, name: 'body', title: 'Body'},
    ...seoFields,
  ],
});
