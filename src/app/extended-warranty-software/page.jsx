import {getPageMetadata} from '../../sanity/lib/pageSeo';
import EWClient from './EWClient';
export async function generateMetadata() { return getPageMetadata('extended_warranties'); }
export default function Page() { return <EWClient />; }
