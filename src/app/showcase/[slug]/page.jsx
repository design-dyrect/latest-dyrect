import {notFound} from 'next/navigation';
import {client} from '../../../sanity/lib/client';
import {urlFor} from '../../../sanity/lib/image';
import {buildMetadata} from '../../../sanity/lib/metadata';
import {brandShowcaseBySlugQuery} from '../../../sanity/lib/queries';
import RichText from '../../../components/cms/RichText';

export async function generateMetadata({params}) {
  const {slug} = await params;
  const brand = await client.fetch(brandShowcaseBySlugQuery, {slug});
  return buildMetadata(brand, {titleSuffix: ' Showcase', defaultTitle: 'Brand Showcase | Dyrect', path: `/showcase/${slug}`});
}

export default async function ShowcaseDetailPage({params}) {
  const {slug} = await params;
  const brand = await client.fetch(brandShowcaseBySlugQuery, {slug});
  if (!brand) notFound();

  const logoUrl = brand.brandLogo ? urlFor(brand.brandLogo).url() : null;
  const bannerUrl = brand.heroImage ? urlFor(brand.heroImage).width(1400).height(560).fit('crop').url() : null;

  return (
    <main className="detail-page">
      {bannerUrl ? (
        <div className="detail-banner" style={{backgroundImage: `url(${bannerUrl})`}}>
          <div className="detail-banner-overlay" />
        </div>
      ) : (
        <div className="detail-banner detail-banner--plain" />
      )}

      <div className="detail-container">
        <a className="detail-back" href="/showcase">← Back to Showcase</a>

        <div className="detail-header-card">
          <div className="detail-header-logo">
            {logoUrl ? (
              <img src={logoUrl} alt={brand.brandLogo?.alt || `${brand.brandName} logo`} />
            ) : (
              <span className="detail-logo-initial">{brand.brandName?.slice(0, 1)}</span>
            )}
          </div>
          <div className="detail-header-text">
            {brand.solutionUsed && <p className="eyebrow">{brand.solutionUsed}</p>}
            <h1>{brand.brandName}</h1>
            {brand.excerpt && <p className="detail-excerpt">{brand.excerpt}</p>}
            <div className="detail-meta-row">
              {brand.industry && <span className="detail-meta-tag">{brand.industry}</span>}
              {brand.country && <span className="detail-meta-tag">{brand.country}</span>}
            </div>
            {brand.showcaseUrl && (
              <a className="btn btn-primary" href={brand.showcaseUrl} target="_blank" rel="noreferrer" style={{marginTop: '24px', display: 'inline-flex'}}>
                View Dyrect in Action →
              </a>
            )}
          </div>
        </div>

        {/* Highlights */}
        {brand.highlights && brand.highlights.length > 0 && (
          <div className="detail-highlights">
            <h3>Highlights</h3>
            <ul>
              {brand.highlights.map((h, i) => <li key={i}>{h}</li>)}
            </ul>
          </div>
        )}

        {/* Testimonial */}
        {brand.testimonialPersonName && (
          <div className="detail-testimonial-meta">
            <strong>{brand.testimonialPersonName}</strong>
            {brand.testimonialPersonDesignation && <span>, {brand.testimonialPersonDesignation}</span>}
          </div>
        )}

        {brand.story && brand.story.length > 0 && (
          <div className="detail-rich-text">
            <RichText blocks={brand.story} />
          </div>
        )}
      </div>
    </main>
  );
}
