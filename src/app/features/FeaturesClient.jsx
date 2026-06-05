'use client';
import dynamic from 'next/dynamic';
const FeaturesLegacyPage = dynamic(() => import('../../components/legacy/FeaturesLegacyPage'), {ssr: false});
export default function FeaturesClient() { return <FeaturesLegacyPage />; }
