import {client} from '../../sanity/lib/client';
import {partnersQuery} from '../../sanity/lib/queries';
import PartnersClient from './PartnersClient';

export const dynamic = 'force-dynamic';

const SITE = 'https://dyrect.co';
const OG = `${SITE}/assets/og-default.png`;

export const metadata = {
  title: 'Partners | Dyrect',
  description: 'Explore technology, commerce, and warranty partners that help product brands build better ownership experiences with Dyrect.',
  alternates: {canonical: `${SITE}/partners`},
  robots: {index: true, follow: true},
  openGraph: {
    title: 'Partners | Dyrect',
    description: 'Explore technology, commerce, and warranty partners that help product brands build better ownership experiences with Dyrect.',
    url: `${SITE}/partners`,
    siteName: 'Dyrect',
    images: [{url: OG, width: 1200, height: 630, alt: 'Dyrect Partner Directory'}],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Partners | Dyrect',
    description: 'Explore technology, commerce, and warranty partners that help product brands build better ownership experiences with Dyrect.',
    images: [OG],
  },
};

export default async function PartnersPage() {
  const partners = await client.fetch(partnersQuery);
  return <PartnersClient partners={partners} />;
}
