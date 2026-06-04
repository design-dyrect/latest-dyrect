import {defineArrayMember, defineField, defineType} from 'sanity';
import {imageWithAlt, INDUSTRY_OPTIONS, pageGroups, richText, seoFields, slugField, statusField, summaryField, urlField} from './common';

const SOLUTION_OPTIONS = [
  {title: 'Warranty Registration', value: 'Warranty Registration'},
  {title: 'Claims Management', value: 'Claims Management'},
  {title: 'Extended Warranties', value: 'Extended Warranties'},
  {title: 'Ownership Experience', value: 'Ownership Experience'},
];

export const brandShowcase = defineType({
  name: 'brandShowcase',
  title: 'Brand Showcase',
  type: 'document',
  groups: pageGroups,
  fields: [
    defineField({name: 'brandName', title: 'Brand Name', type: 'string', description: 'Name of the company whose case study is written.', validation: (Rule) => Rule.required(), group: 'basic'}),
    {...slugField('brandName', 'Creates /showcase/brand-slug.'), group: 'basic'},
    defineField({name: 'sortOrder', title: 'Sort #', type: 'number', description: 'Controls display order. Lower = appears first.', validation: (Rule) => Rule.required(), group: 'settings'}),
    imageWithAlt('brandLogo', 'Brand Logo', 'Required — shown on showcase cards.', true),
    imageWithAlt('heroImage', 'Banner Background', 'Optional large banner for the showcase page.', false),
    defineField({name: 'solutionUsed', title: 'Solution Used', type: 'string', description: 'What Dyrect solution does this customer use?', options: {list: SOLUTION_OPTIONS}, validation: (Rule) => Rule.required(), group: 'relationships'}),
    defineField({name: 'industry', title: 'Industry', type: 'string', description: 'Brand industry.', options: {list: INDUSTRY_OPTIONS}, validation: (Rule) => Rule.required(), group: 'relationships'}),
    defineField({name: 'country', title: 'Country', type: 'string', description: 'e.g. India, United States', group: 'relationships'}),
    urlField('showcaseUrl', 'Showcase URL', 'URL of the brand website for showcase — e.g. https://brand.com/warranty-customer'),
    summaryField('excerpt', 'Short Description', 55, false),
    defineField({name: 'testimonialPersonName', title: 'Testimonial Person Name', type: 'string', group: 'content'}),
    defineField({name: 'testimonialPersonDesignation', title: 'Testimonial Person Designation', type: 'string', group: 'content'}),
    defineField({name: 'highlights', title: 'Highlights', type: 'array', of: [defineArrayMember({type: 'string'})], description: 'Bullet points shown on the showcase page.', group: 'content'}),
    urlField('websiteUrl', 'Brand Website URL', 'Optional brand website link.'),
    {...richText, name: 'story', title: 'Showcase Story', group: 'content'},
    statusField,
    ...seoFields,
  ],
  preview: {select: {title: 'brandName', subtitle: 'solutionUsed', media: 'brandLogo'}},
});
