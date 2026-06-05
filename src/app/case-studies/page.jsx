import {client} from '../../sanity/lib/client';
import {caseStudiesQuery} from '../../sanity/lib/queries';
import CaseStudiesClient from './CaseStudiesClient';

export const dynamic = 'force-dynamic';

const SITE = 'https://dyrect.co';
const OG = `${SITE}/assets/og-default.png`;

export const metadata = {
  title: 'Case Studies | Dyrect',
  description: 'See how top product brands use Dyrect to streamline warranty registration, claims management, and post-purchase experiences.',
  alternates: {canonical: `${SITE}/case-studies`},
  robots: {index: true, follow: true},
  openGraph: {
    title: 'Case Studies | Dyrect',
    description: 'See how top product brands use Dyrect to streamline warranty registration, claims management, and post-purchase experiences.',
    url: `${SITE}/case-studies`,
    siteName: 'Dyrect',
    images: [{url: OG, width: 1200, height: 630, alt: 'Dyrect Case Studies'}],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Studies | Dyrect',
    description: 'See how top product brands use Dyrect to streamline warranty registration, claims management, and post-purchase experiences.',
    images: [OG],
  },
};

export default async function CaseStudiesPage() {
  const caseStudies = await client.fetch(caseStudiesQuery);
  return <CaseStudiesClient caseStudies={caseStudies} />;
}
