import {notFound} from 'next/navigation';
import {client} from '../../../sanity/lib/client';
import {urlFor} from '../../../sanity/lib/image';
import {partnerBySlugQuery} from '../../../sanity/lib/queries';
import RichText from '../../../components/cms/RichText';

export const dynamic = 'force-dynamic';

export async function generateMetadata({params}) {
  const {slug} = await params;
  const partner = await client.fetch(partnerBySlugQuery, {slug});
  if (!partner) return {title: 'Partner | Dyrect'};
  return {
    title: partner.seoTitle || `${partner.title} | Dyrect Partner`,
    description: partner.seoDescription || partner.summary,
  };
}

export default async function PartnerDetailPage({params}) {
  const {slug} = await params;
  const partner = await client.fetch(partnerBySlugQuery, {slug});
  if (!partner) notFound();

  const logoUrl = partner.logo ? urlFor(partner.logo).url() : null;

  return (
    <main className="partner-detail-page">
      <div className="partner-detail-container">
        <a className="partner-detail-back" href="/partners">← Back to Partners</a>

        <div className="partner-detail-layout">

          {/* ── Left sidebar ── */}
          <aside className="partner-detail-sidebar">
            <div className="partner-detail-logo-box">
              {logoUrl ? (
                <img src={logoUrl} alt={partner.logo?.alt || `${partner.title} logo`} />
              ) : (
                <span className="partner-detail-logo-initial">{partner.title?.slice(0, 1)}</span>
              )}
            </div>

            {partner.type && <span className="partner-sidebar-badge">{partner.type}</span>}
            <h2 className="partner-sidebar-name">{partner.title}</h2>
            {partner.country && <p className="partner-sidebar-country">{partner.country}</p>}

            {partner.websiteUrl && (
              <a className="partner-sidebar-link" href={partner.websiteUrl} target="_blank" rel="noreferrer">
                Visit Website ↗
              </a>
            )}

            <div className="partner-sidebar-meta">
              {partner.category && <span className="partner-meta-tag">{partner.category}</span>}
              {partner.featured && <span className="partner-meta-tag partner-meta-featured">⭐ Featured</span>}
            </div>
          </aside>

          {/* ── Right content ── */}
          <div className="partner-detail-content">
            {partner.summary && (
              <p className="partner-detail-summary">{partner.summary}</p>
            )}

            {partner.about && partner.about.length > 0 && (
              <div className="partner-rich-text">
                <RichText blocks={partner.about} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
