import {getPageMetadata} from '../../sanity/lib/pageSeo';
import WCClient from './WCClient';
export async function generateMetadata() { return getPageMetadata('warranty_management'); }
export default function Page() { return <WCClient />; }
