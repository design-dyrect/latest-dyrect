'use client';

import dynamic from 'next/dynamic';

const ProductRegistrationLegacyPage = dynamic(() => import('../../components/legacy/ProductRegistrationLegacyPage'), {
  ssr: false,
});

export default function ProductRegistrationPage() {
  return <ProductRegistrationLegacyPage />;
}
