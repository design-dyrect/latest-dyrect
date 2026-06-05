import {getPageMetadata} from '../../../sanity/lib/pageSeo';
import WCClient from '../../warranty-claims-management-software/WCClient';
export async function generateMetadata() { return getPageMetadata('warranty_management'); }
export default function Page() { return <WCClient />; }
