import {getPageMetadata} from '../sanity/lib/pageSeo';
import HomeClient from './HomeClient';
export async function generateMetadata() { return getPageMetadata('home'); }
export default function HomePage() { return <HomeClient />; }
