export const dynamic = 'force-dynamic';
import {client} from '../../sanity/lib/client';
import {caseStudiesQuery} from '../../sanity/lib/queries';
import CaseStudiesClient from './CaseStudiesClient';

export const metadata = {
  title: 'Case Studies | Dyrect',
  description: 'See how top brands use Dyrect to streamline warranty registration, claims, and post-purchase experiences.',
};

export default async function CaseStudiesPage() {
  const caseStudies = await client.fetch(caseStudiesQuery);
  return <CaseStudiesClient caseStudies={caseStudies} />;
}
