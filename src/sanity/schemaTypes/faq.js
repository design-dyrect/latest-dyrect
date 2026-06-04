import {defineField, defineType} from 'sanity';
import {pageGroups, PRODUCT_OPTIONS, statusField} from './common';

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  groups: pageGroups,
  fields: [
    defineField({name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required().max(160), group: 'basic'}),
    defineField({name: 'answer', title: 'Answer', type: 'text', rows: 6, validation: (Rule) => Rule.required(), group: 'content'}),
    defineField({
      name: 'faqType',
      title: 'FAQ Type',
      type: 'string',
      options: {
        list: [
          {title: 'General', value: 'general'},
          {title: 'Product', value: 'product'},
          {title: 'Pricing', value: 'pricing'},
          {title: 'Technical', value: 'technical'},
          {title: 'Industry', value: 'industry'},
        ],
      },
      group: 'relationships',
    }),
    defineField({name: 'productTag', title: 'Product Tag', type: 'string', options: {list: PRODUCT_OPTIONS}, group: 'relationships'}),
    defineField({name: 'relatedPage', title: 'Related Page Path', type: 'string', description: 'Example: /product/product-registration-software', group: 'relationships'}),
    defineField({name: 'sortOrder', title: 'Sort Order', type: 'number', group: 'settings'}),
    statusField,
  ],
  preview: {select: {title: 'question', subtitle: 'relatedPage'}},
});
