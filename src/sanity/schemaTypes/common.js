import {defineArrayMember, defineField} from 'sanity';

export const STATUS_OPTIONS = [
  {title: 'Published', value: 'published'},
  {title: 'Draft', value: 'draft'},
  {title: 'Archived', value: 'archived'},
];

export const PRODUCT_OPTIONS = [
  {title: 'Product Registration Software', value: 'product-registration-software'},
  {title: 'Warranty Management Software', value: 'warranty-management-software'},
  {title: 'Extended Warranties', value: 'extended-warranties'},
];

export const INDUSTRY_OPTIONS = [
  {title: 'Electronics', value: 'electronics'},
  {title: 'Outdoors & Recreation', value: 'outdoors-recreation'},
  {title: 'Baby Gear', value: 'baby-gear'},
  {title: 'Beauty & Personal Care', value: 'beauty-personal-care'},
  {title: 'Mobile Accessories', value: 'mobile-accessories'},
  {title: 'Home Appliances', value: 'home-appliances'},
  {title: 'TV, Audio & Video', value: 'tv-audio-video'},
  {title: 'Exercise & Fitness', value: 'exercise-fitness'},
  {title: 'Cycling', value: 'cycling'},
  {title: 'Furniture', value: 'furniture'},
  {title: 'Smart Home & Network', value: 'smart-home-and-network'},
  {title: 'Other', value: 'other'},
];

export const wordLimit = (max) => (Rule) =>
  Rule.custom((value) => {
    if (!value) return true;
    const words = String(value).trim().split(/\s+/).filter(Boolean);
    return words.length <= max || `Keep this under ${max} words. Current: ${words.length}.`;
  });

export const requiredWordLimit = (max) => (Rule) =>
  Rule.required().custom((value) => {
    if (!value) return true;
    const words = String(value).trim().split(/\s+/).filter(Boolean);
    return words.length <= max || `Keep this under ${max} words. Current: ${words.length}.`;
  });

export const slugField = (source = 'title', description = 'This controls the page URL. Use lowercase words separated by hyphens.') =>
  defineField({
    name: 'slug',
    title: 'Slug',
    type: 'slug',
    description,
    options: {source, maxLength: 96},
    validation: (Rule) => Rule.required(),
  });

export const statusField = defineField({
  name: 'status',
  title: 'CMS Status',
  type: 'string',
  description: 'Use Published for live content. Use Draft while preparing content.',
  initialValue: 'published',
  options: {list: STATUS_OPTIONS, layout: 'radio'},
  validation: (Rule) => Rule.required(),
  group: 'settings',
});

export const imageWithAlt = (name, title, description, required = false) =>
  defineField({
    name,
    title,
    description,
    type: 'image',
    options: {hotspot: true},
    validation: required ? (Rule) => Rule.required() : undefined,
    fields: [
      defineField({
        name: 'alt',
        title: 'Alt Text',
        type: 'string',
        description: 'Describe the image for accessibility and SEO.',
        validation: required ? (Rule) => Rule.required().max(140) : (Rule) => Rule.max(140),
      }),
    ],
  });

export const urlField = (name, title, description, required = false) =>
  defineField({
    name,
    title,
    description,
    type: 'url',
    validation: (Rule) => {
      const base = Rule.uri({scheme: ['http', 'https', 'mailto', 'tel']});
      return required ? base.required() : base;
    },
  });

export const simpleString = (name, title, description, required = false) =>
  defineField({
    name,
    title,
    description,
    type: 'string',
    validation: required ? (Rule) => Rule.required() : undefined,
  });

export const summaryField = (name = 'summary', title = 'Short Summary', maxWords = 60, required = true) =>
  defineField({
    name,
    title,
    type: 'text',
    rows: 4,
    description: `Shown on cards and listing pages. Keep under ${maxWords} words.`,
    validation: required ? requiredWordLimit(maxWords) : wordLimit(maxWords),
  });

