'use client';
import dynamic from 'next/dynamic';
const HomeLegacyPage = dynamic(() => import('../components/legacy/HomeLegacyPage'), {ssr: false});
export default function HomeClient() { return <HomeLegacyPage />; }
