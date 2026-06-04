# Dyrect Sanity CMS Guide

This project uses Sanity as the CMS and Next.js as the website frontend.

## What The CMS Controls

Sanity is where non-technical editors create and update structured content:

- Products
- Features
- Integrations
- Product FAQs
- Solutions
- Brand Warranties
- Partners
- Case Studies
- Brand Showcases
- Testimonials
- Guides
- Resources
- E Books
- Glossary Terms
- Blog Drafts
- Podcasts
- Comparisons
- General FAQs
- Site Settings

Each collection has fields, validation, and guardrails in code. When an editor clicks "Create new", Sanity shows the empty form for that content type.

## Where Fields Are Defined

The fields are defined in:

```txt
src/sanity/schemaTypes/
```

Examples:

```txt
src/sanity/schemaTypes/partner.js
src/sanity/schemaTypes/caseStudy.js
src/sanity/schemaTypes/product.js
src/sanity/schemaTypes/siteSettings.js
```

Changing these files changes what editors see inside Sanity Studio.

## Where The Sanity Sidebar Is Defined

The Studio sidebar layout is defined in:

```txt
sanity.config.js
```

This is what creates groups like "Product & Platform", "Solutions", "Social Proof", and "Content & SEO".

## What Requires GitHub And Vercel

These changes require a code deploy:

- Adding a new field
- Renaming a field
- Creating a new CMS collection
- Changing the Studio sidebar
- Changing frontend templates
- Making a page read a new Sanity field

These changes do not require a code deploy:

- Editing existing CMS content
- Publishing a new partner
- Updating a case study
- Changing a field value that the frontend already reads

## Important

Creating a field in Sanity does not automatically change the visible website.

The frontend must be wired to read that field and render it. For example:

- The CMS can store a partner logo.
- The partner directory page must query the partner logo.
- The React/Next.js template must display the logo in the card.

Partners already have frontend pages started. Other collections are now ready in the CMS, but each corresponding frontend template still needs to be connected section by section.

## Superblog

If blog publishing stays in Superblog, use the `Superblog URL` field in Site Settings and Blog Drafts to point users to Superblog-powered pages. Sanity can still hold blog drafts or content references, but Superblog remains the live blog system until the frontend is changed.