export const richText = {
  name: 'body',
  title: 'Body',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Heading 2', value: 'h2'},
        {title: 'Heading 3', value: 'h3'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        annotations: [
          {
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [urlField('href', 'URL', 'Where this text should link.')],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.max(140),
        }),
      ],
    }),
  ],
};

export const seoFields = [
  defineField({
    name: 'seoTitle',
    title: 'SEO Title',
    type: 'string',
    description: 'The title Google should show. Keep under 60 characters when possible.',
    validation: (Rule) => Rule.max(70),
    group: 'seo',
  }),
  defineField({
    name: 'seoDescription',
    title: 'SEO Description',
    type: 'text',
    rows: 3,
    description: 'The short Google description. Keep around 150-160 characters.',
    validation: (Rule) => Rule.max(180),
    group: 'seo',
  }),
  {...imageWithAlt('ogImage', 'Social Share Image', 'Image for LinkedIn, Twitter, and social previews.'), group: 'seo'},
];

export const ctaFields = [
  simpleString('primaryCtaLabel', 'Primary CTA Label', 'Example: Book a demo'),
  urlField('primaryCtaUrl', 'Primary CTA URL', 'Where the primary CTA should go.'),
  simpleString('secondaryCtaLabel', 'Secondary CTA Label', 'Optional secondary CTA text.'),
  urlField('secondaryCtaUrl', 'Secondary CTA URL', 'Where the secondary CTA should go.'),
];

export const metricArray = defineField({
  name: 'metrics',
  title: 'Metrics',
  type: 'array',
  description: 'Numbers shown on cards or detail pages. Example: 38% fewer claims.',
  of: [
    defineArrayMember({
      type: 'object',
      fields: [
        simpleString('value', 'Value', 'Example: 38%', true),
        simpleString('label', 'Label', 'Example: fewer manual claims', true),
        simpleString('description', 'Description', 'Optional detail below the metric.'),
      ],
      preview: {select: {title: 'value', subtitle: 'label'}},
    }),
  ],
});

export const faqArray = defineField({
  name: 'faqs',
  title: 'FAQs',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'object',
      fields: [
        defineField({name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required()}),
        defineField({name: 'answer', title: 'Answer', type: 'text', rows: 5, validation: requiredWordLimit(140)}),
      ],
      preview: {select: {title: 'question', subtitle: 'answer'}},
    }),
  ],
});

export const cardLinks = defineField({
  name: 'links',
  title: 'Related Links',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'object',
      fields: [
        simpleString('label', 'Label', 'Visible link text.', true),
        urlField('url', 'URL', 'The destination URL.', true),
      ],
      preview: {select: {title: 'label', subtitle: 'url'}},
    }),
  ],
});

export const contentBlocks = defineField({
  name: 'contentBlocks',
  title: 'Page Sections',
  type: 'array',
  description: 'Reusable sections for template pages. Each block can render as a section on the page.',
  of: [
    defineArrayMember({
      type: 'object',
      fields: [
        simpleString('eyebrow', 'Eyebrow', 'Small label above the heading.'),
        simpleString('title', 'Section Heading', 'Main section heading.', true),
        defineField({name: 'body', title: 'Section Copy', type: 'text', rows: 5, validation: wordLimit(160)}),
        imageWithAlt('image', 'Section Image', 'Optional visual for this section.'),
        simpleString('ctaLabel', 'CTA Label', 'Optional link label.'),
        urlField('ctaUrl', 'CTA URL', 'Optional link destination.'),
      ],
      preview: {select: {title: 'title', subtitle: 'eyebrow', media: 'image'}},
    }),
  ],
});

export const pageGroups = [
  {name: 'basic', title: 'Basic Info', default: true},
  {name: 'content', title: 'Page Content'},
  {name: 'media', title: 'Images & Media'},
  {name: 'relationships', title: 'Relationships'},
  {name: 'seo', title: 'SEO'},
  {name: 'settings', title: 'Settings'},
];
