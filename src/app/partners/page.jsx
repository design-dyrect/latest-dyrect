import PartnerCard from '../../components/cms/PartnerCard';
import SanitySetupNotice from '../../components/cms/SanitySetupNotice';
import {hasSanityConfig} from '../../sanity/lib/api';
import {client} from '../../sanity/lib/client';
import {partnersQuery} from '../../sanity/lib/queries';

export const metadata = {
  title: 'Partners | Dyrect',
  description: 'Explore Dyrect partners across ecommerce, warranty, support, and post-purchase workflows.',
};

export default async function PartnersPage() {
  if (!hasSanityConfig) {
    return <SanitySetupNotice />;
  }

  const partners = await client.fetch(partnersQuery);

  return (
    <main className="cms-page">
      <section className="cms-hero">
        <p className="eyebrow">Partners</p>
        <h1>Partner directory</h1>
        <p>
          Explore technology, commerce, service, and warranty partners that help product brands
          build better ownership experiences with Dyrect.
        </p>
      </section>

      {partners.length ? (
        <section className="cms-grid">
          {partners.map((partner) => <PartnerCard key={partner._id} partner={partner} />)}
        </section>
      ) : (
        <section className="cms-empty-state">
          <p className="eyebrow">No partners yet</p>
          <h2>Add your first partner in Sanity Studio.</h2>
          <p>Create and publish a Partner entry, then refresh this page.</p>
          <a className="btn btn-primary" href="/studio/structure/partner">Open Partners in Studio</a>
        </section>
      )}
    </main>
  );
}
