import {defineArrayMember, defineField, defineType} from 'sanity';
import {INDUSTRY_OPTIONS, imageWithAlt, metricArray, pageGroups, richText, seoFields, slugField, statusField, summaryField, urlField} from './common';

const SOLUTION_OPTIONS = [
  {title: 'Warranty Registration', value: 'Warranty Registration'},
  {title: 'Claims Management', value: 'Claims Management'},
  {title: 'Extended Warranties', value: 'Extended Warranties'},
  {title: 'Ownership Experience', value: 'Ownership Experience'},
];

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  groups: pageGroups,
  fields: [
    // Basic
    defineField({name: 'title', title: 'Case Study Title', type: 'string', description: 'Headline shown on the card — e.g. "10,000+ Registrations Helped Velotric Build a Dealer Network"', validation: (Rule) => Rule.required().max(110), group: 'basic'}),
    defineField({name: 'customerName', title: 'Brand Name', type: 'string', description: 'Name of the company whose case study is written.', validation: (Rule) => Rule.required().max(80), group: 'basic'}),
    {...slugField('customerName', 'Creates /case-studies/brand-slug. Use lowercase, hyphens only.'), group: 'basic'},
    imageWithAlt('customerLogo', 'Brand Logo', 'Required — shown on cards and detail page.', true),
    imageWithAlt('heroImage', 'Banner Background', 'Large banner image for the detail page hero.', false),
    // Meta
    defineField({name: 'industry', title: 'Industry', type: 'string', description: 'Brand industry — used for filtering.', options: {list: INDUSTRY_OPTIONS}, validation: (Rule) => Rule.required(), group: 'relationships'}),
    defineField({name: 'country', title: 'Country', type: 'string', description: 'e.g. United States, India', group: 'relationships'}),
    defineField({name: 'solutionUsed', title: 'Solution Used', type: 'string', description: 'Primary Dyrect solution this customer uses.', options: {list: SOLUTION_OPTIONS}, group: 'relationships'}),
    defineField({name: 'productsUsed', title: 'Products Used', type: 'array', of: [defineArrayMember({type: 'reference', to: [{type: 'product'}]})], group: 'relationships'}),
    // Content
    summaryField('excerpt', 'Short Description', 55, true),
    defineField({name: 'challenge', title: 'Before Dyrect / Challenge', type: 'text', rows: 4, description: 'What problems did the brand face before Dyrect?', validation: (Rule) => Rule.required(), group: 'content'}),
    defineField({name: 'solution', title: 'Dyrect Solution', type: 'text', rows: 4, description: 'How did Dyrect solve it?', validation: (Rule) => Rule.required(), group: 'content'}),
    defineField({name: 'results', title: 'After Dyrect / Results', type: 'text', rows: 4, description: 'What outcomes did the brand achieve?', validation: (Rule) => Rule.required(), group: 'content'}),
    metricArray,
    // Testimonial
    defineField({name: 'quote', title: 'Testimonial Content', type: 'text', rows: 3, description: 'The customer quote.', group: 'content'}),
    defineField({name: 'quoteAuthor', title: 'Testimonial Person Name', type: 'string', group: 'content'}),
    defineField({name: 'quoteRole', title: 'Testimonial Person Designation', type: 'string', group: 'content'}),
    imageWithAlt('quoteAuthorImage', 'Testimonial Person Image', 'Headshot of the person quoted.', false),
    // Full story
    urlField('videoUrl', 'Video URL', 'Optional YouTube or Vimeo link.'),
    {...richText, name: 'story', title: 'Full Case Study Content', group: 'content'},
    statusField,
    ...seoFields,
  ],
  preview: {select: {title: 'customerName', subtitle: 'title', media: 'customerLogo'}},
});
