import dynamic from 'next/dynamic';
import {getPageMetadata} from '../../sanity/lib/pageSeo';
const PricingLegacyPage = dynamic(() => import('../../components/legacy/PricingLegacyPage'), {ssr: false});
export async function generateMetadata() { return getPageMetadata('pricing'); }
export default function PricingPage() { return <PricingLegacyPage />; }
