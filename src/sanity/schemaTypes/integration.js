import {defineArrayMember, defineField, defineType} from 'sanity';
import {contentBlocks, imageWithAlt, pageGroups, PRODUCT_OPTIONS, richText, seoFields, slugField, statusField, summaryField, urlField} from './common';

export const integration = defineType({
  name: 'integration',
  title: 'Integration',
  type: 'document',
  groups: pageGroups,
  fields: [
    defineField({name: 'title', title: 'Integration Name', type: 'string', validation: (Rule) => Rule.required().max(90), group: 'basic'}),
    {...slugField('title', 'Creates /integrations/integration-name.'), group: 'basic'},
    imageWithAlt('logo', 'Integration Logo', 'Shown on integration cards.', true),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Ecommerce', value: 'ecommerce'},
          {title: 'CRM', value: 'crm'},
          {title: 'Helpdesk', value: 'helpdesk'},
          {title: 'Marketing', value: 'marketing'},
          {title: 'Payments', value: 'payments'},
          {title: 'Analytics', value: 'analytics'},
          {title: 'Marketplace', value: 'marketplace'},
          {title: 'Other', value: 'other'},
        ],
      },
      validation: (Rule) => Rule.required(),
      group: 'basic',
    }),
    summaryField('summary', 'Short Description', 45, true),
    {...richText, name: 'details', title: 'Integration Details', group: 'content'},
    contentBlocks,
    urlField('websiteUrl', 'Integration Website Link', 'Optional external website.'),
    urlField('setupGuideUrl', 'Setup Guide URL', 'Optional setup or documentation link.'),
    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'string',
      initialValue: 'live',
      options: {list: [{title: 'Live', value: 'live'}, {title: 'Coming soon', value: 'coming-soon'}, {title: 'Private beta', value: 'private-beta'}]},
      group: 'settings',
    }),
    defineField({name: 'relatedProducts', title: 'Relevant Products', type: 'array', of: [defineArrayMember({type: 'string', options: {list: PRODUCT_OPTIONS}})], group: 'relationships'}),
    defineField({name: 'featured', title: 'Featured Integration', type: 'boolean', initialValue: false, group: 'settings'}),
    statusField,
    ...seoFields,
  ],
  preview: {select: {title: 'title', subtitle: 'category', media: 'logo'}},
});
