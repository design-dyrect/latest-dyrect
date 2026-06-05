import dynamic from 'next/dynamic';
import {getPageMetadata} from '../../../sanity/lib/pageSeo';
const Page = dynamic(() => import('../../../components/legacy/WarrantyClaimsLegacyPage'), {ssr: false});
export async function generateMetadata() { return getPageMetadata('warranty_management'); }
export default function ProductPage() { return <Page />; }
