import {defineField, defineType} from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({name: 'siteTitle', title: 'Site Title', type: 'string'}),
    defineField({name: 'defaultSeoDescription', title: 'Default SEO Description', type: 'text', rows: 3}),
    defineField({name: 'bookDemoUrl', title: 'Book Demo URL', type: 'string'}),
    defineField({name: 'youtubeHowItWorksUrl', title: 'How It Works YouTube URL', type: 'url'}),
    defineField({
      name: 'footerLinks',
      title: 'Footer Links',
      type: 'array',
      of: [{type: 'object', fields: [
        defineField({name: 'label', title: 'Label', type: 'string'}),
        defineField({name: 'url', title: 'URL', type: 'string'}),
      ]}],
    }),
  ],
});
