import {defineArrayMember, defineField, defineType} from 'sanity';
import {imageWithAlt, INDUSTRY_OPTIONS, pageGroups, richText, seoFields, slugField, statusField, summaryField, urlField} from './common';

export const brandShowcase = defineType({
  name: 'brandShowcase',
  title: 'Brand Showcase',
  type: 'document',
  groups: pageGroups,
  fields: [
    defineField({name: 'title', title: 'Showcase Title', type: 'string', validation: (Rule) => Rule.required().max(110), group: 'basic'}),
    defineField({name: 'brandName', title: 'Brand Name', type: 'string', validation: (Rule) => Rule.required(), group: 'basic'}),
    {...slugField('title', 'Creates /showcase/showcase-title.'), group: 'basic'},
    imageWithAlt('brandLogo', 'Brand Logo', 'Logo shown on showcase cards.'),
    imageWithAlt('heroImage', 'Hero Image', 'Large visual for the showcase page.'),
    defineField({name: 'industry', title: 'Industry', type: 'string', options: {list: INDUSTRY_OPTIONS}, group: 'relationships'}),
    summaryField('excerpt', 'Short Summary', 55, true),
    defineField({name: 'highlights', title: 'Highlights', type: 'array', of: [defineArrayMember({type: 'string'})], group: 'content'}),
    urlField('websiteUrl', 'Brand Website URL', 'Optional brand website link.'),
    {...richText, name: 'story', title: 'Showcase Story', group: 'content'},
    statusField,
    ...seoFields,
  ],
  preview: {select: {title: 'brandName', subtitle: 'title', media: 'brandLogo'}},
});
