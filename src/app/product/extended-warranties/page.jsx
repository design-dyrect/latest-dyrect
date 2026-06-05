import dynamic from 'next/dynamic';
import {getPageMetadata} from '../../../sanity/lib/pageSeo';
const Page = dynamic(() => import('../../../components/legacy/ExtendedWarrantyLegacyPage'), {ssr: false});
export async function generateMetadata() { return getPageMetadata('extended_warranties'); }
export default function ProductPage() { return <Page />; }
