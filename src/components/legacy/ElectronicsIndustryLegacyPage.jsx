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




/* ─── Inline icon ─── */
function Ico({ d, size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {d}
    </svg>
  );
}
const IC = {
  arrow:   <path d="M5 12h14M13 5l7 7-7 7"/>,
  check:   <path d="M20 6 9 17l-5-5"/>,
  qr:      <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v3M14 21h3M21 17v4h-4"/></>,
  shield:  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
  shield2: <><path d="M12 2 4 5v6c0 5 3.4 9.6 8 11 4.6-1.4 8-6 8-11V5z"/><path d="m9 12 2 2 4-4"/></>,
  wallet:  <><path d="M3 7a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v2"/><path d="M3 7v10a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1v-3"/><path d="M21 11h-5a2 2 0 0 0 0 4h5a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1z"/></>,
  ticket:  <><path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z"/><path d="M13 7v2M13 13v2"/></>,
  scan:    <><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 8v8M10.5 8v8M14 8v8M17 8v8"/></>,
  chart:   <><path d="M3 3v18h18"/><rect x="7" y="11" width="3" height="6" rx="0.5"/><rect x="12" y="7" width="3" height="10" rx="0.5"/><rect x="17" y="13" width="3" height="4" rx="0.5"/></>,
  trend:   <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
  alert:   <><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
  users:   <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
  cpu:     <><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/></>,
  mail:    <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
  tag:     <><path d="M20.6 13.4 12 22l-9-9V4a1 1 0 0 1 1-1h8z"/><circle cx="7.5" cy="7.5" r="1.5"/></>,
  zap:     <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
  refresh: <><path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"/></>,
  store:   <><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></>,
  tool:    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>,
  plug:    <><path d="M9 2v6M15 2v6"/><path d="M5 8h14v3a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5z"/><path d="M12 16v6"/></>,
  layers:  <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
  lock:    <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
  bell:    <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>,
  globe:   <><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
  phone:   <><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></>,
};

/* ─── Feature card ─── */
function FCard({ icon, title, desc }) {
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
      <div style={{
        width: 36, height: 36, borderRadius: 9,
        background: 'var(--color-brand-blue-subtle)',
        color: 'var(--color-brand-blue)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 12,
      }}>
        <Ico d={IC[icon]} size={17} />
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-slate-900)', marginBottom: 5, lineHeight: 1.3 }}>{title}</div>
      <div style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--fg-secondary)' }}>{desc}</div>
    </div>
  );
}

