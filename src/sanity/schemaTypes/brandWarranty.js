import {defineField, defineType} from 'sanity';
import {faqArray, imageWithAlt, pageGroups, richText, seoFields, slugField, statusField, summaryField, urlField} from './common';

export const brandWarranty = defineType({
  name: 'brandWarranty',
  title: 'Brand Warranty',
  type: 'document',
  groups: pageGroups,
  fields: [
    defineField({name: 'title', title: 'Brand Name', type: 'string', validation: (Rule) => Rule.required().max(90), group: 'basic'}),
    {...slugField('title', 'Creates /warranty/brand-name.'), group: 'basic'},
    imageWithAlt('brandLogo', 'Brand Logo', 'Logo shown on warranty directory cards.'),
    summaryField('summary', 'Warranty Policy Summary', 70, true),
    defineField({name: 'warrantyDuration', title: 'Warranty Duration', type: 'string', description: 'Example: 1 year limited warranty.', group: 'basic'}),
    defineField({name: 'coverage', title: 'Coverage Summary', type: 'text', rows: 4, group: 'content'}),
    defineField({name: 'claimProcess', title: 'Claim Process', type: 'text', rows: 4, group: 'content'}),
    urlField('supportUrl', 'Support URL', 'Where customers can get brand support.'),
    urlField('registrationUrl', 'Product Registration URL', 'Optional brand registration URL.'),
    {...richText, name: 'details', title: 'Warranty Details', group: 'content'},
    faqArray,
    statusField,
    ...seoFields,
  ],
  preview: {select: {title: 'title', subtitle: 'warrantyDuration', media: 'brandLogo'}},
});
