import dynamic from 'next/dynamic';
import {getPageMetadata} from '../../sanity/lib/pageSeo';
const FeaturesLegacyPage = dynamic(() => import('../../components/legacy/FeaturesLegacyPage'), {ssr: false});
export async function generateMetadata() { return getPageMetadata('features'); }
export default function FeaturesPage() { return <FeaturesLegacyPage />; }
