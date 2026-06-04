import {notFound} from 'next/navigation';
import {client} from '../../../sanity/lib/client';
import {urlFor} from '../../../sanity/lib/image';
import {partnerBySlugQuery} from '../../../sanity/lib/queries';

export async function generateMetadata({params}) {
  const {slug} = await params;
  const partner = await client.fetch(partnerBySlugQuery, {slug});
  if (!partner) return {title: 'Partner | Dyrect'};
  return {
    title: partner.seoTitle || `${partner.title} | Dyrect Partner`,
    description: partner.seoDescription || partner.summary,
  };
}

function RichText({blocks = []}) {
  return blocks.map((block) => {
    if (block._type !== 'block') return null;
    const children = (block.children || []).map((child, i) => {
      const text = child.text || '';
      const marks = child.marks || [];
      if (marks.includes('strong')) return <strong key={i}>{text}</strong>;
      if (marks.includes('em')) return <em key={i}>{text}</em>;
      return <span key={i}>{text}</span>;
    });
    const key = block._key;
    if (block.style === 'h2') return <h2 key={key}>{children}</h2>;
    if (block.style === 'h3') return <h3 key={key}>{children}</h3>;
    if (block.style === 'h4') return <h4 key={key}>{children}</h4>;
    if (block.style === 'blockquote') return <blockquote key={key}>{children}</blockquote>;
    return <p key={key}>{children}</p>;
  });
}

export default async function PartnerDetailPage({params}) {
  const {slug} = await params;
  const partner = await client.fetch(partnerBySlugQuery, {slug});
  if (!partner) notFound();

  const logoUrl = partner.logo
    ? urlFor(partner.logo).url()
    : null;

  return (
    <main className="partner-detail-page">
      <div className="partner-detail-container">

        <a className="partner-detail-back" href="/partners">← Back to Partners</a>

        {/* Hero row */}
        <div className="partner-detail-hero">
          <div className="partner-detail-hero-text">
            {partner.type && <p className="eyebrow">{partner.type} Partner</p>}
            <h1>{partner.title}</h1>
            {partner.summary && (
              <p className="partner-detail-summary">{partner.summary}</p>
            )}
            <div className="partner-detail-meta">
              {partner.country && (
                <span className="partner-meta-tag">{partner.country}</span>
              )}
              {partner.category && (
                <span className="partner-meta-tag">{partner.category}</span>
              )}
              {partner.featured && (
                <span className="partner-meta-tag partner-meta-featured">⭐ Featured</span>
              )}
            </div>
            {partner.websiteUrl && (
              <a
                className="btn btn-primary"
                href={partner.websiteUrl}
                target="_blank"
                rel="noreferrer"
                style={{marginTop: '24px', display: 'inline-flex'}}
              >
                Visit Website →
              </a>
            )}
          </div>

          <div className="partner-detail-logo-box">
            {logoUrl ? (
              <img src={logoUrl} alt={partner.logo?.alt || `${partner.title} logo`} />
            ) : (
              <span className="partner-detail-logo-initial">{partner.title.slice(0, 1)}</span>
            )}
          </div>
        </div>

        {/* Rich text about section */}
        {partner.about && partner.about.length > 0 && (
          <div className="partner-rich-text">
            <RichText blocks={partner.about} />
          </div>
        )}

      </div>
    </main>
  );
}
