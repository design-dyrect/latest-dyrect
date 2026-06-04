import {defineField, defineType} from 'sanity';
import {PRODUCT_OPTIONS, pageGroups, statusField} from './common';

export const productFaq = defineType({
  name: 'productFaq',
  title: 'Product FAQ - Draft',
  type: 'document',
  groups: pageGroups,
  fields: [
    defineField({name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required().max(160), group: 'basic'}),
    defineField({name: 'answer', title: 'Answer', type: 'text', rows: 6, validation: (Rule) => Rule.required(), group: 'content'}),
    defineField({name: 'productTag', title: 'Product', type: 'string', options: {list: PRODUCT_OPTIONS}, validation: (Rule) => Rule.required(), group: 'relationships'}),
    defineField({name: 'relatedProduct', title: 'Related Product Page', type: 'reference', to: [{type: 'product'}], group: 'relationships'}),
    defineField({name: 'sortOrder', title: 'Sort Order', type: 'number', group: 'settings'}),
    statusField,
  ],
  preview: {select: {title: 'question', subtitle: 'productTag'}},
});
