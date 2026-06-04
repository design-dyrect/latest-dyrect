'use client';
import dynamic from 'next/dynamic';
const ElectronicsIndustryLegacyPage = dynamic(() => import('../../../components/legacy/ElectronicsIndustryLegacyPage'), { ssr: false });
export default function Page() { return <ElectronicsIndustryLegacyPage />; }
