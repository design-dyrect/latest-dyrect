import dynamic from 'next/dynamic';
import {getPageMetadata} from '../../../sanity/lib/pageSeo';
const IndustryRoutePage = dynamic(() => import('../../../components/legacy/IndustryRoutePage'), {ssr: false});
export async function generateMetadata() { return getPageMetadata('sol_beauty'); }
export default function Page() { return <IndustryRoutePage industryKey="beauty-personal-care" />; }
