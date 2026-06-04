import {defineField, defineType} from 'sanity';
import {imageWithAlt, richText, seoFields} from './common';

export const partner = defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Partner Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'This creates the URL, for example /partners/surebright.',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    imageWithAlt('logo', 'Partner Logo', 'Upload the partner logo.'),
    defineField({
      name: 'websiteUrl',
      title: 'Website Link',
      type: 'url',
    }),
    defineField({
      name: 'summary',
      title: 'Partner Information Summary',
      type: 'text',
      rows: 4,
      description: 'Short summary shown on listing cards. Keep under 200 words.',
      validation: (Rule) => Rule.required(),
    }),
    {...richText, name: 'about', title: 'About', description: 'Detailed partner page content.'},
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: ['Agency', 'Technology', 'Commerce', 'Warranty', 'Support', 'Analytics', 'Other'],
      },
    }),
    defineField({name: 'country', title: 'Country', type: 'string'}),
    defineField({name: 'category', title: 'Category', type: 'string'}),
    defineField({
      name: 'featured',
      title: 'Featured Partner',
      type: 'boolean',
      initialValue: false,
    }),
    ...seoFields,
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
      media: 'logo',
    },
  },
});
