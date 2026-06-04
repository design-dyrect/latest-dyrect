'use client';
import React, { useState, useEffect, useRef } from 'react';

const snUE = useEffect;
const snUS = useState;
const snUR = useRef;

{
/* global React, Badge, CustomerProfileCard, TicketsCard, AnalyticsCard */
const { useEffect, useState, useRef } = React;

/* ───────────── Logo cloud ───────────── */
const CUSTOMER_LOGOS = [
  { name: 'Burton',         src: '/uploads/burton_snowboards_logo.jpeg', h: 36 },
  { name: 'Briggs & Riley', src: '/uploads/briggs-riley.jpeg',           h: 22 },
  { name: 'Dow',            src: '/uploads/dow-logo.png',                h: 30 },
  { name: 'JCB',            src: '/uploads/jcb-logo.png',                h: 32 },
  { name: 'Velotric',       src: '/uploads/velotric-logo.jpeg',          h: 22 },
  { name: 'Diggs',          src: '/uploads/diggs-pet-logo.png',          h: 30 },
  { name: 'Greens',         src: '/uploads/greens-tapware logo.png',     h: 34 },
  { name: 'GoMechanic',     src: '/uploads/go-mechanic-logo.png',        h: 26 },
  { name: 'R for Rabbit',   src: '/uploads/R_for_Rabbit_logo.png',       h: 36 },
  { name: "Neeman's",       src: '/uploads/neemans-logo.png',            h: 26 },
  { name: 'Clore Automotive', src: '/uploads/Clore-Automotive-Logo.png', h: 28 },
  { name: 'Aircon',         src: '/uploads/Aircon-logo.png',             h: 28 },
  { name: 'Keplin Group',   src: '/uploads/keplin logo.webp',            h: 30 },
  { name: 'Lacuna',         src: '/uploads/lacuna-logo.webp',            h: 26 },
];

function LogoCloud() {
  return (
    <section className="section-tight" style={{ background: 'white', borderBottom: '1px solid var(--border-default)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <p style={{
            fontSize: 13, fontWeight: 500, color: '#64748B',
            textTransform: 'uppercase', letterSpacing: 1.4, margin: 0,
          }}>Trusted by 500+ brands globally</p>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          rowGap: 40, columnGap: 24,
          alignItems: 'center', justifyItems: 'center',
        }} className="logo-grid">
          {CUSTOMER_LOGOS.map((l) => (
            <img key={l.name} src={l.src} alt={l.name}
              style={{
                height: l.h, maxWidth: 140, objectFit: 'contain',
                filter: 'grayscale(1)', opacity: 0.7,
                transition: 'all 220ms ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.filter = 'grayscale(0)'; e.currentTarget.style.opacity = 1; }}
              onMouseLeave={(e) => { e.currentTarget.style.filter = 'grayscale(1)'; e.currentTarget.style.opacity = 0.7; }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Platform — scroll-driven Before / After ─────────────
   A tall section (~3.5× viewport) with a sticky inner stage. As the user
   scrolls, a 0→1 progress drives:
     • background morph: white → navy
     • headline + eyebrow swap (BEFORE DYRECT → AFTER DYRECT)
     • scattered "tools" cards on the right consolidate into a unified
       Dyrect warranty workspace
     • numbered bullets cross-fade between problem list and outcome list
   ─────────────────────────────────────────────────────────────────── */
function PlatformOverview() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = rect.height - vh;
        const scrolled = -rect.top;
        let p = scrolled / total;
        p = Math.max(0, Math.min(1, p));
        setProgress(p);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const p = progress;
  const morph = Math.max(0, Math.min(1, (p - 0.20) / 0.35));
  const afterAmt = Math.max(0, Math.min(1, (p - 0.45) / 0.30));

  const bgMix = (t) => {
    const lerp = (a, b) => Math.round(a + (b - a) * t);
    const r = lerp(248, 11);
    const g = lerp(250, 18);
    const b = lerp(252, 64);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const beforeCards = [
    { key: 'spreadsheet', title: 'Spreadsheet',  body: 'Warranty records tracked manually by product and customer.',
      from: { x: 8,  y: 6,   rot: -3 }, to: { col: 0, row: 0 } },
    { key: 'inbox',       title: 'Support inbox', body: 'Claim requests mixed with regular customer tickets.',
      from: { x: 58, y: 14,  rot: 4  }, to: { col: 1, row: 0 } },
    { key: 'claimform',   title: 'Claim form',    body: 'Proof upload, serial checks, and status updates handled separately.',
      from: { x: 14, y: 56,  rot: 5  }, to: { col: 0, row: 1 } },
    { key: 'analytics',   title: 'Analytics',     body: 'Reports assembled late from disconnected sources.',
      from: { x: 62, y: 64,  rot: -4 }, to: { col: 1, row: 1 } },
  ];

  const textPrimary = afterAmt > 0.5 ? '#FFFFFF' : '#0F172A';
  const textSecondary = afterAmt > 0.5 ? 'rgba(255,255,255,0.7)' : '#475569';
  const stageBg = bgMix(p);

  return (
    <section ref={sectionRef} id="platform" style={{
      position: 'relative',
      height: '350vh',
      background: 'white',
    }}>
      <div style={{
        position: 'sticky', top: 0,
        height: '100vh',
        minHeight: 860,
        background: stageBg,
        transition: 'background 200ms linear',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }}>
        <div aria-hidden style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: 'var(--color-slate-200)',
        }}>
          <div style={{
            height: '100%', width: `${p * 100}%`,
            background: 'var(--color-brand-blue)',
            transition: 'width 80ms linear',
          }} />
        </div>

        <div className="container" style={{
          paddingTop: 56, paddingBottom: 20,
          opacity: Math.max(0, 1 - p * 4),
          transition: 'opacity 200ms linear',
        }}>
          <div style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto' }}>
            <p className="eyebrow">Platform</p>
            <h2 className="section-title" style={{ marginTop: 10 }}>
              All-in-one warranty management. <span className="em">Seamless</span> for your team. <span className="em">Effortless</span> for your customers.
            </h2>
            <p className="section-sub" style={{ marginTop: 12 }}>
              Registration, claims, service, protection plans, and analytics no longer need separate tools. Scroll to see the shift.
            </p>
          </div>
        </div>

        <div className="container" style={{
          flex: 1, display: 'grid',
          gridTemplateColumns: '1fr 1.15fr',
          gap: 48, alignItems: 'center',
          paddingBottom: 140,
          position: 'relative',
        }}>
          <PlatformLeft p={p} morph={morph} afterAmt={afterAmt}
            textPrimary={textPrimary} textSecondary={textSecondary} />

          <PlatformRight cards={beforeCards} morph={morph} afterAmt={afterAmt}
            textPrimary={textPrimary} textSecondary={textSecondary} />

          <div style={{
            position: 'absolute', left: '50%', bottom: -32, transform: 'translateX(-50%)',
            display: 'flex', gap: 8, zIndex: 5,
          }}>
            {[0, 1, 2].map((i) => {
              const active = (i === 0 && p < 0.33) || (i === 1 && p >= 0.33 && p < 0.66) || (i === 2 && p >= 0.66);
              return (
                <span key={i} style={{
                  width: active ? 22 : 6, height: 6, borderRadius: 999,
                  background: active
                    ? (afterAmt > 0.5 ? 'white' : 'var(--color-brand-blue)')
                    : (afterAmt > 0.5 ? 'rgba(255,255,255,0.3)' : 'var(--color-slate-300)'),
                  transition: 'all 240ms ease',
                }} />
              );
            })}
          </div>
        </div>

        <div aria-hidden style={{
          position: 'absolute', right: 32, top: '50%', transform: 'translateY(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          color: '#94A3B8', fontSize: 10, fontWeight: 600, letterSpacing: 1.4, textTransform: 'uppercase',
          opacity: p > 0.05 ? 0 : 1, transition: 'opacity 240ms ease',
          pointerEvents: 'none',
        }}>
          Scroll
          <svg width="14" height="22" viewBox="0 0 24 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="2" width="12" height="20" rx="6"/>
            <line x1="12" y1="7" x2="12" y2="11">
              <animate attributeName="y1" values="7;11;7" dur="1.4s" repeatCount="indefinite"/>
              <animate attributeName="y2" values="11;15;11" dur="1.4s" repeatCount="indefinite"/>
            </line>
          </svg>
        </div>
      </div>
    </section>
  );
}

function PlatformLeft({ p, morph, afterAmt, textPrimary, textSecondary }) {
  const showAfter = afterAmt > 0.5;
  const pillBg = showAfter ? 'rgba(36,55,246,0.85)' : 'var(--color-warning-subtle)';
  const pillFg = showAfter ? 'white' : 'var(--color-warning-text)';
  const pillDot = showAfter ? '#A4AFFE' : 'var(--color-warning)';

  const beforeBullets = [
    'Manual registration records and fragmented customer data',
    'Claims validated through repeated back-and-forth conversations',
    'Limited visibility into product, ownership, service',
    'After-sales costs add up with no return',
  ];
  const afterBullets = [
    'Every product owner, warranty card, and claim record connected',
    'Teams validate, assign, track, and resolve from one workspace',
    'Analytics reveal defect trends, registration sources, ROI',
    'Each interaction becomes a revenue touchpoint',
  ];
  const bullets = showAfter ? afterBullets : beforeBullets;

  return (
    <div style={{ position: 'relative', zIndex: 2 }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '6px 14px 6px 12px',
        borderRadius: 999,
        background: pillBg, color: pillFg,
        fontSize: 11.5, fontWeight: 600, letterSpacing: 1.4, textTransform: 'uppercase',
        transition: 'all 300ms ease',
      }}>
        <span style={{ width: 7, height: 7, borderRadius: 999, background: pillDot }} />
        {showAfter ? 'After Dyrect' : 'Before Dyrect'}
      </div>

      <div style={{ position: 'relative', marginTop: 22, minHeight: 168 }}>
        <h3 style={{
          position: 'absolute', inset: 0, margin: 0,
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 'clamp(34px, 4.2vw, 56px)',
          lineHeight: 1.04, letterSpacing: '-1.5px',
          color: textPrimary,
          opacity: 1 - afterAmt,
          transform: `translateY(${afterAmt * -10}px)`,
          transition: 'color 300ms ease',
        }}>
          Disconnected warranty operations
        </h3>
        <h3 style={{
          position: 'absolute', inset: 0, margin: 0,
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 'clamp(34px, 4.2vw, 56px)',
          lineHeight: 1.04, letterSpacing: '-1.5px',
          color: textPrimary,
          opacity: afterAmt,
          transform: `translateY(${(1 - afterAmt) * 10}px)`,
          transition: 'color 300ms ease',
        }}>
          One connected warranty lifecycle
        </h3>
      </div>

      <p style={{
        fontSize: 16, lineHeight: 1.55, color: textSecondary,
        marginTop: 18, maxWidth: 440,
        minHeight: 76,
        transition: 'color 300ms ease',
      }}>
        {showAfter
          ? 'Registration, claims, service tracking, customer ownership, protection plans, and analytics operate from one brand-owned warranty system.'
          : 'Product records, claim requests, service conversations, customer data, and warranty proof live across sheets, forms, inboxes, and separate tools.'}
      </p>

      <ol style={{
        listStyle: 'none', padding: 0, margin: '24px 0 0',
        display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        {bullets.map((b, i) => (
          <li key={i} style={{
            display: 'flex', gap: 14, alignItems: 'flex-start',
            opacity: 1, transform: 'translateY(0)',
            transition: `opacity 360ms ease ${i * 60}ms`,
          }}>
            <span style={{
              width: 22, height: 22, borderRadius: 999,
              background: showAfter ? 'var(--color-brand-blue)' : 'var(--color-warning-subtle)',
              color: showAfter ? 'white' : 'var(--color-warning-text)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700,
              flexShrink: 0, marginTop: 1,
            }}>{i + 1}</span>
            <span style={{
              color: textPrimary, fontSize: 15, fontWeight: 500, lineHeight: 1.4,
              maxWidth: 420,
              transition: 'color 300ms ease',
            }}>{b}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function PlatformRight({ cards, morph, afterAmt, textPrimary, textSecondary }) {
  const STAGE_W = 600, STAGE_H = 600;
  const GRID_GAP = 16;
  const SLOT_W = (STAGE_W - GRID_GAP) / 2;
  const SLOT_H = (STAGE_H - GRID_GAP) / 2;

  return (
    <div style={{
      position: 'relative',
      width: '100%', maxWidth: STAGE_W,
      marginLeft: 'auto',
      height: STAGE_H,
      zIndex: 1,
    }}>
      <svg style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        opacity: Math.max(0, 1 - morph * 2.5),
        transition: 'opacity 300ms ease',
      }} viewBox={`0 0 ${STAGE_W} ${STAGE_H}`} preserveAspectRatio="none">
        <path d="M 80 80 C 200 200, 260 120, 380 260"  stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
        <path d="M 420 80 C 320 220, 180 220, 120 360" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
        <path d="M 100 360 C 220 280, 340 320, 460 360" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
      </svg>

      {cards.map((c, i) => {
        const fromX = (c.from.x / 100) * STAGE_W;
        const fromY = (c.from.y / 100) * STAGE_H;
        const toX = c.to.col * (SLOT_W + GRID_GAP);
        const toY = c.to.row * (SLOT_H + GRID_GAP);
        const x = fromX + (toX - fromX) * morph;
        const y = fromY + (toY - fromY) * morph;
        const rot = c.from.rot * (1 - morph);
        const w = 260 + (SLOT_W - 260) * morph;
        const h = 150 + (SLOT_H - 150) * morph;
        const fade = afterAmt > 0 ? 1 - afterAmt : 1;
        return (
          <ToolCard key={c.key}
            x={x} y={y} w={w} h={h} rot={rot}
            morph={morph} opacity={fade}
            title={c.title} body={c.body} />
        );
      })}

      <div style={{
        position: 'absolute', inset: 0,
        opacity: afterAmt,
        transform: `translateY(${(1 - afterAmt) * 20}px)`,
        transition: 'opacity 360ms ease, transform 480ms cubic-bezier(.16,.84,.44,1)',
        pointerEvents: afterAmt < 0.5 ? 'none' : 'auto',
        background: 'white',
        borderRadius: 14,
        border: '1px solid rgba(255,255,255,0.10)',
        boxShadow: '0 24px 60px -12px rgba(0,0,0,0.45)',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-default)',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>Dyrect warranty workspace</div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
              Registrations · claims · service · owners · plans · analytics
            </div>
          </div>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '5px 12px', borderRadius: 999,
            background: 'var(--color-brand-blue-subtle)',
            color: 'var(--color-brand-blue-deep)',
            fontSize: 11.5, fontWeight: 600,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--color-success)' }} />
            Synced
          </span>
        </div>
        <div style={{
          flex: 1, padding: 18,
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14,
          gridTemplateRows: 'auto 1fr auto',
        }}>
          <div style={{ background: '#F8FAFC', border: '1px solid var(--border-default)', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500 }}>Registered products</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: '#0F172A', marginTop: 6, letterSpacing: '-0.7px' }}>48,291</div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 6, lineHeight: 1.4 }}>QR, Shopify, website, portal — all mapped to owners</div>
          </div>
          <div style={{ background: '#F8FAFC', border: '1px solid var(--border-default)', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500 }}>Claims in progress</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: '#0F172A', marginTop: 6, letterSpacing: '-0.7px' }}>284</div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 6, lineHeight: 1.4 }}>Validated by warranty terms, proof, and serial rules</div>
          </div>
          <div style={{ gridColumn: '1 / -1', background: '#F8FAFC', border: '1px solid var(--border-default)', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
              <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500 }}>Service workflow · Claim status</div>
              <span style={{ fontSize: 11, color: '#64748B', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--color-success)' }} />
                Live
              </span>
            </div>
            <div>
              {[
                { id: 'CLM-2041', desc: 'Replacement approved',   state: 'Ready',    tone: 'success' },
                { id: 'CLM-2042', desc: 'Repair center assigned', state: 'Assigned', tone: 'success' },
                { id: 'CLM-2043', desc: 'Customer notified',      state: 'Sent',     tone: 'success' },
              ].map((row, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 0',
                  borderTop: i === 0 ? 'none' : '1px solid var(--color-slate-100)',
                }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#475569', fontWeight: 500, width: 78 }}>{row.id}</span>
                  <span style={{ fontSize: 13, color: '#1E293B', flex: 1 }}>{row.desc}</span>
                  <Badge tone={row.tone}>{row.state}</Badge>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: '#F8FAFC', border: '1px solid var(--border-default)', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500 }}>Owner portal logins</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: '#0F172A', marginTop: 6, letterSpacing: '-0.7px' }}>9,142</div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 6, lineHeight: 1.4 }}>Self-serve warranty cards, claims, and repair tracking</div>
          </div>
          <div style={{ background: '#F8FAFC', border: '1px solid var(--border-default)', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500 }}>Revenue opportunity</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.7px' }}>$48,210</span>
              <span style={{ fontSize: 12, color: 'var(--color-success-text)', fontWeight: 600 }}>+42%</span>
            </div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 6, lineHeight: 1.4 }}>Protection plans, accessories, and renewals this month</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolCard({ x, y, w, h, rot, morph, opacity, title, body }) {
  return (
    <div style={{
      position: 'absolute', left: 0, top: 0,
      transform: `translate(${x}px, ${y}px) rotate(${rot}deg)`,
      width: w, height: h,
      background: 'white',
      border: '1px solid var(--border-default)',
      borderRadius: 12,
      boxShadow: '0 10px 30px -8px rgba(15,23,42,0.18), 0 4px 12px -2px rgba(15,23,42,0.06)',
      padding: '14px 16px',
      transition: 'transform 120ms linear, opacity 240ms ease',
      opacity,
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ fontSize: 13.5, fontWeight: 700, color: '#0F172A' }}>{title}</div>
      <div style={{ fontSize: 12.5, color: '#475569', marginTop: 5, lineHeight: 1.4, maxWidth: 320 }}>{body}</div>
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 5, paddingTop: 12 }}>
        <span style={{ height: 6, borderRadius: 3, background: 'var(--color-slate-100)', width: '92%' }} />
        <span style={{ height: 6, borderRadius: 3, background: 'var(--color-slate-100)', width: '74%' }} />
        <span style={{ height: 6, borderRadius: 3, background: 'var(--color-slate-100)', width: '56%' }} />
      </div>
    </div>
  );
}
/* ───────────── Products — 4 tabbed pillars ───────────── */
const PRODUCTS = [
  {
    key: 'registration',
    eyebrow: 'Product Registration & Upsell',
    title: 'Turn every buyer into a',
    titleEm: 'reachable customer',
    body: 'Stop losing customers to marketplaces and offline retail. Dyrect collects first-party data at the point of registration so every buyer becomes a direct contact the team can reach, retain, and sell to again.',
    bullets: [
      { t: 'Omnichannel registration', d: 'QR code on packaging, website link, and automatic registration for Shopify orders.', Preview: window.OmnichannelMock || (() => null) },
      { t: 'Digital warranty',         d: 'Digital warranty card and a self-serve customer portal — no more paper.',           Preview: window.DigitalWarrantyMock || (() => null) },
      { t: 'Post-registration upsells',d: 'Trigger upsell offers at the exact moment a customer completes registration.',     Preview: window.PostRegUpsellMock || (() => null) },
    ],
    cta: 'Create omnichannel registration',
  },
  {
    key: 'claims',
    eyebrow: 'Claims & Service Management',
    title: 'Every claim logged, assigned, and',
    titleEm: 'resolved with full visibility',
    body: 'Claims arrive from every direction and service work expands with every unresolved request. Dyrect organizes claim intake, validation, assignment, and resolution with clear ownership end-to-end.',
    bullets: [
      { t: 'Serial number validation', d: 'Catch fraudulent and duplicate claims before they are processed.',                  Preview: window.SerialValidationMock || (() => null) },
      { t: 'Smart ticket routing',     d: 'Automatic assignment with priority levels and real-time status tracking.',          Preview: window.TicketRoutingMock || (() => null) },
      { t: 'Service workflow tracking',d: 'Repair, replacement, shipment, dealer payment, and OEM chargeback in one workflow.',Preview: window.WorkflowMock || (() => null) },
    ],
    cta: 'Streamline your claims process',
  },
  {
    key: 'warranties',
    eyebrow: 'Extended Warranties',
    title: 'Offer protection plans across more touchpoints.',
    titleEm: 'Keep 100% of revenue in-house.',
    body: "Don't leave extended warranty revenue to third parties. Dyrect lets brands sell protection plans directly, at the moment customers are most likely to buy — on the product page or after purchase.",
    bullets: [
      { t: 'Multi-touchpoint offers',    d: 'Product page, checkout, post-purchase, and inside the registration flow.', Preview: window.MultiTouchpointMock || (() => null) },
      { t: 'Native ecommerce',           d: 'Connect natively with Shopify and other ecommerce platforms.',             Preview: window.NativeEcommerceMock || (() => null) },
      { t: 'Self-serve plan management', d: 'Customers activate, view, and renew plans from a self-serve portal.',      Preview: window.SelfServePlansMock || (() => null) },
    ],
    cta: 'Explore extended warranties',
  },
  {
    key: 'analytics',
    eyebrow: 'Insights & Analytics',
    title: 'Complete picture of your warranty operation in',
    titleEm: 'one dashboard',
    body: 'Know exactly where claims come from, which products fail most, how fast the team resolves tickets, and where revenue opportunities are being missed — all in one dashboard, updated in real time.',
    bullets: [
      { t: 'Warranty performance',         d: 'Track registration rates, claim volumes, and resolution times across every product.', Preview: window.PerformanceMock  || (() => null) },
      { t: 'Defect trend detection',       d: 'Identify high-defect products before they become a cost problem.',                    Preview: window.DefectTrendMock  || (() => null) },
      { t: 'Revenue opportunity insights', d: 'Spot upsell opportunities based on warranty expiry and customer activity.',           Preview: window.RevenueOppMock   || (() => null) },
    ],
    cta: 'Explore analytics',
  },
];

