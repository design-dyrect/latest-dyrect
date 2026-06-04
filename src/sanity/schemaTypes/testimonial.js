import {defineField, defineType} from 'sanity';
import {imageWithAlt} from './common';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: (Rule) => Rule.required()}),
    defineField({name: 'personName', title: 'Person Name', type: 'string'}),
    defineField({name: 'role', title: 'Role', type: 'string'}),
    defineField({name: 'company', title: 'Company', type: 'string'}),
    imageWithAlt('companyLogo', 'Company Logo'),
    imageWithAlt('headshot', 'Headshot'),
  ],
  preview: {select: {title: 'personName', subtitle: 'company'}},
});
