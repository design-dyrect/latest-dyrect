import dynamic from 'next/dynamic';
import {getPageMetadata} from '../../sanity/lib/pageSeo';
const FaqsLegacyPage = dynamic(() => import('../../components/legacy/FaqsLegacyPage'), {ssr: false});
export async function generateMetadata() { return getPageMetadata('faqs'); }
export default function FaqsPage() { return <FaqsLegacyPage />; }
