import {defineArrayMember, defineField, defineType} from 'sanity';
import {imageWithAlt, seoFields, urlField} from './common';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    {name: 'general', title: 'General', default: true},
    {name: 'navigation', title: 'Navigation'},
    {name: 'footer', title: 'Footer'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      description: 'Used as the default website title.',
      validation: (Rule) => Rule.required(),
      group: 'general',
    }),
    urlField('siteUrl', 'Live Website URL', 'Example: https://www.dyrect.co'),
    defineField({
      name: 'defaultSeoDescription',
      title: 'Default SEO Description',
      type: 'text',
      rows: 3,
      description: 'Fallback meta description when a page does not have its own SEO description.',
      validation: (Rule) => Rule.max(180),
      group: 'seo',
    }),
    urlField('bookDemoUrl', 'Book Demo URL', 'Used by global header and demo CTAs.'),
    urlField('youtubeHowItWorksUrl', 'How It Works YouTube URL', 'Used by the video modal or How It Works button.'),
    urlField('superblogUrl', 'Superblog URL', 'Your live Superblog home URL. Blog links can point here while blogs stay in Superblog.'),
    {
      ...imageWithAlt('logo', 'Primary Logo', 'Optional logo override for the header.'),
      group: 'general',
    },
    defineField({
      name: 'topBanner',
      title: 'Top Banner',
      type: 'object',
      group: 'navigation',
      fields: [
        defineField({name: 'enabled', title: 'Show Top Banner', type: 'boolean', initialValue: false}),
        defineField({name: 'text', title: 'Banner Text', type: 'string'}),
        defineField({name: 'linkLabel', title: 'Link Label', type: 'string'}),
        urlField('linkUrl', 'Link URL', 'Where the banner should link.'),
      ],
    }),
    defineField({
      name: 'navigationLinks',
      title: 'Navigation Links',
      type: 'array',
      description: 'Optional global navigation links. Leave empty to use the coded default navigation.',
      group: 'navigation',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required()}),
            urlField('url', 'URL', 'Internal path or full URL.', true),
            defineField({name: 'opensInNewTab', title: 'Open in New Tab', type: 'boolean', initialValue: false}),
          ],
          preview: {select: {title: 'label', subtitle: 'url'}},
        }),
      ],
    }),
    defineField({
      name: 'footerLinks',
      title: 'Footer Links',
      type: 'array',
      description: 'Optional global footer links. Leave empty to use the coded default footer.',
      group: 'footer',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'group', title: 'Footer Column', type: 'string', description: 'Example: Products, Resources, Company'}),
            defineField({name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required()}),
            urlField('url', 'URL', 'Internal path or full URL.', true),
            defineField({name: 'sortOrder', title: 'Sort Order', type: 'number'}),
          ],
          preview: {select: {title: 'label', subtitle: 'group'}},
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      group: 'footer',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'platform', title: 'Platform', type: 'string', validation: (Rule) => Rule.required()}),
            urlField('url', 'Profile URL', 'Full social profile URL.', true),
          ],
          preview: {select: {title: 'platform', subtitle: 'url'}},
        }),
      ],
    }),
    ...seoFields,
  ],
  preview: {
    prepare: () => ({title: 'Site Settings'}),
  },
});
