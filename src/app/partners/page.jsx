import {client} from '../../sanity/lib/client';
import {partnersQuery} from '../../sanity/lib/queries';
import {getPageMetadata} from '../../sanity/lib/pageSeo';
import PartnersClient from './PartnersClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return getPageMetadata('partners');
}

export default async function PartnersPage() {
  const partners = await client.fetch(partnersQuery);
  return <PartnersClient partners={partners} />;
}
