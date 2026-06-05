'use client';
import dynamic from 'next/dynamic';
const FaqsLegacyPage = dynamic(() => import('../../components/legacy/FaqsLegacyPage'), {ssr: false});
export default function FaqsClient() { return <FaqsLegacyPage />; }
