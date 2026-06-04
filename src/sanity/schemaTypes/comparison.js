import {defineField, defineType} from 'sanity';
import {contentBlocks, ctaFields, imageWithAlt, pageGroups, richText, seoFields, slugField, statusField, summaryField} from './common';

export const comparison = defineType({
  name: 'comparison',
  title: 'Comparison',
  type: 'document',
  groups: pageGroups,
  fields: [
    defineField({name: 'title', title: 'Comparison Title', type: 'string', validation: (Rule) => Rule.required().max(120), group: 'basic'}),
    {...slugField('title', 'Creates /comparison/comparison-title.'), group: 'basic'},
    defineField({name: 'competitorName', title: 'Compared Against', type: 'string', validation: (Rule) => Rule.required(), group: 'basic'}),
    summaryField('excerpt', 'Short Summary', 55, true),
    imageWithAlt('heroImage', 'Hero Image', 'Optional comparison visual.'),
    ...ctaFields.map((field) => ({...field, group: 'content'})),
    defineField({name: 'dyrectAdvantages', title: 'Dyrect Advantages', type: 'array', of: [{type: 'string'}], group: 'content'}),
    defineField({name: 'competitorLimitations', title: 'Alternative Limitations', type: 'array', of: [{type: 'string'}], group: 'content'}),
    contentBlocks,
    {...richText, name: 'body', title: 'Full Comparison', group: 'content'},
    statusField,
    ...seoFields,
  ],
  preview: {select: {title: 'title', subtitle: 'competitorName', media: 'heroImage'}},
});
