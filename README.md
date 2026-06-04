# Dyrect Website Next.js

Production Next.js migration of the Dyrect homepage and product pages.

## Local preview

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Vercel

- Framework Preset: Next.js
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: leave blank
- Root Directory: leave blank

## Pages

- `/`
- `/features`
- `/studio`
- `/partners`
- `/partners/[slug]`
- `/product-registration-software`
- `/warranty-claims-management-software`
- `/extended-warranty-software`
- `/product/product-registration-software`
- `/product/warranty-management-software`
- `/product/extended-warranties`

## Sanity CMS

This project now includes Sanity Studio at `/studio`.

Create a Sanity project, then add these environment variables locally in `.env.local` and in Vercel:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-06-03
```

Current CMS collections:

- Partners
- Case Studies
- Integrations
- Features
- Products
- Resources
- Glossary
- Brand Warranties
- FAQs
- Testimonials
- Site Settings

First working CMS frontend route:

- `/partners`
- `/partners/[slug]`

Recommended first test:

1. Open `/studio`.
2. Create a Partner.
3. Fill Partner Name, Slug, Logo, Summary, and About.
4. Publish it.
5. Open `/partners` to confirm the entry appears.

For Vercel:

- Add the same Sanity environment variables in Project Settings → Environment Variables.
- Redeploy after adding them.
