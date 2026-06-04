import {defineConfig} from 'sanity';
import {structureTool} from 'sanity/structure';
import {visionTool} from '@sanity/vision';
import {schemaTypes} from './src/sanity/schemaTypes';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'replace-with-project-id';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'dyrect_website',
  title: 'Dyrect Website CMS',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Dyrect CMS')
          .items([
            S.listItem().title('Partners').schemaType('partner').child(S.documentTypeList('partner').title('Partners')),
            S.listItem().title('Case Studies').schemaType('caseStudy').child(S.documentTypeList('caseStudy').title('Case Studies')),
            S.listItem().title('Integrations').schemaType('integration').child(S.documentTypeList('integration').title('Integrations')),
            S.listItem().title('Features').schemaType('feature').child(S.documentTypeList('feature').title('Features')),
            S.listItem().title('Products').schemaType('product').child(S.documentTypeList('product').title('Products')),
            S.listItem().title('Resources').schemaType('resource').child(S.documentTypeList('resource').title('Resources')),
            S.listItem().title('Glossary').schemaType('glossaryTerm').child(S.documentTypeList('glossaryTerm').title('Glossary')),
            S.listItem().title('Brand Warranties').schemaType('brandWarranty').child(S.documentTypeList('brandWarranty').title('Brand Warranties')),
            S.listItem().title('FAQs').schemaType('faq').child(S.documentTypeList('faq').title('FAQs')),
            S.listItem().title('Testimonials').schemaType('testimonial').child(S.documentTypeList('testimonial').title('Testimonials')),
            S.divider(),
            S.listItem()
              .title('Site Settings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings').title('Site Settings')),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
