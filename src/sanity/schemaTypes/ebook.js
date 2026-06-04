import {defineField, defineType} from 'sanity';
import {imageWithAlt, pageGroups, richText, seoFields, slugField, statusField, summaryField, urlField} from './common';

export const ebook = defineType({
  name: 'ebook',
  title: 'E Book',
  type: 'document',
  groups: pageGroups,
  fields: [
    defineField({name: 'title', title: 'E Book Title', type: 'string', validation: (Rule) => Rule.required().max(120), group: 'basic'}),
    {...slugField('title', 'Creates /ebooks/ebook-title.'), group: 'basic'},
    summaryField('excerpt', 'Short Summary', 55, true),
    imageWithAlt('coverImage', 'Cover Image', 'Ebook cover art.', true),
    urlField('downloadUrl', 'Download URL', 'PDF, landing page, or file URL.', true),
    defineField({name: 'gated', title: 'Require Form Before Download', type: 'boolean', initialValue: true, group: 'settings'}),
    {...richText, name: 'body', title: 'Landing Page Body', group: 'content'},
    statusField,
    ...seoFields,
  ],
  preview: {select: {title: 'title', subtitle: 'excerpt', media: 'coverImage'}},
});
