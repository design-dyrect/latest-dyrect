import {defineArrayMember, defineField, defineType} from 'sanity';
import {contentBlocks, imageWithAlt, pageGroups, PRODUCT_OPTIONS, richText, seoFields, slugField, statusField, summaryField, urlField} from './common';

export const feature = defineType({
  name: 'feature',
  title: 'Feature',
  type: 'document',
  groups: pageGroups,
  fields: [
    defineField({name: 'title', title: 'Feature Name', type: 'string', validation: (Rule) => Rule.required().max(90), group: 'basic'}),
    {...slugField('title', 'Creates the /features#anchor target for this feature.'), group: 'basic'},
    defineField({name: 'navLabel', title: 'Short Nav Label', type: 'string', description: 'Short label for nav/dropdowns. Example: Claims Management.', validation: (Rule) => Rule.max(45), group: 'basic'}),
    defineField({
      name: 'category',
      title: 'Feature Category',
      type: 'string',
      options: {
        list: [
          {title: 'Registration', value: 'registration'},
          {title: 'Claims', value: 'claims'},
          {title: 'Warranty', value: 'warranty'},
          {title: 'Customer Portal', value: 'customer-portal'},
          {title: 'Automation', value: 'automation'},
          {title: 'Analytics', value: 'analytics'},
          {title: 'Integrations', value: 'integrations'},
          {title: 'No-Code Builder', value: 'no-code-builder'},
        ],
      },
      validation: (Rule) => Rule.required(),
      group: 'basic',
    }),
    defineField({name: 'headline', title: 'Feature Page Headline', type: 'string', validation: (Rule) => Rule.max(120), group: 'content'}),
    summaryField('summary', 'Short Description', 45, true),
    {...richText, name: 'details', title: 'Detailed Content', group: 'content'},
    contentBlocks,
    imageWithAlt('icon', 'Icon / Small Visual', 'Optional visual used in cards.'),
    imageWithAlt('heroImage', 'Feature Hero Image', 'Optional large image for the feature section.'),
    defineField({name: 'relatedProducts', title: 'Relevant Products', type: 'array', of: [defineArrayMember({type: 'reference', to: [{type: 'product'}]})], group: 'relationships'}),
    defineField({name: 'productTags', title: 'Product Tags', type: 'array', of: [defineArrayMember({type: 'string', options: {list: PRODUCT_OPTIONS}})], group: 'relationships'}),
    urlField('productPageUrl', 'Relevant Product Page URL', 'Optional CTA to a product page.'),
    defineField({name: 'sortOrder', title: 'Sort Order', type: 'number', description: 'Lower numbers appear first.', group: 'settings'}),
    defineField({name: 'featured', title: 'Feature in Navigation', type: 'boolean', initialValue: false, group: 'settings'}),
    statusField,
    ...seoFields,
  ],
  preview: {select: {title: 'title', subtitle: 'category', media: 'icon'}},
});
