import Link from 'next/link';
import {urlFor} from '../../sanity/lib/image';

export default function PartnerCard({partner}) {
  // No dimension transforms — get original image, let CSS handle sizing
  const logoUrl = partner.logo ? urlFor(partner.logo).url() : null;

  return (
    <Link className="partner-card" href={`/partners/${partner.slug.current}`}>
      <div className="partner-card-logo">
        {logoUrl ? (
          <img src={logoUrl} alt={partner.logo?.alt || `${partner.title} logo`} />
        ) : (
          <span className="partner-card-initial">{partner.title.slice(0, 1)}</span>
        )}
      </div>
      <div className="partner-card-body">
        <h3 className="partner-card-name">{partner.title}</h3>
        {partner.type && <span className="partner-card-badge">{partner.type}</span>}
        {partner.summary && <p className="partner-card-summary">{partner.summary}</p>}
      </div>
    </Link>
  );
}
