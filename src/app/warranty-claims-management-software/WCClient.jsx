'use client';
import dynamic from 'next/dynamic';
const WarrantyClaimsLegacyPage = dynamic(() => import('../../components/legacy/WarrantyClaimsLegacyPage'), {ssr: false});
export default function WCClient() { return <WarrantyClaimsLegacyPage />; }
