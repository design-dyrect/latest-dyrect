import {defineField, defineType} from 'sanity';
import {imageWithAlt, pageGroups, richText, seoFields, slugField, statusField, summaryField, urlField} from './common';

export const podcast = defineType({
  name: 'podcast',
  title: 'Podcast',
  type: 'document',
  groups: pageGroups,
  fields: [
    defineField({name: 'title', title: 'Episode Title', type: 'string', validation: (Rule) => Rule.required().max(120), group: 'basic'}),
    {...slugField('title', 'Creates /podcasts/episode-title.'), group: 'basic'},
    summaryField('excerpt', 'Episode Summary', 55, true),
    imageWithAlt('coverImage', 'Episode Cover Image', 'Artwork for this episode.'),
    defineField({name: 'guestName', title: 'Guest Name', type: 'string', group: 'basic'}),
    defineField({name: 'guestCompany', title: 'Guest Company', type: 'string', group: 'basic'}),
    urlField('audioUrl', 'Audio URL', 'Spotify, Apple, or hosted audio link.', true),
    urlField('youtubeUrl', 'YouTube URL', 'Optional video episode link.'),
    defineField({name: 'episodeNumber', title: 'Episode Number', type: 'number', group: 'settings'}),
    defineField({name: 'publishedAt', title: 'Published Date', type: 'datetime', group: 'settings'}),
    {...richText, name: 'showNotes', title: 'Show Notes', group: 'content'},
    statusField,
    ...seoFields,
  ],
  preview: {select: {title: 'title', subtitle: 'guestName', media: 'coverImage'}},
});
