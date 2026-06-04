'use client';
import dynamic from 'next/dynamic';
const IndustryRoutePage = dynamic(() => import('../../../components/legacy/IndustryRoutePage'), { ssr: false });
export default function Page() { return <IndustryRoutePage industryKey="mobile-accessories" />; }
