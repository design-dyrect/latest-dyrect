import {client} from '../../sanity/lib/client';
import {integrationsQuery} from '../../sanity/lib/queries';
import IntegrationsClient from './IntegrationsClient';

export const metadata = {
  title: 'Integrations | Dyrect',
  description: "All your favourite tools, connected. Don't leave your old tools behind, integrate them.",
};

export default async function IntegrationsPage() {
  const integrations = await client.fetch(integrationsQuery);
  return <IntegrationsClient integrations={integrations} />;
}
