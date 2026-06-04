import {defineConfig} from 'sanity';
import {structureTool} from 'sanity/structure';
import {visionTool} from '@sanity/vision';
import {schemaTypes} from './src/sanity/schemaTypes';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '2clvfbpa';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'dyrect_website',
  title: 'Dyrect Website CMS',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) => {
        const collection = (type, title) =>
          S.listItem().title(title).schemaType(type).child(S.documentTypeList(type).title(title));

        return S.list()
          .title('Dyrect CMS')
          .items([
            S.listItem()
              .title('Site Settings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings').title('Site Settings')),
            S.divider(),
            S.listItem()
              .title('Product & Platform')
              .child(
                S.list()
                  .title('Product & Platform')
                  .items([
                    collection('product', 'Products'),
                    collection('feature', 'Features'),
                    collection('integration', 'Integrations'),
                    collection('productFaq', 'Product FAQs - Drafts'),
                  ])
              ),
            S.listItem()
              .title('Solutions')
              .child(
                S.list()
                  .title('Solutions')
                  .items([
                    collection('solution', 'Solutions'),
                    collection('brandWarranty', 'Brand Warranties'),
                  ])
              ),
            S.listItem()
              .title('Social Proof')
              .child(
                S.list()
                  .title('Social Proof')
                  .items([
                    collection('caseStudy', 'Case Studies'),
                    collection('brandShowcase', 'Brand Showcases'),
                    collection('testimonial', 'Testimonials'),
                    collection('partner', 'Partners'),
                  ])
              ),
            S.listItem()
              .title('Content & SEO')
              .child(
                S.list()
                  .title('Content & SEO')
                  .items([
                    collection('guide', 'Guides'),
                    collection('resource', 'Resources'),
                    collection('ebook', 'E Books'),
                    collection('glossaryTerm', 'Glossary Terms'),
                    collection('blogPost', 'Blog Posts - Drafts'),
                    collection('podcast', 'Podcasts'),
                    collection('comparison', 'Comparisons'),
                    collection('faq', 'General FAQs'),
                  ])
              ),
          ]);
      },
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
