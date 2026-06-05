import {notFound} from 'next/navigation';
import {client} from '../../../sanity/lib/client';
import {urlFor} from '../../../sanity/lib/image';
import {buildMetadata} from '../../../sanity/lib/metadata';
import {caseStudyBySlugQuery} from '../../../sanity/lib/queries';
import RichText from '../../../components/cms/RichText';

export async function generateMetadata({params}) {
  const {slug} = await params;
  const cs = await client.fetch(caseStudyBySlugQuery, {slug});
  return buildMetadata(cs, {defaultTitle: 'Case Study | Dyrect', path: `/case-studies/${slug}`});
}

export default async function CaseStudyDetailPage({params}) {
  const {slug} = await params;
  const cs = await client.fetch(caseStudyBySlugQuery, {slug});
  if (!cs) notFound();

  const logoUrl = cs.customerLogo ? urlFor(cs.customerLogo).url() : null;
  const bannerUrl = cs.heroImage ? urlFor(cs.heroImage).width(1400).height(560).fit('crop').url() : null;
  const quoteImgUrl = cs.quoteAuthorImage ? urlFor(cs.quoteAuthorImage).width(96).height(96).fit('crop').url() : null;

  return (
    <main className="detail-page">

      {/* Banner */}
      {bannerUrl ? (
        <div className="detail-banner" style={{backgroundImage: `url(${bannerUrl})`}}>
          <div className="detail-banner-overlay" />
        </div>
      ) : (
        <div className="detail-banner detail-banner--plain" />
      )}

      <div className="detail-container">
        <a className="detail-back" href="/case-studies">← Back to Case Studies</a>

        {/* Header card */}
        <div className="detail-header-card">
          <div className="detail-header-logo">
            {logoUrl ? (
              <img src={logoUrl} alt={cs.customerLogo?.alt || `${cs.customerName} logo`} />
            ) : (
              <span className="detail-logo-initial">{cs.customerName?.slice(0, 1)}</span>
            )}
          </div>
          <div className="detail-header-text">
            {cs.solutionUsed && <p className="eyebrow">{cs.solutionUsed}</p>}
            <h1>{cs.title || cs.customerName}</h1>
            {cs.excerpt && <p className="detail-excerpt">{cs.excerpt}</p>}
            <div className="detail-meta-row">
              {cs.industry && <span className="detail-meta-tag">{cs.industry}</span>}
              {cs.country && <span className="detail-meta-tag">{cs.country}</span>}
            </div>
          </div>
        </div>

        {/* Metrics */}
        {cs.metrics && cs.metrics.length > 0 && (
          <div className="detail-metrics">
            {cs.metrics.map((m, i) => (
              <div key={i} className="detail-metric">
                <span className="detail-metric-value">{m.value}</span>
                <span className="detail-metric-label">{m.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Challenge / Solution / Results */}
        {(cs.challenge || cs.solution || cs.results) && (
          <div className="detail-csr-grid">
            {cs.challenge && (
              <div className="detail-csr-block">
                <h3>The Challenge</h3>
                <p>{cs.challenge}</p>
              </div>
            )}
            {cs.solution && (
              <div className="detail-csr-block">
                <h3>The Solution</h3>
                <p>{cs.solution}</p>
              </div>
            )}
            {cs.results && (
              <div className="detail-csr-block">
                <h3>The Results</h3>
                <p>{cs.results}</p>
              </div>
            )}
          </div>
        )}

        {/* Quote */}
        {cs.quote && (
          <blockquote className="detail-quote">
            <p>"{cs.quote}"</p>
            {(cs.quoteAuthor || cs.quoteRole) && (
              <footer className="detail-quote-author">
                {quoteImgUrl && (
                  <img src={quoteImgUrl} alt={cs.quoteAuthor} className="detail-quote-img" />
                )}
                <div>
                  {cs.quoteAuthor && <strong>{cs.quoteAuthor}</strong>}
                  {cs.quoteRole && <span>, {cs.quoteRole}</span>}
                </div>
              </footer>
            )}
          </blockquote>
        )}

        {/* Full story */}
        {cs.story && cs.story.length > 0 && (
          <div className="detail-rich-text">
            <RichText blocks={cs.story} />
          </div>
        )}
      </div>
    </main>
  );
}
