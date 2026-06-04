import {notFound} from 'next/navigation';
import {client} from '../../../sanity/lib/client';
import {urlFor} from '../../../sanity/lib/image';
import {integrationBySlugQuery} from '../../../sanity/lib/queries';
import RichText from '../../../components/cms/RichText';

export async function generateMetadata({params}) {
  const {slug} = await params;
  const integration = await client.fetch(integrationBySlugQuery, {slug});
  if (!integration) return {title: 'Integration | Dyrect'};
  return {
    title: integration.seoTitle || `${integration.title} Integration | Dyrect`,
    description: integration.seoDescription || integration.summary,
  };
}

const CATEGORY_LABELS = {
  ecommerce: 'eCommerce', crm: 'Service CRM', helpdesk: 'Helpdesk',
  marketing: 'Marketing Automation', payments: 'Payments',
  analytics: 'Analytics', marketplace: 'Marketplace', other: 'Other',
};

export default async function IntegrationDetailPage({params}) {
  const {slug} = await params;
  const integration = await client.fetch(integrationBySlugQuery, {slug});
  if (!integration) notFound();

  const logoUrl = integration.logo ? urlFor(integration.logo).url() : null;

  return (
    <main className="detail-page">
      <div className="detail-banner detail-banner--plain" />

      <div className="detail-container">
        <a className="detail-back" href="/integrations">← Back to Integrations</a>

        <div className="detail-header-card">
          <div className="detail-header-logo detail-header-logo--sm">
            {logoUrl ? (
              <img src={logoUrl} alt={integration.logo?.alt || `${integration.title} logo`} />
            ) : (
              <span className="detail-logo-initial">{integration.title?.slice(0, 1)}</span>
            )}
          </div>
          <div className="detail-header-text">
            {integration.category && (
              <p className="eyebrow">{CATEGORY_LABELS[integration.category] || integration.category}</p>
            )}
            <h1>{integration.title}</h1>
            {integration.summary && <p className="detail-excerpt">{integration.summary}</p>}
            {integration.availability === 'coming-soon' && (
              <span className="detail-badge detail-badge--soon">Coming Soon</span>
            )}
            {integration.availability === 'private-beta' && (
              <span className="detail-badge detail-badge--beta">Private Beta</span>
            )}
            <div style={{display: 'flex', gap: '12px', marginTop: '24px', flexWrap: 'wrap'}}>
              {integration.websiteUrl && (
                <a className="btn btn-primary" href={integration.websiteUrl} target="_blank" rel="noreferrer">
                  Learn More →
                </a>
              )}
              {integration.setupGuideUrl && (
                <a className="btn btn-secondary" href={integration.setupGuideUrl} target="_blank" rel="noreferrer">
                  Setup Guide
                </a>
              )}
            </div>
          </div>
        </div>

        {integration.details && integration.details.length > 0 && (
          <div className="detail-rich-text">
            <RichText blocks={integration.details} />
          </div>
        )}
      </div>
    </main>
  );
}
