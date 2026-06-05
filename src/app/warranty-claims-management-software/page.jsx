import dynamic from 'next/dynamic';
import {getPageMetadata} from '../../sanity/lib/pageSeo';
const WarrantyClaimsLegacyPage = dynamic(() => import('../../components/legacy/WarrantyClaimsLegacyPage'), {ssr: false});
export async function generateMetadata() { return getPageMetadata('warranty_management'); }
export default function WarrantyClaimsPage() { return <WarrantyClaimsLegacyPage />; }
