'use client';
import React, { useState, useEffect } from 'react';
import './IndustryShared';

function SiteNav(props) { const C = typeof window !== 'undefined' && window.SiteNav; return C ? <C {...props} /> : null; }
function LogoCloud(props) { const C = typeof window !== 'undefined' && window.LogoCloud; return C ? <C {...props} /> : null; }
function Stats(props) { const C = typeof window !== 'undefined' && window.Stats; return C ? <C {...props} /> : null; }
function Testimonials(props) { const C = typeof window !== 'undefined' && window.Testimonials; return C ? <C {...props} /> : null; }
function FAQ(props) { const C = typeof window !== 'undefined' && window.FAQ; return C ? <C {...props} /> : null; }
function FinalCTA(props) { const C = typeof window !== 'undefined' && window.FinalCTA; return C ? <C {...props} /> : null; }
function SiteFooter(props) { const C = typeof window !== 'undefined' && window.SiteFooter; return C ? <C {...props} /> : null; }
function Capabilities(props) { const C = typeof window !== 'undefined' && window.Capabilities; return C ? <C {...props} /> : null; }




/* ─── Icons ─── */
const ICI = {
  arrow:   <path d="M5 12h14M13 5l7 7-7 7"/>,
  check:   <path d="M20 6 9 17l-5-5"/>,
  alert:   <><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
  qr:      <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v3M14 21h3M21 17v4h-4"/></>,
  shield2: <><path d="M12 2 4 5v6c0 5 3.4 9.6 8 11 4.6-1.4 8-6 8-11V5z"/><path d="m9 12 2 2 4-4"/></>,
  shield:  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
  wallet:  <><path d="M3 7a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v2"/><path d="M3 7v10a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1v-3"/><path d="M21 11h-5a2 2 0 0 0 0 4h5a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1z"/></>,
  ticket:  <><path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z"/><path d="M13 7v2M13 13v2"/></>,
  scan:    <><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 8v8M10.5 8v8M14 8v8M17 8v8"/></>,
  refresh: <><path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"/></>,
  bell:    <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>,
  layers:  <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
  store:   <><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></>,
  tag:     <><path d="M20.6 13.4 12 22l-9-9V4a1 1 0 0 1 1-1h8z"/><circle cx="7.5" cy="7.5" r="1.5"/></>,
  zap:     <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
  mail:    <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
  globe:   <><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
  cpu:     <><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/></>,
  tool:    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>,
  plug:    <><path d="M9 2v6M15 2v6"/><path d="M5 8h14v3a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5z"/><path d="M12 16v6"/></>,
  users:   <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
  upload:  <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></>,
  truck:   <><path d="M5 18H3V6h13v12h-5M15 9h4l3 4v5h-3"/><circle cx="7.5" cy="18.5" r="2.5"/><circle cx="17.5" cy="18.5" r="2.5"/></>,
  palette: <><circle cx="13.5" cy="6.5" r="0.6" fill="currentColor" stroke="none"/><circle cx="17" cy="10" r="0.6" fill="currentColor" stroke="none"/><circle cx="8.5" cy="7" r="0.6" fill="currentColor" stroke="none"/><path d="M12 2a10 10 0 1 0 0 20 2.5 2.5 0 0 0 2.5-2.5c0-.6-.2-1.1-.6-1.5-.4-.4-.6-.9-.6-1.5a2.5 2.5 0 0 1 2.5-2.5H19a3 3 0 0 0 3-3 9 9 0 0 0-10-9z"/></>,
  battery: <><rect x="1" y="6" width="18" height="12" rx="2"/><line x1="23" y1="13" x2="23" y2="11"/><line x1="6" y1="10" x2="6" y2="14"/><line x1="10" y1="12" x2="14" y2="12"/></>,
  heart:   <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>,
  home:    <><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
  wifi:    <><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></>,
  camera:  <><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></>,
  award:   <><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></>,
  bike:    <><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></>,
  sofa:    <><path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/><path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0z"/><path d="M4 18v2M20 18v2M12 4v9"/></>,
  tv:      <><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></>,
  music:   <><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></>,
  chart:   <><path d="M3 3v18h18"/><rect x="7" y="11" width="3" height="6" rx="0.5"/><rect x="12" y="7" width="3" height="10" rx="0.5"/><rect x="17" y="13" width="3" height="4" rx="0.5"/></>,
  trend:   <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
  lock:    <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
  star:    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
  phone:   <><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></>,
  route:   <><circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M9 19h6a4 4 0 0 0 0-8H9a4 4 0 0 1 0-8h6"/></>,
};

