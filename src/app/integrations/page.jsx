import {client} from '../../sanity/lib/client';
import {integrationsQuery} from '../../sanity/lib/queries';
import {getPageMetadata} from '../../sanity/lib/pageSeo';
import IntegrationsClient from './IntegrationsClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return getPageMetadata('integrations');
}

export default async function IntegrationsPage() {
  const integrations = await client.fetch(integrationsQuery);
  return <IntegrationsClient integrations={integrations} />;
}
