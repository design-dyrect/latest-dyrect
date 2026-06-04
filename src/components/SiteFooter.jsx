'use client';

const URLS = {
  home: '/',
  contact: 'https://www.dyrect.co/contact-us',
  pricing: '/pricing',
  showcase: '/showcase',
  features: '/features',
  faqs: '/faqs',
  blog: 'https://www.dyrect.co/blog',
  integrations: '/integrations',
  caseStudies: '/case-studies',
  partners: '/partners',
  warranty: 'https://www.dyrect.co/warranty',
  privacy: 'https://www.dyrect.co/privacy-policy',
  terms: 'https://www.dyrect.co/terms-conditions',
  security: 'https://www.dyrect.co/privacy-policy',
  status: 'https://status.dyrect.co/',
  productRegistration: '/product/product-registration-software',
  warrantyManagement: '/product/warranty-management-software',
  extendedWarranties: '/product/extended-warranties',
  digitalWarrantyCard: '/features#digital-warranty-card',
  formBuilder: '/features#form-builder',
  productManual: '/features#digital-product-manuals',
  productSerialization: '/features#product-serialization',
  claimsManagement: '/features#claims-management',
  bulkQr: 'https://www.dyrect.co/bulk-qr-code-generator',
  serialNumber: 'https://www.dyrect.co/serial-number-generator',
  warrantyCost: 'https://www.dyrect.co/warranty-cost-calculator',
  googleFormsComparison: 'https://www.dyrect.co/comparison/google-forms-vs-dyrect',
  leafletComparison: 'https://www.dyrect.co/comparison/manual-leaflet-vs-dyrect',
  websiteFormsComparison: 'https://www.dyrect.co/comparison/website-forms-vs-dyrect',
};

const SOLUTION_LINKS = [
  {label: 'Electronics', href: '/solutions/electronics'},
  {label: 'Outdoors & Recreation', href: '/solutions/outdoors-recreation'},
  {label: 'Baby Gear', href: '/solutions/baby-gear'},
  {label: 'Beauty and Personal Care', href: '/solutions/beauty-personal-care'},
  {label: 'Mobile Accessories', href: '/solutions/mobile-accessories'},
  {label: 'Household Appliances', href: '/solutions/home-appliances'},
  {label: 'T.V, Audio and Video', href: '/solutions/tv-audio-video'},
  {label: 'Exercise and Fitness', href: '/solutions/exercise-fitness'},
  {label: 'Furniture', href: '/solutions/furniture'},
  {label: 'Smart Home and Network', href: '/solutions/smart-home-and-network'},
  {label: 'Cycling', href: '/solutions/cycling'},
];

const linkHoverIn  = (e) => {e.currentTarget.style.color = 'white';};
const linkHoverOut = (e) => {e.currentTarget.style.color = 'rgba(255,255,255,0.72)';};

function ColHeading({children}) {
  return (
    <div style={{fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: 1.6, marginBottom: 14}}>
      {children}
    </div>
  );
}

