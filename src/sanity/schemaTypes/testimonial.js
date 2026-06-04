import {defineField, defineType} from 'sanity';
import {imageWithAlt, pageGroups, statusField, urlField} from './common';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  groups: pageGroups,
  fields: [
    defineField({name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: (Rule) => Rule.required(), group: 'content'}),
    defineField({name: 'personName', title: 'Person Name', type: 'string', validation: (Rule) => Rule.required(), group: 'basic'}),
    defineField({name: 'role', title: 'Role', type: 'string', group: 'basic'}),
    defineField({name: 'company', title: 'Company', type: 'string', validation: (Rule) => Rule.required(), group: 'basic'}),
    imageWithAlt('personImage', 'Person Photo', 'Optional headshot.'),
    imageWithAlt('companyLogo', 'Company Logo', 'Optional company logo.'),
    defineField({name: 'relatedProduct', title: 'Related Product', type: 'reference', to: [{type: 'product'}], group: 'relationships'}),
    defineField({name: 'relatedCaseStudy', title: 'Related Case Study', type: 'reference', to: [{type: 'caseStudy'}], group: 'relationships'}),
    urlField('videoUrl', 'Video Testimonial URL', 'Optional video URL.'),
    defineField({name: 'featured', title: 'Featured Testimonial', type: 'boolean', initialValue: false, group: 'settings'}),
    statusField,
  ],
  preview: {select: {title: 'personName', subtitle: 'company', media: 'personImage'}},
});
