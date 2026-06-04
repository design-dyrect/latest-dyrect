import {defineField, defineType} from 'sanity';
import {imageWithAlt, pageGroups, richText, seoFields, slugField, statusField, summaryField, urlField} from './common';

export const partner = defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  groups: pageGroups,
  fields: [
    defineField({
      name: 'title',
      title: 'Partner Name',
      type: 'string',
      description: 'The public partner name shown on cards and partner pages.',
      validation: (Rule) => Rule.required().max(80),
      group: 'basic',
    }),
    {...slugField('title', 'Creates /partners/partner-name.'), group: 'basic'},
    imageWithAlt('logo', 'Partner Logo', 'Required for partner cards and detail pages.', true),
    urlField('websiteUrl', 'Website Link', 'External partner website.'),
    summaryField('summary', 'Partner Information Summary', 200, true),
    {...richText, name: 'about', title: 'About', description: 'Detailed partner page content.', validation: (Rule) => Rule.required(), group: 'content'},
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      description: 'Used for filters on the partner directory.',
      options: {
        list: [
          {title: 'Agency', value: 'Agency'},
          {title: 'App', value: 'App'},
          {title: 'Technology', value: 'Technology'},
          {title: 'Commerce', value: 'Commerce'},
          {title: 'Warranty', value: 'Warranty'},
          {title: 'Support', value: 'Support'},
          {title: 'Analytics', value: 'Analytics'},
          {title: 'Other', value: 'Other'},
        ],
      },
      validation: (Rule) => Rule.required(),
      group: 'basic',
    }),
    defineField({name: 'country', title: 'Country', type: 'string', description: 'Example: United States, India, Global.', group: 'basic'}),
    defineField({name: 'category', title: 'Category', type: 'string', description: 'Optional internal category or partner segment.', group: 'basic'}),
    defineField({
      name: 'featured',
      title: 'Featured Partner',
      type: 'boolean',
      description: 'Featured partners can be highlighted on listing pages.',
      initialValue: false,
      group: 'settings',
    }),
    statusField,
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
