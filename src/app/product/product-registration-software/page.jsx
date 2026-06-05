import dynamic from 'next/dynamic';
import {getPageMetadata} from '../../../sanity/lib/pageSeo';
const Page = dynamic(() => import('../../../components/legacy/ProductRegistrationLegacyPage
WarrantyClaimsLegacyPage'), {ssr: false});
export async function generateMetadata() { return getPageMetadata('product_registration'); }
export default function ProductPage() { return <Page />; }
