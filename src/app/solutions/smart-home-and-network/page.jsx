import {getPageMetadata} from '../../../sanity/lib/pageSeo';
import SolutionClient from '../SolutionClient';
export async function generateMetadata() { return getPageMetadata('sol_smart_home'); }
export default function Page() { return <SolutionClient industryKey="smart-home-and-network" />; }
