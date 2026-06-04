import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
export default function Layout({children}) {
  return (<><SiteHeader />{children}<SiteFooter /></>);
}
