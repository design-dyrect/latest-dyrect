import Link from 'next/link';
import {urlFor} from '../../sanity/lib/image';

export default function ShowcaseCard({brand}) {
  const logoUrl = brand.brandLogo
    ? urlFor(brand.brandLogo).width(280).height(140).fit('max').url()
    : null;

  return (
    <Link className="dir-card dir-card--showcase" href={`/showcase/${brand.slug.current}`}>
      <div className="dir-card-logo">
        {logoUrl ? (
          <img src={logoUrl} alt={brand.brandLogo?.alt || `${brand.brandName} logo`} />
        ) : (
          <span className="dir-card-initial">{brand.brandName?.slice(0, 1)}</span>
        )}
      </div>

      <div className="dir-card-body">
        <h3 className="dir-card-name">{brand.brandName}</h3>
        {brand.country && <p className="dir-card-meta">{brand.country}</p>}
        {brand.industry && <span className="dir-card-badge">{brand.industry}</span>}
        {brand.solutionUsed && <span className="dir-card-badge dir-card-badge--blue">{brand.solutionUsed}</span>}
        <span className="dir-card-cta">View Dyrect in Action →</span>
      </div>
    </Link>
  );
}
