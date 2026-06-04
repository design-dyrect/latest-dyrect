import {defineArrayMember, defineField, defineType} from 'sanity';
import {contentBlocks, ctaFields, faqArray, imageWithAlt, INDUSTRY_OPTIONS, metricArray, pageGroups, richText, seoFields, slugField, statusField, summaryField} from './common';

export const solution = defineType({
  name: 'solution',
  title: 'Solution',
  type: 'document',
  groups: pageGroups,
  fields: [
    defineField({name: 'title', title: 'Solution / Industry Name', type: 'string', validation: (Rule) => Rule.required().max(90), group: 'basic'}),
    {...slugField('title', 'Creates /solutions/solution-name.'), group: 'basic'},
    defineField({name: 'industryKey', title: 'Industry Key', type: 'string', options: {list: INDUSTRY_OPTIONS}, group: 'basic'}),
    defineField({name: 'eyebrow', title: 'Hero Eyebrow', type: 'string', group: 'content'}),
    defineField({name: 'heroHeadline', title: 'Hero Headline', type: 'string', validation: (Rule) => Rule.required().max(140), group: 'content'}),
    defineField({name: 'heroText', title: 'Hero Supporting Text', type: 'text', rows: 4, validation: (Rule) => Rule.required(), group: 'content'}),
    summaryField('summary', 'Card Summary', 50, true),
    imageWithAlt('heroImage', 'Hero Image', 'Main industry page image.'),
    imageWithAlt('cardImage', 'Card Image', 'Optional listing card image.'),
    ...ctaFields.map((field) => ({...field, group: 'content'})),
    defineField({name: 'relatedProducts', title: 'Related Products', type: 'array', of: [defineArrayMember({type: 'reference', to: [{type: 'product'}]})], group: 'relationships'}),
    metricArray,
    contentBlocks,
    faqArray,
    {...richText, name: 'body', title: 'Additional Body', group: 'content'},
    defineField({name: 'sortOrder', title: 'Sort Order', type: 'number', group: 'settings'}),
    statusField,
    ...seoFields,
  ],
  preview: {select: {title: 'title', subtitle: 'industryKey', media: 'cardImage'}},
});
