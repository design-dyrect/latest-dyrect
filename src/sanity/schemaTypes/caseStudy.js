import {defineArrayMember, defineField, defineType} from 'sanity';
import {INDUSTRY_OPTIONS, imageWithAlt, metricArray, pageGroups, richText, seoFields, slugField, statusField, summaryField, urlField} from './common';

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  groups: pageGroups,
  fields: [
    defineField({name: 'title', title: 'Case Study Title', type: 'string', validation: (Rule) => Rule.required().max(110), group: 'basic'}),
    defineField({name: 'customerName', title: 'Customer / Brand Name', type: 'string', validation: (Rule) => Rule.required().max(80), group: 'basic'}),
    {...slugField('title', 'Creates /case-studies/case-study-title.'), group: 'basic'},
    imageWithAlt('customerLogo', 'Customer Logo', 'Logo shown on cards and detail page.', false),
    imageWithAlt('heroImage', 'Hero Image', 'Large visual for the detail page.', false),
    defineField({name: 'industry', title: 'Industry', type: 'string', options: {list: INDUSTRY_OPTIONS}, group: 'relationships'}),
    defineField({name: 'region', title: 'Region', type: 'string', group: 'relationships'}),
    defineField({name: 'productsUsed', title: 'Products Used', type: 'array', of: [defineArrayMember({type: 'reference', to: [{type: 'product'}]})], group: 'relationships'}),
    summaryField('excerpt', 'Short Summary', 55, true),
    defineField({name: 'challenge', title: 'Before Dyrect / Challenge', type: 'text', rows: 4, validation: (Rule) => Rule.required(), group: 'content'}),
    defineField({name: 'solution', title: 'Dyrect Solution', type: 'text', rows: 4, validation: (Rule) => Rule.required(), group: 'content'}),
    defineField({name: 'results', title: 'After Dyrect / Results', type: 'text', rows: 4, validation: (Rule) => Rule.required(), group: 'content'}),
    metricArray,
    defineField({name: 'quote', title: 'Customer Quote', type: 'text', rows: 3, group: 'content'}),
    defineField({name: 'quoteAuthor', title: 'Quote Author', type: 'string', group: 'content'}),
    defineField({name: 'quoteRole', title: 'Quote Author Role', type: 'string', group: 'content'}),
    urlField('videoUrl', 'Video URL', 'Optional YouTube, Vimeo, or customer story video.'),
    {...richText, name: 'story', title: 'Full Story', group: 'content'},
    statusField,
    ...seoFields,
  ],
  preview: {select: {title: 'title', subtitle: 'customerName', media: 'customerLogo'}},
});
