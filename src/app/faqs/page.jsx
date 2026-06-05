import {getPageMetadata} from '../../sanity/lib/pageSeo';
import FaqsClient from './FaqsClient';
export async function generateMetadata() { return getPageMetadata('faqs'); }
export default function FaqsPage() { return <FaqsClient />; }
