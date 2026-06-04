/* eslint-disable react/no-children-prop */
'use client';

import dynamic from 'next/dynamic';

const FeaturesLegacyPage = dynamic(() => import('../../components/legacy/FeaturesLegacyPage'), {
  ssr: false,
});

export default function FeaturesPage() {
  return <FeaturesLegacyPage />;
}
