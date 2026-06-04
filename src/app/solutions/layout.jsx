import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import NavNullifier from '../../components/NavNullifier';

export default function SolutionsLayout({children}) {
  return (
    <>
      <NavNullifier />
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
