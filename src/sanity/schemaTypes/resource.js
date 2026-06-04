import {defineArrayMember, defineField, defineType} from 'sanity';
import {imageWithAlt, pageGroups, richText, seoFields, slugField, statusField, summaryField, urlField} from './common';

export const resource = defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  groups: pageGroups,
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required().max(110), group: 'basic'}),
    {...slugField('title', 'Creates /resources/resource-title or the configured resource URL.'), group: 'basic'},
    defineField({
      name: 'resourceType',
      title: 'Resource Type',
      type: 'string',
      options: {
        list: [
          {title: 'Guide', value: 'guide'},
          {title: 'Playbook', value: 'playbook'},
          {title: 'Newsletter', value: 'newsletter'},
          {title: 'Template', value: 'template'},
          {title: 'Report', value: 'report'},
          {title: 'Other', value: 'other'},
        ],
      },
      validation: (Rule) => Rule.required(),
      group: 'basic',
    }),
    summaryField('excerpt', 'Excerpt', 45, true),
    imageWithAlt('coverImage', 'Cover Image', 'Used on resource cards and detail pages.'),
    urlField('externalUrl', 'External URL', 'Use this if the resource lives outside the website.'),
    defineField({name: 'gated', title: 'Gated Resource', type: 'boolean', initialValue: false, group: 'settings'}),
    defineField({name: 'relatedProducts', title: 'Related Products', type: 'array', of: [defineArrayMember({type: 'reference', to: [{type: 'product'}]})], group: 'relationships'}),
    defineField({name: 'relatedFeatures', title: 'Related Features', type: 'array', of: [defineArrayMember({type: 'reference', to: [{type: 'feature'}]})], group: 'relationships'}),
    {...richText, name: 'body', title: 'Body', group: 'content'},
    statusField,
    ...seoFields,
  ],
  preview: {select: {title: 'title', subtitle: 'resourceType', media: 'coverImage'}},
});
