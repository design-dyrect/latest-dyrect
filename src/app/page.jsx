/* eslint-disable react/no-children-prop */
import dynamic from 'next/dynamic';
import {getPageMetadata} from '../sanity/lib/pageSeo';

const HomeLegacyPage = dynamic(() => import('../components/legacy/HomeLegacyPage'), {
  ssr: false,
});

export async function generateMetadata() {
  return getPageMetadata('home');
}

export default function HomePage() {
  return <HomeLegacyPage />;
}
