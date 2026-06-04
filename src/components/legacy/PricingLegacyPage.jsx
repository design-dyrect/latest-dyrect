'use client';
import React, { useState, useEffect } from 'react';
import './IndustryShared';
function SiteNav(props) { const C = typeof window !== 'undefined' && window.SiteNav; return C ? <C {...props} /> : null; }
function SiteFooter(props) { const C = typeof window !== 'undefined' && window.SiteFooter; return C ? <C {...props} /> : null; }
function FAQ(props) { const C = typeof window !== 'undefined' && window.FAQ; return C ? <C {...props} /> : null; }



/* ─── Inline logo cloud ─── */
const PRICING_LOGOS = [
  { name: 'Burton',           src: '/uploads/burton_snowboards_logo.jpeg', h: 36 },
  { name: 'Briggs & Riley',   src: '/uploads/briggs-riley.jpeg',           h: 22 },
  { name: 'Dow',              src: '/uploads/dow-logo.png',                h: 30 },
  { name: 'JCB',              src: '/uploads/jcb-logo.png',                h: 32 },
  { name: 'Velotric',         src: '/uploads/velotric-logo.jpeg',          h: 22 },
  { name: 'Diggs',            src: '/uploads/diggs-pet-logo.png',          h: 30 },
  { name: 'Greens Tapware',   src: '/uploads/greens-tapware logo.png',     h: 34 },
  { name: 'GoMechanic',       src: '/uploads/go-mechanic-logo.png',        h: 26 },
  { name: 'R for Rabbit',     src: '/uploads/R_for_Rabbit_logo.png',       h: 36 },
  { name: "Neeman's",         src: '/uploads/neemans-logo.png',            h: 26 },
  { name: 'Clore Automotive', src: '/uploads/Clore-Automotive-Logo.png',   h: 28 },
  { name: 'Aircon',           src: '/uploads/Aircon-logo.png',             h: 28 },
  { name: 'Keplin Group',     src: '/uploads/keplin logo.webp',            h: 30 },
  { name: 'Lacuna',           src: '/uploads/lacuna-logo.webp',            h: 26 },
];
function PricingLogoCloud() {
  return (
    <section className="section-tight" style={{ background: 'white', borderBottom: '1px solid var(--border-default)' }}>
      <div className="container">
        <p style={{ textAlign: 'center', fontSize: 13, fontWeight: 500, color: '#64748B', textTransform: 'uppercase', letterSpacing: 1.4, margin: '0 0 28px' }}>
          Trusted by 500+ brands globally
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', rowGap: 40, columnGap: 24, alignItems: 'center', justifyItems: 'center' }} className="logo-grid">
          {PRICING_LOGOS.map(l => (
            <img key={l.name} src={l.src} alt={l.name}
              style={{ height: l.h, maxWidth: 140, objectFit: 'contain', filter: 'grayscale(1)', opacity: 0.7, transition: 'all 220ms ease' }}
              onMouseEnter={e => { e.currentTarget.style.filter = 'grayscale(0)'; e.currentTarget.style.opacity = '1'; }}
              onMouseLeave={e => { e.currentTarget.style.filter = 'grayscale(1)'; e.currentTarget.style.opacity = '0.7'; }} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Cell value renderer ─── */
function CellValue({ v }) {
  if (v === 'check') return (
    <span style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:22, height:22, borderRadius:'50%', background:'#DCFCE7' }}>
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
    </span>
  );
  if (v === 'cross') return <span style={{ color:'#CBD5E1', fontSize:20, lineHeight:1 }}>–</span>;
  if (v === 'removed') return <span style={{ display:'inline-block', padding:'2px 10px', borderRadius:99, fontSize:11, fontWeight:600, background:'#DCFCE7', color:'#166534', border:'1px solid #BBF7D0' }}>Removed</span>;
  return <span style={{ fontSize:13, color:'#334155', fontWeight:500, lineHeight:1.4 }}>{v}</span>;
}

/* ─── All 4 plans — exact content from dyrect.co/pricing ─── */
const PLANS = [
  {
    id: 'startup', name: 'Startup', popular: false, dark: false,
    tagline: 'For early stage brands that focusses on building a sustainable business.',
    cta: 'Contact Us', ctaHref: '#demo',
    features: [
      'Product Registration Experience for Customers',
      'Brand Dashboard (User data Management)',
      'Product Serialization',
      'Feedback Management',
      '"Powered by DYRECT" Branding',
      'Onboarding & Support',
    ],
    users: '1 user included',
    addons: ['Unique QR Codes', 'Additional licenses'],
  },
  {
    id: 'growth', name: 'Growth', popular: true, dark: false,
    tagline: 'For brands who wish to reduce their dependency on third party sales.',
    cta: 'Contact Us', ctaHref: '#demo',
    features: [
      'Everything in Startup +',
      'Warranty Claims Management',
      'Custom Brand theme',
      'Multi user Login',
      '"Powered by DYRECT" Branding',
      'Onboarding & Support',
    ],
    users: '3 users included',
    addons: ['Unique QR Codes', 'Additional licenses', 'Additional Brands'],
  },
  {
    id: 'scaleup', name: 'Scaleup', popular: false, dark: false,
    tagline: 'For fast-growth scaleup brands that want to grow profitably.',
    cta: 'Contact Us', ctaHref: '#demo',
    features: [
      'Everything in Growth +',
      'Repair/Returns Management',
      'Label Generation',
      'Advanced Reports & Exports',
      'Custom Domain',
      'API Integrations',
      'Dedicated CSM',
      'Remove "Powered by DYRECT" Branding',
      'User role management',
      'Priority Support',
    ],
    users: '5 users included',
    addons: ['Unique QR Codes', 'Additional licenses', 'Additional Brands', 'Dealer Portal'],
  },
  {
    id: 'enterprise', name: 'Enterprise', popular: false, dark: true,
    tagline: 'Our Enterprise Plan offers tailored solutions, advanced features, and dedicated support to scale your business seamlessly.',
    cta: 'Talk to Sales', ctaHref: '#demo',
    features: [
      'Everything in Scaleup +',
      'Custom integrations',
      'Multi-brand management',
      'Dedicated account team',
      'SLA-backed support',
      'Custom contract terms',
    ],
    users: 'Custom team size',
    addons: [],
  },
];

/* ─── Comparison table data ─── */
const ALL_PLAN_NAMES = ['Startup', 'Growth', 'Scaleup', 'Enterprise'];
const COMPARE_GROUPS = [
  {
    heading: 'Customer Microsite',
    rows: [
      { label: 'Warranty Registration',          v: ['check','check','check','check'] },
      { label: 'Manage Warranties',              v: ['check','check','check','check'] },
      { label: 'Claims Management',              v: ['check','check','check','check'] },
      { label: 'Digital Warranty Card',          v: ['Email','Email / SMS','Email / SMS / Whatsapp','check'] },
      { label: 'Product Feedback',               v: ['check','check','check','check'] },
      { label: 'Brand Theme Color (User App)',   v: ['check','check','check','check'] },
      { label: 'Custom Domain (User App)',       v: ['cross','cross','check','check'] },
      { label: '"Powered by DYRECT" branding',  v: ['check','check','removed','removed'] },
    ],
  },
  {
    heading: 'Brand Tools',
    rows: [
      { label: '# Users',                        v: ['1 user','3 users','5 users','Custom'] },
      { label: 'Serialization Management',        v: ['check','check','check','check'] },
      { label: 'Manage Warranties',               v: ['check','check','check','check'] },
      { label: 'Product Return / Replacement',   v: ['check','check','check','check'] },
      { label: 'Ticket Management (CRM)',         v: ['check','check','check','check'] },
      { label: 'Reporting / Analytics',           v: ['check','check','check','check'] },
      { label: 'User Profile Management',         v: ['check','check','check','check'] },
      { label: 'Data Export',                     v: ['check','check','check','check'] },
      { label: 'Brand Theme Color (User App)',    v: ['check','check','check','check'] },
    ],
  },
  {
    heading: 'Others',
    rows: [
      { label: 'Business User Logins',            v: ['1 user','3 users included','5 users included','Custom'] },
      { label: 'API Integrations',                v: ['cross','cross','check','check'] },
    ],
  },
  {
    heading: 'Support',
    rows: [
      { label: 'Onboarding / Implementation',    v: ['Account Executive','Account Executive','Dedicated Account Executive','Dedicated Account Executive'] },
      { label: 'Post Implementation Support',    v: ['Email','Email','Email','Email / Phone'] },
    ],
  },
];

/* ─── 10 Pricing FAQs ─── */
const PRICING_FAQS = [
  {
    q: 'Do you offer a free trial?',
    a: 'Yes. Dyrect offers a free trial so you can experience the platform before committing to a plan. Our team will set up a trial environment tailored to your product category and walk you through the key workflows.',
  },
  {
    q: 'How does Dyrect pricing work?',
    a: 'Pricing is based on your monthly registration volume and the features your team needs. Each plan covers a core set of capabilities with add-ons available for QR codes, additional users, and extra brands. Contact our team to get the exact numbers for your business.',
  },
  {
    q: 'What counts as a registration?',
    a: 'A registration is any successful product registration submitted by a customer through your Dyrect-powered flow, whether via QR code on packaging, your website, or Shopify auto-sync. Incomplete or failed submissions do not count.',
  },
  {
    q: 'Can I switch plans as my business grows?',
    a: 'Yes. You can move from Startup to Growth to Scaleup as your registration volume and operational needs change. Our team handles the transition and ensures no customer data is affected during the upgrade.',
  },
  {
    q: 'Is the Shopify integration included in all plans?',
    a: 'Yes. The Shopify integration is available across all plans. Orders sync automatically and product registrations are captured without any manual input from your team or your customers.',
  },
  {
    q: 'Are QR codes included in the base plan?',
    a: 'QR code generation is available as an add-on across all plans. The base plan covers the digital registration experience. QR codes for physical packaging are priced separately based on volume.',
  },
  {
    q: 'How many users can I add to my account?',
    a: 'The Startup plan includes 1 user, Growth includes 3, and Scaleup includes 5. Additional user licenses are available as an add-on on all plans. Enterprise plans have a custom user count based on your team structure.',
  },
  {
    q: 'What does onboarding look like?',
    a: 'Every plan includes guided onboarding with a dedicated account executive. For Scaleup and Enterprise plans, the dedicated AE handles your full setup, data migration from existing systems, and team training end to end.',
  },
  {
    q: 'Do you offer custom pricing for high volumes?',
    a: 'Yes. For brands processing large registration volumes or requiring custom integrations, SLA commitments, or multi-brand management, our Enterprise plan is fully tailored. Talk to our sales team to get a quote built around your operation.',
  },
  {
    q: 'What support do I get after going live?',
    a: 'Startup and Growth plans include email-based post-launch support. Scaleup and Enterprise plans include a dedicated CSM, priority support, and direct access to the Dyrect team for escalations and ongoing guidance.',
  },
];

/* ─── Hero ─── */
function PricingHero() {
  return (
    <section style={{
      background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(36,55,246,0.07) 0%, transparent 70%), #fff',
      padding: '88px 24px 72px', textAlign: 'center',
      borderBottom: '1px solid var(--border-default)',
    }}>
      <div style={{ maxWidth: 620, margin: '0 auto' }}>
        <p className="eyebrow" style={{ marginBottom: 16 }}>Pricing</p>
        <h1 className="section-title" style={{ fontSize: 'clamp(32px, 5vw, 54px)', letterSpacing: '-1.8px', lineHeight: 1.06 }}>
          Find a plan that's right for you
        </h1>
        <p style={{ marginTop: 20, fontSize: 17, lineHeight: 1.65, color: '#475569', maxWidth: 480, margin: '20px auto 0' }}>
          Or simply leverage the expertise of our consultation team.{' '}
          <a href="#demo" style={{ color: 'var(--color-brand-blue)', fontWeight: 600 }}>Talk to us &gt;</a>
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 36, flexWrap: 'wrap' }}>
          <a href="#demo" className="btn btn-primary btn-lg">
            Book a Meeting
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </a>
          <a href="#plan-breakdown" className="btn btn-secondary btn-lg"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: (document.getElementById('plan-breakdown')?.getBoundingClientRect().top||0) + window.scrollY - 24, behavior: 'smooth' }); }}>
            See how plans compare
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Plan card (handles light + dark variants) ─── */
function PlanCard({ plan }) {
  const { name, popular, dark, tagline, users, cta, ctaHref, features, addons } = plan;
  const tx   = dark ? 'white'                    : '#0F172A';
  const sub  = dark ? 'rgba(255,255,255,0.65)'   : '#64748B';
  const div  = dark ? 'rgba(255,255,255,0.12)'   : 'var(--border-default)';
  const chkBg= dark ? 'rgba(34,197,94,0.18)'     : '#DCFCE7';
  const chkC = dark ? '#4ADE80'                  : '#16A34A';
  const adC  = dark ? 'rgba(255,255,255,0.50)'   : '#64748B';

  return (
    <div style={{
      background: dark ? '#0B1020' : 'white',
      border: popular ? '2px solid var(--color-brand-blue)' : dark ? '1px solid rgba(255,255,255,0.10)' : '1px solid var(--border-default)',
      borderRadius: 16, padding: '28px 24px',
      display: 'flex', flexDirection: 'column',
      boxShadow: popular ? '0 16px 48px -12px rgba(36,55,246,0.16)' : dark ? '0 16px 48px -12px rgba(0,0,0,0.40)' : 'none',
      position: 'relative',
    }}>
      {popular && (
        <div style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)' }}>
          <span style={{ display:'inline-block', padding:'4px 14px', borderRadius:99, fontSize:11, fontWeight:700, background:'var(--color-brand-blue)', color:'white', whiteSpace:'nowrap' }}>Most popular</span>
        </div>
      )}

      <div style={{ fontSize: 18, fontWeight: 700, color: tx, letterSpacing:'-0.2px', marginBottom: 8 }}>{name}</div>
      <p style={{ fontSize: 13, lineHeight: 1.6, color: sub, margin: '0 0 16px', minHeight: 52 }}>{tagline}</p>
      <div style={{ fontSize: 12, color: sub, marginBottom: 16, fontWeight: 500 }}>{users}</div>

      <div style={{ fontSize: 11, fontWeight: 700, color: dark ? 'rgba(255,255,255,0.40)' : '#94A3B8', textTransform:'uppercase', letterSpacing:1.3, marginBottom:10 }}>
        {name === 'Enterprise' ? 'Tailored for you' : 'All you need to get started'}
      </div>
      <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:8, flex:1 }}>
        {features.map((f, i) => (
          <li key={i} style={{ display:'flex', gap:8, alignItems:'flex-start' }}>
            <span style={{ width:16, height:16, borderRadius:'50%', background:chkBg, color:chkC, display:'inline-flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            </span>
            <span style={{ fontSize:12.5, color: dark ? 'rgba(255,255,255,0.85)' : '#334155', lineHeight:1.45 }}>{f}</span>
          </li>
        ))}
      </ul>

      {addons.length > 0 && (
        <div style={{ marginTop:18, paddingTop:14, borderTop:`1px solid ${div}` }}>
          <div style={{ fontSize:10, fontWeight:700, color:adC, textTransform:'uppercase', letterSpacing:1.3, marginBottom:8 }}>Add-ons available for purchase</div>
          {addons.map((a, i) => (
            <div key={i} style={{ display:'flex', gap:6, alignItems:'center', fontSize:12, color:adC, marginBottom:5 }}>
              <span style={{ width:3, height:3, borderRadius:'50%', background:adC, flexShrink:0 }} />{a}
            </div>
          ))}
        </div>
      )}

      <a href={ctaHref} style={{
        display:'flex', alignItems:'center', justifyContent:'center',
        marginTop:20, padding:'12px 16px', borderRadius:8, fontSize:13, fontWeight:600,
        background: dark ? 'white' : popular ? 'var(--color-brand-blue)' : 'transparent',
        color: dark ? '#0B1020' : popular ? 'white' : 'var(--color-brand-blue)',
        border: dark ? 'none' : popular ? 'none' : '1.5px solid var(--color-brand-blue)',
        boxShadow: popular ? '0 6px 16px -4px rgba(36,55,246,0.40)' : 'none',
        transition: 'all 140ms',
      }}
        onMouseEnter={e => { e.currentTarget.style.opacity='0.88'; e.currentTarget.style.transform='translateY(-1px)'; }}
        onMouseLeave={e => { e.currentTarget.style.opacity='1'; e.currentTarget.style.transform='none'; }}>
        {cta}
      </a>
    </div>
  );
}

