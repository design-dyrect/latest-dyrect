import {client} from '../../sanity/lib/client';

export const dynamic = 'force-dynamic';
import {partnersQuery} from '../../sanity/lib/queries';
import PartnersClient from './PartnersClient';

export const metadata = {
  title: 'Partners | Dyrect',
  description: 'Explore Dyrect partners across ecommerce, warranty, support, and post-purchase workflows.',
};

export default async function PartnersPage() {
  const partners = await client.fetch(partnersQuery);
  return <PartnersClient partners={partners} />;
}
