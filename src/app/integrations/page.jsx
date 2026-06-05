import {client} from '../../sanity/lib/client';
import {integrationsQuery} from '../../sanity/lib/queries';
import IntegrationsClient from './IntegrationsClient';

export const dynamic = 'force-dynamic';

const SITE = 'https://dyrect.co';
const OG = `${SITE}/assets/og-default.png`;

export const metadata = {
  title: 'Integrations | Dyrect',
  description: "All your favourite tools, connected. Dyrect integrates with Shopify, Klaviyo, HubSpot, Zendesk, Mailchimp and 20+ more platforms. Don't leave your old tools behind.",
  alternates: {canonical: `${SITE}/integrations`},
  robots: {index: true, follow: true},
  openGraph: {
    title: 'Integrations | Dyrect',
    description: "All your favourite tools, connected. Dyrect integrates with Shopify, Klaviyo, HubSpot, Zendesk and 20+ more platforms.",
    url: `${SITE}/integrations`,
    siteName: 'Dyrect',
    images: [{url: OG, width: 1200, height: 630, alt: 'Dyrect Integrations'}],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Integrations | Dyrect',
    description: "All your favourite tools, connected. Don't leave your old tools behind, integrate them.",
    images: [OG],
  },
};

export default async function IntegrationsPage() {
  const integrations = await client.fetch(integrationsQuery);
  return <IntegrationsClient integrations={integrations} />;
}
