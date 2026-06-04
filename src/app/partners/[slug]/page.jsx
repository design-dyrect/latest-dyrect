import {notFound} from 'next/navigation';
import SanitySetupNotice from '../../../components/cms/SanitySetupNotice';
import {hasSanityConfig} from '../../../sanity/lib/api';
import {client} from '../../../sanity/lib/client';
import {urlFor} from '../../../sanity/lib/image';
import {partnerBySlugQuery} from '../../../sanity/lib/queries';

export async function generateMetadata({params}) {
  if (!hasSanityConfig) return {title: 'Partner | Dyrect'};
  const {slug} = await params;
  const partner = await client.fetch(partnerBySlugQuery, {slug});
  if (!partner) return {title: 'Partner | Dyrect'};

  return {
    title: partner.seoTitle || `${partner.title} | Dyrect Partner`,
    description: partner.seoDescription || partner.summary,
  };
}

function renderBlocks(blocks = []) {
  return blocks.map((block) => {
    if (block._type !== 'block') return null;
    const text = block.children?.map((child) => child.text).join('') || '';
    if (!text) return null;
    if (block.style === 'h2') return <h2 key={block._key}>{text}</h2>;
    if (block.style === 'h3') return <h3 key={block._key}>{text}</h3>;
    if (block.style === 'blockquote') return <blockquote key={block._key}>{text}</blockquote>;
    return <p key={block._key}>{text}</p>;
  });
}

export default async function PartnerDetailPage({params}) {
  if (!hasSanityConfig) {
    return <SanitySetupNotice />;
  }

  const {slug} = await params;
  const partner = await client.fetch(partnerBySlugQuery, {slug});

  if (!partner) notFound();

  const logoUrl = partner.logo ? urlFor(partner.logo).width(320).height(160).fit('max').url() : null;

  return (
    <main className="cms-page">
      <article className="cms-detail">
        <a className="cms-back-link" href="/partners">Back to partners</a>
        <div className="cms-detail-hero">
          <div>
            <p className="eyebrow">{partner.type || 'Partner'}</p>
            <h1>{partner.title}</h1>
            <p>{partner.summary}</p>
            {partner.websiteUrl ? (
              <a className="btn btn-primary" href={partner.websiteUrl} target="_blank" rel="noreferrer">
                Visit website
              </a>
            ) : null}
          </div>
          <div className="cms-detail-logo">
            {logoUrl ? <img src={logoUrl} alt={partner.logo?.alt || `${partner.title} logo`} /> : partner.title}
          </div>
        </div>

        <div className="cms-meta-row">
          {partner.country ? <span>{partner.country}</span> : null}
          {partner.category ? <span>{partner.category}</span> : null}
          {partner.featured ? <span>Featured</span> : null}
        </div>

        <div className="cms-rich-text">
          {renderBlocks(partner.about)}
        </div>
      </article>
    </main>
  );
}