/* ─── Plans section (4-column grid) ─── */
function PlansSection() {
  return (
    <section className="section" style={{ background: '#F8FAFC' }}>
      <div className="container">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:20, alignItems:'start' }} className="plans-grid">
          {PLANS.map(p => <PlanCard key={p.id} plan={p} />)}
        </div>
        <div style={{ textAlign:'center', marginTop:28 }}>
          <a href="#plan-breakdown" style={{ fontSize:14, fontWeight:600, color:'var(--color-brand-blue)' }}
            onClick={e => { e.preventDefault(); window.scrollTo({ top:(document.getElementById('plan-breakdown')?.getBoundingClientRect().top||0)+window.scrollY-24, behavior:'smooth' }); }}>
            See how our plans compare &gt;
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Plan breakdown / comparison table ─── */
function PlanBreakdown() {
  const popularIdx = 1;
  return (
    <section id="plan-breakdown" className="section" style={{ background: 'white' }}>
      <div className="container">
        <div style={{ textAlign:'center', marginBottom:48 }}>
          <p className="eyebrow" style={{ marginBottom:12 }}>Plan breakdown</p>
          <h2 className="section-title">Choose a plan that best suits your business</h2>
          <p className="section-sub">Deliver stellar customer experience at every stage of growth.</p>
        </div>
        <div style={{ overflowX:'auto', borderRadius:14, border:'1px solid var(--border-default)', boxShadow:'0 2px 8px rgba(15,23,42,0.04)' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', minWidth:720 }}>
            <thead>
              <tr>
                <th style={{ width:'34%', padding:'18px 24px', textAlign:'left', background:'white', borderBottom:'1px solid var(--border-default)', position:'sticky', top:0, zIndex:10 }}></th>
                {ALL_PLAN_NAMES.map((name, i) => (
                  <th key={name} style={{
                    padding:'14px 16px', textAlign:'center',
                    background: i===3 ? '#0B1020' : i===popularIdx ? 'rgba(36,55,246,0.04)' : 'white',
                    borderBottom: i===3 ? '2px solid rgba(255,255,255,0.15)' : i===popularIdx ? '2px solid var(--color-brand-blue)' : '1px solid var(--border-default)',
                    position:'sticky', top:0, zIndex:10,
                  }}>
                    <div style={{ fontSize:14, fontWeight:700, color: i===3 ? 'white' : i===popularIdx ? 'var(--color-brand-blue)' : '#0F172A' }}>{name}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_GROUPS.map((group, gi) => (
                <React.Fragment key={gi}>
                  <tr>
                    <td colSpan={5} style={{ padding:'10px 24px', background:'#F8FAFC', fontSize:11, fontWeight:700, color:'#64748B', textTransform:'uppercase', letterSpacing:1.4, borderTop:gi>0?'1px solid var(--border-default)':'none', borderBottom:'1px solid var(--border-default)' }}>
                      {group.heading}
                    </td>
                  </tr>
                  {group.rows.map((row, ri) => (
                    <tr key={ri} style={{ borderBottom:'1px solid var(--border-default)' }}>
                      <td style={{ padding:'12px 24px', fontSize:13.5, color:'#334155', fontWeight:500 }}>{row.label}</td>
                      {row.v.map((val, vi) => (
                        <td key={vi} style={{ padding:'12px 16px', textAlign:'center', background: vi===3 ? 'rgba(11,16,32,0.04)' : vi===popularIdx ? 'rgba(36,55,246,0.02)' : 'white' }}>
                          <CellValue v={val} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ borderTop:'1px solid var(--border-default)' }}>
                <td style={{ padding:'16px 24px', background:'#F8FAFC', fontSize:13, color:'#94A3B8' }}>Ready to get started?</td>
                {ALL_PLAN_NAMES.map((name, i) => (
                  <td key={name} style={{ padding:'14px 16px', textAlign:'center', background: i===3 ? 'rgba(11,16,32,0.04)' : i===popularIdx ? 'rgba(36,55,246,0.03)' : '#F8FAFC' }}>
                    <a href="#demo" style={{
                      display:'inline-flex', alignItems:'center', justifyContent:'center',
                      padding:'9px 18px', borderRadius:7, fontSize:12, fontWeight:600,
                      background: i===3 ? '#0B1020' : i===popularIdx ? 'var(--color-brand-blue)' : 'transparent',
                      color: i===3 ? 'white' : i===popularIdx ? 'white' : 'var(--color-brand-blue)',
                      border: (i===popularIdx||i===3) ? 'none' : '1px solid var(--color-brand-blue)',
                    }}>{i===3 ? 'Talk to Sales' : 'Contact Us'}</a>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing FAQ ─── */
function PricingFAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section className="section" style={{ background: '#F8FAFC' }}>
      <div className="container">
        <div style={{ textAlign:'center', marginBottom:48 }}>
          <p className="eyebrow" style={{ marginBottom:12 }}>FAQs</p>
          <h2 className="section-title">Frequently asked questions</h2>
        </div>
        <div style={{ maxWidth:800, margin:'0 auto', display:'flex', flexDirection:'column' }}>
          {PRICING_FAQS.map((faq, i) => (
            <div key={i} style={{ borderTop:'1px solid var(--border-default)', borderBottom: i===PRICING_FAQS.length-1 ? '1px solid var(--border-default)' : 'none' }}>
              <button onClick={() => setOpen(open===i ? null : i)} style={{
                width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',
                padding:'20px 0', gap:24, background:'transparent', cursor:'pointer',
                fontFamily:'var(--font-body)', textAlign:'left',
              }}>
                <span style={{ fontSize:16, fontWeight:600, color:'#0F172A', lineHeight:1.35 }}>{faq.q}</span>
                <span style={{ flexShrink:0, width:22, height:22, borderRadius:'50%', background: open===i ? 'var(--color-brand-blue-subtle)' : '#F1F5F9', display:'inline-flex', alignItems:'center', justifyContent:'center', transition:'background 160ms' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={open===i ? 'var(--color-brand-blue)' : '#64748B'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    {open===i ? <path d="M5 12h14"/> : <path d="M12 5v14M5 12h14"/>}
                  </svg>
                </span>
              </button>
              {open===i && (
                <div style={{ paddingBottom:20, fontSize:15, lineHeight:1.65, color:'#475569' }}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Simple pricing CTA (no ticks, no secondary button) ─── */
function PricingCTA() {
  return (
    <section style={{ background: 'var(--color-brand-blue)', padding:'80px 24px' }}>
      <div className="container" style={{ textAlign:'center' }}>
        <h2 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(26px,3.5vw,44px)', lineHeight:1.1, letterSpacing:'-1.2px', color:'white', margin:'0 0 16px' }}>
          Never lose a customer again
        </h2>
        <p style={{ fontSize:17, lineHeight:1.65, color:'rgba(255,255,255,0.82)', maxWidth:520, margin:'0 auto 36px' }}>
          Trusted by 100s of brands globally. We help brands collect first-party data and provide engaging post-purchase experiences.
        </p>
        <a href="#demo" style={{
          display:'inline-flex', alignItems:'center', gap:8,
          padding:'15px 28px', borderRadius:8,
          background:'white', color:'var(--color-brand-blue)',
          fontSize:15, fontWeight:700,
          boxShadow:'0 8px 24px rgba(0,0,0,0.15)',
          transition:'all 140ms',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform='translateY(-1px)'; e.currentTarget.style.boxShadow='0 12px 32px rgba(0,0,0,0.20)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 8px 24px rgba(0,0,0,0.15)'; }}>
          Request a Demo
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </a>
      </div>
    </section>
  );
}

/* ─── App ─── */
function PricingApp() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.1 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <SiteNav />
      <main>
        <PricingHero />
        <PricingLogoCloud />
        <PlansSection />
        <PlanBreakdown />
        <PricingFAQ />
        <PricingCTA />
      </main>
      <SiteFooter />
    </>
  );
}

export default PricingApp;