function Products() {
  const [tab, setTab] = useState(0);
  const [featIdx, setFeatIdx] = useState(0);
  // Reset feature when product tab changes
  useEffect(() => { setFeatIdx(0); }, [tab]);
  const p = PRODUCTS[tab];
  const active = p.bullets[featIdx];
  const PreviewComp = active.Preview;
  return (
    <section className="section" id="products" style={{ background: '#F8FAFC' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 900, margin: '0 auto' }} className="reveal">
          <p className="eyebrow">Products</p>
          <h2 className="section-title" style={{ marginTop: 12 }}>
            The only warranty management system built for the <span className="em">full post-sale journey</span>
          </h2>
          <p className="section-sub">
            Most warranty tools solve one part of the problem. Dyrect covers the entire journey, from the moment a product is registered to the day a claim is resolved and every service interaction in between.
          </p>
        </div>

        {/* tabs */}
        <div className="product-tabs" style={{
          display: 'flex', gap: 6, marginTop: 48, padding: 6,
          background: 'white', borderRadius: 12,
          border: '1px solid var(--border-default)',
          boxShadow: 'var(--shadow-sm)',
          maxWidth: 920, margin: '48px auto 0',
          overflowX: 'auto',
        }}>
          {PRODUCTS.map((pp, i) => (
            <button key={pp.key} onClick={() => setTab(i)}
              style={{
                flex: 1, padding: '12px 16px', borderRadius: 8,
                fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500,
                background: tab === i ? 'var(--color-brand-blue)' : 'transparent',
                color: tab === i ? 'white' : '#475569',
                transition: 'all 220ms ease',
                whiteSpace: 'nowrap',
                textAlign: 'left',
                display: 'flex', alignItems: 'center', gap: 10,
                cursor: 'pointer',
              }}>
              <span style={{
                width: 22, height: 22, borderRadius: 6,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                background: tab === i ? 'rgba(255,255,255,0.18)' : 'var(--color-slate-100)',
                color: tab === i ? 'white' : 'var(--color-brand-blue)',
                fontSize: 11, fontWeight: 600,
              }}>{i + 1}</span>
              {pp.eyebrow.split('&')[0].trim()}
            </button>
          ))}
        </div>

        {/* tab content */}
        <div style={{
          marginTop: 36,
          background: 'white',
          border: '1px solid var(--border-default)',
          borderRadius: 16,
          boxShadow: 'var(--shadow-lg)',
          padding: 'clamp(28px, 4vw, 56px)',
          display: 'grid', gridTemplateColumns: '1fr 460px',
          gap: 56, alignItems: 'center',
        }} className="product-tab-content">
          <div>
            <p className="eyebrow">{p.eyebrow}</p>
            <h3 style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'clamp(24px, 2.6vw, 32px)', lineHeight: 1.15,
              letterSpacing: '-0.8px', marginTop: 14, marginBottom: 16, color: '#0F172A',
            }}>
              {p.title} <span className="em">{p.titleEm}</span>
            </h3>
            <p style={{ color: 'var(--fg-secondary)', fontSize: 16, lineHeight: 1.55, margin: 0 }}>{p.body}</p>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: 28, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {p.bullets.map((b, i) => {
                const selected = featIdx === i;
                return (
                  <li key={i}>
                    <button onClick={() => setFeatIdx(i)} style={{
                      width: '100%', textAlign: 'left',
                      display: 'flex', gap: 14, alignItems: 'flex-start',
                      padding: '12px 14px',
                      borderRadius: 10,
                      background: selected ? 'var(--color-brand-blue-subtle)' : 'transparent',
                      border: `1px solid ${selected ? 'color-mix(in srgb, var(--color-brand-blue) 25%, transparent)' : 'transparent'}`,
                      transition: 'all 200ms ease',
                      cursor: 'pointer',
                      position: 'relative',
                    }}>
                      <span style={{
                        width: 24, height: 24, borderRadius: 6,
                        background: selected ? 'var(--color-brand-blue)' : 'var(--color-brand-blue-subtle)',
                        color: selected ? 'white' : 'var(--color-brand-blue)',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, marginTop: 1,
                        transition: 'all 200ms ease',
                      }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                      </span>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          display: 'flex', alignItems: 'center', gap: 8,
                          fontWeight: 600, color: selected ? 'var(--color-brand-blue-deep)' : '#0F172A',
                          fontSize: 15,
                        }}>
                          {b.t}
                          {selected && (
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                          )}
                        </div>
                        <div style={{ color: '#475569', fontSize: 14, marginTop: 2 }}>{b.d}</div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
            <a href="#demo" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              marginTop: 28, color: 'var(--color-brand-blue)',
              fontWeight: 500, fontSize: 15,
              paddingLeft: 14,
            }}>
              {p.cta}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', minHeight: 480, position: 'relative' }}>
            {p.bullets.map((b, i) => {
              const Comp = b.Preview;
              const show = featIdx === i;
              return (
                <div key={i} style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
                  opacity: show ? 1 : 0,
                  transform: show ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(10px)',
                  transition: 'opacity 380ms ease, transform 500ms cubic-bezier(.16,.84,.44,1)',
                  pointerEvents: show ? 'auto' : 'none',
                }}>
                  <Comp active={show} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Persona / "Whoever owns the post-sale problem" ───────────── */
function Personas() {
  const [tab, setTab] = useState(0);
  const personas = [
    {
      role: 'Marketer',
      title: 'You have thousands of buyers',
      titleEm: 'you cannot reach',
      body: 'Every product sold through Amazon, offline retail, or a distributor is a customer your brand has no record of. No email, no phone number, no purchase history. Dyrect captures first-party data at the point of product registration so every buyer becomes a direct contact you own, regardless of where they purchased.',
      bullets: ['First-party data on every buyer', 'Trigger upsells at registration', 'Sync to Klaviyo, Mailchimp, HubSpot'],
      Visual: window.MarketerAudienceMock,
    },
    {
      role: 'Warranty manager',
      title: 'Your claims process was',
      titleEm: 'not built to scale',
      body: 'Claims come in through email, WhatsApp, and phone calls. Each one gets logged manually, followed up individually, and resolved slowly. Dyrect replaces that with a structured system where every claim is validated against a serial number, assigned to the right person, tracked in real time, and closed without manual chasing.',
      bullets: ['Serial-number validation', 'Smart assignment to dealers', 'Repair + chargeback in one workflow'],
      Visual: window.WarrantyInboxMock,
    },
    {
      role: 'Business owner',
      title: 'Your after-sales operation',
      titleEm: 'costs money and earns none',
      body: 'Every warranty claim your team resolves is an expense with no return. Dyrect turns each service interaction into a revenue touchpoint by surfacing extended warranty plans and upsell offers at the right moment, so the same operation that was draining margin starts generating it.',
      bullets: ['100% in-house extended warranties', '3x higher attach rate (avg.)', 'P&L visibility on every claim'],
      Visual: window.BusinessOwnerPLMock,
    },
  ];
  const p = personas[tab];
  const Visual = p.Visual;
  return (
    <section className="section" style={{ background: '#0F172A', color: 'white', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{
        position: 'absolute', top: '-10%', right: '-10%',
        width: 600, height: 600,
        background: 'radial-gradient(closest-side, rgba(36,55,246,0.45), transparent 70%)',
        filter: 'blur(40px)',
      }} />
      <div className="container" style={{ position: 'relative' }}>
        <div style={{ textAlign: 'center', maxWidth: 900, margin: '0 auto' }} className="reveal">
          <p className="eyebrow" style={{ color: '#7E8DFE' }}>Customer profile</p>
          <h2 className="section-title" style={{ marginTop: 12, color: 'white' }}>
            Whoever owns the post-sale problem, <span className="em" style={{ color: '#A4AFFE' }}>Dyrect solves it</span>.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 17, lineHeight: 1.55, maxWidth: 720, margin: '16px auto 0' }}>
            No first-party data. Slow claims processing. After-sales service that costs more than it earns. These are not separate problems — they are the same broken post-sale operation hitting three different teams. Dyrect fixes the whole thing.
          </p>
        </div>

        {/* role tabs */}
        <div style={{
          display: 'flex', gap: 8, justifyContent: 'center',
          marginTop: 40, flexWrap: 'wrap',
        }}>
          {personas.map((pp, i) => (
            <button key={pp.role} onClick={() => setTab(i)} style={{
              padding: '10px 18px', borderRadius: 999,
              fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500,
              background: tab === i ? 'white' : 'transparent',
              color: tab === i ? '#0F172A' : 'rgba(255,255,255,0.75)',
              border: tab === i ? '1px solid white' : '1px solid rgba(255,255,255,0.18)',
              transition: 'all 220ms ease',
            }}>{pp.role}</button>
          ))}
        </div>

        <div style={{
          marginTop: 44, display: 'grid', gridTemplateColumns: '1fr 440px',
          gap: 56, alignItems: 'center',
        }} className="product-tab-content">
          <div>
            <h3 style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'clamp(22px, 2.2vw, 30px)', lineHeight: 1.2,
              letterSpacing: '-0.6px', margin: 0, color: 'white',
            }}>{p.title} <span className="em" style={{ color: '#A4AFFE' }}>{p.titleEm}</span></h3>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 16, lineHeight: 1.6, marginTop: 16 }}>{p.body}</p>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {p.bullets.map((b, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', color: 'rgba(255,255,255,0.9)', fontSize: 15 }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: 999,
                    background: 'rgba(36,55,246,0.25)',
                    color: '#A4AFFE',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <a href="#demo" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              marginTop: 28, color: '#A4AFFE',
              fontWeight: 500, fontSize: 15,
            }}>
              Learn more
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Visual active={true} />
          </div>
        </div>
      </div>
    </section>
  );
}

