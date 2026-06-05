import {client} from '../../sanity/lib/client';
import {caseStudiesQuery} from '../../sanity/lib/queries';
import {getPageMetadata} from '../../sanity/lib/pageSeo';
import CaseStudiesClient from './CaseStudiesClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return getPageMetadata('case_studies');
}

export default async function CaseStudiesPage() {
  const caseStudies = await client.fetch(caseStudiesQuery);
  return <CaseStudiesClient caseStudies={caseStudies} />;
}