function ColLinks({links}) {
  return (
    <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10}}>
      {links.map((l) => (
        <li key={l.l}>
          <a href={l.href} style={{fontSize: 14, fontWeight: 500, color: l.active ? 'white' : 'rgba(255,255,255,0.72)', transition: 'color 160ms'}}
            onMouseEnter={linkHoverIn} onMouseLeave={linkHoverOut}>
            {l.l}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function SiteFooter({activeProduct}) {
  const productLinks = [
    {l: 'Product Registration Software', href: URLS.productRegistration, active: activeProduct === 'product-registration'},
    {l: 'Warranty Management Software',  href: URLS.warrantyManagement,  active: activeProduct === 'warranty-claims'},
    {l: 'Extended Warranties',           href: URLS.extendedWarranties,  active: activeProduct === 'extended-warranties'},
  ];

  const cols = [
    {h: 'Products', links: productLinks},
    {h: 'Free Tools', links: [
      {l: 'Bulk QR Code Generator', href: URLS.bulkQr},
      {l: 'Serial Number Generator', href: URLS.serialNumber},
      {l: 'Warranty Cost Calculator', href: URLS.warrantyCost},
    ]},
    {h: 'Solutions', links: SOLUTION_LINKS.filter((l) => l.label !== 'Automotive').map((l) => ({l: l.label, href: l.href}))},
    {h: 'Company', links: [
      {l: 'Features', href: URLS.features},
      {l: 'Pricing', href: URLS.pricing},
      {l: 'Contact Us', href: URLS.contact},
    ], sub: {h: 'Features', links: [
      {l: 'Digitalize Warranty', href: URLS.digitalWarrantyCard},
      {l: 'Form Builder (No-Code)', href: URLS.formBuilder},
      {l: 'Digitize Product Manual', href: URLS.productManual},
      {l: 'Serial Number Validator', href: URLS.productSerialization},
      {l: 'Claims Management', href: URLS.claimsManagement},
      {l: 'All Features', href: URLS.features},
    ]}},
    {h: 'Resources', links: [
      {l: 'FAQs', href: URLS.faqs},
      {l: 'Blog', href: URLS.blog},
      {l: 'Integrations', href: URLS.integrations},
      {l: 'Brand Warranties', href: URLS.warranty},
      {l: 'Our Partners', href: URLS.partners},
    ], sub: {h: 'Alternatives', links: [
      {l: 'Google Forms vs Dyrect', href: URLS.googleFormsComparison},
      {l: 'Manual Leaflet vs Dyrect', href: URLS.leafletComparison},
      {l: 'Website Forms vs Dyrect', href: URLS.websiteFormsComparison},
    ]}},
  ];

  return (
    <footer style={{background: '#0B1020', color: 'rgba(255,255,255,0.72)', paddingTop: 80, paddingBottom: 24, position: 'relative', overflow: 'hidden'}}>
      <div aria-hidden style={{position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '48px 48px', maskImage: 'radial-gradient(closest-side, black, transparent 80%)', WebkitMaskImage: 'radial-gradient(closest-side, black, transparent 80%)', pointerEvents: 'none'}} />
      <div className="container" style={{position: 'relative'}}>

        {/* 5 link columns */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 32}} className="footer-grid">
          {cols.map((c, i) => (
            <div key={i}>
              <ColHeading>{c.h}</ColHeading>
              <ColLinks links={c.links} />
              {c.sub && (
                <div style={{marginTop: 24}}>
                  <ColHeading>{c.sub.h}</ColHeading>
                  <ColLinks links={c.sub.links} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Brand + offices */}
        <div style={{marginTop: 64, display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 40, alignItems: 'start', paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.10)'}} className="footer-bottom">
          <div>
            <img src="/assets/logo-white-wordmark.png" alt="Dyrect" style={{height: 32, display: 'block'}} />
            <p style={{marginTop: 18, fontSize: 14, lineHeight: 1.55, color: 'rgba(255,255,255,0.65)', maxWidth: 320}}>
              The most seamless warranty management software. Registration, claims, and protection plans — unified.
            </p>
            <div style={{display: 'flex', gap: 10, marginTop: 22}}>
              <a href="https://www.linkedin.com/company/dyrect/" aria-label="LinkedIn" style={{width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.10)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.85)', transition: 'all 160ms'}}
                onMouseEnter={(e) => {e.currentTarget.style.background = 'rgba(255,255,255,0.20)'; e.currentTarget.style.color = 'white';}}
                onMouseLeave={(e) => {e.currentTarget.style.background = 'rgba(255,255,255,0.10)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)';}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/><path d="M22 21V14a4 4 0 0 0-8 0v7M10 9v12"/>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <ColHeading>Get in touch · US</ColHeading>
            <p style={{margin: 0, fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.72)'}}>655 S Fair Oaks Ave,<br />Sunnyvale, CA 94086</p>
            <a href="mailto:sales@dyrect.co" style={{display: 'inline-block', marginTop: 14, fontSize: 14, fontWeight: 500, color: '#A4AFFE'}}>sales@dyrect.co</a>
          </div>
          <div>
            <ColHeading>Get in touch · India</ColHeading>
            <p style={{margin: 0, fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.72)'}}>
              <strong style={{color: 'white', fontWeight: 600}}>Neuroone Solutions Pvt. Ltd.</strong><br />
              A-805, Magnolia Apartment, Baner<br />Pashan Link Road, Pune — 411021
            </p>
            <a href="tel:+919975470169" style={{display: 'inline-block', marginTop: 14, fontSize: 14, fontWeight: 500, color: '#A4AFFE'}}>+91 9975470169</a>
          </div>
        </div>

        {/* Legal bar */}
        <div style={{marginTop: 56, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.10)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, color: 'rgba(255,255,255,0.50)', gap: 16, flexWrap: 'wrap'}}>
          <div>© 2026 Dyrect (Neuroone Solutions Pvt. Ltd.). All rights reserved.</div>
          <div style={{display: 'flex', gap: 20}}>
            {[['Privacy', URLS.privacy], ['Terms', URLS.terms], ['Security', URLS.security], ['Status', URLS.status]].map(([label, href]) => (
              <a key={label} href={href} style={{color: 'inherit', transition: 'color 160ms'}}
                onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.50)'}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
