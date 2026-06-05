import dynamic from 'next/dynamic';
import {getPageMetadata} from '../../sanity/lib/pageSeo';
const ProductRegistrationLegacyPage = dynamic(() => import('../../components/legacy/ProductRegistrationLegacyPage'), {ssr: false});
export async function generateMetadata() { return getPageMetadata('product_registration'); }
export default function ProductRegistrationPage() { return <ProductRegistrationLegacyPage />; }
