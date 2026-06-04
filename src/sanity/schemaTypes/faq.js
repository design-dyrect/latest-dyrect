import {defineField, defineType} from 'sanity';

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'answer', title: 'Answer', type: 'text', rows: 5, validation: (Rule) => Rule.required()}),
    defineField({name: 'relatedPage', title: 'Related Page', type: 'string'}),
    defineField({name: 'sortOrder', title: 'Sort Order', type: 'number'}),
  ],
  preview: {select: {title: 'question', subtitle: 'relatedPage'}},
});
