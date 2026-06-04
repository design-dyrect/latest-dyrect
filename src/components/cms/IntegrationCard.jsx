import Link from 'next/link';
import {urlFor} from '../../sanity/lib/image';

const CATEGORY_LABELS = {
  ecommerce: 'eCommerce', crm: 'Service CRM', helpdesk: 'Helpdesk',
  marketing: 'Marketing Automation', payments: 'Payments',
  analytics: 'Analytics', marketplace: 'Marketplace', other: 'Other',
};

export default function IntegrationCard({integration, comingSoon}) {
  const logoUrl = integration.logo
    ? urlFor(integration.logo).width(200).height(100).fit('max').url()
    : null;

  return (
    <Link
      className={`dir-card dir-card--integration${comingSoon ? ' dir-card--muted' : ''}`}
      href={`/integrations/${integration.slug.current}`}
    >
      <div className="dir-card-logo dir-card-logo--sm">
        {logoUrl ? (
          <img src={logoUrl} alt={integration.logo?.alt || `${integration.title} logo`} />
        ) : (
          <span className="dir-card-initial">{integration.title?.slice(0, 1)}</span>
        )}
      </div>

      <div className="dir-card-body">
        <h3 className="dir-card-name">{integration.title}</h3>
        {integration.category && (
          <span className="dir-card-badge">{CATEGORY_LABELS[integration.category] || integration.category}</span>
        )}
        {integration.summary && <p className="dir-card-summary">{integration.summary}</p>}
        {comingSoon && <span className="dir-card-coming-soon">Coming Soon</span>}
      </div>
    </Link>
  );
}