function IcoT({ name, size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {ICI[name] || null}
    </svg>
  );
}

function FCardT({ icon, title, desc }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      padding: '20px',
      background: hov ? 'white' : 'var(--color-slate-50)',
      border: `1px solid ${hov ? 'var(--color-brand-blue)' : 'var(--border-default)'}`,
      borderRadius: 12,
      boxShadow: hov ? 'var(--shadow-md)' : 'none',
      transform: hov ? 'translateY(-2px)' : 'none',
      transition: 'all 220ms cubic-bezier(.16,.84,.44,1)',
    }}>
      <div style={{ width: 36, height: 36, borderRadius: 9, background: 'var(--color-brand-blue-subtle)', color: 'var(--color-brand-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
        <IcoT name={icon} size={17} />
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-slate-900)', marginBottom: 5, lineHeight: 1.3 }}>{title}</div>
      <div style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--fg-secondary)' }}>{desc}</div>
    </div>
  );
}

function LiT({ children }) {
  return (
    <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 15, color: 'var(--fg-primary)', lineHeight: 1.5 }}>
      <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--color-success-subtle)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
        <IcoT name="check" size={10} color="#166534" />
      </span>
      <span>{children}</span>
    </li>
  );
}

/* ─── Hero ─── */
function IndustryHero({ cfg }) {
  const { eyebrow, headline, headlineEm, body, stats } = cfg.hero;
  const parts = headline.split(headlineEm);
  const defaultStats = [
    { n: '4 Mn+', l: 'customers registered' },
    { n: '500+',  l: 'brands on Dyrect' },
    { n: '3x',    l: 'higher warranty attach rate' },
    { n: '<30 min', l: 'average setup time' },
    { n: '100%',  l: 'extended warranty revenue kept in-house' },
  ];
  const st = stats || defaultStats;
  return (
    <section style={{ background: 'radial-gradient(ellipse 90% 60% at 50% -5%, rgba(36,55,246,0.08) 0%, transparent 65%), #fff', padding: '96px 0 80px', borderBottom: '1px solid var(--border-default)' }}>
      <div className="container">
        <div style={{ maxWidth: 840 }}>
          <p className="eyebrow" style={{ marginBottom: 18 }}>{eyebrow}</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(36px, 6vw, 62px)', lineHeight: 1.02, letterSpacing: '-2.5px', color: 'var(--color-slate-900)', margin: 0 }}>
            {parts[0]}<span className="em">{headlineEm}</span>{parts[1]}
          </h1>
          <p style={{ marginTop: 24, fontSize: 18, lineHeight: 1.6, color: 'var(--fg-secondary)', maxWidth: 660 }}>{body}</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
            <a href="#demo" className="btn btn-primary btn-lg">Get a Demo <IcoT name="arrow" size={15} /></a>
            <a href="#how-it-works" className="btn btn-secondary btn-lg"
              onClick={e => { e.preventDefault(); window.scrollTo({ top: (document.getElementById('how-it-works')?.getBoundingClientRect().top || 0) + window.scrollY - 24, behavior: 'smooth' }); }}>
              See how it works
            </a>
          </div>
          <p style={{ marginTop: 20, fontSize: 13, color: 'var(--fg-muted)' }}>Trusted by 500+ brands globally. 4.8 ★ on G2. 5 ★ on Shopify App Store.</p>
        </div>
        <div style={{ display: 'flex', marginTop: 72, paddingTop: 48, borderTop: '1px solid var(--border-default)', flexWrap: 'wrap', gap: 0 }}>
          {st.map((s, i) => (
            <div key={i} style={{ paddingRight: 36, paddingLeft: i === 0 ? 0 : 36, borderLeft: i > 0 ? '1px solid var(--border-default)' : 'none', marginBottom: 16 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1, letterSpacing: '-1.2px', color: 'var(--color-slate-900)', fontVariantNumeric: 'tabular-nums' }}>{s.n}</div>
              <div style={{ fontSize: 13, color: 'var(--fg-muted)', marginTop: 5, fontWeight: 500 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Problems ─── */
function IndustryProblems({ cfg }) {
  return (
    <section className="section" style={{ background: 'var(--color-slate-50)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p className="eyebrow" style={{ marginBottom: 14 }}>The problem</p>
          <h2 className="section-title">{cfg.problems.headline}</h2>
          <p className="section-sub">{cfg.problems.sub}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="three-col">
          {cfg.problems.items.map((p, i) => (
            <div key={i} style={{ background: 'white', border: '1px solid var(--border-default)', borderRadius: 16, padding: '32px 28px' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--color-error-subtle)', color: 'var(--color-error)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <IcoT name="alert" size={19} color="var(--color-error)" />
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--color-slate-900)', lineHeight: 1.3, marginBottom: 12 }}>{p.title}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--fg-secondary)', margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── How it works ─── */
const DEFAULT_HOW_STEPS = [
  { n: '01', title: 'Register every buyer, regardless of channel', desc: 'QR codes on packaging, Shopify auto-sync, and branded web flows capture every buyer and link them to their product serial number and purchase record.' },
  { n: '02', title: 'Validate and resolve every claim with full context', desc: 'Claims check eligibility automatically against the registration record. Your team sees the full product and ownership history before opening a response.' },
  { n: '03', title: 'Sell protection plans and keep all the revenue', desc: 'Offer extended warranties at the product page, checkout, and post-purchase. Every plan stays in-house. No revenue share with any third party.' },
  { n: '04', title: 'Use the data to cut costs and grow revenue', desc: 'Defect rates by SKU, claim costs by category, and extended warranty attach rates surface automatically so every team acts on real numbers.' },
];
function HowItWorksT({ steps }) {
  const items = steps || DEFAULT_HOW_STEPS;
  return (
    <section id="how-it-works" className="section" style={{ background: 'white' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p className="eyebrow" style={{ marginBottom: 14 }}>How it works</p>
          <h2 className="section-title">One platform. The complete warranty lifecycle.</h2>
          <p className="section-sub">Registration, claims, service, protection plans, and analytics stop being separate problems the moment they run on the same system.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }} className="four-col">
          {items.map((s, i) => (
            <div key={i} style={{ padding: '28px 24px', borderRadius: 14, border: '1px solid var(--border-default)', background: 'var(--color-slate-50)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 52, lineHeight: 1, letterSpacing: '-3px', color: 'var(--color-brand-blue-subtle)', marginBottom: 18, fontVariantNumeric: 'tabular-nums' }}>{s.n}</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-slate-900)', lineHeight: 1.35, marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--fg-secondary)', margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Split section ─── */
function SplitT({ id, eyebrow, headline, headlineEm, body, bullets, ctaLabel, ctaHref, cards, flip, bg }) {
  const parts = headline.split(headlineEm);
  return (
    <section id={id} className="section" style={{ background: bg || 'white' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }} className="split-grid">
          <div style={{ order: flip ? 2 : 1 }}>
            <p className="eyebrow" style={{ marginBottom: 14 }}>{eyebrow}</p>
            <h2 className="section-title" style={{ textAlign: 'left', letterSpacing: '-1.3px', fontSize: 'clamp(26px, 3vw, 40px)' }}>
              {parts[0]}<span className="em">{headlineEm}</span>{parts[1]}
            </h2>
            <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.65, color: 'var(--fg-secondary)' }}>{body}</p>
            {bullets && (
              <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {bullets.map((b, i) => <LiT key={i}>{b}</LiT>)}
              </ul>
            )}
            {ctaLabel && (
              <a href={ctaHref || '#'} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 28, fontSize: 14, fontWeight: 600, color: 'var(--color-brand-blue)', transition: 'gap 150ms' }}
                onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                onMouseLeave={e => e.currentTarget.style.gap = '6px'}>
                {ctaLabel} <IcoT name="arrow" size={14} />
              </a>
            )}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, order: flip ? 1 : 2 }}>
            {cards.map((c, i) => <FCardT key={i} {...c} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Analytics section ─── */
function AnalyticsT({ cfg }) {
  const a = cfg.analytics;
  const parts = a.headline.split(a.headlineEm);
  const metrics = a.metrics || [
    { label: 'Registrations',   val: '12,841', change: '+18%', up: true },
    { label: 'Active claims',   val: '234',    change: '-12%', up: false },
    { label: 'Avg claim cost',  val: '$31.40', change: '-8%',  up: false },
    { label: 'Warranty revenue',val: '$48,200',change: '+34%', up: true },
  ];
  return (
    <section id="analytics" className="section" style={{ background: 'var(--color-slate-50)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }} className="split-grid">
          {/* Dashboard mock */}
          <div style={{ background: 'white', borderRadius: 16, border: '1px solid var(--border-default)', padding: 24, boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-slate-900)', marginBottom: 20 }}>Warranty dashboard</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
              {metrics.map((s, i) => (
                <div key={i} style={{ background: 'var(--color-slate-50)', borderRadius: 10, padding: '14px 16px', border: '1px solid var(--border-default)' }}>
                  <div style={{ fontSize: 11, color: 'var(--fg-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-slate-900)', letterSpacing: '-0.5px', fontVariantNumeric: 'tabular-nums' }}>{s.val}</div>
                  <div style={{ fontSize: 12, marginTop: 3, fontWeight: 600, color: s.up ? '#166534' : 'var(--color-error)' }}>{s.change} vs last month</div>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--color-slate-50)', borderRadius: 10, padding: '16px', border: '1px solid var(--border-default)' }}>
              <div style={{ fontSize: 11, color: 'var(--fg-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>Top claim categories</div>
              {a.defects.map((row, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--fg-primary)', marginBottom: 4 }}>
                    <span>{row.label}</span><span style={{ fontWeight: 600 }}>{row.pct}%</span>
                  </div>
                  <div style={{ height: 6, background: 'var(--color-slate-200)', borderRadius: 99 }}>
                    <div style={{ height: 6, width: `${Math.min(row.pct * 2.8, 100)}%`, background: row.clr, borderRadius: 99 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Text */}
          <div>
            <p className="eyebrow" style={{ marginBottom: 14 }}>Analytics and insights</p>
            <h2 className="section-title" style={{ textAlign: 'left', letterSpacing: '-1.3px', fontSize: 'clamp(26px, 3vw, 40px)' }}>
              {parts[0]}<span className="em">{a.headlineEm}</span>{parts[1]}
            </h2>
            <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.65, color: 'var(--fg-secondary)' }}>{a.body}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 28 }}>
              {(a.metricCards || [
                { t: 'Registration rate',  d: 'by product, channel, and region' },
                { t: 'Claim rate',         d: 'by SKU and defect type' },
                { t: 'Cost per claim',     d: 'across repair, replacement, refund' },
                { t: 'Defect trends',      d: 'surfaced early, before they scale' },
                { t: 'Warranty revenue',   d: 'attach rate and plan performance' },
                { t: 'Time to resolve',    d: 'by team, agent, and claim type' },
              ]).map((m, i) => (
                <div key={i} style={{ padding: '12px 14px', borderRadius: 10, background: 'white', border: '1px solid var(--border-default)' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-slate-900)', marginBottom: 2 }}>{m.t}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--fg-muted)' }}>{m.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Sub-industries ─── */
function SubIndustriesT({ cfg }) {
  const { headline, sub, items } = cfg.subIndustries;
  return (
    <section className="section" style={{ background: 'white' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <p className="eyebrow" style={{ marginBottom: 14 }}>Built for every category</p>
          <h2 className="section-title">{headline}</h2>
          <p className="section-sub">{sub}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="three-col">
          {items.map((c, i) => (
            <div key={i} style={{ background: 'var(--color-slate-50)', border: '1px solid var(--border-default)', borderRadius: 14, padding: '28px 24px' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--color-brand-blue-subtle)', color: 'var(--color-brand-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <IcoT name={c.icon} size={19} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-slate-900)', lineHeight: 1.3, marginBottom: 10 }}>{c.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--fg-secondary)', margin: 0 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Logo strip ─── */
function LogoStripT({ cfg }) {
  return (
    <section className="section-tight" style={{ background: 'var(--color-slate-50)', borderTop: '1px solid var(--border-default)', borderBottom: '1px solid var(--border-default)' }}>
      <div className="container">
        <p style={{ textAlign: 'center', fontSize: 13, fontWeight: 500, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: 1.4, marginBottom: 36 }}>
          {cfg.logos.label || 'Brands in this category running on Dyrect'}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 48, flexWrap: 'wrap' }}>
          {cfg.logos.items.map(l => (
            <img key={l.name} src={l.src} alt={l.name}
              style={{ height: l.h, maxWidth: 120, objectFit: 'contain', filter: 'grayscale(1)', opacity: 0.65, transition: 'all 220ms ease' }}
              onMouseEnter={e => { e.currentTarget.style.filter = 'grayscale(0)'; e.currentTarget.style.opacity = '1'; }}
              onMouseLeave={e => { e.currentTarget.style.filter = 'grayscale(1)'; e.currentTarget.style.opacity = '0.65'; }} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Default stats ─── */
const IND_STATS = [
  { value: '4 Mn+', label: 'Customers registered',      sub: 'across every channel and category' },
  { value: '500+',  label: 'Brands running on Dyrect',  sub: 'D2C, retail, and manufacturers' },
  { value: '3x',    label: 'Higher warranty attach rate', sub: 'on extended warranty programs' },
  { value: '100%',  label: 'Revenue kept in-house',      sub: 'on every protection plan sold' },
];

/* ─── Full industry page ─── */
function IndustryPage({ config: cfg }) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.08 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const r = cfg.registration;
  const cl = cfg.claims;
  const ew = cfg.warranties;

  return (
    <>
      <SiteNav />
      <main>
        <IndustryHero cfg={cfg} />
        <LogoCloud />
        <IndustryProblems cfg={cfg} />
        <HowItWorksT steps={cfg.howItWorks} />

        <SplitT
          id="product-registration"
          eyebrow="Product registration"
          headline={r.headline} headlineEm={r.headlineEm}
          body={r.body} bullets={r.bullets}
          ctaLabel="See product registration software"
          ctaHref="/product/product-registration-software"
          bg="var(--color-slate-50)"
          cards={r.cards}
        />

        <SplitT
          id="claims-management"
          eyebrow="Claims and service management"
          headline={cl.headline} headlineEm={cl.headlineEm}
          body={cl.body} bullets={cl.bullets}
          ctaLabel="See warranty claims management"
          ctaHref="/product/warranty-management-software"
          bg="white" flip={true}
          cards={cl.cards}
        />

        <SplitT
          id="extended-warranties"
          eyebrow="Extended warranties"
          headline={ew.headline} headlineEm={ew.headlineEm}
          body={ew.body} bullets={ew.bullets}
          ctaLabel="See extended warranties"
          ctaHref="/product/extended-warranties"
          bg="var(--color-slate-50)"
          cards={ew.cards}
        />

        <AnalyticsT cfg={cfg} />
        <LogoStripT cfg={cfg} />
        <Stats stats={IND_STATS} />
        <Testimonials />
        <SubIndustriesT cfg={cfg} />

        <Capabilities
          eyebrow="Platform capabilities"
          title={cfg.capabilities?.title || 'Everything built in. Nothing bolted on.'}
          subtitle={cfg.capabilities?.subtitle || 'No add-ons, no third-party tools stitched together. Every capability needed to run a complete warranty operation comes standard in Dyrect.'}
          items={cfg.capabilities?.items || [
            { icon: 'qr-code',     t: 'QR codes on packaging',       d: 'Generate per-SKU codes so any buyer can register in seconds, from any channel.' },
            { icon: 'scan',        t: 'Serial number validation',     d: 'Validate every product and claim against your serialization database in real time.' },
            { icon: 'portal',      t: 'Self-serve customer portal',   d: 'Buyers view product details, warranty status, and claim progress without contacting support.' },
            { icon: 'palette',     t: 'White-label experience',       d: 'Every touchpoint carries your brand. No Dyrect branding is visible to the customer.' },
            { icon: 'shield-check',t: 'Claims and ticket management', d: 'Full claim lifecycle from intake to resolution tracked in one workspace.' },
            { icon: 'wallet',      t: 'Extended warranties',          d: 'Sell protection plans at any touchpoint and keep 100% of the revenue in-house.' },
            { icon: 'chart-bar',   t: 'Analytics and reporting',      d: 'Defect trends, registration rates, claim costs, and revenue data in one dashboard.' },
            { icon: 'plug',        t: 'Shopify and API integrations', d: 'Native Shopify app plus REST API and webhooks for any custom integration need.' },
          ]}
        />

        <FAQ
          faqs={cfg.faqs}
          eyebrow="FAQs"
          title="Frequently asked questions"
          subtitle={cfg.faqSubtitle || 'Everything you need to know before getting started with Dyrect.'}
        />

        <FinalCTA
          eyebrow="Get started"
          title={cfg.cta?.title || 'Start building a better post-sale operation'}
          body={<>{cfg.cta?.body || 'Join 500+ brands managing product registration, claims, and extended warranties on Dyrect.'} <strong style={{ color: 'white' }}>Get set up in under 30 minutes.</strong></>}
          primaryLabel="Get a demo"
          secondaryLabel="See pricing"
          checks={['No credit card needed', 'Live in under 30 min', '500+ brands trust Dyrect']}
        />
      </main>
      <SiteFooter />
    </>
  );
}

export default IndustryPage;

