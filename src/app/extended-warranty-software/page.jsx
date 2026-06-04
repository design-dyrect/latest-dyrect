'use client';

import dynamic from 'next/dynamic';

const ExtendedWarrantyLegacyPage = dynamic(() => import('../../components/legacy/ExtendedWarrantyLegacyPage'), {
  ssr: false,
});

export default function ExtendedWarrantyPage() {
  return <ExtendedWarrantyLegacyPage />;
}
