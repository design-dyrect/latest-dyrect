import {getPageMetadata} from '../../../sanity/lib/pageSeo';
import PRClient from '../../product-registration-software/PRClient';
export async function generateMetadata() { return getPageMetadata('product_registration'); }
export default function Page() { return <PRClient />; }
