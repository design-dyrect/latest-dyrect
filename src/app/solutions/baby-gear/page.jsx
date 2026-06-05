import {getPageMetadata} from '../../../sanity/lib/pageSeo';
import SolutionClient from '../SolutionClient';
export async function generateMetadata() { return getPageMetadata('sol_baby'); }
export default function Page() { return <SolutionClient industryKey="baby-gear" />; }
