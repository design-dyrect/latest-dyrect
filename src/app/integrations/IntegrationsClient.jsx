'use client';
import {useState} from 'react';
import IntegrationCard from '../../components/cms/IntegrationCard';

const CATEGORY_LABELS = {
  ecommerce: 'eCommerce',
  crm: 'Service CRM',
  helpdesk: 'Helpdesk',
  marketing: 'Marketing Automation',
  payments: 'Payments',
  analytics: 'Analytics',
  marketplace: 'Marketplace',
  other: 'Other',
};

export default function IntegrationsClient({integrations}) {
  const rawCategories = Array.from(new Set(integrations.map((i) => i.category).filter(Boolean))).sort();
  const categories = ['all', ...rawCategories];
  const [active, setActive] = useState('all');

  const filtered = active === 'all' ? integrations : integrations.filter((i) => i.category === active);
  const live = filtered.filter((i) => i.availability !== 'coming-soon');
  const coming = filtered.filter((i) => i.availability === 'coming-soon');

  return (
    <main className="dir-page">
      <section className="dir-hero">
        <p className="eyebrow">Integrations</p>
        <h1>All your favourite tools, connected</h1>
        <p>Don't leave your old tools behind, integrate them.</p>
      </section>

      {/* Category tabs */}
      <div className="integrations-tabs-wrap">
        <div className="integrations-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`integrations-tab${active === cat ? ' active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat === 'all' ? 'All' : (CATEGORY_LABELS[cat] || cat)}
            </button>
          ))}
        </div>
      </div>

      <div className="dir-container">
        {/* Live integrations */}
        <section className="dir-grid dir-grid--integrations">
          {live.map((integration) => (
            <IntegrationCard key={integration._id} integration={integration} />
          ))}
        </section>

        {/* Coming soon */}
        {coming.length > 0 && (
          <>
            <h3 className="integrations-section-label">Coming Soon</h3>
            <section className="dir-grid dir-grid--integrations">
              {coming.map((integration) => (
                <IntegrationCard key={integration._id} integration={integration} comingSoon />
              ))}
            </section>
          </>
        )}

        {/* Not listed CTA */}
        <div className="integrations-not-listed">
          <p>Your tool is not listed above?</p>
          <a className="btn btn-secondary" href="mailto:hello@dyrect.co">Request an Integration</a>
        </div>
      </div>
    </main>
  );
}
