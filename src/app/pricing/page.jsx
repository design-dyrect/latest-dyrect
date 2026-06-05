import {getPageMetadata} from '../../sanity/lib/pageSeo';
import PricingClient from './PricingClient';
export async function generateMetadata() { return getPageMetadata('pricing'); }
export default function PricingPage() { return <PricingClient />; }
