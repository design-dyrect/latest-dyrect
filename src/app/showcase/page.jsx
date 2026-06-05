import {client} from '../../sanity/lib/client';
import {brandShowcasesQuery} from '../../sanity/lib/queries';
import {getPageMetadata} from '../../sanity/lib/pageSeo';
import ShowcaseClient from './ShowcaseClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return getPageMetadata('showcase');
}

export default async function ShowcasePage() {
  const brands = await client.fetch(brandShowcasesQuery);
  return <ShowcaseClient brands={brands} />;
}