if (typeof window !== 'undefined') { Object.assign(window, { LogoCloud, PlatformOverview, Products, Personas }); }

}

{

const { useEffect, useState, useRef } = React;

/* ───────────── Capabilities Grid ───────────── */
const DEFAULT_CAPS = {
  eyebrow: 'Capabilities',
  title: 'Everything you need to run warranty operations, built in',
  subtitle: 'No add-ons, no third-party tools stitched together. Every feature needed to run a complete warranty operation comes built into Dyrect.',
  items: [
    { icon: 'card',        t: 'Digital warranty cards', d: 'Replace paper cards with digital warranty records linked to the product and purchase details.' },
    { icon: 'scan',        t: 'Serial number validation', d: 'Check product authenticity and warranty eligibility before service activity moves ahead.' },
    { icon: 'form',        t: 'Custom forms and policies', d: 'Set up registration fields, claim forms, and warranty rules for different products and categories.' },
    { icon: 'portal',      t: 'Self-serve warranty portal', d: 'Give buyers a clear place to view product details, warranty status, and service activity.' },
    { icon: 'palette',     t: 'White-label experience', d: "Registration pages and customer comms carry the brand's logo, colors, and tone. Not a third-party tool." },
    { icon: 'users',       t: 'Team workspaces', d: 'Keep claim ownership, notes, assignments, and service actions organized across internal teams.' },
    { icon: 'qr-code',     t: 'QR codes on packaging', d: 'Generate per-SKU QR codes so customers register their purchase in seconds, from anywhere.' },
    { icon: 'truck',       t: 'Shipment + dealer payouts', d: 'Track every shipment, repair, replacement, and dealer reimbursement in a single workflow.' },
  ],
};
function Capabilities({ items, eyebrow, title, subtitle, cols }) {
  const it = items    || DEFAULT_CAPS.items;
  const eb = eyebrow  || DEFAULT_CAPS.eyebrow;
  const tt = title    || DEFAULT_CAPS.title;
  const sb = subtitle || DEFAULT_CAPS.subtitle;
  const ncols = cols || (it.length >= 8 ? 4 : it.length >= 6 ? 3 : 2);
  const Icon = ({ name }) => {
    const paths = {
      'card':        <><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 14.5h4"/></>,
      'qr-code':     <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v3M14 21h3M21 17v4h-4"/></>,
      'form':        <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/></>,
      'portal':      <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 13.5h4M7 16.5h7"/></>,
      'palette':     <><circle cx="13.5" cy="6.5" r="0.6" fill="currentColor" stroke="none"/><circle cx="17" cy="10" r="0.6" fill="currentColor" stroke="none"/><circle cx="8.5" cy="7" r="0.6" fill="currentColor" stroke="none"/><circle cx="6.5" cy="11.5" r="0.6" fill="currentColor" stroke="none"/><path d="M12 2a10 10 0 1 0 0 20 2.5 2.5 0 0 0 2.5-2.5c0-.6-.2-1.1-.6-1.5-.4-.4-.6-.9-.6-1.5a2.5 2.5 0 0 1 2.5-2.5H19a3 3 0 0 0 3-3 9 9 0 0 0-10-9z"/></>,
      'plug':        <><path d="M9 2v6M15 2v6"/><path d="M5 8h14v3a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5z"/><path d="M12 16v6"/></>,
      'scan':        <><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 8v8M10.5 8v8M14 8v8M17 8v8"/></>,
      'ticket':      <><path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z"/><path d="M13 7v2M13 13v2"/></>,
      'truck':       <><path d="M5 18H3V6h13v12h-5M15 9h4l3 4v5h-3"/><circle cx="7.5" cy="18.5" r="2.5"/><circle cx="17.5" cy="18.5" r="2.5"/></>,
      'users':       <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
      'gauge':       <><path d="M3.5 19a10 10 0 1 1 17 0"/><path d="M12 14 9 11"/><circle cx="12" cy="14" r="1.4" fill="currentColor" stroke="none"/></>,
      'chart-bar':   <><path d="M3 3v18h18"/><rect x="7" y="11" width="3" height="6" rx="0.5"/><rect x="12" y="7" width="3" height="10" rx="0.5"/><rect x="17" y="13" width="3" height="4" rx="0.5"/></>,
      'tag':         <><path d="M20.6 13.4 12 22l-9-9V4a1 1 0 0 1 1-1h8z"/><circle cx="7.5" cy="7.5" r="1.5"/></>,
      'trend':       <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
      'shield-check':<><path d="M12 2 4 5v6c0 5 3.4 9.6 8 11 4.6-1.4 8-6 8-11V5z"/><path d="m9 12 2 2 4-4"/></>,
      'wallet':      <><path d="M3 7a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v2"/><path d="M3 7v10a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1v-3"/><path d="M21 11h-5a2 2 0 0 0 0 4h5a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1z"/></>,
      'refresh':     <><path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"/></>,
      'route':       <><circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M9 19h6a4 4 0 0 0 0-8H9a4 4 0 0 1 0-8h6"/></>,
      /* legacy aliases (kept so older references still resolve) */
      'badge-check': <><path d="M12 2 4 5v6c0 5 3.4 9.6 8 11 4.6-1.4 8-6 8-11V5z"/><path d="m9 12 2 2 4-4"/></>,
      'fingerprint': <><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 8v8M10.5 8v8M14 8v8M17 8v8"/></>,
      'sliders':     <><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></>,
      'user-cog':    <><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4"/><circle cx="17" cy="17" r="3"/><path d="m21 17-1.9-1.1M14 17l-1.9 1.1M17 14v-1M17 21v-1M14.1 18.9l-.6.4M20.9 15l-.6.4M14 14l1.9 1.1M20.6 18.9l-.6-.4"/></>,
    };
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        {paths[name]}
      </svg>
    );
  };

  return (
    <section className="section" id="capabilities" style={{ background: 'white' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto' }}>
          <p className="eyebrow">{eb}</p>
          <h2 className="section-title" style={{ marginTop: 12 }}>
            {tt}
          </h2>
          <p className="section-sub">
            {sb}
          </p>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: `repeat(${ncols}, 1fr)`,
          gap: 20, marginTop: 56,
        }} className="cap-grid">
          {it.map((it, i) => (
            <div key={i} style={{
              padding: 24,
              background: 'var(--color-slate-50)',
              border: '1px solid var(--border-default)',
              borderRadius: 12,
              transition: 'all 200ms ease',
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.borderColor = 'var(--color-brand-blue)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--color-slate-50)';
              e.currentTarget.style.borderColor = 'var(--border-default)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: 'white',
                border: '1px solid var(--border-default)',
                color: 'var(--color-brand-blue)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 16,
              }}>
                <Icon name={it.icon} />
              </div>
              <div style={{ fontWeight: 600, fontSize: 15, color: '#0F172A', marginBottom: 6 }}>{it.t}</div>
              <div style={{ fontSize: 14, color: '#475569', lineHeight: 1.55 }}>{it.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Stats ───────────── */
const DEFAULT_STATS = [
  { value: '4M+',   label: 'Customers served',     sub: 'across registrations and claims' },
  { value: '500+',  label: 'Brands running on Dyrect', sub: 'DTC, retail, and manufacturers' },
  { value: '3×',    label: 'Higher attach rate',   sub: 'on extended warranty programs' },
  { value: '<30m',  label: 'Time to go live',      sub: 'with the Shopify app' },
];
function Stats({ stats }) {
  const data = stats || DEFAULT_STATS;
  const cols = data.length;
  return (
    <section className="section-tight" style={{
      background: 'linear-gradient(180deg, #0F172A 0%, #1A23A8 100%)',
      color: 'white', position: 'relative', overflow: 'hidden',
    }}>
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '56px 56px',
        maskImage: 'radial-gradient(closest-side, black 30%, transparent 80%)',
      }} />
      <div className="container" style={{ position: 'relative' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'stretch',
          gap: 32,
        }} className="stats-grid">
          {data.map((s, i) => (
            <div key={i} style={{
              flex: '1 1 0', minWidth: 0,
              borderLeft: '1px solid rgba(255,255,255,0.15)',
              paddingLeft: 24,
            }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontWeight: 600,
                fontSize: 'clamp(40px, 5vw, 56px)', lineHeight: 1, letterSpacing: '-2px',
                color: 'white',
              }}>{s.value}</div>
              <div style={{ marginTop: 10, fontSize: 15, fontWeight: 500, color: 'white' }}>{s.label}</div>
              <div style={{ marginTop: 4, fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Testimonials ───────────── */
const DEFAULT_TESTIMONIALS = {
  eyebrow: 'Testimonials',
  title: 'Real results from brands running on Dyrect',
  quotes: [
    {
      q: "The platform is easy to use and makes processing warranty tickets smooth and efficient. It's been a huge time-saver for our team, especially with the automated email notifications that keep our customers informed throughout the process. We've encountered a few technical difficulties along the way, but their support team has always been quick, responsive, and effective in resolving any issues. Overall, Dyrect has been a valuable tool in helping us streamline our warranty operations and improve customer satisfaction.",
      brand: 'Diggs', region: 'United States',
    },
    {
      q: "This is exactly what we were looking for in terms of having a professional platform for a good price for customers to claim their warranty. It's really easy to set up, great to keep track of all customers on the backend, and no extra work is necessary for automated emails to go out once a customer registers their warranty. Really appreciate the Dyrect team setting up time with us to help with all the questions we had.",
      brand: 'Unico', region: 'United States',
    },
    {
      q: 'We were looking for a technically strong warranty claims management software solution, and Dyrect certainly stood up to our requirements. It eased consumer interactions and automated the warranty claims process.',
      brand: 'Flo Mattress', region: 'India',
    },
  ],
};
function Testimonials({ eyebrow, title, quotes }) {
  const eb = eyebrow || DEFAULT_TESTIMONIALS.eyebrow;
  const tt = title   || DEFAULT_TESTIMONIALS.title;
  const qs = quotes  || DEFAULT_TESTIMONIALS.quotes;
  return (
    <section className="section" style={{ background: 'white' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 820, margin: '0 auto 48px' }}>
          <p className="eyebrow">{eb}</p>
          <h2 className="section-title" style={{ marginTop: 12 }}>
            {tt}
          </h2>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }} className="testimonial-grid">
          {qs.map((t, i) => (
            <figure key={i} style={{
              margin: 0,
              background: 'var(--color-slate-50)',
              border: '1px solid var(--border-default)',
              borderRadius: 16,
              padding: 28,
              display: 'flex', flexDirection: 'column', gap: 18,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#F59E0B' }}>
                {[0,1,2,3,4].map((s) => (
                  <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>
                ))}
              </div>
              <blockquote style={{
                margin: 0, fontFamily: 'var(--font-body)',
                fontSize: 14.5, lineHeight: 1.55, color: '#1E293B',
                fontWeight: 400, flex: 1,
              }}>"{t.q}"</blockquote>
              <figcaption style={{
                paddingTop: 18,
                borderTop: '1px solid var(--border-default)',
              }}>
                <div style={{
                  fontSize: 12, fontWeight: 600, color: '#0F172A',
                  textTransform: 'uppercase', letterSpacing: 1.2,
                }}>{t.brand}</div>
                <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>{t.region}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Shopify section — 3-step go-live ───────────── */
function ShopifySection() {
  const steps = [
    {
      n: 1, title: 'Install the app',
      body: 'Find Dyrect on the Shopify App Store and install with a single click. No coding, no technical setup, no back and forth with a developer.',
    },
    {
      n: 2, title: 'Sync your products',
      body: 'Select which products need warranty registration. Dyrect pulls directly from your Shopify catalog and syncs automatically.',
    },
    {
      n: 3, title: 'Go live',
      body: "That's it. From the next fulfilled order, warranties register automatically and customers are notified — no manual work from your team.",
    },
  ];
  return (
    <section className="section" style={{ background: '#F8FAFC' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 64, alignItems: 'center' }} className="shopify-grid">
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 12px', borderRadius: 999,
              background: '#95BF47', color: 'white',
              fontSize: 12, fontWeight: 500,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 7.4c-.1-.7-.6-1.1-1-1.1l-.5-.1c-.4-1.3-1.5-2.3-2.7-2.3h-.2c-.4-.5-1-.8-1.6-.8-1.4 0-2.5 1.1-2.9 2.8L4.3 6.5c-.5.2-.5.2-.6.7L2 19.5l11.6 2.2 5.2-1.1-3.3-13.2zm-3.4-.5l-.4.1V6.9c0-.5-.1-1-.2-1.4.9.2 1.4 1 1.6 2zm-2-1.8c.4 0 .7.1 1 .3v.2c-.1.5-.2 1-.2 1.5l-1.8.5c.2-1.3.8-2.5 1-2.5zm-1.6 1c-.7.4-1.2 1.4-1.4 2.4l-1 .3c.2-1.3 1-2.5 2.4-2.7z"/></svg>
              Shopify-native · 5★ on the App Store
            </div>
            <h2 className="section-title" style={{ marginTop: 18, fontSize: 'clamp(28px, 3.6vw, 42px)' }}>
              Already on Shopify? Go live in &lt;30 minutes.
            </h2>
            <p style={{ color: 'var(--fg-secondary)', fontSize: 17, lineHeight: 1.55, marginTop: 16 }}>
              Three steps and your entire warranty operation is running automatically. No developer needed.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
              <a href="#demo" className="btn btn-primary">Install on Shopify</a>
              <a href="#integrations" className="btn btn-ghost">See all integrations &nbsp;→</a>
            </div>
          </div>
          <div>
            {steps.map((s, i) => (
              <div key={s.n} style={{
                display: 'flex', gap: 16,
                paddingBottom: i === steps.length - 1 ? 0 : 24,
                marginBottom: i === steps.length - 1 ? 0 : 24,
                borderBottom: i === steps.length - 1 ? 'none' : '1px dashed var(--border-default)',
                position: 'relative',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: 'var(--color-brand-blue)',
                  color: 'white',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600,
                  flexShrink: 0,
                  boxShadow: 'var(--shadow-blue)',
                }}>{s.n}</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#0F172A' }}>{s.title}</div>
                  <div style={{ fontSize: 14.5, color: '#475569', lineHeight: 1.55, marginTop: 4 }}>{s.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Integrations ───────────── */
function Integrations() {
  return (
    <section className="section" id="integrations" style={{ background: 'white' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 64, alignItems: 'center' }} className="integrations-grid">
          <div>
            <p className="eyebrow">Integrations</p>
            <h2 className="section-title" style={{ marginTop: 12 }}>
              Dyrect plugs into the <span className="em">tools your team already uses</span>
            </h2>
            <p style={{ color: 'var(--fg-secondary)', fontSize: 17, lineHeight: 1.55, marginTop: 16 }}>
              No ripping and replacing your existing stack. Connect with your ecommerce store, marketing tools, and support platform so data flows automatically where it needs to go.
            </p>
            <a href="#" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              marginTop: 24, color: 'var(--color-brand-blue)',
              fontWeight: 500, fontSize: 15,
            }}>
              View Dyrect integrations
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src="/assets/integrations-ring.webp" alt="Dyrect integrations"
              style={{ width: '100%', maxWidth: 560, height: 'auto', display: 'block' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Blog ───────────── */
const BLOG_POSTS = [
  {
    title: '10 Best Warranty Management Software for D2C Brands (2026)',
    tag: 'Warranty',
    readTime: '13 min read',
    href: 'https://www.dyrect.co/blog/best-warranty-management-software',
    img: 'https://prod.superblogcdn.com/site_cuid_cl3wwffwg1088071kpbry8hfjzp/images/best-warranty-management-dtc-2026-1772085050994-compressed.jpg',
  },
  {
    title: 'Warranty Management Software for Brands: The Complete 2026 Guide',
    tag: 'Guide',
    readTime: '15 min read',
    href: 'https://www.dyrect.co/guide/warranty-management-software',
    img: 'https://cdn.prod.website-files.com/62b59be46bad855e276574d3/696126a91b64db9372b09320_warranty-management-software.jpg',
  },
  {
    title: 'How to Manage Product Warranties Digitally: A Complete 2026 Guide for Brands',
    tag: 'Warranty Management',
    readTime: '15 min read',
    href: 'https://www.dyrect.co/blog/digital-warranty-management',
    img: 'https://prod.superblogcdn.com/site_cuid_cl3wwffwg1088071kpbry8hfjzp/images/f4cfd314-9f7f-4fbb-bdfe-ac39a518e230-1777988575934-compressed.png',
  },
];

function BlogSection() {
  return (
    <section className="section" id="blog" style={{ background: 'white' }}>
      <div className="container">
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          gap: 24, marginBottom: 32, flexWrap: 'wrap',
        }}>
          <div>
            <a href="https://www.dyrect.co/blog" target="_blank" rel="noreferrer noopener"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                color: 'var(--color-brand-blue)',
                fontFamily: 'var(--font-body)', fontWeight: 600,
                fontSize: 13, letterSpacing: 1.4, textTransform: 'uppercase',
                marginBottom: 12,
              }}>
              From the Dyrect blog
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
            <h2 className="section-title" style={{ fontSize: 'clamp(28px, 3.4vw, 40px)' }}>
              Guides, case studies, and insights
            </h2>
            <p style={{ color: 'var(--fg-secondary)', fontSize: 16, lineHeight: 1.55, marginTop: 12, maxWidth: 600 }}>
              On warranty management, post-sale operations, and building direct customer relationships.
            </p>
          </div>
          <a href="https://www.dyrect.co/blog" target="_blank" rel="noreferrer noopener"
            className="btn btn-secondary" style={{ fontSize: 14 }}>
            View all articles →
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="blog-grid">
          {BLOG_POSTS.map((p, i) => (
            <a key={i} href={p.href} target="_blank" rel="noreferrer noopener"
              style={{
                display: 'flex', flexDirection: 'column',
                background: 'white',
                border: '1px solid var(--border-default)',
                borderRadius: 14,
                overflow: 'hidden',
                transition: 'all 220ms cubic-bezier(.16,.84,.44,1)',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                e.currentTarget.style.borderColor = 'var(--color-brand-blue)';
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--border-default)';
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1)';
              }}>
              {/* 16:9 image */}
              <div style={{
                position: 'relative',
                aspectRatio: '16 / 9',
                background: 'var(--color-slate-100)',
                overflow: 'hidden',
              }}>
                <img src={p.img} alt={p.title}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 600ms cubic-bezier(.16,.84,.44,1)',
                    display: 'block',
                  }}
                  onError={(e) => { e.currentTarget.style.opacity = 0; }} />
                {/* Category tag */}
                <span style={{
                  position: 'absolute', top: 12, left: 12,
                  padding: '4px 10px', borderRadius: 999,
                  background: 'rgba(255,255,255,0.95)',
                  color: 'var(--color-brand-blue-deep)',
                  fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: 'uppercase',
                  backdropFilter: 'blur(8px)',
                }}>{p.tag}</span>
              </div>
              {/* Body */}
              <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                <div style={{ fontSize: 12, color: '#94A3B8', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                  {p.readTime}
                </div>
                <h3 style={{
                  margin: 0,
                  fontFamily: 'var(--font-display)',
                  fontSize: 19, fontWeight: 600, lineHeight: 1.3,
                  color: '#0F172A', letterSpacing: '-0.4px',
                  textWrap: 'pretty',
                }}>{p.title}</h3>
                <div style={{
                  marginTop: 'auto', paddingTop: 4,
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 14, fontWeight: 500, color: 'var(--color-brand-blue)',
                }}>
                  Read article
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
/* ───────────── FAQ ───────────── */
const FAQS = [
  { q: 'What is warranty management software?',
    a: 'Warranty management software is a platform that lets brands manage product registrations, warranty coverage, claim requests, replacements, repairs, customer communication, and reporting from one place. For consumer brands, a modern warranty management system also captures product ownership data, validates purchases, tracks claim status, and creates a smoother after-sales experience across ecommerce, retail, and marketplace channels.' },
  { q: "How does Dyrect's warranty management platform support consumer brands?",
    a: "Dyrect's warranty management platform supports consumer brands by connecting product registration, warranty tracking, claim management, customer portals, and post-purchase engagement in one system. Brands can collect customer and product details after purchase, issue digital warranty cards, manage claims, validate proof of purchase, and communicate with buyers through branded after-sales journeys." },
  { q: 'What makes Dyrect different from a traditional warranty management system?',
    a: 'Traditional warranty management systems often handle warranty records and claims as back-office tasks. Dyrect is designed for modern consumer brands that want to use warranty registration as a direct customer relationship channel. It supports QR-based product registration, Shopify-connected warranty flows, digital warranty cards, customer self-service portals, claim tracking, and owned customer data capture from online, offline, and marketplace sales.' },
  { q: 'Can Dyrect be used as warranty registration software?',
    a: 'Yes. Dyrect includes warranty registration software that lets customers register products through QR codes, website forms, Shopify pages, or branded registration links. Brands can collect product details, serial numbers, purchase dates, receipts, customer contact information, and marketing opt-ins, then use that data to activate warranty coverage and build a verified product ownership record.' },
  { q: 'How does QR code warranty registration operate?',
    a: 'QR code warranty registration lets a customer scan a code on packaging, manuals, inserts, or product labels and reach a branded registration form. With Dyrect, the customer can submit purchase details, product information, serial number, and contact details to activate their warranty. This is especially useful for retail and marketplace purchases where the brand may otherwise miss the direct buyer relationship.' },
  { q: 'What is warranty tracking software?',
    a: 'Warranty tracking software lets brands and customers view warranty status, coverage dates, registered products, claim history, and claim progress. With Dyrect, customers can access warranty cards and claim updates through a self-service portal, while support teams can view product ownership, claim details, validation documents, and communication history in one place.' },
  { q: 'Does Dyrect support warranty claims management?',
    a: 'Yes. Dyrect supports warranty claims management with claim forms, ticketing, proof of purchase uploads, serial number validation, status updates, internal review flows, and reporting. Brands can manage repair, replacement, refund, or chargeback requests while customers can submit claims and track progress through a branded experience.' },
  { q: 'How can warranty claim processing be automated?',
    a: 'Warranty claim processing can be automated by using structured claim forms, required document uploads, warranty eligibility checks, serial number validation, product data, and status-based customer updates. Dyrect reduces manual back-and-forth by collecting the right claim information upfront and giving support teams a centralized claim workspace.' },
  { q: 'Can customers track claims through a self-service warranty portal?',
    a: 'Yes. Dyrect gives customers access to a self-service warranty portal where they can view registered products, warranty cards, claim status, product guides, and service updates. This improves the customer experience and reduces repetitive support questions around warranty coverage, repair progress, replacement approval, and claim timelines.' },
  { q: 'How does product registration software capture retail and marketplace customers?',
    a: "Product registration software captures retail and marketplace customers by inviting buyers to register their products after purchase through QR codes, packaging inserts, landing pages, or warranty activation forms. Dyrect lets brands collect verified customer data, product ownership details, and communication consent even when the original sale happens outside the brand's ecommerce store." },
  { q: 'Can Dyrect connect warranty data with Shopify?',
    a: 'Yes. Dyrect can connect warranty registration and claims with Shopify so brands can sync product data, support ecommerce warranty flows, and give customers a branded registration and claim experience. Shopify brands can use Dyrect as a warranty management app to manage registrations, digital warranty cards, product ownership records, and claim requests.' },
  { q: 'Does Dyrect integrate with CRM, support, and marketing tools?',
    a: 'Dyrect is built to connect warranty and product registration data with tools used across customer support, marketing, and retention. Brands can use warranty data alongside platforms such as help desks, CRM systems, email marketing tools, and SMS channels to improve support context, send relevant updates, and create personalized post-purchase journeys.' },
  { q: 'How does serial number validation improve warranty management?',
    a: 'Serial number validation improves warranty management by confirming that a product is eligible for warranty coverage before a claim is approved. It can reduce duplicate registrations, invalid claims, and manual review effort. Dyrect lets brands collect and validate serial numbers during registration or claim submission, giving teams stronger product-level visibility.' },
  { q: 'What warranty analytics should brands track?',
    a: "Brands should track warranty registrations, registered product volume, claim volume, claim approval rate, claim reasons, product defects, repair or replacement trends, claim resolution time, customer segments, and post-purchase engagement. Dyrect's warranty analytics can reveal which products create more service requests and which channels generate valuable registered customers." },
  { q: "Who should use Dyrect's warranty management software?",
    a: "Dyrect's warranty management software is built for consumer brands selling physical products through ecommerce, Shopify, retail stores, distributors, and marketplaces. It is especially useful for brands in electronics, appliances, fitness, baby gear, beauty, furniture, outdoor products, smart home, accessories, and other categories where product registration, warranty claims, and after-sales customer relationships can drive retention and repeat revenue." },
];

function FAQ({ faqs, eyebrow, title, subtitle }) {
  const data = faqs || FAQS;
  const eb = eyebrow  || 'FAQs';
  const tt = title    || 'Frequently asked questions';
  const sb = subtitle || "Everything teams ask before going live. Can't find what you need?";
  const [open, setOpen] = useState(0);
  return (
    <section className="section" id="faq" style={{ background: 'var(--color-slate-50)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 64 }} className="faq-grid">
          <div>
            <p className="eyebrow">{eb}</p>
            <h2 className="section-title" style={{ marginTop: 12, fontSize: 'clamp(28px, 3.4vw, 40px)' }}>
              {tt}
            </h2>
            <p style={{ color: 'var(--fg-secondary)', fontSize: 16, lineHeight: 1.55, marginTop: 16 }}>
              {sb}
            </p>
            <a href="#demo" className="btn btn-secondary" style={{ marginTop: 16 }}>
              Talk to sales →
            </a>
          </div>
          <div style={{ background: 'white', borderRadius: 12, border: '1px solid var(--border-default)' }}>
            {data.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={i} style={{ borderBottom: i === data.length - 1 ? 'none' : '1px solid var(--border-default)' }}>
                  <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
                    width: '100%', textAlign: 'left',
                    padding: '20px 24px',
                    display: 'flex', alignItems: 'center', gap: 16,
                    fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 500,
                    color: '#0F172A',
                  }}>
                    <span style={{ flex: 1 }}>{f.q}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      style={{ transition: 'transform 220ms ease', transform: isOpen ? 'rotate(45deg)' : 'rotate(0)' }}>
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                  </button>
                  <div style={{
                    maxHeight: isOpen ? 600 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 420ms cubic-bezier(.16,.84,.44,1)',
                  }}>
                    <div style={{ padding: '0 24px 22px', fontSize: 14.5, color: '#475569', lineHeight: 1.6 }}>
                      {f.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Final CTA ───────────── */
function FinalCTA({ eyebrow, title, body, primaryLabel, secondaryLabel, checks }) {
  const eb = eyebrow || 'Ready when you are';
  const tt = title   || 'Ready to optimize your post-sale operation?';
  const bd = body    || (<>Book a demo and <strong style={{ color: 'white' }}>see how brands running on Dyrect manage the entire warranty lifecycle</strong> without switching tools.</>);
  const pl = primaryLabel   || 'Sign up for demo';
  const sl = secondaryLabel || 'Install on Shopify';
  const ck = checks || ['No credit card needed', 'Live in <30 min', '500+ brands trust Dyrect'];
  return (
    <section className="section" id="demo" style={{ background: 'white' }}>
      <div className="container">
        <div style={{
          position: 'relative', overflow: 'hidden',
          borderRadius: 20,
          background: 'linear-gradient(135deg, #1A23A8 0%, #2437F6 60%, #4A5BFE 100%)',
          color: 'white',
          padding: 'clamp(48px, 6vw, 80px)',
          boxShadow: 'var(--shadow-xl)',
        }}>
          <div aria-hidden style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(closest-side, black, transparent 80%)',
          }} />
          <div aria-hidden style={{
            position: 'absolute', right: '-120px', top: '-120px',
            width: 360, height: 360, borderRadius: '50%',
            background: 'radial-gradient(closest-side, rgba(255,255,255,0.16), transparent 70%)',
            filter: 'blur(20px)',
          }} />
          <div style={{ position: 'relative', maxWidth: 720 }}>
            <p className="eyebrow" style={{ color: '#C7CDFD' }}>{eb}</p>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 600,
              fontSize: 'clamp(32px, 4.4vw, 52px)', lineHeight: 1.1,
              letterSpacing: '-1.4px', marginTop: 12, marginBottom: 0,
            }}>
              {tt}
            </h2>
            <p style={{ marginTop: 20, fontSize: 18, lineHeight: 1.55, color: 'rgba(255,255,255,0.85)' }}>
              {bd}
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
              <a href="#" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 22px', borderRadius: 8,
                background: 'white', color: 'var(--color-brand-blue-deep)',
                fontWeight: 600, fontSize: 15,
              }}>
                {pl}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </a>
              <a href="#" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 22px', borderRadius: 8,
                background: 'rgba(255,255,255,0.10)', color: 'white',
                fontWeight: 500, fontSize: 15,
                border: '1px solid rgba(255,255,255,0.25)',
              }}>
                {sl}
              </a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 32, color: 'rgba(255,255,255,0.75)', fontSize: 13, flexWrap: 'wrap' }}>
              {ck.map((x, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7EE2A1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  {x}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Footer ───────────── */
function SiteFooter({ activeProduct }) {
  const productLinks = [
    { l: 'Product Registration Software', href: '/product/product-registration-software', key: 'product-registration' },
    { l: 'Warranty Management Software',  href: '/product/warranty-management-software', key: 'warranty-claims' },
    { l: 'Extended Warranties',           href: '/product/extended-warranties', key: 'extended-warranties' },
  ].map(p => ({ ...p, active: activeProduct === p.key }));
  const cols = [
    { h: 'Products', links: productLinks },
    {
      h: 'Free Tools',
      links: [
        { l: 'Bulk QR Code Generator', href: '#' },
        { l: 'Serial Number Generator', href: '#' },
        { l: 'Warranty Cost Calculator', href: '#' },
      ],
    },
    {
      h: 'Solutions',
      links: [
        { l: 'Electronics',               href: '/solutions/electronics' },
        { l: 'Outdoors & Recreation',      href: '/solutions/outdoors-recreation' },
        { l: 'Baby Gear',                  href: '/solutions/baby-gear' },
        { l: 'Beauty and Personal Care',   href: '/solutions/beauty-personal-care' },
        { l: 'Mobile Accessories',         href: '/solutions/mobile-accessories' },
        { l: 'Household Appliances',       href: '/solutions/home-appliances' },
        { l: 'T.V, Audio and Video',       href: '/solutions/tv-audio-video' },
        { l: 'Exercise and Fitness',       href: '/solutions/exercise-fitness' },
        { l: 'Furniture',                  href: '/solutions/furniture' },
        { l: 'Smart Home and Network',     href: '/solutions/smart-home-and-network' },
        { l: 'Cycling',                    href: '/solutions/cycling' },
      ],
    },
    {
      h: 'Company',
      links: [
        { l: 'Features', href: '/features' },
        { l: 'Pricing',  href: '/pricing' },
        { l: 'Contact Us', href: '#' },
      ],
      sub: {
        h: 'Features',
        links: [
          { l: 'Digitalize Warranty', href: '#' },
          { l: 'Form Builder (No-Code)', href: '#' },
          { l: 'Digitize Product Manual', href: '#' },
          { l: 'Serial Number Validator', href: '#' },
          { l: 'Claims and Ticket Management', href: '#' },
          { l: 'All Features', href: '#' },
        ],
      },
    },
    {
      h: 'Resources',
      links: [
        { l: 'FAQs', href: '#faq' },
        { l: 'Blog', href: '#blog' },
        { l: 'Integrations', href: '#integrations' },
        { l: 'Brand Warranties', href: '#' },
        { l: 'Our Partners', href: '#' },
      ],
      sub: {
        h: 'Alternatives',
        links: [
          { l: 'Zoho vs Dyrect', href: '#' },
          { l: 'Salesforce vs Dyrect', href: '#' },
          { l: 'SAP vs Dyrect', href: '#' },
          { l: 'Odoo vs Dyrect', href: '#' },
        ],
      },
    },
  ];

  const linkHoverIn  = (e) => { e.currentTarget.style.color = 'white'; };
  const linkHoverOut = (e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.72)'; };

  const ColHeading = ({ children }) => (
    <div style={{
      fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.55)',
      textTransform: 'uppercase', letterSpacing: 1.6, marginBottom: 14,
    }}>{children}</div>
  );
  const ColLinks = ({ links }) => (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {links.map((l) => (
        <li key={l.l}>
          <a href={l.href} style={{
            fontSize: 14, fontWeight: 500,
            color: l.active ? 'white' : 'rgba(255,255,255,0.72)',
            transition: 'color 160ms',
          }}
            onMouseEnter={linkHoverIn} onMouseLeave={linkHoverOut}>
            {l.l}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <footer style={{
      background: '#0B1020',
      color: 'rgba(255,255,255,0.72)',
      paddingTop: 80, paddingBottom: 24,
      position: 'relative', overflow: 'hidden',
    }}>
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        maskImage: 'radial-gradient(closest-side, black, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(closest-side, black, transparent 80%)',
        pointerEvents: 'none',
      }} />
      <div className="container" style={{ position: 'relative' }}>
        {/* Top: 5 link columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 32,
        }} className="footer-grid">
          {cols.map((c, i) => (
            <div key={i}>
              <ColHeading>{c.h}</ColHeading>
              <ColLinks links={c.links} />
              {c.sub && (
                <>
                  <div style={{ marginTop: 24 }}>
                    <ColHeading>{c.sub.h}</ColHeading>
                    <ColLinks links={c.sub.links} />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Bottom: brand + get-in-touch */}
        <div style={{
          marginTop: 64,
          display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr',
          gap: 40, alignItems: 'start',
          paddingTop: 40,
          borderTop: '1px solid rgba(255,255,255,0.10)',
        }} className="footer-bottom">
          {/* Brand block */}
          <div>
            <img src="/assets/logo-white-wordmark.png" alt="Dyrect"
              style={{ height: 32, display: 'block' }} />
            <p style={{
              marginTop: 18, fontSize: 14, lineHeight: 1.55,
              color: 'rgba(255,255,255,0.65)', maxWidth: 320,
            }}>
              The most seamless warranty management software. Registration, claims, and protection plans — unified.
            </p>
            {/* Socials */}
            <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
              <a href="#" aria-label="LinkedIn" style={{
                width: 36, height: 36, borderRadius: 8,
                background: 'rgba(255,255,255,0.10)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.85)',
                transition: 'all 160ms',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.20)'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.10)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                  <path d="M22 21V14a4 4 0 0 0-8 0v7M10 9v12"/>
                </svg>
              </a>
            </div>
          </div>

          {/* US office */}
          <div>
            <ColHeading>Get in touch · US</ColHeading>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.72)' }}>
              655 S Fair Oaks Ave,<br />Sunnyvale, CA 94086
            </p>
            <a href="mailto:sales@dyrect.co" style={{
              display: 'inline-block', marginTop: 14,
              fontSize: 14, fontWeight: 500,
              color: '#A4AFFE',
            }}>
              sales@dyrect.co
            </a>
          </div>

          {/* India office */}
          <div>
            <ColHeading>Get in touch · India</ColHeading>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.72)' }}>
              <strong style={{ color: 'white', fontWeight: 600 }}>Neuroone Solutions Pvt. Ltd.</strong><br />
              A-805, Magnolia Apartment, Baner<br />Pashan Link Road, Pune — 411021
            </p>
            <a href="tel:+919975470169" style={{
              display: 'inline-block', marginTop: 14,
              fontSize: 14, fontWeight: 500,
              color: '#A4AFFE',
            }}>
              +91 9975470169
            </a>
          </div>
        </div>

        {/* Legal bar */}
        <div style={{
          marginTop: 56, paddingTop: 24,
          borderTop: '1px solid rgba(255,255,255,0.10)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: 13, color: 'rgba(255,255,255,0.50)',
          gap: 16, flexWrap: 'wrap',
        }}>
          <div>© 2026 Dyrect (Neuroone Solutions Pvt. Ltd.). All rights reserved.</div>
          <div style={{ display: 'flex', gap: 20 }}>
            <a href="#" style={{ color: 'inherit', transition: 'color 160ms' }}
              onMouseEnter={(e)=>e.currentTarget.style.color='white'} onMouseLeave={(e)=>e.currentTarget.style.color='rgba(255,255,255,0.50)'}>Privacy</a>
            <a href="#" style={{ color: 'inherit', transition: 'color 160ms' }}
              onMouseEnter={(e)=>e.currentTarget.style.color='white'} onMouseLeave={(e)=>e.currentTarget.style.color='rgba(255,255,255,0.50)'}>Terms</a>
            <a href="#" style={{ color: 'inherit', transition: 'color 160ms' }}
              onMouseEnter={(e)=>e.currentTarget.style.color='white'} onMouseLeave={(e)=>e.currentTarget.style.color='rgba(255,255,255,0.50)'}>Security</a>
            <a href="#" style={{ color: 'inherit', transition: 'color 160ms' }}
              onMouseEnter={(e)=>e.currentTarget.style.color='white'} onMouseLeave={(e)=>e.currentTarget.style.color='rgba(255,255,255,0.50)'}>Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

if (typeof window !== 'undefined') { Object.assign(window, {
  Capabilities, Stats, Testimonials, ShopifySection, Integrations, BlogSection, FAQ, FinalCTA, SiteFooter,
}); }

}

{

/* Shared site navigation v2 — used by Home Page + every product page.
   - Hover-triggered mega-menu panels (Products, Solutions, Resources, Free Tools)
   - Mobile drawer below 980px
   - `activeProduct` prop highlights current product link in Products mega-menu
     ('product-registration' | 'warranty-claims' | 'extended-warranties' | undefined)
*/


const PRODUCT_LINKS = [
  { key: 'product-registration', icon: 'qr',
    name: 'Product Registration Software',
    desc: 'Provide omni-channel, delightful experience at scale.',
    href: '/product/product-registration-software' },
  { key: 'warranty-claims', icon: 'shield',
    name: 'Warranty Management Software',
    desc: 'Save costs, reduce overheads with faster, accurate claims processing.',
    href: '/product/warranty-management-software' },
  { key: 'extended-warranties', icon: 'umbrella',
    name: 'Extended Warranties',
    desc: 'Offer protection plans across more touchpoints. Keep 100% of revenue in-house.',
    href: '/product/extended-warranties' },
];

const NAV_ITEMS = [
  {
    label: 'Products', menu: 'products',
    content: {
      type: 'two-col',
      left: { heading: 'Products', items: PRODUCT_LINKS },
      right: {
        heading: 'Features',
        items: [
          { label: 'No-code Experience Builder', href: '/features#experience-builder' },
          { label: 'Claims Management', href: '/features#claims-management' },
          { label: 'Digital Warranty Card', href: '/features#digital-warranty-card' },
          { label: 'Product Serialization', href: '/features#product-serialization' },
          { label: 'Digitize Product Manuals & Guides', href: '/features#product-manuals-guides' },
          { label: 'Powerful Form Builder', href: '/features#form-builder' },
        ],
        ctaHref: '/features',
        cta: 'See more features',
      },
    },
  },
  {
    label: 'Solutions', menu: 'solutions',
    content: {
      type: 'grid-2',
      heading: 'Industry',
      items: [
        { label: 'Electronics',               href: '/solutions/electronics' },
        { label: 'Outdoors & Recreation',      href: '/solutions/outdoors-recreation' },
        { label: 'Baby Gear',                  href: '/solutions/baby-gear' },
        { label: 'Beauty and Personal Care',   href: '/solutions/beauty-personal-care' },
        { label: 'Mobile Accessories',         href: '/solutions/mobile-accessories' },
        { label: 'Household Appliances',       href: '/solutions/home-appliances' },
        { label: 'T.V, Audio and Video',       href: '/solutions/tv-audio-video' },
        { label: 'Exercise and Fitness',       href: '/solutions/exercise-fitness' },
        { label: 'Furniture',                  href: '/solutions/furniture' },
        { label: 'Smart Home and Network',     href: '/solutions/smart-home-and-network' },
        { label: 'Cycling',                    href: '/solutions/cycling' },
        { label: 'Automotive',                 href: '#' },
      ],
    },
  },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Pricing', href: '/pricing' },
  {
    label: 'Resources', menu: 'resources',
    content: {
      type: 'simple-list',
      items: [
        { label: 'Help Center', href: '#' },
        { label: 'Blogs', href: '#' },
        { label: 'Integrations', href: '#integrations' },
        { label: 'Client Success Stories', href: '#' },
        { label: 'How it Works', href: '#' },
        { label: "FAQ's", href: '#faq' },
      ],
    },
  },
  {
    label: 'Free Tools', menu: 'free-tools',
    content: {
      type: 'simple-list',
      items: [
        { label: 'Brand Warranties', href: '#' },
        { label: 'Bulk QR Code Generator', href: '#' },
        { label: 'Serial Number Generator', href: '#' },
        { label: 'Warranty Cost Calculator', href: '#' },
      ],
    },
  },
];

function NavIcon({ name }) {
  const paths = {
    qr:       <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v3M14 21h3M21 17v4h-4"/></>,
    shield:   <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></>,
    umbrella: <><path d="M12 12v7a2 2 0 0 0 4 0"/><path d="M2 12a10 10 0 0 1 20 0Z"/><path d="M12 2v2"/></>,
  };
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

function NavPanel({ content, activeProduct }) {
  return (
    <div style={{
      position: 'absolute', top: 'calc(100% + 4px)',
      background: 'white',
      border: '1px solid var(--border-default)',
      borderRadius: 14,
      boxShadow: '0 24px 60px -12px rgba(15,23,42,0.18), 0 6px 18px -4px rgba(15,23,42,0.06)',
      padding: 28,
      zIndex: 60,
    }}>
      {content.type === 'two-col' && <NavTwoCol content={content} activeProduct={activeProduct} />}
      {content.type === 'grid-2' && <NavGrid content={content} />}
      {content.type === 'simple-list' && <NavSimpleList content={content} />}
    </div>
  );
}

function NavTwoCol({ content, activeProduct }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'minmax(360px, 420px) 1px 240px',
      gap: 32, minWidth: 720,
    }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 16 }}>{content.left.heading}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {content.left.items.map((it, i) => {
            const isActive = activeProduct && it.key === activeProduct;
            return (
              <a key={i} href={it.href || '#'} style={{
                display: 'flex', gap: 14, padding: '12px',
                borderRadius: 10, alignItems: 'flex-start',
                background: isActive ? 'var(--color-brand-blue-subtle)' : 'transparent',
                transition: 'background 160ms',
              }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'var(--color-slate-50)'; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}>
                <span style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: isActive ? 'var(--color-brand-blue)' : 'var(--color-brand-blue-subtle)',
                  color: isActive ? 'white' : 'var(--color-brand-blue)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <NavIcon name={it.icon} />
                </span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: isActive ? 'var(--color-brand-blue-deep)' : '#0F172A' }}>{it.name}</div>
                  <div style={{ fontSize: 12.5, color: '#64748B', marginTop: 2, lineHeight: 1.4 }}>{it.desc}</div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
      <div style={{ background: 'var(--color-slate-200)' }} />
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 16 }}>{content.right.heading}</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {content.right.items.map((it, i) => {
            const label = typeof it === 'string' ? it : it.label;
            const href = typeof it === 'string' ? '#' : (it.href || '#');
            return (
              <a key={i} href={href} style={{
                padding: '8px 10px', borderRadius: 6,
                fontSize: 14, fontWeight: 500, color: '#1E293B',
                transition: 'all 160ms',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-slate-50)'; e.currentTarget.style.color = 'var(--color-brand-blue)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1E293B'; }}>
                {label}
              </a>
            );
          })}
        </div>
        <a href={content.right.ctaHref || '#'} style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          marginTop: 14, marginLeft: 10,
          fontSize: 13, fontWeight: 600, color: 'var(--color-brand-blue)',
        }}>
          {content.right.cta} &nbsp;›
        </a>
      </div>
    </div>
  );
}

function NavGrid({ content }) {
  return (
    <div style={{ minWidth: 540 }}>
      <div style={{
        fontSize: 11, fontWeight: 600, color: '#94A3B8',
        letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 18,
      }}>{content.heading}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 36, rowGap: 4 }}>
        {content.items.map((it, i) => {
          const label = typeof it === 'string' ? it : it.label;
          const href  = typeof it === 'string' ? '#' : (it.href || '#');
          return (
            <a key={i} href={href} style={{
              padding: '9px 10px', borderRadius: 6,
              fontSize: 14, fontWeight: 500, color: '#1E293B',
              transition: 'all 160ms',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-slate-50)'; e.currentTarget.style.color = 'var(--color-brand-blue)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1E293B'; }}>
              {label}
            </a>
          );
        })}
      </div>
    </div>
  );
}

function NavSimpleList({ content }) {
  return (
    <div style={{ minWidth: 220, display: 'flex', flexDirection: 'column' }}>
      {content.items.map((it, i) => (
        <a key={i} href={it.href} style={{
          padding: '10px 12px', borderRadius: 6,
          fontSize: 14, fontWeight: 500, color: '#1E293B',
          transition: 'all 160ms',
          whiteSpace: 'nowrap',
        }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-slate-50)'; e.currentTarget.style.color = 'var(--color-brand-blue)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1E293B'; }}>
          {it.label}
        </a>
      ))}
    </div>
  );
}

/* Mobile drawer */
function MobileNavDrawer({ open, onClose, activeProduct }) {
  const [openSub, setOpenSub] = snUS(null);
  snUE(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, zIndex: 80,
        background: 'rgba(15,23,42,0.45)',
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 220ms ease',
      }} />
      <aside style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(86vw, 360px)',
        zIndex: 90, background: 'white',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 280ms cubic-bezier(.16,.84,.44,1)',
        display: 'flex', flexDirection: 'column',
        boxShadow: '-12px 0 40px rgba(15,23,42,0.12)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px', borderBottom: '1px solid var(--border-default)',
        }}>
          <img src="/assets/logo-blue-wordmark.png" alt="Dyrect" style={{ height: 24 }} />
          <button onClick={onClose} aria-label="Close menu" style={{
            width: 36, height: 36, borderRadius: 8,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: '#475569', background: 'transparent', cursor: 'pointer',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 8px' }}>
          {NAV_ITEMS.map((item, idx) => {
            const isOpen = openSub === idx;
            if (!item.menu) {
              return (
                <a key={item.label} href={item.href || '#'} style={{
                  display: 'block', padding: '14px 16px',
                  fontSize: 15, fontWeight: 500, color: '#0F172A',
                  borderRadius: 8,
                }}>{item.label}</a>
              );
            }
            return (
              <div key={item.label}>
                <button onClick={() => setOpenSub(isOpen ? null : idx)} style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 16px', borderRadius: 8,
                  fontSize: 15, fontWeight: 500, color: '#0F172A',
                  textAlign: 'left', background: 'transparent', cursor: 'pointer',
                }}>
                  {item.label}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 200ms ease' }}>
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
                {isOpen && (
                  <div style={{ padding: '4px 8px 12px 16px' }}>
                    {item.content.type === 'two-col' && (
                      item.content.left.items.map((it, i) => {
                        const active = activeProduct && it.key === activeProduct;
                        return (
                          <a key={i} href={it.href || '#'} style={{
                            display: 'block', padding: '10px 12px',
                            fontSize: 14, color: active ? 'var(--color-brand-blue)' : '#475569',
                            fontWeight: active ? 600 : 500, borderRadius: 6,
                          }}>{it.name}</a>
                        );
                      })
                    )}
                    {item.content.type === 'grid-2' && (
                      item.content.items.map((it, i) => (
                        <a key={i} href="#" style={{
                          display: 'block', padding: '10px 12px',
                          fontSize: 14, color: '#475569', fontWeight: 500, borderRadius: 6,
                        }}>{it}</a>
                      ))
                    )}
                    {item.content.type === 'simple-list' && (
                      item.content.items.map((it, i) => (
                        <a key={i} href={it.href} style={{
                          display: 'block', padding: '10px 12px',
                          fontSize: 14, color: '#475569', fontWeight: 500, borderRadius: 6,
                        }}>{it.label}</a>
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div style={{ padding: 16, borderTop: '1px solid var(--border-default)' }}>
          <a href="#demo" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Book a Meeting
          </a>
        </div>
      </aside>
    </>
  );
}

function SiteNav({ activeProduct }) {
  const [openMenu, setOpenMenu] = snUS(null);
  const [mobileOpen, setMobileOpen] = snUS(false);
  const hideTimer = snUR(null);
  const show = (key) => { clearTimeout(hideTimer.current); setOpenMenu(key); };
  const scheduleHide = () => {
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  return (
    <header style={{
      position: 'relative', zIndex: 50,
      background: 'white',
      borderBottom: '1px solid var(--border-default)',
    }}>
      <div className="container" style={{
        display: 'flex', alignItems: 'center', gap: 24,
        padding: '14px 24px',
      }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <img src="/assets/logo-blue-wordmark.png" alt="Dyrect" style={{ height: 28 }} />
        </a>
        <nav className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 4, position: 'relative' }}>
          {NAV_ITEMS.map((item) => {
            const isOpen = openMenu === item.menu;
            const hasMenu = !!item.menu;
            const isActivePage = item.menu === 'products' && !!activeProduct;
            return (
              <div key={item.label}
                onMouseEnter={() => hasMenu && show(item.menu)}
                onMouseLeave={() => hasMenu && scheduleHide()}
                style={{ position: 'relative' }}>
                <a href={item.href || '#'} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  padding: '10px 14px', borderRadius: 6,
                  fontSize: 14.5, fontWeight: 500,
                  color: (isOpen || isActivePage) ? 'var(--color-brand-blue)' : '#1E293B',
                  position: 'relative',
                  transition: 'color 160ms',
                }}>
                  {item.label}
                  {hasMenu && (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
                      style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 180ms ease', marginTop: 1 }}>
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  )}
                  {(isOpen || (isActivePage && !openMenu)) && (
                    <span style={{
                      position: 'absolute', left: 14, right: 14, bottom: 2,
                      height: 2, background: 'var(--color-brand-blue)', borderRadius: 2,
                    }} />
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
        <div style={{ flex: 1 }} />
        <a href="#demo" className="btn btn-primary nav-cta" style={{ fontSize: 14, padding: '11px 18px', flexShrink: 0 }}>
          Book a Meeting
        </a>
        <button className="nav-burger" onClick={() => setMobileOpen(true)} aria-label="Open menu" style={{
          width: 40, height: 40, borderRadius: 8,
          display: 'none', alignItems: 'center', justifyContent: 'center',
          color: '#0F172A', background: 'transparent', cursor: 'pointer',
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
      </div>
      <MobileNavDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} activeProduct={activeProduct} />
    </header>
  );
}

if (typeof window !== 'undefined') { Object.assign(window, { SiteNav, NAV_ITEMS, PRODUCT_LINKS }); }

}
