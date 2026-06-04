import Link from 'next/link';
import {urlFor} from '../../sanity/lib/image';

export default function CaseStudyCard({caseStudy: cs}) {
  const logoUrl = cs.customerLogo ? urlFor(cs.customerLogo).url() : null;

  return (
    <Link className="dir-card" href={`/case-studies/${cs.slug.current}`}>
      <div className="dir-card-logo">
        {logoUrl ? (
          <img src={logoUrl} alt={cs.customerLogo?.alt || `${cs.customerName} logo`} />
        ) : (
          <span className="dir-card-initial">{cs.customerName?.slice(0, 1)}</span>
        )}
      </div>
      <div className="dir-card-body">
        {cs.industry && <span className="dir-card-badge">{cs.industry}</span>}
        <h3 className="dir-card-title">{cs.title || cs.customerName}</h3>
        {cs.excerpt && <p className="dir-card-summary">{cs.excerpt}</p>}
        <span className="dir-card-cta">Read case study →</span>
      </div>
    </Link>
  );
}
