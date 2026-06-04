import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

export default function CmsLayout({children, activeProduct}) {
  return (
    <>
      <SiteHeader activeProduct={activeProduct} />
      {children}
      <SiteFooter activeProduct={activeProduct} />
    </>
  );
}
