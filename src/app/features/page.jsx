import {getPageMetadata} from '../../sanity/lib/pageSeo';
import FeaturesClient from './FeaturesClient';
export async function generateMetadata() { return getPageMetadata('features'); }
export default function FeaturesPage() { return <FeaturesClient />; }
