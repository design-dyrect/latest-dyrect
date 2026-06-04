export const dynamic = 'force-dynamic';
import {client} from '../../sanity/lib/client';
import {brandShowcasesQuery} from '../../sanity/lib/queries';
import ShowcaseClient from './ShowcaseClient';

export const metadata = {
  title: 'Brand Showcase | Dyrect',
  description: 'See how top brands effortlessly streamline warranties and build post-purchase experiences with Dyrect.',
};

export default async function ShowcasePage() {
  const brands = await client.fetch(brandShowcasesQuery);
  return <ShowcaseClient brands={brands} />;
}
