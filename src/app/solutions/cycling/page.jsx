import {getPageMetadata} from '../../../sanity/lib/pageSeo';
import SolutionClient from '../SolutionClient';
export async function generateMetadata() { return getPageMetadata('sol_cycling'); }
export default function Page() { return <SolutionClient industryKey="cycling" />; }
