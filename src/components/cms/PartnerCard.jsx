import Link from 'next/link';
import {urlFor} from '../../sanity/lib/image';

export default function PartnerCard({partner}) {
  const logoUrl = partner.logo ? urlFor(partner.logo).width(240).height(120).fit('max').url() : null;

  return (
    <Link className="cms-card" href={`/partners/${partner.slug.current}`}>
      <div className="cms-card-logo">
        {logoUrl ? (
          <img src={logoUrl} alt={partner.logo?.alt || `${partner.title} logo`} />
        ) : (
          <span>{partner.title.slice(0, 1)}</span>
        )}
      </div>
      <div>
        <p className="cms-card-kicker">{partner.type || 'Partner'}</p>
        <h2>{partner.title}</h2>
        <p>{partner.summary}</p>
      </div>
    </Link>
  );
}
