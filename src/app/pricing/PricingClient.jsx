'use client';
import dynamic from 'next/dynamic';
const PricingLegacyPage = dynamic(() => import('../../components/legacy/PricingLegacyPage'), {ssr: false});
export default function PricingClient() { return <PricingLegacyPage />; }