/* ─── Check list item ─── */
function Li({ children }) {
  return (
    <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 15, color: 'var(--fg-primary)', lineHeight: 1.5 }}>
      <span style={{
        width: 20, height: 20, borderRadius: '50%',
        background: 'var(--color-success-subtle)', color: '#166534',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, marginTop: 2,
      }}>
        <Ico d={IC.check} size={10} color="#166534" />
      </span>
      <span>{children}</span>
    </li>
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section style={{
      background: 'radial-gradient(ellipse 90% 60% at 50% -5%, rgba(36,55,246,0.08) 0%, transparent 65%), #fff',
      padding: '96px 0 80px',
      borderBottom: '1px solid var(--border-default)',
    }}>
      <div className="container">
        <div style={{ maxWidth: 840 }}>
          <p className="eyebrow" style={{ marginBottom: 18 }}>Electronics industry</p>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(36px, 6vw, 64px)', lineHeight: 1.02,
            letterSpacing: '-2.5px', color: 'var(--color-slate-900)', margin: 0,
          }}>
            Warranty management built for <span className="em">electronics brands</span>
          </h1>
          <p style={{
            marginTop: 24, fontSize: 18, lineHeight: 1.6,
            color: 'var(--fg-secondary)', maxWidth: 660,
          }}>
            Most electronics buyers are invisible to the brand the moment a sale happens through Amazon, retail, or a distributor. Dyrect makes every buyer a registered contact, routes every claim to a fast resolution, and turns your after-sales operation into a revenue channel.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
            <a href="#demo" className="btn btn-primary btn-lg">
              Get a Demo <Ico d={IC.arrow} size={15} />
            </a>
            <a href="#how-it-works" className="btn btn-secondary btn-lg"
              onClick={e => { e.preventDefault(); window.scrollTo({ top: (document.getElementById('how-it-works')?.getBoundingClientRect().top || 0) + window.scrollY - 24, behavior: 'smooth' }); }}>
              See how it works
            </a>
          </div>
          <p style={{ marginTop: 20, fontSize: 13, color: 'var(--fg-muted)' }}>
            Trusted by 500+ brands globally. 4.8 ★ on G2. 5 ★ on Shopify App Store.
          </p>
        </div>

        {/* Stats strip */}
        <div style={{
          display: 'flex', gap: 0, marginTop: 72,
          paddingTop: 48, borderTop: '1px solid var(--border-default)',
          flexWrap: 'wrap',
        }}>
          {[
            { n: '4 Mn+',  l: 'customers registered' },
            { n: '500+',   l: 'brands on Dyrect' },
            { n: '3x',     l: 'higher warranty attach rate' },
            { n: '<30 min', l: 'average setup time' },
            { n: '100%',   l: 'extended warranty revenue kept in-house' },
          ].map((s, i) => (
            <div key={i} style={{
              paddingRight: 40, paddingLeft: i === 0 ? 0 : 40,
              borderLeft: i > 0 ? '1px solid var(--border-default)' : 'none',
              marginBottom: 16,
            }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1, letterSpacing: '-1.2px',
                color: 'var(--color-slate-900)', fontVariantNumeric: 'tabular-nums',
              }}>{s.n}</div>
              <div style={{ fontSize: 13, color: 'var(--fg-muted)', marginTop: 5, fontWeight: 500 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PROBLEM SECTION ─── */
function Problems() {
  const items = [
    {
      title: 'You have no record of who bought your product',
      desc: 'Every unit sold through Amazon, a distributor, or a retail chain leaves no buyer trace on your side. You know shipment numbers. You do not know a single name, email, or address of the people who own your products.',
    },
    {
      title: 'Claims take too long and cost too much to resolve',
      desc: 'Your team cannot validate a serial number, confirm a purchase date, or check coverage without hunting across three tools. Every incoming claim adds manual work. The backlog grows faster than the team can clear it.',
    },
    {
      title: 'Extended warranty revenue leaves the brand entirely',
      desc: "Electronics carry high average order values. Buyers want protection plans. Most brands hand that revenue to a third-party insurer and collect a small commission. Your brand does the selling. Someone else keeps the margin.",
    },
  ];
  return (
    <section className="section" style={{ background: 'var(--color-slate-50)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p className="eyebrow" style={{ marginBottom: 14 }}>The problem</p>
          <h2 className="section-title">Three gaps every electronics brand has after the sale</h2>
          <p className="section-sub">The distribution model that puts electronics in front of millions of buyers also cuts the brand off from every one of them. Dyrect closes all three gaps.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="three-col">
          {items.map((p, i) => (
            <div key={i} style={{
              background: 'white', border: '1px solid var(--border-default)',
              borderRadius: 16, padding: '32px 28px',
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: 'var(--color-error-subtle)', color: 'var(--color-error)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
              }}>
                <Ico d={IC.alert} size={19} color="var(--color-error)" />
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

/* ─── HOW IT WORKS ─── */
function HowItWorks() {
  const steps = [
    {
      n: '01',
      title: 'Register every buyer, regardless of channel',
      desc: 'QR codes on packaging, Shopify auto-sync, and branded web flows capture every buyer. Each registration links the customer to the product serial number and purchase record.',
    },
    {
      n: '02',
      title: 'Validate and resolve every claim with full context',
      desc: 'Claims check eligibility automatically against the registration record. Your team sees the full product and ownership history before they open a response, not after.',
    },
    {
      n: '03',
      title: 'Sell protection plans and keep all the revenue',
      desc: 'Offer extended warranties at the product page, checkout, and post-purchase. Every plan stays in-house. No revenue share. Claims from those plans route into the same queue.',
    },
    {
      n: '04',
      title: 'Use the data to cut costs and grow revenue',
      desc: 'Defect rates by SKU, claim costs by category, and extended warranty attach rates all surface automatically. Your product, service, and finance teams act on real numbers.',
    },
  ];
  return (
    <section id="how-it-works" className="section" style={{ background: 'white' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p className="eyebrow" style={{ marginBottom: 14 }}>How it works</p>
          <h2 className="section-title">One platform. The complete warranty lifecycle.</h2>
          <p className="section-sub">Registration, claims, service, protection plans, and analytics stop being separate problems the moment they run on the same system.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }} className="four-col">
          {steps.map((s, i) => (
            <div key={i} style={{
              padding: '28px 24px', borderRadius: 14,
              border: '1px solid var(--border-default)',
              background: 'var(--color-slate-50)',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontWeight: 800,
                fontSize: 52, lineHeight: 1, letterSpacing: '-3px',
                color: 'var(--color-brand-blue-subtle)',
                marginBottom: 18, fontVariantNumeric: 'tabular-nums',
              }}>{s.n}</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-slate-900)', lineHeight: 1.35, marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--fg-secondary)', margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SPLIT SECTION (reusable) ─── */
function SplitSection({ id, eyebrow, headline, headlineEm, body, bullets, ctaLabel, ctaHref, cards, flip, bg }) {
  const parts = headline.split(headlineEm);
  return (
    <section id={id} className="section" style={{ background: bg || 'white' }}>
      <div className="container">
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 72, alignItems: 'start',
        }} className="split-grid">
          {/* Text side */}
          <div style={{ order: flip ? 2 : 1 }}>
            <p className="eyebrow" style={{ marginBottom: 14 }}>{eyebrow}</p>
            <h2 className="section-title" style={{ textAlign: 'left', letterSpacing: '-1.3px', fontSize: 'clamp(26px, 3vw, 40px)' }}>
              {parts[0]}<span className="em">{headlineEm}</span>{parts[1]}
            </h2>
            <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.65, color: 'var(--fg-secondary)' }}>{body}</p>
            {bullets && (
              <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {bullets.map((b, i) => <Li key={i}>{b}</Li>)}
              </ul>
            )}
            {ctaLabel && (
              <a href={ctaHref || '#'} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                marginTop: 28, fontSize: 14, fontWeight: 600,
                color: 'var(--color-brand-blue)',
                transition: 'gap 150ms',
              }}
                onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                onMouseLeave={e => e.currentTarget.style.gap = '6px'}>
                {ctaLabel} <Ico d={IC.arrow} size={14} />
              </a>
            )}
          </div>

          {/* Cards side */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, order: flip ? 1 : 2 }}>
            {cards.map((c, i) => <FCard key={i} {...c} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── ANALYTICS SECTION (custom — has a mock dashboard) ─── */
function AnalyticsSection() {
  const defects = [
    { label: 'Screen damage',   pct: 34, clr: 'var(--color-error)' },
    { label: 'Battery failure', pct: 27, clr: 'var(--color-warning)' },
    { label: 'Charging port',   pct: 19, clr: 'var(--color-brand-blue)' },
    { label: 'Speaker fault',   pct: 12, clr: 'var(--fg-muted)' },
    { label: 'Other',           pct: 8,  clr: 'var(--border-default)' },
  ];
  return (
    <section id="analytics" className="section" style={{ background: 'white' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }} className="split-grid">
          {/* Dashboard mock */}
          <div style={{
            background: 'var(--color-slate-50)', borderRadius: 16,
            border: '1px solid var(--border-default)',
            padding: 24, boxShadow: 'var(--shadow-lg)',
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-slate-900)', marginBottom: 20 }}>Warranty dashboard</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
              {[
                { label: 'Registrations',      val: '12,841', change: '+18%', up: true },
                { label: 'Active claims',       val: '234',    change: '-12%', up: false },
                { label: 'Avg claim cost',      val: '$31.40', change: '-8%',  up: false },
                { label: 'Warranty revenue',    val: '$48,200', change: '+34%', up: true },
              ].map((s, i) => (
                <div key={i} style={{ background: 'white', borderRadius: 10, padding: '14px 16px', border: '1px solid var(--border-default)' }}>
                  <div style={{ fontSize: 11, color: 'var(--fg-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-slate-900)', letterSpacing: '-0.5px', fontVariantNumeric: 'tabular-nums' }}>{s.val}</div>
                  <div style={{ fontSize: 12, marginTop: 3, fontWeight: 600, color: s.up ? '#166534' : 'var(--color-error)' }}>{s.change} vs last month</div>
                </div>
              ))}
            </div>
            {/* Defect bar chart */}
            <div style={{ background: 'white', borderRadius: 10, padding: '16px', border: '1px solid var(--border-default)' }}>
              <div style={{ fontSize: 11, color: 'var(--fg-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>Top claim categories</div>
              {defects.map((row, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--fg-primary)', marginBottom: 4 }}>
                    <span>{row.label}</span>
                    <span style={{ fontWeight: 600 }}>{row.pct}%</span>
                  </div>
                  <div style={{ height: 6, background: 'var(--color-slate-100)', borderRadius: 99 }}>
                    <div style={{ height: 6, width: `${Math.min(row.pct * 2.8, 100)}%`, background: row.clr, borderRadius: 99, transition: 'width 800ms cubic-bezier(.16,.84,.44,1)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="eyebrow" style={{ marginBottom: 14 }}>Analytics and insights</p>
            <h2 className="section-title" style={{ textAlign: 'left', letterSpacing: '-1.3px', fontSize: 'clamp(26px, 3vw, 40px)' }}>
              See which products fail, what claims cost, and <span className="em">where to act first</span>
            </h2>
            <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.65, color: 'var(--fg-secondary)' }}>
              Electronics warranty data lives in spreadsheets and disconnected tools for most brands. Dyrect surfaces registration rates, claim costs, defect trends, and protection plan revenue in one dashboard so every team gets the numbers they need without asking.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 28 }}>
              {[
                { t: 'Registration rate', d: 'by product, channel, and region' },
                { t: 'Claim rate',        d: 'by SKU and defect type' },
                { t: 'Cost per claim',    d: 'across repair, replacement, refund' },
                { t: 'Defect trends',     d: 'surfaced early, before they scale' },
                { t: 'Warranty revenue',  d: 'attach rate and plan performance' },
                { t: 'Time to resolve',   d: 'by team, agent, and claim type' },
              ].map((m, i) => (
                <div key={i} style={{
                  padding: '12px 14px', borderRadius: 10,
                  background: 'var(--color-slate-50)', border: '1px solid var(--border-default)',
                }}>
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

/* ─── SUB-INDUSTRIES ─── */
function SubIndustries() {
  const cats = [
    { icon: 'phone',  title: 'Consumer electronics',   desc: 'Smartphones, laptops, tablets, smart home devices, and wearables. High claim volumes and strong buyer appetite for protection plans.' },
    { icon: 'cpu',    title: 'Home appliances',        desc: 'Refrigerators, washing machines, and kitchen appliances. Long warranty periods, complex repair routing, and dealer service networks.' },
    { icon: 'tool',   title: 'Power tools',            desc: 'Professional and consumer-grade drills, saws, and grinders. Serial-number-level warranty validation and dealer claim management.' },
    { icon: 'layers', title: 'Audio and visual',       desc: 'Headphones, speakers, televisions, and AV equipment. Multi-SKU catalogs with routing to the right service center per claim.' },
    { icon: 'zap',    title: 'Batteries and charging', desc: 'EV accessories, power banks, and charging solutions. Define precise battery and capacity exclusions in the plan builder.' },
    { icon: 'cpu',    title: 'Industrial electronics', desc: 'Measurement instruments, sensors, and B2B hardware. Multi-user dashboards, role-based access, and full API integration.' },
  ];
  return (
    <section className="section" style={{ background: 'var(--color-slate-50)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <p className="eyebrow" style={{ marginBottom: 14 }}>Built for every electronics category</p>
          <h2 className="section-title">From consumer gadgets to industrial hardware</h2>
          <p className="section-sub">Dyrect supports every segment of the electronics industry with the same unified platform. No category-specific add-ons. No separate tools per product line.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="three-col">
          {cats.map((c, i) => (
            <div key={i} style={{
              background: 'white', border: '1px solid var(--border-default)',
              borderRadius: 14, padding: '28px 24px',
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: 'var(--color-brand-blue-subtle)', color: 'var(--color-brand-blue)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
              }}>
                <Ico d={IC[c.icon]} size={19} />
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

/* ─── Social proof logo strip ─── */
function ElecLogos() {
  const logos = [
    { name: 'Clore Automotive', src: '/uploads/Clore-Automotive-Logo.png', h: 28 },
    { name: 'JCB',              src: '/uploads/jcb-logo.png',              h: 32 },
    { name: 'Aircon',           src: '/uploads/Aircon-logo.png',           h: 28 },
    { name: 'R for Rabbit',     src: '/uploads/R_for_Rabbit_logo.png',     h: 36 },
    { name: 'Keplin Group',     src: '/uploads/keplin logo.webp',          h: 28 },
    { name: 'Velotric',         src: '/uploads/velotric-logo.jpeg',        h: 22 },
    { name: 'Dow',              src: '/uploads/dow-logo.png',              h: 30 },
  ];
  return (
    <section className="section-tight" style={{ background: 'white', borderTop: '1px solid var(--border-default)', borderBottom: '1px solid var(--border-default)' }}>
      <div className="container">
        <p style={{ textAlign: 'center', fontSize: 13, fontWeight: 500, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: 1.4, marginBottom: 36 }}>
          Electronics and hardware brands running on Dyrect
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 48, flexWrap: 'wrap' }}>
          {logos.map(l => (
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

/* ─── Electronics FAQs ─── */
const ELEC_FAQS = [
  {
    q: 'What types of electronics brands use Dyrect?',
    a: 'Dyrect works with consumer electronics brands, home appliance manufacturers, power tool companies, audio and visual equipment brands, and any electronics business selling through D2C, Shopify, Amazon, or retail. From startups shipping their first product to established manufacturers running multi-SKU catalogs, the platform scales without a stack change.',
  },
  {
    q: 'How does product registration work for electronics sold on Amazon or through retail?',
    a: 'Dyrect generates QR codes for your product packaging, inside the box, or on the warranty card insert. When a customer scans the code, they complete a branded registration flow that captures their contact details, serial number, and purchase information. You own that data outright. Amazon and retail sales convert into first-party customer records without any change to your distribution setup.',
  },
  {
    q: 'How does serial number tracking work across a large SKU catalog?',
    a: 'Dyrect ties every registration to a product serial number at the point of capture. Serial numbers are validated in real time when a claim is filed. You can import existing serialization data via CSV or API, and new serials from production runs can be added in bulk. The platform maintains a full chain of record from production through registration through any subsequent claim.',
  },
  {
    q: 'Can Dyrect handle high-volume electronics warranty claims?',
    a: 'Yes. Every incoming claim triggers an automatic eligibility check against the product serial number and registration record. Valid claims open as tickets automatically. Your service team works from one queue instead of managing email, spreadsheets, and separate tools. Claim routing, escalation, and resolution tracking all happen in the same workspace regardless of volume.',
  },
  {
    q: 'Can I sell extended warranties on my electronics products?',
    a: 'Yes. Dyrect lets you offer protection plans at the product page, at checkout, and in post-purchase emails for any electronics product. You set the coverage terms, pricing, and deductibles. All plan revenue stays with your brand. No revenue share. Protection plan claims flow into the same claims workspace as standard warranty tickets, so your team manages everything in one place.',
  },
  {
    q: 'How does Dyrect integrate with Shopify for electronics D2C brands?',
    a: 'Dyrect has a native Shopify app rated 5 stars on the App Store. Once installed, every Shopify order syncs automatically. Customers who buy through your store are registered without any additional action. Extended warranty offers appear as native widgets on the product page and at checkout. No custom code is required at any step.',
  },
  {
    q: 'Can Dyrect help identify which electronics products have the highest defect rates?',
    a: 'Yes. The analytics dashboard tracks claim frequency by SKU, defect type, and product category. You can see which products generate the most claims, what the most common fault codes are, and how defect trends shift over time. This data goes directly to your product and quality teams to address root causes before defect rates compound into a larger problem.',
  },
  {
    q: 'Does Dyrect support multi-brand electronics companies?',
    a: 'Yes. Brands operating multiple product lines or sub-brands manage all of them from one Dyrect account. Each brand gets its own branded customer portal, registration flow, and warranty rules. The admin dashboard gives a consolidated view across brands while keeping customer-facing experiences cleanly separated.',
  },
  {
    q: 'How long does it take to set up Dyrect for an electronics brand?',
    a: 'Most electronics brands are live within 30 minutes for the core registration and claims setup. More complex configurations with custom domain, API integrations, and serialization import typically take one to two business days with a dedicated account executive guiding the setup end to end.',
  },
  {
    q: 'Is customer data secure on Dyrect?',
    a: 'Yes. All customer data is encrypted at rest and in transit. Dyrect supports SSO and SAML for enterprise authentication. Role-based access control ensures your service team, product team, and management each see exactly what they need. Data export and deletion are available on demand to support regional compliance requirements.',
  },
];

/* ─── Custom page stats ─── */
const ELEC_STATS = [
  { value: '4 Mn+', label: 'Customers registered',        sub: 'across every channel and category' },
  { value: '500+',  label: 'Brands running on Dyrect',    sub: 'D2C, retail, and manufacturers' },
  { value: '3x',    label: 'Higher warranty attach rate',  sub: 'on extended warranty programs' },
  { value: '100%',  label: 'Revenue kept in-house',        sub: 'on every protection plan sold' },
];

/* ─── App ─── */
function ElectronicsApp() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.08 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <LogoCloud />
        <Problems />
        <HowItWorks />

        {/* Product Registration */}
        <SplitSection
          id="product-registration"
          eyebrow="Product registration"
          headline="Turn every electronics buyer into a direct contact"
          headlineEm="direct contact"
          body="Electronics brands ship millions of units through Amazon, retail chains, and distributors. The buyer's contact details stay with the channel, not with the brand. Dyrect closes that gap at the point of product registration using QR codes on packaging, Shopify sync, and branded web flows."
          bullets={[
            'Unique QR codes per SKU, printed on packaging or box inserts',
            'Shopify orders register automatically with no customer friction',
            'Serial number captured and validated at the point of registration',
            'Every buyer becomes a reachable contact regardless of purchase channel',
          ]}
          ctaLabel="See product registration software"
          ctaHref="/product/product-registration-software"
          bg="var(--color-slate-50)"
          cards={[
            { icon: 'qr',     title: 'QR codes per SKU',              desc: 'Unique QR codes per product or variant. Print on box, packaging, or card insert. Every scan lands on your branded registration flow.' },
            { icon: 'store',  title: 'Shopify auto-registration',      desc: 'Every fulfilled Shopify order registers automatically. No customer action required. No manual work from your team.' },
            { icon: 'cpu',    title: 'Serial number capture',          desc: 'Capture and validate the product serial number at registration. Every record is tied to the specific unit, not just the product line.' },
            { icon: 'globe',  title: 'Multi-channel coverage',         desc: 'Amazon, retail, distributor, D2C. Registrations from every channel consolidate into one customer database.' },
            { icon: 'mail',   title: 'Automated post-reg flow',        desc: 'Send the warranty card, setup guide, and any promotional content automatically after registration. No follow-up needed.' },
            { icon: 'tag',    title: 'First-party data ownership',     desc: 'Every registration adds a reachable buyer to your database for re-marketing, recalls, and product announcements.' },
          ]}
        />

        {/* Claims */}
        <SplitSection
          id="claims-management"
          eyebrow="Claims and service management"
          headline="Resolve every claim faster, with less back-and-forth"
          headlineEm="less back-and-forth"
          body="High-volume electronics claims break down when teams rely on email and spreadsheets. Dyrect gives your service team one workspace with automatic eligibility checks, the full product ownership history, and a clear resolution path for every incoming claim."
          bullets={[
            'Warranty eligibility verified automatically on every claim',
            'Full serial number history visible before the first response',
            'Repair, replacement, and refund flows tracked in one system',
            'Fault data aggregated for your quality and product teams',
          ]}
          ctaLabel="See warranty claims management"
          ctaHref="/product/warranty-management-software"
          bg="white"
          flip={true}
          cards={[
            { icon: 'scan',    title: 'Serial number validation',       desc: 'Every claim checks the serial against the registration database before a ticket opens. Invalid claims surface before they cost anything.' },
            { icon: 'ticket',  title: 'Centralized claim inbox',        desc: 'One queue for every claim across every product line. Assign, escalate, and close without switching between tools.' },
            { icon: 'refresh', title: 'Repair, replacement, refund',    desc: 'Route each claim to the right resolution type and track every step from first contact to close.' },
            { icon: 'bell',    title: 'Automated customer updates',     desc: 'Notify customers at every stage automatically. Reduce inbound call volume without manual follow-up from your team.' },
            { icon: 'tool',    title: 'Fault code tracking',            desc: 'Log fault codes on every ticket. Aggregate fault data feeds your quality team and surfaces defect trends early.' },
            { icon: 'layers',  title: 'Full history per unit',          desc: 'Every ticket, repair, and resolution stored against the serial number. Full context in seconds, not minutes.' },
          ]}
        />

        {/* Extended warranties */}
        <SplitSection
          id="extended-warranties"
          eyebrow="Extended warranties"
          headline="Sell protection plans and keep all the revenue"
          headlineEm="all the revenue"
          body="Electronics carry high average order values. Buyers want protection. Most brands hand that revenue to a third-party insurer in exchange for a small commission. Dyrect lets your brand own the plan, set the price, and keep every dollar without any revenue share."
          bullets={[
            'Protection plan offers at product page, checkout, and post-purchase',
            '100% of plan revenue stays with your brand on every sale',
            'Custom coverage terms and exclusions per product category',
            'Natively integrated with Shopify and WooCommerce stores',
          ]}
          ctaLabel="See extended warranties"
          ctaHref="/product/extended-warranties"
          bg="var(--color-slate-50)"
          cards={[
            { icon: 'store',   title: 'PDP and checkout offers',        desc: 'Place protection plan widgets on the product page and at checkout. Electronics buyers at purchase are most likely to add coverage.' },
            { icon: 'wallet',  title: '100% revenue in-house',          desc: 'No revenue share, no third-party margin. Every plan sold through Dyrect stays entirely with your brand.' },
            { icon: 'tag',     title: 'No-code plan builder',           desc: 'Set coverage terms, pricing, deductibles, and exclusions without engineering. Launch a new plan in a day.' },
            { icon: 'zap',     title: 'Post-purchase offers',           desc: 'Reach buyers who did not add a plan at checkout via post-purchase email and the registration flow.' },
            { icon: 'shield2', title: 'Claims linked to the plan',      desc: 'Extended warranty claims flow into the same workspace as standard tickets. One queue, no separate workflow.' },
            { icon: 'bell',    title: 'Battery and screen exclusions',  desc: 'Define precise exclusions for high-risk electronics categories. Your policy, your rules, enforced automatically.' },
          ]}
        />

        <AnalyticsSection />
        <ElecLogos />

        <Stats stats={ELEC_STATS} />

        <Testimonials />

        <SubIndustries />

        <Capabilities
          eyebrow="Platform capabilities"
          title="Everything built in. Nothing bolted on."
          subtitle="No add-ons, no third-party tools stitched together. Every capability needed to run a complete electronics warranty operation comes standard in Dyrect."
          items={[
            { icon: 'qr-code',     t: 'QR codes on packaging',          d: 'Generate per-SKU codes so any buyer can register in seconds, from any channel.' },
            { icon: 'scan',        t: 'Serial number validation',        d: 'Validate every product and claim against your serialization database in real time.' },
            { icon: 'portal',      t: 'Self-serve customer portal',      d: 'Buyers view product details, warranty status, and claim progress without contacting support.' },
            { icon: 'palette',     t: 'White-label experience',          d: 'Every touchpoint carries your brand. No Dyrect branding is visible to the customer.' },
            { icon: 'shield-check',t: 'Claims and ticket management',    d: 'Full claim lifecycle from intake to resolution, tracked in one workspace.' },
            { icon: 'wallet',      t: 'Extended warranties',             d: 'Sell protection plans at any touchpoint and keep 100% of the revenue in-house.' },
            { icon: 'chart-bar',   t: 'Analytics and reporting',         d: 'Defect trends, registration rates, claim costs, and revenue data in one dashboard.' },
            { icon: 'plug',        t: 'Shopify and API integrations',    d: 'Native Shopify app plus REST API and webhooks for any custom integration need.' },
          ]}
        />

        <FAQ
          faqs={ELEC_FAQS}
          eyebrow="FAQs"
          title="Frequently asked questions"
          subtitle="Everything you need to know about running warranty operations for electronics products on Dyrect."
        />

        <FinalCTA
          eyebrow="Get started"
          title="Start turning electronics buyers into direct contacts"
          body={<>Register every product. Resolve every claim. Sell protection plans that keep <strong style={{ color: 'white' }}>100% of the revenue with your brand</strong>. Set up in under 30 minutes.</>}
          primaryLabel="Get a demo"
          secondaryLabel="See pricing"
          checks={['No credit card needed', 'Live in under 30 min', '500+ brands trust Dyrect']}
        />
      </main>
      <SiteFooter />
    </>
  );
}

export default ElectronicsApp;

