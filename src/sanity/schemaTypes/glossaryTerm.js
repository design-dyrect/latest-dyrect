import {defineField, defineType} from 'sanity';
import {richText, seoFields} from './common';

export const glossaryTerm = defineType({
  name: 'glossaryTerm',
  title: 'Glossary Term',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Term', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (Rule) => Rule.required()}),
    defineField({name: 'definition', title: 'Short Definition', type: 'text', rows: 3}),
    {...richText, name: 'details', title: 'Detailed Explanation'},
    ...seoFields,
  ],
});
