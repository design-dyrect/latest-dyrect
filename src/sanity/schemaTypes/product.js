import {defineArrayMember, defineField, defineType} from 'sanity';
import {contentBlocks, ctaFields, faqArray, imageWithAlt, metricArray, pageGroups, richText, seoFields, slugField, statusField, summaryField} from './common';

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  groups: pageGroups,
  fields: [
    defineField({name: 'title', title: 'Product Name', type: 'string', validation: (Rule) => Rule.required().max(90), group: 'basic'}),
    {...slugField('title', 'Creates /product/product-name.'), group: 'basic'},
    defineField({name: 'eyebrow', title: 'Hero Eyebrow', type: 'string', group: 'content'}),
    defineField({name: 'heroHeadline', title: 'Hero Headline', type: 'string', validation: (Rule) => Rule.required().max(140), group: 'content'}),
    defineField({name: 'heroText', title: 'Hero Supporting Text', type: 'text', rows: 4, validation: (Rule) => Rule.required(), group: 'content'}),
    imageWithAlt('heroImage', 'Hero Visual', 'Primary product visual.'),
    summaryField('summary', 'Product Summary', 55, true),
    ...ctaFields.map((field) => ({...field, group: 'content'})),
    defineField({name: 'features', title: 'Connected Features', type: 'array', of: [defineArrayMember({type: 'reference', to: [{type: 'feature'}]})], group: 'relationships'}),
    defineField({name: 'industries', title: 'Related Industries', type: 'array', of: [defineArrayMember({type: 'reference', to: [{type: 'solution'}]})], group: 'relationships'}),
    metricArray,
    contentBlocks,
    faqArray,
    {...richText, name: 'body', title: 'Additional Page Body', group: 'content'},
    defineField({name: 'sortOrder', title: 'Sort Order', type: 'number', group: 'settings'}),
    statusField,
    ...seoFields,
  ],
  preview: {select: {title: 'title', subtitle: 'summary', media: 'heroImage'}},
});
