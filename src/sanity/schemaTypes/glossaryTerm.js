import {defineField, defineType} from 'sanity';
import {pageGroups, richText, seoFields, slugField, statusField, summaryField} from './common';

export const glossaryTerm = defineType({
  name: 'glossaryTerm',
  title: 'Glossary Term',
  type: 'document',
  groups: pageGroups,
  fields: [
    defineField({name: 'title', title: 'Term', type: 'string', validation: (Rule) => Rule.required().max(80), group: 'basic'}),
    {...slugField('title', 'Creates /glossary/term.'), group: 'basic'},
    summaryField('definition', 'Short Definition', 45, true),
    {...richText, name: 'details', title: 'Detailed Explanation', group: 'content'},
    defineField({name: 'relatedProduct', title: 'Related Product', type: 'reference', to: [{type: 'product'}], group: 'relationships'}),
    defineField({name: 'relatedFeature', title: 'Related Feature', type: 'reference', to: [{type: 'feature'}], group: 'relationships'}),
    defineField({name: 'sortOrder', title: 'Sort Order', type: 'number', group: 'settings'}),
    statusField,
    ...seoFields,
  ],
  preview: {select: {title: 'title', subtitle: 'definition'}},
});
