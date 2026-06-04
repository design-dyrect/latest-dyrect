'use client';
import {useState, useRef, useEffect} from 'react';

const DYRECT_URLS = {
  home: '/',
  contact: 'https://www.dyrect.co/contact-us',
  pricing: '/pricing',
  showcase: '/showcase',
  features: '/features',
  faqs: '/faqs',
  blog: 'https://www.dyrect.co/blog',
  integrations: '/integrations',
  caseStudies: '/case-studies',
  helpCenter: 'https://help.dyrect.co/',
  partners: '/partners',
  security: 'https://www.dyrect.co/privacy-policy',
  status: 'https://status.dyrect.co/',
  warranty: 'https://www.dyrect.co/warranty',
  privacy: 'https://www.dyrect.co/privacy-policy',
  terms: 'https://www.dyrect.co/terms-conditions',
  productRegistration: '/product/product-registration-software',
  warrantyManagement: '/product/warranty-management-software',
  extendedWarranties: '/product/extended-warranties',
  experienceBuilder: '/features#experience-builder',
  claimsManagement: '/features#claims-management',
  digitalWarrantyCard: '/features#digital-warranty-card',
  productSerialization: '/features#product-serialization',
  productManual: '/features#digital-product-manuals',
  formBuilder: '/features#form-builder',
  bulkQr: 'https://www.dyrect.co/bulk-qr-code-generator',
  serialNumber: 'https://www.dyrect.co/serial-number-generator',
  warrantyCost: 'https://www.dyrect.co/warranty-cost-calculator',
  howItWorksVideo: 'https://www.youtube.com/watch?v=qVzSytxsffY',
  howItWorksEmbed: 'https://www.youtube.com/embed/qVzSytxsffY?autoplay=1&rel=0&modestbranding=1',
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

const PRODUCT_LINKS = [
  {key: 'product-registration', icon: 'qr', name: 'Product Registration Software', desc: 'Provide omni-channel, delightful experience at scale.', href: DYRECT_URLS.productRegistration},
  {key: 'warranty-claims', icon: 'shield', name: 'Warranty Management Software', desc: 'Save costs, reduce overheads with faster, accurate claims processing.', href: DYRECT_URLS.warrantyManagement},
  {key: 'extended-warranties', icon: 'umbrella', name: 'Extended Warranties', desc: 'Offer protection plans across more touchpoints. Keep 100% of revenue in-house.', href: DYRECT_URLS.extendedWarranties},
];

const NAV_ITEMS = [
  {label: 'Products', menu: 'products', href: DYRECT_URLS.productRegistration, content: {type: 'two-col', left: {heading: 'Products', items: PRODUCT_LINKS}, right: {heading: 'Features', items: [{label: 'No-code Experience Builder', href: DYRECT_URLS.experienceBuilder}, {label: 'Claims Management', href: DYRECT_URLS.claimsManagement}, {label: 'Digital Warranty Card', href: DYRECT_URLS.digitalWarrantyCard}, {label: 'Product Serialization', href: DYRECT_URLS.productSerialization}, {label: 'Digitize Product Manuals & Guides', href: DYRECT_URLS.productManual}, {label: 'Powerful Form Builder', href: DYRECT_URLS.formBuilder}], cta: 'See more features', ctaHref: DYRECT_URLS.features}}},
  {label: 'Solutions', menu: 'solutions', href: '/solutions/electronics', content: {type: 'grid-2', heading: 'Industry', items: SOLUTION_LINKS}},
  {label: 'Showcase', href: DYRECT_URLS.showcase},
  {label: 'Pricing', href: DYRECT_URLS.pricing},
  {label: 'Resources', menu: 'resources', href: DYRECT_URLS.blog, content: {type: 'simple-list', items: [{label: 'Help Center', href: DYRECT_URLS.helpCenter}, {label: 'Blogs', href: DYRECT_URLS.blog}, {label: 'Integrations', href: DYRECT_URLS.integrations}, {label: 'Client Success Stories', href: DYRECT_URLS.caseStudies}, {label: "How it Works", href: DYRECT_URLS.howItWorksVideo, video: true}, {label: "FAQ's", href: DYRECT_URLS.faqs}]}},
  {label: 'Free Tools', menu: 'free-tools', href: DYRECT_URLS.warranty, content: {type: 'simple-list', items: [{label: 'Brand Warranties', href: DYRECT_URLS.warranty}, {label: 'Bulk QR Code Generator', href: DYRECT_URLS.bulkQr}, {label: 'Serial Number Generator', href: DYRECT_URLS.serialNumber}, {label: 'Warranty Cost Calculator', href: DYRECT_URLS.warrantyCost}]}},
];

function openHowItWorksVideo(e) {
  if (e && typeof e.preventDefault === 'function') e.preventDefault();
  if (window.matchMedia && window.matchMedia('(max-width: 780px)').matches) {
    window.location.href = DYRECT_URLS.howItWorksVideo;
    return;
  }
  window.dispatchEvent(new CustomEvent('dyrect:open-video'));
}

function NavIcon({name}) {
  const paths = {
    qr: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v3M14 21h3M21 17v4h-4"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></>,
    umbrella: <><path d="M12 12v7a2 2 0 0 0 4 0"/><path d="M2 12a10 10 0 0 1 20 0Z"/><path d="M12 2v2"/></>,
  };
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function NavTwoCol({content, activeProduct}) {
  return (
    <div style={{display: 'grid', gridTemplateColumns: 'minmax(360px, 420px) 1px 240px', gap: 32, minWidth: 720}}>
      <div>
        <div style={{fontSize: 11, fontWeight: 600, color: '#94A3B8', letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 16}}>{content.left.heading}</div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
          {content.left.items.map((it, i) => {
            const isActive = activeProduct && it.key === activeProduct;
            return (
              <a key={i} href={it.href || '#'} style={{display: 'flex', gap: 14, padding: '12px', borderRadius: 10, alignItems: 'flex-start', background: isActive ? 'var(--color-brand-blue-subtle)' : 'transparent', transition: 'background 160ms'}}
                onMouseEnter={(e) => {if (!isActive) e.currentTarget.style.background = 'var(--color-slate-50)';}}
                onMouseLeave={(e) => {if (!isActive) e.currentTarget.style.background = 'transparent';}}>
                <span style={{width: 36, height: 36, borderRadius: 8, background: isActive ? 'var(--color-brand-blue)' : 'var(--color-brand-blue-subtle)', color: isActive ? 'white' : 'var(--color-brand-blue)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                  <NavIcon name={it.icon} />
                </span>
                <div>
                  <div style={{fontSize: 14, fontWeight: 600, color: isActive ? 'var(--color-brand-blue-deep)' : '#0F172A'}}>{it.name}</div>
                  <div style={{fontSize: 12.5, color: '#64748B', marginTop: 2, lineHeight: 1.4}}>{it.desc}</div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
      <div style={{background: 'var(--color-slate-200)'}} />
      <div>
        <div style={{fontSize: 11, fontWeight: 600, color: '#94A3B8', letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 16}}>{content.right.heading}</div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          {content.right.items.map((it, i) => (
            <a key={i} href={it.href || '#'} style={{padding: '8px 10px', borderRadius: 6, fontSize: 14, fontWeight: 500, color: '#1E293B', transition: 'all 160ms'}}
              onMouseEnter={(e) => {e.currentTarget.style.background = 'var(--color-slate-50)'; e.currentTarget.style.color = 'var(--color-brand-blue)';}}
              onMouseLeave={(e) => {e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1E293B';}}>
              {it.label || it}
            </a>
          ))}
        </div>
        <a href={content.right.ctaHref || '#'} style={{display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 14, marginLeft: 10, fontSize: 13, fontWeight: 600, color: 'var(--color-brand-blue)'}}>
          {content.right.cta} &nbsp;›
        </a>
      </div>
    </div>
  );
}

function NavGrid({content}) {
  return (
    <div style={{minWidth: 540}}>
      <div style={{fontSize: 11, fontWeight: 600, color: '#94A3B8', letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 18}}>{content.heading}</div>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 36, rowGap: 4}}>
        {content.items.map((it, i) => (
          <a key={i} href={it.href || '#'} style={{padding: '9px 10px', borderRadius: 6, fontSize: 14, fontWeight: 500, color: '#1E293B', transition: 'all 160ms'}}
            onMouseEnter={(e) => {e.currentTarget.style.background = 'var(--color-slate-50)'; e.currentTarget.style.color = 'var(--color-brand-blue)';}}
            onMouseLeave={(e) => {e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1E293B';}}>
            {it.label || it}
          </a>
        ))}
      </div>
    </div>
  );
}

function NavSimpleList({content}) {
  return (
    <div style={{minWidth: 220, display: 'flex', flexDirection: 'column'}}>
      {content.items.map((it, i) => (
        <a key={i} href={it.href} style={{padding: '10px 12px', borderRadius: 6, fontSize: 14, fontWeight: 500, color: '#1E293B', transition: 'all 160ms', whiteSpace: 'nowrap'}}
          onClick={it.video ? openHowItWorksVideo : undefined}
          onMouseEnter={(e) => {e.currentTarget.style.background = 'var(--color-slate-50)'; e.currentTarget.style.color = 'var(--color-brand-blue)';}}
          onMouseLeave={(e) => {e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1E293B';}}>
          {it.label}
        </a>
      ))}
    </div>
  );
}

function NavPanel({content, activeProduct}) {
  return (
    <div style={{position: 'absolute', top: 'calc(100% + 4px)', background: 'white', border: '1px solid var(--border-default)', borderRadius: 14, boxShadow: '0 24px 60px -12px rgba(15,23,42,0.18), 0 6px 18px -4px rgba(15,23,42,0.06)', padding: 28, zIndex: 60}}>
      {content.type === 'two-col' && <NavTwoCol content={content} activeProduct={activeProduct} />}
      {content.type === 'grid-2' && <NavGrid content={content} />}
      {content.type === 'simple-list' && <NavSimpleList content={content} />}
    </div>
  );
}

function MobileNavDrawer({open, onClose, activeProduct}) {
  const [openSub, setOpenSub] = useState(null);
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {document.body.style.overflow = '';};
  }, [open]);
  return (
    <>
      <div onClick={onClose} style={{position: 'fixed', inset: 0, zIndex: 80, background: 'rgba(15,23,42,0.45)', opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transition: 'opacity 220ms ease'}} />
      <aside style={{position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(86vw, 360px)', zIndex: 90, background: 'white', transform: open ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 280ms cubic-bezier(.16,.84,.44,1)', display: 'flex', flexDirection: 'column', boxShadow: '-12px 0 40px rgba(15,23,42,0.12)'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--border-default)'}}>
          <img src="/assets/logo-blue-wordmark.png" alt="Dyrect" style={{height: 24}} />
          <button onClick={onClose} aria-label="Close menu" style={{width: 36, height: 36, borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#475569', background: 'transparent', cursor: 'pointer'}}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <nav style={{flex: 1, overflowY: 'auto', padding: '12px 8px'}}>
          {NAV_ITEMS.map((item, idx) => {
            const isOpen = openSub === idx;
            if (!item.menu) {
              return <a key={item.label} href={item.href || '#'} style={{display: 'block', padding: '14px 16px', fontSize: 15, fontWeight: 500, color: '#0F172A', borderRadius: 8}}>{item.label}</a>;
            }
            return (
              <div key={item.label}>
                <button onClick={() => setOpenSub(isOpen ? null : idx)} style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 8, fontSize: 15, fontWeight: 500, color: '#0F172A', textAlign: 'left', background: 'transparent', cursor: 'pointer'}}>
                  {item.label}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 200ms ease'}}><path d="m6 9 6 6 6-6"/></svg>
                </button>
                {isOpen && (
                  <div style={{padding: '4px 8px 12px 16px'}}>
                    {item.content.type === 'two-col' && <>
                      <div style={{padding: '10px 12px 4px', fontSize: 10.5, fontWeight: 700, color: '#94A3B8', letterSpacing: 1.2, textTransform: 'uppercase'}}>{item.content.left.heading}</div>
                      {item.content.left.items.map((it, i) => {
                        const active = activeProduct && it.key === activeProduct;
                        return <a key={`l-${i}`} href={it.href || '#'} style={{display: 'block', padding: '10px 12px', fontSize: 14, color: active ? 'var(--color-brand-blue)' : '#475569', fontWeight: active ? 600 : 500, borderRadius: 6}}>{it.name}</a>;
                      })}
                      <div style={{padding: '14px 12px 4px', fontSize: 10.5, fontWeight: 700, color: '#94A3B8', letterSpacing: 1.2, textTransform: 'uppercase'}}>{item.content.right.heading}</div>
                      {item.content.right.items.map((it, i) => <a key={`r-${i}`} href={it.href || '#'} style={{display: 'block', padding: '10px 12px', fontSize: 14, color: '#475569', fontWeight: 500, borderRadius: 6}}>{it.label || it}</a>)}
                      <a href={item.content.right.ctaHref || '#'} style={{display: 'block', padding: '10px 12px', fontSize: 14, color: 'var(--color-brand-blue)', fontWeight: 600, borderRadius: 6}}>{item.content.right.cta}</a>
                    </>}
                    {item.content.type === 'grid-2' && item.content.items.map((it, i) => <a key={i} href={it.href || '#'} style={{display: 'block', padding: '10px 12px', fontSize: 14, color: '#475569', fontWeight: 500, borderRadius: 6}}>{it.label || it}</a>)}
                    {item.content.type === 'simple-list' && item.content.items.map((it, i) => <a key={i} href={it.href} style={{display: 'block', padding: '10px 12px', fontSize: 14, color: '#475569', fontWeight: 500, borderRadius: 6}} onClick={(e) => {if (it.video) openHowItWorksVideo(e); onClose();}}>{it.label}</a>)}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div style={{padding: 16, borderTop: '1px solid var(--border-default)'}}>
          <a href={DYRECT_URLS.contact} className="btn btn-primary" style={{width: '100%', justifyContent: 'center'}}>Book a Meeting</a>
        </div>
      </aside>
    </>
  );
}

function HowItWorksVideoModal() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e) => {if (e.key === 'Escape') setOpen(false);};
    window.addEventListener('dyrect:open-video', onOpen);
    window.addEventListener('keydown', onKey);
    return () => {window.removeEventListener('dyrect:open-video', onOpen); window.removeEventListener('keydown', onKey);};
  }, []);
  useEffect(() => {
    if (open) document.body.classList.add('video-modal-open');
    else document.body.classList.remove('video-modal-open');
    return () => document.body.classList.remove('video-modal-open');
  }, [open]);
  return (
    <div className={`video-modal-backdrop ${open ? 'is-open' : ''}`} aria-hidden={!open} onClick={(e) => {if (e.target === e.currentTarget) setOpen(false);}}>
      <div className="video-modal-dialog" role="dialog" aria-modal="true" aria-label="How Dyrect works">
        <button className="video-modal-close" aria-label="Close video" onClick={() => setOpen(false)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
        <div className="video-modal-frame">
          {open && <iframe src={DYRECT_URLS.howItWorksEmbed} title="How Dyrect works" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />}
        </div>
      </div>
    </div>
  );
}

export default function SiteHeader({activeProduct}) {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const hideTimer = useRef(null);
  const show = (key) => {clearTimeout(hideTimer.current); setOpenMenu(key);};
  const scheduleHide = () => {clearTimeout(hideTimer.current); hideTimer.current = setTimeout(() => setOpenMenu(null), 140);};

  return (
    <>
      <header style={{position: 'relative', zIndex: 50, background: 'white', borderBottom: '1px solid var(--border-default)'}}>
        <div className="container" style={{display: 'flex', alignItems: 'center', gap: 24, padding: '14px 24px'}}>
          <a href={DYRECT_URLS.home} style={{display: 'flex', alignItems: 'center', flexShrink: 0}}>
            <img src="/assets/logo-blue-wordmark.png" alt="Dyrect" style={{height: 28}} />
          </a>
          <nav className="nav-links" style={{display: 'flex', alignItems: 'center', gap: 4, position: 'relative'}}>
            {NAV_ITEMS.map((item) => {
              const isOpen = openMenu === item.menu;
              const hasMenu = !!item.menu;
              const isActivePage = item.menu === 'products' && !!activeProduct;
              return (
                <div key={item.label} onMouseEnter={() => hasMenu && show(item.menu)} onMouseLeave={() => hasMenu && scheduleHide()} style={{position: 'relative'}}>
                  <a href={item.href || '#'} style={{display: 'inline-flex', alignItems: 'center', gap: 4, padding: '10px 14px', borderRadius: 6, fontSize: 14.5, fontWeight: 500, color: (isOpen || isActivePage) ? 'var(--color-brand-blue)' : '#1E293B', position: 'relative', transition: 'color 160ms'}}>
                    {item.label}
                    {hasMenu && (
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 180ms ease', marginTop: 1}}>
                        <path d="m6 9 6 6 6-6"/>
                      </svg>
                    )}
                    {(isOpen || (isActivePage && !openMenu)) && (
                      <span style={{position: 'absolute', left: 14, right: 14, bottom: 2, height: 2, background: 'var(--color-brand-blue)', borderRadius: 2}} />
                    )}
                  </a>
                  {isOpen && hasMenu && (
                    <div onMouseEnter={() => show(item.menu)} onMouseLeave={scheduleHide}>
                      <NavPanel content={item.content} activeProduct={activeProduct} />
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
          <div style={{flex: 1}} />
          <a href={DYRECT_URLS.contact} className="btn btn-primary nav-cta" style={{fontSize: 14, padding: '11px 18px', flexShrink: 0}}>
            Book a Meeting
          </a>
          <button className="nav-burger" onClick={() => setMobileOpen(true)} aria-label="Open menu" style={{width: 40, height: 40, borderRadius: 8, display: 'none', alignItems: 'center', justifyContent: 'center', color: '#0F172A', background: 'transparent', cursor: 'pointer'}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>
        </div>
        <MobileNavDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} activeProduct={activeProduct} />
      </header>
      <HowItWorksVideoModal />
    </>
  );
}
