import {client} from '../../sanity/lib/client';
import {brandShowcasesQuery} from '../../sanity/lib/queries';
import ShowcaseClient from './ShowcaseClient';

export const dynamic = 'force-dynamic';

const SITE = 'https://dyrect.co';
const OG = `${SITE}/assets/og-default.png`;

export const metadata = {
  title: 'Brand Showcase | Dyrect',
  description: 'See how top brands effortlessly streamline warranties and build post-purchase experiences with Dyrect. Join 500+ brands globally.',
  alternates: {canonical: `${SITE}/showcase`},
  robots: {index: true, follow: true},
  openGraph: {
    title: 'Brand Showcase | Dyrect',
    description: 'See how top brands effortlessly streamline warranties and build post-purchase experiences with Dyrect. Join 500+ brands globally.',
    url: `${SITE}/showcase`,
    siteName: 'Dyrect',
    images: [{url: OG, width: 1200, height: 630, alt: 'Dyrect Brand Showcase'}],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brand Showcase | Dyrect',
    description: 'See how top brands effortlessly streamline warranties and build post-purchase experiences with Dyrect.',
    images: [OG],
  },
};

export default async function ShowcasePage() {
  const brands = await client.fetch(brandShowcasesQuery);
  return <ShowcaseClient brands={brands} />;
}
