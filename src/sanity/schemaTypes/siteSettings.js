import {defineArrayMember, defineField, defineType} from 'sanity';
import {imageWithAlt, urlField} from './common';

// ── Reusable SEO block for a single page ────────────────────────────────────
const pageSeoBlock = (pageId, pageLabel, defaultTitle = '', defaultDesc = '') =>
  defineField({
    name: pageId,
    title: pageLabel,
    type: 'object',
    group: 'pageSeo',
    options: {collapsible: true, collapsed: true},
    fields: [
      defineField({
        name: 'title',
        title: 'Title Tag',
        type: 'string',
        description: `Shown in Google results and browser tab. Default: "${defaultTitle}"`,
        validation: (Rule) => Rule.max(70).warning('Keep under 60 characters for best display.'),
        placeholder: defaultTitle,
      }),
      defineField({
        name: 'description',
        title: 'Meta Description',
        type: 'text',
        rows: 3,
        description: 'Shown under the title in Google. Ideal: 150–160 characters.',
        validation: (Rule) => Rule.max(180).warning('Keep under 160 characters.'),
        placeholder: defaultDesc,
      }),
      {...imageWithAlt('ogImage', 'Social Share Image', 'For LinkedIn/Twitter/WhatsApp. Ideal: 1200×630px.')},
      defineField({
        name: 'noIndex',
        title: 'Hide from Google (noindex)',
        type: 'boolean',
        initialValue: false,
        description: 'Turn ON to remove this page from search results.',
      }),
    ],
    preview: {
      select: {title: 'title'},
      prepare: ({title}) => ({
        title: pageLabel,
        subtitle: title || `Using default: "${defaultTitle}"`,
      }),
    },
  });

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    {name: 'general', title: '⚙️ General', default: true},
    {name: 'pageSeo', title: '🔍 Page SEO'},
    {name: 'navigation', title: '🧭 Navigation'},
    {name: 'footer', title: '📄 Footer'},
  ],
  fields: [
    // ── General ──────────────────────────────────────────────────────────────
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      description: 'Used as default website title and in the title template.',
      initialValue: 'Dyrect',
      validation: (Rule) => Rule.required(),
      group: 'general',
    }),
    urlField('siteUrl', 'Live Website URL', 'Your canonical domain. Example: https://www.dyrect.co'),
    urlField('bookDemoUrl', 'Book Demo / Contact URL', 'Used by the global "Book a Meeting" CTA.'),
    urlField('youtubeHowItWorksUrl', 'YouTube — How It Works video URL'),
    urlField('superblogUrl', 'Superblog URL', 'Live blog home URL.'),
    {
      ...imageWithAlt('defaultOgImage', 'Default Social Share Image',
        'Fallback OG image used by pages without their own image. Ideal: 1200×630px.'),
      group: 'general',
    },
    defineField({
      name: 'topBanner',
      title: 'Top Banner',
      type: 'object',
      group: 'navigation',
      options: {collapsible: true, collapsed: true},
      fields: [
        defineField({name: 'enabled', title: 'Show Banner', type: 'boolean', initialValue: false}),
        defineField({name: 'text', title: 'Banner Text', type: 'string'}),
        defineField({name: 'linkLabel', title: 'Link Label', type: 'string'}),
        urlField('linkUrl', 'Link URL', 'Where the banner links.'),
      ],
    }),

    // ── Per-page SEO ─────────────────────────────────────────────────────────
    defineField({
      name: 'pageSeoNote',
      title: '👆 How to use Page SEO',
      type: 'string',
      readOnly: true,
      initialValue: 'Expand any page below to set its Title Tag, Meta Description, and Social Image. Leave blank to use the default.',
      group: 'pageSeo',
    }),

    // Core pages
    pageSeoBlock('seo_home', '🏠 Home (/)',
      'Dyrect — The most seamless warranty management software',
      'Warranty registration, claims management, tracking, and extended warranty workflows for modern product brands.'),

    pageSeoBlock('seo_features', '⚙️ Features (/features)',
      'Features | Dyrect',
      'Explore all Dyrect features: product registration, warranty claims, extended warranties, digital warranty cards, and more.'),

    pageSeoBlock('seo_pricing', '💰 Pricing (/pricing)',
      'Pricing | Dyrect',
      'Simple, transparent pricing for Dyrect warranty management software. Start free, scale as you grow.'),

    pageSeoBlock('seo_faqs', '❓ FAQs (/faqs)',
      'FAQs | Dyrect',
      'Frequently asked questions about Dyrect warranty management and product registration software.'),

    // Product pages
    pageSeoBlock('seo_product_registration', '📦 Product Registration Software (/product/product-registration-software)',
      'Product Registration Software | Dyrect',
      'Omni-channel product registration software for modern product brands. Capture first-party customer data at scale.'),

    pageSeoBlock('seo_warranty_management', '🛡️ Warranty Management Software (/product/warranty-management-software)',
      'Warranty Management Software | Dyrect',
      'Reduce costs and process claims faster with Dyrect warranty management software. Trusted by 500+ brands globally.'),

    pageSeoBlock('seo_extended_warranties', '☂️ Extended Warranties (/product/extended-warranties)',
      'Extended Warranties | Dyrect',
      'Offer extended warranty and protection plans across all touchpoints. Keep 100% of revenue in-house with Dyrect.'),

    // CMS listing pages
    pageSeoBlock('seo_partners', '🤝 Partners (/partners)',
      'Partners | Dyrect',
      'Explore technology, commerce, and warranty partners that help product brands build better ownership experiences with Dyrect.'),

    pageSeoBlock('seo_case_studies', '📊 Case Studies (/case-studies)',
      'Case Studies | Dyrect',
      'See how top product brands use Dyrect to streamline warranty registration, claims management, and post-purchase experiences.'),

    pageSeoBlock('seo_showcase', '🏆 Brand Showcase (/showcase)',
      'Brand Showcase | Dyrect',
      'See how top brands effortlessly streamline warranties and build post-purchase experiences with Dyrect. Join 500+ brands.'),

    pageSeoBlock('seo_integrations', '🔌 Integrations (/integrations)',
      'Integrations | Dyrect',
      "All your favourite tools, connected. Dyrect integrates with Shopify, Klaviyo, HubSpot, Zendesk, Mailchimp and 20+ more."),

    // Solutions pages
    pageSeoBlock('seo_sol_electronics', '🔌 Solutions: Electronics (/solutions/electronics)',
      'Warranty Management for Electronics Brands | Dyrect',
      'Product registration and warranty management software built for electronics brands. Capture customer data and reduce claims costs.'),

    pageSeoBlock('seo_sol_outdoors', '🏕️ Solutions: Outdoors & Recreation (/solutions/outdoors-recreation)',
      'Warranty Management for Outdoors & Recreation Brands | Dyrect',
      'Streamline product registration and warranty claims for outdoor and recreation product brands with Dyrect.'),

    pageSeoBlock('seo_sol_baby', '👶 Solutions: Baby Gear (/solutions/baby-gear)',
      'Warranty Management for Baby Gear Brands | Dyrect',
      'Build trust with parents through seamless product registration and warranty management for baby gear brands.'),

    pageSeoBlock('seo_sol_beauty', '💄 Solutions: Beauty & Personal Care (/solutions/beauty-personal-care)',
      'Warranty Management for Beauty & Personal Care Brands | Dyrect',
      'Product registration and post-purchase experience software for beauty and personal care brands.'),

    pageSeoBlock('seo_sol_mobile', '📱 Solutions: Mobile Accessories (/solutions/mobile-accessories)',
      'Warranty Management for Mobile Accessories Brands | Dyrect',
      'Warranty registration and claims management for mobile accessories brands. Reduce costs, capture first-party data.'),

    pageSeoBlock('seo_sol_appliances', '🏠 Solutions: Home Appliances (/solutions/home-appliances)',
      'Warranty Management for Home Appliance Brands | Dyrect',
      'Streamline warranty registration and claims management for home appliance brands with Dyrect.'),

    pageSeoBlock('seo_sol_tv', '📺 Solutions: TV, Audio & Video (/solutions/tv-audio-video)',
      'Warranty Management for TV, Audio & Video Brands | Dyrect',
      'Product registration and warranty management software for TV, audio and video brands.'),

    pageSeoBlock('seo_sol_fitness', '💪 Solutions: Exercise & Fitness (/solutions/exercise-fitness)',
      'Warranty Management for Exercise & Fitness Brands | Dyrect',
      'Build better customer relationships with product registration and warranty management for fitness brands.'),

    pageSeoBlock('seo_sol_furniture', '🛋️ Solutions: Furniture (/solutions/furniture)',
      'Warranty Management for Furniture Brands | Dyrect',
      'Warranty registration and claims management for furniture brands. Reduce costs and capture first-party data.'),

    pageSeoBlock('seo_sol_smart_home', '🏡 Solutions: Smart Home & Network (/solutions/smart-home-and-network)',
      'Warranty Management for Smart Home & Network Brands | Dyrect',
      'Product registration and warranty management software for smart home and network device brands.'),

    pageSeoBlock('seo_sol_cycling', '🚴 Solutions: Cycling (/solutions/cycling)',
      'Warranty Management for Cycling Brands | Dyrect',
      'Product registration and warranty management for cycling brands. See how Velotric built a dealer customer network with Dyrect.'),
  ],

  preview: {
    prepare: () => ({title: '⚙️ Site Settings'}),
  },
});
