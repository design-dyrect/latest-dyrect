import {defineArrayMember, defineField, defineType} from 'sanity';
import {imageWithAlt, pageGroups, richText, seoFields, slugField, statusField, summaryField, urlField} from './common';

export const guide = defineType({
  name: 'guide',
  title: 'Guide',
  type: 'document',
  groups: pageGroups,
  fields: [
    defineField({name: 'title', title: 'Guide Title', type: 'string', validation: (Rule) => Rule.required().max(120), group: 'basic'}),
    {...slugField('title', 'Creates /guide/guide-title. URL: dyrect.co/guide/your-slug'), group: 'basic'},
    summaryField('excerpt', 'Guide Summary', 55, true),
    imageWithAlt('coverImage', 'Guide Cover Image', 'Hero/thumbnail image for this guide.'),
    defineField({name: 'authorName', title: 'Author Name', type: 'string', group: 'basic'}),
    defineField({name: 'publishedAt', title: 'Published Date', type: 'datetime', group: 'settings'}),
    defineField({name: 'readingTime', title: 'Reading Time', type: 'string', description: 'Example: 12 min read.', group: 'basic'}),
    urlField('downloadUrl', 'Download URL', 'Optional PDF or external download URL.'),
    defineField({name: 'relatedProducts', title: 'Related Products', type: 'array', of: [defineArrayMember({type: 'reference', to: [{type: 'product'}]})], group: 'relationships'}),
    {...richText, name: 'body', title: 'Guide Body', group: 'content'},
    statusField,
    ...seoFields,
  ],
  preview: {select: {title: 'title', subtitle: 'publishedAt', media: 'coverImage'}},
});
