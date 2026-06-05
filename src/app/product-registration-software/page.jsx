import {getPageMetadata} from '../../sanity/lib/pageSeo';
import PRClient from './PRClient';
export async function generateMetadata() { return getPageMetadata('product_registration'); }
export default function Page() { return <PRClient />; }
