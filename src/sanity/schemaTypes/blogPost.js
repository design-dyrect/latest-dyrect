import {defineField, defineType} from 'sanity';
import {imageWithAlt, pageGroups, richText, seoFields, slugField, statusField, summaryField} from './common';

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post - Draft',
  type: 'document',
  groups: pageGroups,
  fields: [
    defineField({name: 'title', title: 'Blog Post Title', type: 'string', validation: (Rule) => Rule.required().max(120), group: 'basic'}),
    {...slugField('title', 'Draft blog slug. Superblog can remain the production blog system.'), group: 'basic'},
    summaryField('excerpt', 'Excerpt', 50, true),
    imageWithAlt('coverImage', 'Cover Image', 'Optional blog thumbnail.'),
    defineField({name: 'authorName', title: 'Author Name', type: 'string', group: 'basic'}),
    defineField({name: 'publishedAt', title: 'Published Date', type: 'datetime', group: 'settings'}),
    defineField({name: 'superblogUrl', title: 'Superblog URL', type: 'url', description: 'Use this when the live blog lives in Superblog.', group: 'relationships'}),
    {...richText, name: 'body', title: 'Draft Body', group: 'content'},
    statusField,
    ...seoFields,
  ],
  preview: {select: {title: 'title', subtitle: 'authorName', media: 'coverImage'}},
});
