import {defineField, defineType} from 'sanity';
import {imageWithAlt, richText, seoFields} from './common';

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Case Study Title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'customerName', title: 'Customer / Brand Name', type: 'string'}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (Rule) => Rule.required()}),
    imageWithAlt('logo', 'Customer Logo'),
    imageWithAlt('heroImage', 'Hero Image'),
    defineField({name: 'industry', title: 'Industry', type: 'string'}),
    defineField({name: 'region', title: 'Region', type: 'string'}),
    defineField({name: 'excerpt', title: 'Short Summary', type: 'text', rows: 3}),
    defineField({name: 'challenge', title: 'Challenge', type: 'text', rows: 4}),
    defineField({name: 'solution', title: 'Solution', type: 'text', rows: 4}),
    defineField({name: 'results', title: 'Results', type: 'text', rows: 4}),
    defineField({
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      of: [{type: 'object', fields: [
        defineField({name: 'value', title: 'Value', type: 'string'}),
        defineField({name: 'label', title: 'Label', type: 'string'}),
      ]}],
    }),
    defineField({name: 'quote', title: 'Customer Quote', type: 'text', rows: 3}),
    defineField({name: 'quoteAuthor', title: 'Quote Author', type: 'string'}),
    defineField({name: 'quoteRole', title: 'Quote Author Role', type: 'string'}),
    {...richText, name: 'story', title: 'Full Story'},
    ...seoFields,
  ],
});
