'use client';

import React from 'react';

const TWEAK_DEFAULTS = {
  heroVariation: 'stacked',
  primaryColor: '#2437F6',
  density: 'default',
  show_logos: true,
  show_platform: true,
  show_products: true,
  show_personas: true,
  show_capabilities: true,
  show_stats: true,
  show_testimonials: true,
  show_shopify: true,
  show_integrations: true,
  show_blog: true,
  show_faq: true,
  show_cta: true,
};


// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null
      ? keyOrEdits : { [keyOrEdits]: val };
    setValues((prev) => ({ ...prev, ...edits }));
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', { detail: edits }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({ title = 'Tweaks', children }) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({ x: 16, y: 16 });
  const PAD = 16;

  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth, h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y)),
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);

  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);

  React.useEffect(() => {
    const onMsg = (e) => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);
      else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
  };

  const onDragStart = (e) => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX, sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = (ev) => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy),
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  if (!open) return null;
  return (
    <>
      <style>{__TWEAKS_STYLE}</style>
      <div ref={dragRef} className="twk-panel" data-omelette-chrome=""
           style={{ right: offsetRef.current.x, bottom: offsetRef.current.y }}>
        <div className="twk-hd" onMouseDown={onDragStart}>
          <b>{title}</b>
          <button className="twk-x" aria-label="Close tweaks"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={dismiss}>✕</button>
        </div>
        <div className="twk-body">
          {children}
        </div>
      </div>
    </>
  );
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({ label, children }) {
  return (
    <>
      <div className="twk-sect">{label}</div>
      {children}
    </>
  );
}

function TweakRow({ label, value, children, inline = false }) {
  return (
    <div className={inline ? 'twk-row twk-row-h' : 'twk-row'}>
      <div className="twk-lbl">
        <span>{label}</span>
        {value != null && <span className="twk-val">{value}</span>}
      </div>
      {children}
    </div>
  );
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({ label, value, min = 0, max = 100, step = 1, unit = '', onChange }) {
  return (
    <TweakRow label={label} value={`${value}${unit}`}>
      <input type="range" className="twk-slider" min={min} max={max} step={step}
             value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </TweakRow>
  );
}

function TweakToggle({ label, value, onChange }) {
  return (
    <div className="twk-row twk-row-h">
      <div className="twk-lbl"><span>{label}</span></div>
      <button type="button" className="twk-toggle" data-on={value ? '1' : '0'}
              role="switch" aria-checked={!!value}
              onClick={() => onChange(!value)}><i /></button>
    </div>
  );
}

function TweakRadio({ label, value, options, onChange }) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = (o) => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({ 2: 16, 3: 10 }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = (s) => {
      const m = options.find((o) => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return <TweakSelect label={label} value={value} options={options}
                        onChange={(s) => onChange(resolve(s))} />;
  }
  const opts = options.map((o) => (typeof o === 'object' ? o : { value: o, label: o }));
  const idx = Math.max(0, opts.findIndex((o) => o.value === value));
  const n = opts.length;

  const segAt = (clientX) => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor(((clientX - r.left - 2) / inner) * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };

  const onPointerDown = (e) => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = (ev) => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <TweakRow label={label}>
      <div ref={trackRef} role="radiogroup" onPointerDown={onPointerDown}
           className={dragging ? 'twk-seg dragging' : 'twk-seg'}>
        <div className="twk-seg-thumb"
             style={{ left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
                      width: `calc((100% - 4px) / ${n})` }} />
        {opts.map((o) => (
          <button key={o.value} type="button" role="radio" aria-checked={o.value === value}>
            {o.label}
          </button>
        ))}
      </div>
    </TweakRow>
  );
}

function TweakSelect({ label, value, options, onChange }) {
  return (
    <TweakRow label={label}>
      <select className="twk-field" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => {
          const v = typeof o === 'object' ? o.value : o;
          const l = typeof o === 'object' ? o.label : o;
          return <option key={v} value={v}>{l}</option>;
        })}
      </select>
    </TweakRow>
  );
}

function TweakText({ label, value, placeholder, onChange }) {
  return (
    <TweakRow label={label}>
      <input className="twk-field" type="text" value={value} placeholder={placeholder}
             onChange={(e) => onChange(e.target.value)} />
    </TweakRow>
  );
}

function TweakNumber({ label, value, min, max, step = 1, unit = '', onChange }) {
  const clamp = (n) => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({ x: 0, val: 0 });
  const onScrubStart = (e) => {
    e.preventDefault();
    startRef.current = { x: e.clientX, val: value };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = (ev) => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return (
    <div className="twk-num">
      <span className="twk-num-lbl" onPointerDown={onScrubStart}>{label}</span>
      <input type="number" value={value} min={min} max={max} step={step}
             onChange={(e) => onChange(clamp(Number(e.target.value)))} />
      {unit && <span className="twk-num-unit">{unit}</span>}
    </div>
  );
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, (c) => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}

const __TwkCheck = ({ light }) => (
  <svg viewBox="0 0 14 14" aria-hidden="true">
    <path d="M3 7.2 5.8 10 11 4.2" fill="none" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round"
          stroke={light ? 'rgba(0,0,0,.78)' : '#fff'} />
  </svg>
);

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({ label, value, options, onChange }) {
  if (!options || !options.length) {
    return (
      <div className="twk-row twk-row-h">
        <div className="twk-lbl"><span>{label}</span></div>
        <input type="color" className="twk-swatch" value={value}
               onChange={(e) => onChange(e.target.value)} />
      </div>
    );
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = (o) => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return (
    <TweakRow label={label}>
      <div className="twk-chips" role="radiogroup">
        {options.map((o, i) => {
          const colors = Array.isArray(o) ? o : [o];
          const [hero, ...rest] = colors;
          const sup = rest.slice(0, 4);
          const on = key(o) === cur;
          return (
            <button key={i} type="button" className="twk-chip" role="radio"
                    aria-checked={on} data-on={on ? '1' : '0'}
                    aria-label={colors.join(', ')} title={colors.join(' · ')}
                    style={{ background: hero }}
                    onClick={() => onChange(o)}>
              {sup.length > 0 && (
                <span>
                  {sup.map((c, j) => <i key={j} style={{ background: c }} />)}
                </span>
              )}
              {on && <__TwkCheck light={__twkIsLight(hero)} />}
            </button>
          );
        })}
      </div>
    </TweakRow>
  );
}

function TweakButton({ label, onClick, secondary = false }) {
  return (
    <button type="button" className={secondary ? 'twk-btn secondary' : 'twk-btn'}
            onClick={onClick}>{label}</button>
  );
}

Object.assign(window, {
  useTweaks, TweaksPanel, TweakSection, TweakRow,
  TweakSlider, TweakToggle, TweakRadio, TweakSelect,
  TweakText, TweakNumber, TweakColor, TweakButton,
});


/* global React */
var { useEffect, useRef, useState } = React;

/* ─────────────────────────────────────────────────────────
   PORTAL PREVIEWS — three animated Dyrect Client Portal cards
   Used in the hero. Each card mocks a different screen of the
   product so the user gets a full sense of the platform.
   ───────────────────────────────────────────────────────── */

/* Small status badge — mirrors product UI badges */
function Badge({ tone = 'info', children, dot = false }) {
  const tones = {
    info:    { bg: '#DBEAFE', fg: '#1E3A8A', dot: '#2437F6' },
    success: { bg: '#DCFCE7', fg: '#166534', dot: '#0ABE52' },
    warning: { bg: '#FEF3C7', fg: '#92400E', dot: '#F59E0B' },
    error:   { bg: '#FEE2E2', fg: '#991B1B', dot: '#EF4444' },
    slate:   { bg: '#F1F5F9', fg: '#334155', dot: '#64748B' },
    brand:   { bg: '#EEF0FE', fg: '#0F1FB8', dot: '#2437F6' },
  };
  const t = tones[tone] || tones.info;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: t.bg, color: t.fg,
      padding: '3px 8px', borderRadius: 4,
      fontSize: 11, fontWeight: 500, lineHeight: 1.2,
      whiteSpace: 'nowrap',
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: 999, background: t.dot }} />}
      {children}
    </span>
  );
}

/* ───────────── Card 1: Customer Profile ───────────── */
function CustomerProfileCard({ active }) {
  return (
    <div className="pp-card pp-card--profile" data-active={active}>
      {/* window chrome */}
      <div className="pp-chrome">
        <div className="pp-chrome-dots">
          <span /><span /><span />
        </div>
        <div className="pp-chrome-tab">Customer · Sarah Chen</div>
      </div>
      <div className="pp-body" style={{ padding: 0 }}>
        {/* hero strip */}
        <div style={{
          padding: '14px 16px 12px',
          borderBottom: '1px solid var(--border-default)',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 999,
            background: 'linear-gradient(135deg,#2437F6,#7E8DFE)',
            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 600, fontSize: 16, letterSpacing: '-0.3px',
          }}>SC</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: '#0F172A' }}>Sarah Chen</div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 1 }}>sarah.chen@hey.com · +1 415 555 0142</div>
          </div>
          <Badge tone="success" dot>Verified</Badge>
        </div>
        {/* meta grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 1, background: 'var(--color-slate-200)',
        }}>
          {[
            ['Sales channel', 'Shopify', 'brand'],
            ['Location', 'San Francisco, CA'],
            ['Lifetime orders', '4'],
            ['Warranty status', 'Active', 'success'],
          ].map(([k, v, tone], i) => (
            <div key={i} style={{ background: 'white', padding: '10px 14px' }}>
              <div style={{ fontSize: 10.5, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.4, fontWeight: 500 }}>{k}</div>
              <div style={{ marginTop: 4, fontSize: 13, fontWeight: 500, color: '#1E293B' }}>
                {tone ? <Badge tone={tone} dot>{v}</Badge> : v}
              </div>
            </div>
          ))}
        </div>
        {/* products owned */}
        <div style={{ padding: '12px 16px 14px' }}>
          <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.4, fontWeight: 500, marginBottom: 8 }}>Registered products</div>
          {[
            { name: 'Velotric Discover 2', sn: 'VD2-A8421', exp: 'Apr 22, 2028', warn: false },
            { name: 'Velotric Nomad 1 Plus', sn: 'VN1-B2031', exp: 'Jun 10, 2026', warn: true },
          ].map((p, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 10px', marginBottom: 6,
              borderRadius: 6, background: i === 0 ? '#F8FAFC' : 'white',
              border: '1px solid var(--border-default)',
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 5,
                background: 'var(--color-slate-100)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#475569',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6h3l3 8M5 14l4-7h6l3 6"/></svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 500, color: '#1E293B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                <div style={{ fontSize: 11, color: '#64748B', fontFamily: 'var(--font-mono)' }}>{p.sn}</div>
              </div>
              <Badge tone={p.warn ? 'warning' : 'success'} dot>
                {p.warn ? 'Expires soon' : 'Active'}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────── Card 2: Tickets / Claims ───────────── */
function TicketsCard({ active }) {
  // Animated assignment of TS89274 to a dealer
  const tickets = [
    { id: 'TS89281', sub: 'Charging port not working', status: 'Open',      tone: 'info',    assignee: 'Ari M.',     mins: '2m' },
    { id: 'TS89274', sub: 'Replacement requested',     status: 'Assigning', tone: 'warning', assignee: '—',          mins: '6m', highlight: true },
    { id: 'TS89260', sub: 'Frame paint defect',        status: 'Repair',    tone: 'brand',   assignee: 'Northgate',  mins: '18m' },
    { id: 'TS89251', sub: 'Battery underperforming',   status: 'Resolved',  tone: 'success', assignee: 'Jordan B.',  mins: '1h' },
  ];

  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!active) { setPhase(0); return; }
    const t1 = setTimeout(() => setPhase(1), 1100);
    const t2 = setTimeout(() => setPhase(2), 2300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [active]);

  return (
    <div className="pp-card pp-card--tickets" data-active={active}>
      <div className="pp-chrome">
        <div className="pp-chrome-dots"><span /><span /><span /></div>
        <div className="pp-chrome-tab">Claims · All tickets</div>
      </div>
      <div className="pp-body">
        {/* filters row */}
        <div style={{
          display: 'flex', gap: 6, alignItems: 'center',
          padding: '10px 14px 10px',
          borderBottom: '1px solid var(--border-default)',
        }}>
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 10px', background: '#F8FAFC',
            border: '1px solid var(--border-default)', borderRadius: 6,
            fontSize: 12, color: '#94A3B8',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
            Search tickets
          </div>
          {['Open', 'Repair', 'Resolved'].map((f, i) => (
            <span key={i} style={{
              fontSize: 11, fontWeight: 500,
              padding: '6px 10px', borderRadius: 999,
              background: i === 0 ? '#1E293B' : 'transparent',
              color: i === 0 ? 'white' : '#475569',
              border: i === 0 ? 'none' : '1px solid var(--border-default)',
            }}>{f}</span>
          ))}
        </div>
        {/* tickets table */}
        <div>
          {tickets.map((t, i) => {
            const isHighlight = t.highlight;
            const assignee = isHighlight && phase >= 2 ? 'Northgate' : isHighlight && phase === 1 ? '…' : t.assignee;
            const status = isHighlight && phase >= 2 ? 'Repair' : t.status;
            const tone = isHighlight && phase >= 2 ? 'brand' : t.tone;
            return (
              <div key={t.id} style={{
                display: 'grid',
                gridTemplateColumns: '78px 1fr auto auto',
                gap: 10, alignItems: 'center',
                padding: '10px 14px',
                borderBottom: i === tickets.length - 1 ? 'none' : '1px solid var(--color-slate-100)',
                background: isHighlight && phase >= 1 ? 'rgba(36,55,246,0.045)' : 'white',
                transition: 'background 320ms ease',
                position: 'relative',
              }}>
                {isHighlight && phase >= 1 && (
                  <span style={{
                    position: 'absolute', left: 0, top: 4, bottom: 4, width: 3,
                    background: 'var(--color-brand-blue)', borderRadius: '0 3px 3px 0',
                  }} />
                )}
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11.5,
                  color: '#1E293B', fontWeight: 500, letterSpacing: 0.2,
                }}>{t.id}</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 500, color: '#1E293B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.sub}</div>
                  <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 1 }}>
                    Assigned to <span style={{ color: '#475569', fontWeight: 500 }}>{assignee}</span> · {t.mins} ago
                  </div>
                </div>
                <Badge tone={tone} dot>{status}</Badge>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ───────────── Card 3: Analytics Dashboard ───────────── */
function AnalyticsCard({ active }) {
  // Animated number that counts up when active
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) { setCount(0); return; }
    const target = 12482;
    const start = performance.now();
    const dur = 1400;
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  // Bar chart values
  const bars = [38, 52, 44, 61, 58, 72, 68, 79, 84, 76, 88, 94];
  const labels = ['J','F','M','A','M','J','J','A','S','O','N','D'];
  const maxBar = 100;

  return (
    <div className="pp-card pp-card--analytics" data-active={active}>
      <div className="pp-chrome">
        <div className="pp-chrome-dots"><span /><span /><span /></div>
        <div className="pp-chrome-tab">Analytics · Last 12 months</div>
      </div>
      <div className="pp-body">
        {/* KPI row */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1, background: 'var(--border-default)',
          borderBottom: '1px solid var(--border-default)',
        }}>
          {[
            { label: 'Registrations', value: count.toLocaleString(), trend: '+18.2%', tone: 'success' },
            { label: 'Avg resolution', value: '1.4d', trend: '−31%', tone: 'success' },
            { label: 'Upsell revenue', value: '$84.2K', trend: '+42%', tone: 'success' },
          ].map((k, i) => (
            <div key={i} style={{ background: 'white', padding: '12px 14px' }}>
              <div style={{ fontSize: 10.5, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.4, fontWeight: 500 }}>{k.label}</div>
              <div style={{ marginTop: 4, display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: 17, fontWeight: 600, color: '#0F172A', letterSpacing: '-0.3px', fontFamily: 'var(--font-display)' }}>{k.value}</span>
                <span style={{ fontSize: 11, color: 'var(--color-success-text)', fontWeight: 500 }}>{k.trend}</span>
              </div>
            </div>
          ))}
        </div>
        {/* chart area */}
        <div style={{ padding: '14px 14px 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#1E293B' }}>Claim resolutions</div>
              <div style={{ fontSize: 11, color: '#64748B', marginTop: 1 }}>vs. previous period</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 11, color: '#475569' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--color-brand-blue)' }} /> 2026
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--color-slate-200)' }} /> 2025
              </span>
            </div>
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: `repeat(${bars.length}, 1fr)`,
            gap: 4, alignItems: 'end', height: 96,
          }}>
            {bars.map((v, i) => {
              const prev = v - 8 - (i % 3) * 3;
              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%' }}>
                  <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'end', gap: 2 }}>
                    <div style={{
                      flex: 1, height: `${(prev / maxBar) * 100}%`,
                      background: 'var(--color-slate-200)', borderRadius: '2px 2px 0 0',
                    }} />
                    <div style={{
                      flex: 1,
                      height: active ? `${(v / maxBar) * 100}%` : '0%',
                      background: 'linear-gradient(180deg, #4F60FE 0%, #2437F6 100%)',
                      borderRadius: '2px 2px 0 0',
                      transition: `height 900ms cubic-bezier(.16,.84,.44,1) ${i * 60}ms`,
                    }} />
                  </div>
                  <span style={{ fontSize: 9.5, color: '#94A3B8', fontWeight: 500 }}>{labels[i]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Shared card chrome CSS injection */
(function injectPPStyles(){
  if (document.getElementById('pp-styles')) return;
  const s = document.createElement('style');
  s.id = 'pp-styles';
  s.textContent = `
    .pp-card {
      width: 380px;
      background: white;
      border: 1px solid var(--border-default);
      border-radius: 12px;
      box-shadow: var(--shadow-xl);
      overflow: hidden;
      font-family: var(--font-body);
    }
    .pp-chrome {
      display: flex; align-items: center; gap: 12px;
      padding: 10px 14px;
      background: #FAFBFC;
      border-bottom: 1px solid var(--border-default);
    }
    .pp-chrome-dots { display: flex; gap: 6px; }
    .pp-chrome-dots span {
      width: 9px; height: 9px; border-radius: 999px;
      background: #E2E8F0;
    }
    .pp-chrome-dots span:first-child { background: #FF6058; }
    .pp-chrome-dots span:nth-child(2) { background: #FFBC2F; }
    .pp-chrome-dots span:nth-child(3) { background: #2BC840; }
    .pp-chrome-tab {
      font-size: 11.5px;
      color: #64748B;
      font-weight: 500;
    }
    .pp-body { background: white; }
  `;
  document.head.appendChild(s);
})();

Object.assign(window, {
  Badge, CustomerProfileCard, TicketsCard, AnalyticsCard,
});


/* global React, Badge */
var { useEffect, useState } = React;

/* Shared shell — matches portal-previews card style */
function FeatCard({ title, children, width = 420 }) {
  return (
    <div className="pp-card" style={{ width }}>
      <div className="pp-chrome">
        <div className="pp-chrome-dots"><span /><span /><span /></div>
        <div className="pp-chrome-tab">{title}</div>
      </div>
      <div className="pp-body">{children}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PRODUCT 1: REGISTRATION & UPSELL
   ═══════════════════════════════════════════════════════ */

/* 1.1 Omnichannel registration — sources funneling into Dyrect */
function OmnichannelMock({ active }) {
  const sources = [
    { name: 'QR code on packaging', icon: 'qr', count: '4,820', pct: 38 },
    { name: 'Website link',         icon: 'globe', count: '3,140', pct: 25 },
    { name: 'Shopify auto-sync',    icon: 'cart', count: '3,990', pct: 32 },
    { name: 'Amazon import',        icon: 'box', count: '530',   pct: 5 },
  ];
  const Icons = {
    qr:    <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v3M14 21h3M21 17v4h-4"/></>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>,
    cart:  <><circle cx="9" cy="21" r="1.5"/><circle cx="18" cy="21" r="1.5"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></>,
    box:   <><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.3 7 12 12l8.7-5M12 22V12"/></>,
  };
  return (
    <FeatCard title="Registrations · Sources">
      <div style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500 }}>This month</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.5px' }}>12,480 registrations</div>
          </div>
          <Badge tone="success" dot>+18% MoM</Badge>
        </div>
        {sources.map((s, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <span style={{
                width: 28, height: 28, borderRadius: 6,
                background: 'var(--color-brand-blue-subtle)',
                color: 'var(--color-brand-blue-deep)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{Icons[s.icon]}</svg>
              </span>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: '#1E293B' }}>{s.name}</span>
              <span style={{ fontSize: 12, color: '#475569', fontFamily: 'var(--font-mono)' }}>{s.count}</span>
              <span style={{ fontSize: 11.5, color: '#64748B', width: 28, textAlign: 'right' }}>{s.pct}%</span>
            </div>
            <div style={{ height: 5, background: 'var(--color-slate-100)', borderRadius: 999, overflow: 'hidden', marginLeft: 38 }}>
              <div style={{
                height: '100%', width: active ? `${s.pct * 2.5}%` : '0%',
                background: 'linear-gradient(90deg, #4F60FE, #2437F6)',
                borderRadius: 999,
                transition: `width 900ms cubic-bezier(.16,.84,.44,1) ${i * 80}ms`,
              }} />
            </div>
          </div>
        ))}
      </div>
    </FeatCard>
  );
}

/* 1.2 Digital warranty — a warranty card */
function DigitalWarrantyMock({ active }) {
  return (
    <FeatCard title="My warranty · Sarah Chen">
      <div style={{ padding: 16, background: '#F8FAFC' }}>
        {/* warranty card */}
        <div style={{
          borderRadius: 12,
          background: 'linear-gradient(135deg, #1A23A8 0%, #2437F6 60%, #4A5BFE 100%)',
          padding: 18,
          color: 'white',
          position: 'relative', overflow: 'hidden',
        }}>
          <div aria-hidden style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }} />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1.4, textTransform: 'uppercase', opacity: 0.8 }}>Digital warranty</div>
              <img src="/assets/logo-blue-icon.png" alt="" style={{ height: 22, filter: 'brightness(0) invert(1)', opacity: 0.85 }} />
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, letterSpacing: '-0.4px' }}>Velotric Discover 2</div>
            <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <div style={{ fontSize: 10, opacity: 0.7, textTransform: 'uppercase', letterSpacing: 0.8 }}>Serial no.</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500, marginTop: 2 }}>VD2-A8421</div>
              </div>
              <div>
                <div style={{ fontSize: 10, opacity: 0.7, textTransform: 'uppercase', letterSpacing: 0.8 }}>Valid until</div>
                <div style={{ fontSize: 13, fontWeight: 500, marginTop: 2 }}>Apr 22, 2028</div>
              </div>
            </div>
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 11.5, opacity: 0.85 }}>Sarah Chen</div>
              <Badge tone="success" dot>Active</Badge>
            </div>
          </div>
        </div>
        {/* actions */}
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
          {[
            { l: 'File a claim', icon: 'file' },
            { l: 'Track repair', icon: 'truck' },
            { l: 'Extend',       icon: 'plus' },
          ].map((a, i) => (
            <button key={i} style={{
              padding: '10px 8px', borderRadius: 8,
              background: 'white', border: '1px solid var(--border-default)',
              fontSize: 12, fontWeight: 500, color: '#1E293B',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {a.icon === 'file' && <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></>}
                {a.icon === 'truck' && <><path d="M5 18H3V6h13v12h-5"/><circle cx="7.5" cy="18.5" r="2.5"/><circle cx="17.5" cy="18.5" r="2.5"/><path d="M15 8h4l3 4v6h-3"/></>}
                {a.icon === 'plus' && <><path d="M12 5v14M5 12h14"/></>}
              </svg>
              {a.l}
            </button>
          ))}
        </div>
      </div>
    </FeatCard>
  );
}

/* 1.3 Post-registration upsell — cross-sell + discount coupon */
function PostRegUpsellMock({ active }) {
  return (
    <FeatCard title="Velotric · Registration complete">
      <div style={{ padding: 18, background: '#F8FAFC' }}>
        {/* Success banner */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 12px', borderRadius: 10,
          background: 'var(--color-success-subtle)',
          color: 'var(--color-success-text)',
          marginBottom: 14,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Warranty registration successful</div>
            <div style={{ fontSize: 11.5, opacity: 0.8 }}>Discover 2 · 1-year coverage active</div>
          </div>
        </div>

        {/* Coupon card */}
        <div style={{
          background: 'white',
          borderRadius: 12,
          border: '1px dashed var(--color-brand-blue)',
          padding: 14,
          marginBottom: 10,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div aria-hidden style={{
            position: 'absolute', top: '50%', left: -6, transform: 'translateY(-50%)',
            width: 12, height: 12, borderRadius: 999,
            background: '#F8FAFC',
            border: '1px dashed var(--color-brand-blue)',
            clipPath: 'inset(0 0 0 50%)',
          }} />
          <div aria-hidden style={{
            position: 'absolute', top: '50%', right: -6, transform: 'translateY(-50%)',
            width: 12, height: 12, borderRadius: 999,
            background: '#F8FAFC',
            border: '1px dashed var(--color-brand-blue)',
            clipPath: 'inset(0 50% 0 0)',
          }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              width: 34, height: 34, borderRadius: 8,
              background: 'var(--color-brand-blue-subtle)',
              color: 'var(--color-brand-blue-deep)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z"/><circle cx="7" cy="7" r="1.5"/></svg>
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: '#0F172A' }}>10% off your next purchase</div>
              <div style={{ fontSize: 11.5, color: '#64748B' }}>Valid for 30 days · single use</div>
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600,
              padding: '6px 10px', borderRadius: 6,
              background: 'var(--color-brand-blue)', color: 'white',
              letterSpacing: 0.6,
            }}>SWAG10</div>
          </div>
        </div>

        {/* People also bought */}
        <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500, marginBottom: 8, marginTop: 4 }}>
          People also bought
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            { name: 'Velotric helmet',  price: '$59', icon: 'helmet' },
            { name: 'Bike lock combo',  price: '$39', icon: 'lock' },
          ].map((p, i) => (
            <div key={i} style={{
              background: 'white', border: '1px solid var(--border-default)',
              borderRadius: 10, padding: 10,
              display: 'flex', alignItems: 'center', gap: 10,
              position: 'relative',
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 6,
                background: 'linear-gradient(135deg, #F1F5F9, #E2E8F0)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                color: '#475569', flexShrink: 0,
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  {p.icon === 'helmet' && <><path d="M4 14a8 8 0 0 1 16 0v3H4z"/><path d="M4 17h16M8 14V9M16 14V9"/></>}
                  {p.icon === 'lock'   && <><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></>}
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 500, color: '#1E293B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                <div style={{ fontSize: 12, color: 'var(--color-brand-blue-deep)', fontWeight: 600 }}>{p.price}</div>
              </div>
              <button style={{
                width: 26, height: 26, borderRadius: 999,
                background: 'var(--color-brand-blue)', color: 'white',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
              </button>
            </div>
          ))}
        </div>

        {/* Revenue impact */}
        <div style={{
          marginTop: 12,
          padding: '10px 12px',
          borderRadius: 10,
          background: 'white',
          border: '1px solid var(--border-default)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500 }}>Upsell revenue · this month</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: '#0F172A', marginTop: 2, letterSpacing: '-0.3px' }}>$28,293</div>
          </div>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '4px 8px', borderRadius: 999,
            background: 'var(--color-success-subtle)', color: 'var(--color-success-text)',
            fontSize: 11, fontWeight: 600,
          }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 15 6-6 6 6" transform="rotate(180 12 12)"/><path d="M22 7 13.5 15.5 8.5 10.5 2 17"/></svg>
            +84%
          </span>
        </div>
      </div>
    </FeatCard>
  );
}

/* ═══════════════════════════════════════════════════════
   PRODUCT 2: CLAIMS & SERVICE
   ═══════════════════════════════════════════════════════ */

/* 2.1 Serial number validation */
function SerialValidationMock({ active }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!active) { setStep(0); return; }
    const t1 = setTimeout(() => setStep(1), 800);
    const t2 = setTimeout(() => setStep(2), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [active]);
  return (
    <FeatCard title="Claim TS89281 · Validation">
      <div style={{ padding: 18 }}>
        <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500, marginBottom: 6 }}>Serial number</div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '12px 14px',
          background: '#F8FAFC',
          border: '1px solid var(--border-default)',
          borderRadius: 8,
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 500, color: '#0F172A', letterSpacing: 0.5 }}>
            VD2-A8421
          </span>
          <div style={{ flex: 1 }} />
          {step >= 1 && <Badge tone="success" dot>Verified</Badge>}
        </div>
        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { l: 'Serial format check',    ok: step >= 1 },
            { l: 'Manufacturing match',    ok: step >= 1 },
            { l: 'Warranty within window', ok: step >= 2 },
            { l: 'No duplicate claim',     ok: step >= 2 },
          ].map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
              <span style={{
                width: 18, height: 18, borderRadius: 999,
                background: c.ok ? 'var(--color-success-subtle)' : 'var(--color-slate-100)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                color: c.ok ? 'var(--color-success-text)' : '#94A3B8',
              }}>
                {c.ok ? (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                ) : (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"/></svg>
                )}
              </span>
              <span style={{ color: c.ok ? '#1E293B' : '#94A3B8' }}>{c.l}</span>
            </div>
          ))}
        </div>
        {step >= 2 && (
          <div style={{
            marginTop: 14, padding: 12, borderRadius: 8,
            background: 'var(--color-success-subtle)',
            border: '1px solid color-mix(in srgb, var(--color-success) 30%, transparent)',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-success-text)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            <div style={{ fontSize: 13 }}>
              <div style={{ fontWeight: 600, color: 'var(--color-success-text)' }}>Eligible for repair</div>
              <div style={{ color: '#166534', opacity: 0.85, fontSize: 12 }}>Ready to assign to dealer</div>
            </div>
          </div>
        )}
      </div>
    </FeatCard>
  );
}

/* 2.2 Smart ticket routing — auto-assign to the right team member */
function TicketRoutingMock({ active }) {
  return (
    <FeatCard title="Assigning TS89274">
      <div style={{ padding: 18 }}>
        {/* Rule */}
        <div style={{
          padding: '10px 12px', borderRadius: 8,
          background: '#F8FAFC',
          border: '1px solid var(--border-default)',
          display: 'flex', alignItems: 'center', gap: 10,
          marginBottom: 12,
        }}>
          <span style={{
            width: 26, height: 26, borderRadius: 6,
            background: 'var(--color-brand-blue-subtle)',
            color: 'var(--color-brand-blue-deep)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>
            </svg>
          </span>
          <div style={{ flex: 1, fontSize: 12.5, color: '#475569' }}>
            Auto-route: <strong style={{ color: '#0F172A' }}>Battery</strong> · <strong style={{ color: '#0F172A' }}>Priority high</strong> · <strong style={{ color: '#0F172A' }}>West region</strong>
          </div>
        </div>

        {/* Team header */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500 }}>Support team · West</div>
          <span style={{ fontSize: 11, color: '#64748B' }}>3 available</span>
        </div>

        {/* Team members */}
        {[
          { name: 'Ari Mehta',     role: 'Senior agent',  initials: 'AM', color: '#2437F6', skills: ['Battery', 'Motor'],     load: 28,  status: 'Online',  pick: true },
          { name: 'Jordan Becker', role: 'Service agent', initials: 'JB', color: '#0EA5E9', skills: ['Battery', 'Frame'],     load: 64,  status: 'Online' },
          { name: 'Priya Nair',    role: 'Tier 2',        initials: 'PN', color: '#7C3AED', skills: ['Display', 'Electronics'], load: 82, status: 'Away' },
        ].map((m, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: 12, marginBottom: 8,
            borderRadius: 8,
            background: m.pick ? 'rgba(36,55,246,0.04)' : 'white',
            border: `1.5px solid ${m.pick ? 'var(--color-brand-blue)' : 'var(--border-default)'}`,
            position: 'relative',
          }}>
            {/* avatar with online dot */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 999,
                background: `linear-gradient(135deg, ${m.color}, ${m.color}cc)`,
                color: 'white',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 600, fontSize: 13, letterSpacing: '-0.3px',
              }}>{m.initials}</div>
              <span style={{
                position: 'absolute', right: -1, bottom: -1,
                width: 11, height: 11, borderRadius: 999,
                background: m.status === 'Online' ? 'var(--color-success)' : 'var(--color-warning)',
                border: '2px solid white',
              }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 13.5, fontWeight: 600, color: '#0F172A' }}>{m.name}</span>
                {m.pick && <Badge tone="brand" dot>Auto-assigned</Badge>}
              </div>
              <div style={{ fontSize: 11.5, color: '#64748B', marginTop: 2, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                <span>{m.role}</span>
                <span style={{ color: '#CBD5E1' }}>·</span>
                {m.skills.map((s, k) => (
                  <span key={k} style={{
                    padding: '1px 6px', borderRadius: 4,
                    background: 'var(--color-slate-100)', color: '#475569',
                    fontSize: 10.5, fontWeight: 500,
                  }}>{s}</span>
                ))}
              </div>
              {/* workload bar */}
              <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ flex: 1, height: 4, borderRadius: 999, background: 'var(--color-slate-100)', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${m.load}%`,
                    background: m.load > 75 ? 'var(--color-error)' : m.load > 50 ? 'var(--color-warning)' : 'var(--color-success)',
                    borderRadius: 999,
                  }} />
                </div>
                <span style={{ fontSize: 10.5, color: '#94A3B8', minWidth: 40, textAlign: 'right' }}>{m.load}% load</span>
              </div>
            </div>
          </div>
        ))}

        <div style={{
          marginTop: 4, padding: '8px 0 0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontSize: 11.5, color: '#64748B',
        }}>
          <span>Assigned in <strong style={{ color: '#0F172A' }}>2.4s</strong></span>
          <span>SLA · 4 hours</span>
        </div>
      </div>
    </FeatCard>
  );
}

/* 2.3 Service workflow tracking */
function WorkflowMock({ active }) {
  const stages = [
    { l: 'Claim filed',  by: 'Sarah Chen',   t: 'Apr 18, 9:12 AM', done: true },
    { l: 'Validated',    by: 'Auto · system', t: 'Apr 18, 9:13 AM', done: true },
    { l: 'Assigned',     by: 'Northgate Svc', t: 'Apr 18, 9:15 AM', done: true },
    { l: 'Repair started', by: 'Ari Mehta',   t: 'Apr 19, 11:30 AM', done: true, active: true },
    { l: 'Shipped back', by: '—',             t: 'Pending',          done: false },
    { l: 'Resolved',     by: '—',             t: 'Pending',          done: false },
  ];
  return (
    <FeatCard title="TS89260 · Service timeline">
      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#475569' }}>TS89260</span>
          <Badge tone="brand" dot>In repair · Day 2</Badge>
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 11, color: '#64748B' }}>SLA · 3d remaining</span>
        </div>
        <div style={{ position: 'relative', paddingLeft: 18 }}>
          <div style={{ position: 'absolute', left: 7, top: 6, bottom: 6, width: 2, background: 'var(--color-slate-200)' }} />
          {stages.map((s, i) => (
            <div key={i} style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', gap: 14, padding: '6px 0' }}>
              <span style={{
                position: 'absolute', left: -18, top: 6,
                width: 16, height: 16, borderRadius: 999,
                background: s.done ? (s.active ? 'var(--color-brand-blue)' : 'var(--color-success)') : 'white',
                border: s.done ? 'none' : '2px solid var(--color-slate-300)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                color: 'white',
                boxShadow: s.active ? '0 0 0 4px rgba(36,55,246,0.18)' : 'none',
              }}>
                {s.done && !s.active && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: s.active ? 600 : 500, color: s.done ? '#1E293B' : '#94A3B8' }}>{s.l}</div>
                <div style={{ fontSize: 11.5, color: '#64748B', marginTop: 1 }}>{s.by} · {s.t}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FeatCard>
  );
}

/* ═══════════════════════════════════════════════════════
   PRODUCT 3: EXTENDED WARRANTIES
   ═══════════════════════════════════════════════════════ */

/* 3.1 Multi-touchpoint offers — auto-cycling carousel of 5 touchpoints */
function MultiTouchpointMock({ active }) {
  const [idx, setIdx] = useState(0);
  const touchpoints = ['pdp', 'checkout', 'post-purchase', 'registration', 'email'];
  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => setIdx((v) => (v + 1) % touchpoints.length), 2400);
    return () => clearInterval(t);
  }, [active]);

  const TOUCHPOINTS_META = [
    { key: 'pdp',           label: 'Product page',  attach: '12%' },
    { key: 'checkout',      label: 'Checkout',      attach: '18%' },
    { key: 'post-purchase', label: 'Post-purchase', attach: '9%'  },
    { key: 'registration',  label: 'Registration',  attach: '24%' },
    { key: 'email',         label: 'Lifecycle email', attach: '14%' },
  ];

  return (
    <FeatCard title={`Plan offer · ${TOUCHPOINTS_META[idx].label}`}>
      <div style={{ background: '#F8FAFC' }}>
        {/* Stage that holds all 5 scenes */}
        <div style={{
          position: 'relative',
          height: 322,
          overflow: 'hidden',
        }}>
          {touchpoints.map((tp, i) => {
            const offset = i - idx;
            return (
              <div key={tp} style={{
                position: 'absolute', inset: 0,
                padding: 18,
                opacity: offset === 0 ? 1 : 0,
                transform: `translateX(${offset * 24}px)`,
                transition: 'opacity 380ms ease, transform 520ms cubic-bezier(.16,.84,.44,1)',
                pointerEvents: offset === 0 ? 'auto' : 'none',
              }}>
                {tp === 'pdp'           && <ScenePDP />}
                {tp === 'checkout'      && <SceneCheckout />}
                {tp === 'post-purchase' && <ScenePostPurchase />}
                {tp === 'registration'  && <SceneRegistration />}
                {tp === 'email'         && <SceneEmail />}
              </div>
            );
          })}
        </div>

        {/* Footer — touchpoint name + attach rate + dots */}
        <div style={{
          padding: '12px 18px 14px',
          borderTop: '1px solid var(--border-default)',
          background: 'white',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: '#0F172A' }}>
              {TOUCHPOINTS_META[idx].label}
            </div>
            <div style={{ fontSize: 11, color: '#64748B', marginTop: 1 }}>
              {TOUCHPOINTS_META[idx].attach} attach rate
            </div>
          </div>
          {/* Dots */}
          <div style={{ display: 'flex', gap: 6 }}>
            {touchpoints.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} style={{
                width: i === idx ? 18 : 6, height: 6, borderRadius: 999,
                background: i === idx ? 'var(--color-brand-blue)' : 'var(--color-slate-300)',
                transition: 'all 240ms ease',
                padding: 0, cursor: 'pointer',
              }} />
            ))}
          </div>
        </div>
      </div>
    </FeatCard>
  );
}

/* ── Touchpoint scenes ── */

function PlanRow({ years, price, sel, lbl }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '8px 10px', marginBottom: 4,
      borderRadius: 6,
      background: sel ? 'rgba(36,55,246,0.04)' : 'white',
      border: `1.5px solid ${sel ? 'var(--color-brand-blue)' : 'var(--border-default)'}`,
    }}>
      <div style={{
        width: 13, height: 13, borderRadius: 999,
        border: `2px solid ${sel ? 'var(--color-brand-blue)' : '#CBD5E1'}`,
        background: 'white',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        {sel && <span style={{ width: 6, height: 6, background: 'var(--color-brand-blue)', borderRadius: 999 }} />}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11.5, fontWeight: 500, color: '#1E293B' }}>{years}</div>
        {lbl && <div style={{ fontSize: 10, color: sel ? 'var(--color-brand-blue-deep)' : '#64748B' }}>{lbl}</div>}
      </div>
      <div style={{ fontSize: 11.5, fontWeight: 600, color: '#0F172A' }}>{price}</div>
    </div>
  );
}

/* Scene 1: Product page (PDP) */
function ScenePDP() {
  return (
    <div style={{ background: 'white', borderRadius: 10, border: '1px solid var(--border-default)', padding: 12, height: '100%' }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 6,
          background: 'linear-gradient(135deg, #1E293B, #334155)',
          color: 'white',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6h3l3 8M5 14l4-7h6l3 6"/></svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>Velotric Discover 2</div>
          <div style={{ fontSize: 11.5, color: '#64748B' }}>$1,499 · in stock</div>
        </div>
        <span style={{ fontSize: 10, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.4 }}>PDP</span>
      </div>
      <div style={{ fontSize: 10.5, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.4, fontWeight: 500, marginBottom: 6 }}>Protect your purchase</div>
      <PlanRow years="1 year"  price="$0"   />
      <PlanRow years="2 years" price="$79"  sel lbl="Most popular" />
      <PlanRow years="3 years" price="$129" />
      <button style={{
        width: '100%', marginTop: 6,
        padding: '8px 12px', borderRadius: 6,
        background: '#1E293B', color: 'white',
        fontSize: 12, fontWeight: 500,
      }}>Add to cart · $1,578</button>
    </div>
  );
}

/* Scene 2: Checkout */
function SceneCheckout() {
  return (
    <div style={{ background: 'white', borderRadius: 10, border: '1px solid var(--border-default)', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Cart top */}
      <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 600, color: '#0F172A' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1.5"/><circle cx="18" cy="21" r="1.5"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
          Your cart
        </div>
        <span style={{ fontSize: 11, color: '#64748B' }}>1 item · $1,499</span>
      </div>
      {/* Add-on banner */}
      <div style={{ padding: 14, flex: 1 }}>
        <div style={{
          padding: 12, borderRadius: 8,
          background: 'rgba(36,55,246,0.04)',
          border: '1.5px solid var(--color-brand-blue)',
          marginBottom: 8,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ width: 22, height: 22, borderRadius: 6, background: 'var(--color-brand-blue)', color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            </span>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: '#0F172A' }}>Upgrade to extended coverage</span>
          </div>
          <div style={{ fontSize: 11.5, color: '#475569', lineHeight: 1.45 }}>Add 2 more years of accidental damage + battery cover.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
            <button style={{ flex: 1, padding: '8px', borderRadius: 6, background: 'var(--color-brand-blue)', color: 'white', fontSize: 11.5, fontWeight: 500 }}>Add for $79</button>
            <button style={{ padding: '8px 12px', borderRadius: 6, background: 'white', color: '#64748B', fontSize: 11.5, border: '1px solid var(--border-default)' }}>Skip</button>
          </div>
        </div>
        {/* Summary lines */}
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {[
            { l: 'Subtotal',  v: '$1,499' },
            { l: 'Shipping',  v: 'Free' },
            { l: 'Total',     v: '$1,499', bold: true },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: r.bold ? '#0F172A' : '#64748B', fontWeight: r.bold ? 600 : 400 }}>
              <span>{r.l}</span><span>{r.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Scene 3: Post-purchase thank you */
function ScenePostPurchase() {
  return (
    <div style={{ background: 'white', borderRadius: 10, border: '1px solid var(--border-default)', padding: 14, height: '100%' }}>
      <div style={{ textAlign: 'center', padding: '4px 0 10px', borderBottom: '1px solid var(--color-slate-100)' }}>
        <div style={{
          width: 40, height: 40, borderRadius: 999,
          background: 'var(--color-success-subtle)', color: 'var(--color-success-text)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 6,
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>Thanks for your order!</div>
        <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>#3494034034 · ships in 2 days</div>
      </div>
      <div style={{ marginTop: 12, padding: 12, background: 'rgba(36,55,246,0.04)', border: '1px solid var(--color-brand-blue)', borderRadius: 8 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--color-brand-blue-deep)', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 6 }}>One last thing</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>Protect your Discover 2 for $79</div>
        <div style={{ fontSize: 11.5, color: '#475569', marginTop: 4, lineHeight: 1.4 }}>One-time offer for new buyers — covers accidents, batteries, motor.</div>
        <button style={{
          width: '100%', marginTop: 10,
          padding: '8px 12px', borderRadius: 6,
          background: 'var(--color-brand-blue)', color: 'white',
          fontSize: 12, fontWeight: 500,
        }}>Add protection</button>
      </div>
    </div>
  );
}

/* Scene 4: Registration */
function SceneRegistration() {
  return (
    <div style={{ background: 'white', borderRadius: 10, border: '1px solid var(--border-default)', padding: 14, height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{
          width: 28, height: 28, borderRadius: 6,
          background: 'var(--color-success-subtle)', color: 'var(--color-success-text)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        </span>
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: '#0F172A' }}>Warranty activated</div>
          <div style={{ fontSize: 10.5, color: '#64748B' }}>VD2-A8421 · 1-year coverage</div>
        </div>
      </div>
      <div style={{
        padding: 12, borderRadius: 8,
        background: 'linear-gradient(135deg, #1A23A8, #2437F6)',
        color: 'white', position: 'relative', overflow: 'hidden',
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }} />
        <div style={{ position: 'relative' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '3px 8px', borderRadius: 999,
            background: 'rgba(255,255,255,0.16)',
            fontSize: 10, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase',
          }}>
            <span style={{ width: 5, height: 5, borderRadius: 999, background: '#A4AFFE' }} />
            Limited offer · 24h
          </span>
          <div style={{ fontSize: 13.5, fontWeight: 700, marginTop: 8, letterSpacing: '-0.2px' }}>Add 2 more years now</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 6 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, letterSpacing: '-0.5px' }}>$79</span>
            <span style={{ fontSize: 11, opacity: 0.7, textDecoration: 'line-through' }}>$129</span>
            <span style={{ fontSize: 10.5, padding: '2px 6px', borderRadius: 4, background: 'rgba(126,226,161,0.2)', color: '#7EE2A1', fontWeight: 600 }}>SAVE 38%</span>
          </div>
          <button style={{
            width: '100%', marginTop: 10,
            padding: '8px 12px', borderRadius: 6,
            background: 'white', color: 'var(--color-brand-blue-deep)',
            fontSize: 12, fontWeight: 600,
          }}>Add to my plan</button>
        </div>
      </div>
      <div style={{ fontSize: 10.5, color: '#64748B', marginTop: 8, textAlign: 'center' }}>
        Triggered right at warranty activation
      </div>
    </div>
  );
}

/* Scene 5: Lifecycle email */
function SceneEmail() {
  return (
    <div style={{ background: 'white', borderRadius: 10, border: '1px solid var(--border-default)', padding: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Email header */}
      <div style={{ padding: '8px 12px', background: '#F8FAFC', borderBottom: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 22, height: 22, borderRadius: 999, background: 'var(--color-brand-blue)', color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>V</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#1E293B' }}>Velotric &lt;hello@velotric.com&gt;</div>
          <div style={{ fontSize: 10, color: '#64748B' }}>Your warranty expires in 30 days</div>
        </div>
        <span style={{ fontSize: 10, color: '#94A3B8' }}>2m ago</span>
      </div>
      <div style={{ padding: 14, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>Don't lose your coverage</div>
        <div style={{ fontSize: 11.5, color: '#475569', marginTop: 4, lineHeight: 1.45 }}>
          Your Discover 2 warranty ends Apr 22. Renew now and stay covered.
        </div>
        <div style={{
          marginTop: 12, padding: 10,
          background: '#F8FAFC',
          border: '1px solid var(--border-default)',
          borderRadius: 8,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ width: 26, height: 26, borderRadius: 6, background: 'var(--color-brand-blue-subtle)', color: 'var(--color-brand-blue-deep)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#0F172A' }}>Renew 2-year cover</div>
            <div style={{ fontSize: 10.5, color: '#64748B' }}>From <strong style={{ color: '#0F172A' }}>$59/year</strong></div>
          </div>
        </div>
        <button style={{
          marginTop: 'auto', marginTop: 12,
          padding: '9px 12px', borderRadius: 6,
          background: 'var(--color-brand-blue)', color: 'white',
          fontSize: 12, fontWeight: 500,
        }}>Renew warranty →</button>
      </div>
    </div>
  );
}

/* 3.2 Native ecommerce — brand admin view: platform integrations + EW config */
function NativeEcommerceMock({ active }) {
  const platforms = [
    { name: 'Shopify',     dot: '#95BF47', letter: 'S', status: 'Connected', store: '32 stores · 12.4K SKUs', sel: true },
    { name: 'WooCommerce', dot: '#7F54B3', letter: 'W', status: 'Connected', store: '8 stores · 3.2K SKUs' },
    { name: 'Magento',     dot: '#EE672F', letter: 'M', status: 'Connected', store: '2 stores · 980 SKUs' },
  ];
  return (
    <FeatCard title="Settings · Ecommerce integrations">
      <div style={{ padding: 14 }}>
        <div style={{ fontSize: 10.5, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500, marginBottom: 6 }}>
          Connected platforms
        </div>
        {platforms.map((p, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 10px', marginBottom: 5,
            borderRadius: 7,
            background: p.sel ? 'rgba(36,55,246,0.04)' : 'white',
            border: `1.5px solid ${p.sel ? 'var(--color-brand-blue)' : 'var(--border-default)'}`,
          }}>
            <span style={{
              width: 26, height: 26, borderRadius: 6,
              background: p.dot, color: 'white',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700,
              flexShrink: 0,
            }}>{p.letter}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: '#0F172A' }}>{p.name}</div>
              <div style={{ fontSize: 10.5, color: '#64748B', marginTop: 1 }}>{p.store}</div>
            </div>
            <Badge tone="success" dot>Connected</Badge>
          </div>
        ))}

        <div style={{
          marginTop: 6,
          padding: '7px 10px', borderRadius: 7,
          background: '#F8FAFC',
          border: '1px solid var(--border-default)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 7.5 4M21 12a9 9 0 0 1-9 9 9 9 0 0 1-7.5-4"/>
            <path d="m17 8 2-4 2 4M7 16l-2 4-2-4"/>
          </svg>
          <div style={{ flex: 1, fontSize: 11.5, color: '#475569' }}>
            <strong style={{ color: '#0F172A' }}>Auto-syncing</strong> 16.6K SKUs · 2m ago
          </div>
        </div>

        <div style={{ marginTop: 12, fontSize: 10.5, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500, marginBottom: 6 }}>
          Offer extended warranty on
        </div>
        <div style={{
          background: 'white',
          border: '1px solid var(--border-default)',
          borderRadius: 7,
          overflow: 'hidden',
        }}>
          {[
            { l: 'Shopify product pages', on: true,  meta: 'Inline plan picker' },
            { l: 'Shopify checkout',      on: true,  meta: 'Cart add-on step' },
            { l: 'WooCommerce checkout',  on: false, meta: 'Not enabled' },
          ].map((row, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '7px 10px',
              borderTop: i === 0 ? 'none' : '1px solid var(--color-slate-100)',
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: '#1E293B' }}>{row.l}</div>
                <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 1 }}>{row.meta}</div>
              </div>
              <span style={{
                position: 'relative', width: 28, height: 16,
                borderRadius: 999,
                background: row.on ? 'var(--color-brand-blue)' : 'var(--color-slate-300)',
                transition: 'background 160ms',
                flexShrink: 0,
              }}>
                <span style={{
                  position: 'absolute', top: 2, left: row.on ? 14 : 2,
                  width: 12, height: 12, borderRadius: 999,
                  background: 'white',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.20)',
                  transition: 'left 160ms',
                }} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </FeatCard>
  );
}

/* 3.3 Self-serve plan management */
function SelfServePlansMock({ active }) {
  const plans = [
    { name: 'Velotric Discover 2',  type: '2-year extended', exp: 'Apr 22, 2028', state: 'Active',  tone: 'success' },
    { name: 'Velotric Nomad 1 Plus', type: 'Standard warranty', exp: 'Jun 10, 2026', state: 'Renew available', tone: 'warning' },
  ];
  return (
    <FeatCard title="My plans · Sarah Chen">
      <div style={{ padding: 16, background: '#F8FAFC' }}>
        <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500, marginBottom: 10 }}>Protection plans</div>
        {plans.map((p, i) => (
          <div key={i} style={{
            background: 'white', borderRadius: 10,
            border: '1px solid var(--border-default)',
            padding: 14, marginBottom: 10,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: '#0F172A' }}>{p.name}</div>
              <Badge tone={p.tone} dot>{p.state}</Badge>
            </div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>{p.type} · expires {p.exp}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <button style={{
                padding: '6px 10px', borderRadius: 6,
                background: i === 1 ? 'var(--color-brand-blue)' : 'white',
                color: i === 1 ? 'white' : '#475569',
                fontSize: 12, fontWeight: 500,
                border: i === 1 ? 'none' : '1px solid var(--border-default)',
              }}>{i === 1 ? 'Renew now' : 'View details'}</button>
              {i === 0 && (
                <button style={{
                  padding: '6px 10px', borderRadius: 6,
                  background: 'transparent', color: '#475569',
                  fontSize: 12, fontWeight: 500,
                  border: '1px solid var(--border-default)',
                }}>File a claim</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </FeatCard>
  );
}

/* ═══════════════════════════════════════════════════════
   PRODUCT 4: INSIGHTS & ANALYTICS
   ═══════════════════════════════════════════════════════ */

/* 4.1 Warranty performance — reuses Analytics-like layout */
function PerformanceMock({ active }) {
  const bars = [38, 52, 44, 61, 58, 72, 68, 79, 84, 76, 88, 94];
  const labels = ['J','F','M','A','M','J','J','A','S','O','N','D'];
  const maxBar = 100;
  return (
    <FeatCard title="Performance · Last 12 months">
      <div style={{ padding: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 14 }}>
          {[
            { l: 'Registration rate', v: '84%',   t: '+12pp' },
            { l: 'Avg resolution',    v: '1.4d',  t: '−31%' },
            { l: 'Claim rate',        v: '3.2%',  t: '−0.8pp' },
          ].map((k, i) => (
            <div key={i} style={{ background: '#F8FAFC', border: '1px solid var(--border-default)', borderRadius: 8, padding: 10 }}>
              <div style={{ fontSize: 10, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.4, fontWeight: 500 }}>{k.l}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginTop: 4 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.3px' }}>{k.v}</span>
                <span style={{ fontSize: 10.5, color: 'var(--color-success-text)', fontWeight: 500 }}>{k.t}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#1E293B', marginBottom: 6 }}>Resolutions by month</div>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${bars.length}, 1fr)`, gap: 4, alignItems: 'end', height: 110 }}>
          {bars.map((v, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%' }}>
              <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'end' }}>
                <div style={{
                  width: '100%', height: active ? `${(v / maxBar) * 100}%` : '0%',
                  background: 'linear-gradient(180deg, #4F60FE 0%, #2437F6 100%)',
                  borderRadius: '3px 3px 0 0',
                  transition: `height 900ms cubic-bezier(.16,.84,.44,1) ${i * 50}ms`,
                }} />
              </div>
              <span style={{ fontSize: 9.5, color: '#94A3B8', fontWeight: 500 }}>{labels[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </FeatCard>
  );
}

/* 4.2 Defect trend detection */
function DefectTrendMock({ active }) {
  const series = [12, 11, 14, 13, 15, 17, 24, 38, 52, 61, 58, 64];
  const max = 70;
  return (
    <FeatCard title="Defects · Alert">
      <div style={{ padding: 16 }}>
        <div style={{
          padding: 12, borderRadius: 8,
          background: 'var(--color-error-subtle)',
          border: '1px solid color-mix(in srgb, var(--color-error) 30%, transparent)',
          marginBottom: 14,
          display: 'flex', alignItems: 'flex-start', gap: 10,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-error-text)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
            <path d="m21.7 17.1-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 20h16a2 2 0 0 0 1.7-3z"/><path d="M12 9v4M12 17h.01"/>
          </svg>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-error-text)' }}>Defect spike detected</div>
            <div style={{ fontSize: 12, color: '#991B1B', opacity: 0.85, marginTop: 2 }}>
              VD2 batteries · 4.2× normal rate over last 30 days
            </div>
          </div>
        </div>
        <div style={{ fontSize: 11.5, color: '#64748B', marginBottom: 4 }}>Claim rate · Velotric Discover 2</div>
        <div style={{ position: 'relative', height: 90, display: 'grid', gridTemplateColumns: `repeat(${series.length}, 1fr)`, gap: 4, alignItems: 'end' }}>
          {series.map((v, i) => {
            const spike = i >= 6;
            return (
              <div key={i} style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'end' }}>
                <div style={{
                  width: '100%', height: active ? `${(v / max) * 100}%` : '0%',
                  background: spike ? 'linear-gradient(180deg, #FB7185, #EF4444)' : 'var(--color-slate-300)',
                  borderRadius: '3px 3px 0 0',
                  transition: `height 700ms cubic-bezier(.16,.84,.44,1) ${i * 40}ms`,
                }} />
              </div>
            );
          })}
          {/* threshold line */}
          <div style={{
            position: 'absolute', left: 0, right: 0, top: '70%', height: 1,
            background: 'repeating-linear-gradient(90deg, #94A3B8, #94A3B8 4px, transparent 4px, transparent 8px)',
          }} />
        </div>
        <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11.5 }}>
          <span style={{ color: '#64748B' }}>Threshold: 20 claims/mo</span>
          <button style={{
            padding: '6px 10px', borderRadius: 6,
            background: 'var(--color-brand-blue)', color: 'white',
            fontSize: 12, fontWeight: 500,
          }}>Investigate root cause →</button>
        </div>
      </div>
    </FeatCard>
  );
}

/* 4.3 Revenue opportunity */
function RevenueOppMock({ active }) {
  const opps = [
    { who: 'Sarah Chen',   prod: 'Velotric Nomad 1+', daysOut: 24, value: '$129', score: 92 },
    { who: 'Marco Diaz',   prod: 'Velotric T1',       daysOut: 32, value: '$79',  score: 87 },
    { who: 'Lin Tao',      prod: 'Velotric Fold',     daysOut: 41, value: '$129', score: 81 },
    { who: 'Priya Iyer',   prod: 'Velotric Discover', daysOut: 58, value: '$79',  score: 74 },
  ];
  return (
    <FeatCard title="Revenue opportunities">
      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500 }}>Warranty expiring · Next 60d</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.5px' }}>$48,210 potential</div>
          </div>
          <Badge tone="brand" dot>419 customers</Badge>
        </div>
        <div style={{ borderTop: '1px solid var(--border-default)' }}>
          {opps.map((o, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1fr auto auto auto',
              gap: 10, alignItems: 'center',
              padding: '10px 0',
              borderBottom: i === opps.length - 1 ? 'none' : '1px solid var(--color-slate-100)',
            }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#1E293B' }}>{o.who}</div>
                <div style={{ fontSize: 11, color: '#64748B' }}>{o.prod} · {o.daysOut}d to expire</div>
              </div>
              <div style={{ fontSize: 11, color: '#475569' }}>
                <span style={{ fontWeight: 600 }}>{o.score}</span>/100
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--color-brand-blue-deep)' }}>{o.value}</div>
              <button style={{
                padding: '4px 8px', borderRadius: 6,
                background: 'var(--color-brand-blue-subtle)', color: 'var(--color-brand-blue-deep)',
                fontSize: 11, fontWeight: 500,
              }}>Reach out →</button>
            </div>
          ))}
        </div>
      </div>
    </FeatCard>
  );
}

Object.assign(window, {
  OmnichannelMock, DigitalWarrantyMock, PostRegUpsellMock,
  SerialValidationMock, TicketRoutingMock, WorkflowMock,
  MultiTouchpointMock, NativeEcommerceMock, SelfServePlansMock,
  PerformanceMock, DefectTrendMock, RevenueOppMock,
});


/* global React, Badge */
var { useEffect: __pe, useState: __ps } = React;

/* ───────────── Marketer: Audience builder ─────────────
   "You have thousands of buyers you cannot reach"
   Visualizes first-party contact capture from offline/marketplace channels
   plus one-click sync to marketing tools. */
function MarketerAudienceMock({ active }) {
  const [count, setCount] = __ps(0);
  __pe(() => {
    if (!active) { setCount(0); return; }
    const target = 12482;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / 1300);
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  const sources = [
    { name: 'Amazon',        captured: 4820, pct: 38, c: '#FF9900' },
    { name: 'Offline retail', captured: 3140, pct: 25, c: '#475569' },
    { name: 'Distributor',   captured: 1990, pct: 16, c: '#7C3AED' },
    { name: 'Shopify',       captured: 2532, pct: 21, c: '#95BF47' },
  ];

  return (
    <div className="pp-card" style={{ width: 420 }}>
      <div className="pp-chrome">
        <div className="pp-chrome-dots"><span /><span /><span /></div>
        <div className="pp-chrome-tab">Audience · First-party contacts</div>
      </div>
      <div className="pp-body" style={{ padding: 0 }}>
        {/* Hero count */}
        <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border-default)' }}>
          <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500 }}>
            Contacts captured · This quarter
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 4 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.8px' }}>
              {count.toLocaleString()}
            </span>
            <Badge tone="success" dot>+18% MoM</Badge>
          </div>
          <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>
            From channels your brand had no record of before
          </div>
        </div>

        {/* Sources */}
        <div style={{ padding: '14px 18px 4px' }}>
          <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500, marginBottom: 8 }}>
            Captured from
          </div>
          {sources.map((s, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: s.c }} />
                <span style={{ fontWeight: 500, color: '#1E293B' }}>{s.name}</span>
                <div style={{ flex: 1 }} />
                <span style={{ fontFamily: 'var(--font-mono)', color: '#475569' }}>{s.captured.toLocaleString()}</span>
                <span style={{ color: '#64748B', width: 28, textAlign: 'right' }}>{s.pct}%</span>
              </div>
              <div style={{ marginTop: 4, height: 4, background: 'var(--color-slate-100)', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: active ? `${s.pct * 2.5}%` : '0%',
                  background: s.c, borderRadius: 999,
                  transition: `width 800ms cubic-bezier(.16,.84,.44,1) ${i * 100}ms`,
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Sync row */}
        <div style={{
          padding: '12px 18px 16px',
          borderTop: '1px solid var(--color-slate-100)',
        }}>
          <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500, marginBottom: 8 }}>
            Sync audiences to
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
            {[
              { l: 'Klaviyo',   c: '#000000', t: 'K' },
              { l: 'Mailchimp', c: '#FFE01B', t: 'M', dark: true },
              { l: 'HubSpot',   c: '#FF7A59', t: 'H' },
            ].map((tool, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 10px', borderRadius: 8,
                background: 'white',
                border: '1px solid var(--border-default)',
              }}>
                <span style={{
                  width: 24, height: 24, borderRadius: 6,
                  background: tool.c, color: tool.dark ? '#0F172A' : 'white',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 12, fontFamily: 'var(--font-display)',
                }}>{tool.t}</span>
                <span style={{ fontSize: 12, fontWeight: 500, color: '#1E293B' }}>{tool.l}</span>
                <div style={{ flex: 1 }} />
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────── Warranty manager: Unified inbox ─────────────
   "Your claims process was not built to scale"
   Shows scattered channels (WhatsApp, email, phone) converging into
   a structured queue with automated status. */
function WarrantyInboxMock({ active }) {
  const channels = [
    { src: 'WhatsApp', icon: 'whatsapp', c: '#25D366', count: 14 },
    { src: 'Email',    icon: 'mail',     c: '#EA4335', count: 22 },
    { src: 'Phone',    icon: 'phone',    c: '#3B82F6', count: 8 },
    { src: 'Web form', icon: 'globe',    c: '#475569', count: 11 },
  ];
  const tickets = [
    { id: 'TS89281', from: 'WhatsApp', who: 'Marco Diaz',  sub: 'Charging port not working', sla: 'Open · 12m',  tone: 'info' },
    { id: 'TS89279', from: 'Email',    who: 'Lin Tao',     sub: 'Battery replacement',       sla: 'Routed · 2m', tone: 'brand' },
    { id: 'TS89274', from: 'WhatsApp', who: 'Sarah Chen',  sub: 'Replacement requested',     sla: 'Repair',      tone: 'success' },
  ];
  return (
    <div className="pp-card" style={{ width: 420 }}>
      <div className="pp-chrome">
        <div className="pp-chrome-dots"><span /><span /><span /></div>
        <div className="pp-chrome-tab">Unified inbox · Today</div>
      </div>
      <div className="pp-body" style={{ padding: 0 }}>
        {/* Channel intake row */}
        <div style={{
          padding: '12px 14px',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8,
          borderBottom: '1px solid var(--border-default)',
        }}>
          {channels.map((c, i) => (
            <div key={i} style={{
              padding: '8px 10px', borderRadius: 8,
              background: '#F8FAFC', border: '1px solid var(--border-default)',
              display: 'flex', flexDirection: 'column', gap: 4,
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{
                  width: 18, height: 18, borderRadius: 5,
                  background: c.c, color: 'white',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {c.icon === 'whatsapp' && <><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9z"/><path d="M9 10a3 3 0 0 0 6 0"/></>}
                    {c.icon === 'mail'     && <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>}
                    {c.icon === 'phone'    && <path d="M22 16.9v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.26-1.26a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.9z"/>}
                    {c.icon === 'globe'    && <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>}
                  </svg>
                </span>
                <span style={{ fontSize: 11.5, color: '#475569', fontWeight: 500 }}>{c.src}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.4px' }}>{c.count}</div>
            </div>
          ))}
        </div>

        {/* Funnel arrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: '#F8FAFC', borderBottom: '1px solid var(--border-default)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 4h18l-7 9v6l-4 2v-8z"/>
          </svg>
          <span style={{ fontSize: 12, color: '#475569' }}>
            Auto-validated · routed by SLA + skill
          </span>
          <div style={{ flex: 1 }} />
          <Badge tone="success" dot>0 manual</Badge>
        </div>

        {/* Structured queue */}
        <div>
          {tickets.map((t, i) => (
            <div key={t.id} style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr auto',
              gap: 10, alignItems: 'center',
              padding: '11px 14px',
              borderBottom: i === tickets.length - 1 ? 'none' : '1px solid var(--color-slate-100)',
            }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: '#1E293B', fontWeight: 500 }}>{t.id}</div>
                <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 1 }}>from {t.from}</div>
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#1E293B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.sub}</div>
                <div style={{ fontSize: 11.5, color: '#64748B', marginTop: 1 }}>{t.who}</div>
              </div>
              <Badge tone={t.tone} dot>{t.sla}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────── Business owner: P&L view ─────────────
   "Your after-sales operation costs money and earns none"
   Shows warranty cost line vs new revenue line crossing into the green. */
function BusinessOwnerPLMock({ active }) {
  // Two series — claim cost (down) and EW revenue (up)
  const cost    = [62, 64, 60, 58, 55, 52, 49, 46, 44, 42, 40, 38];
  const revenue = [12, 18, 22, 26, 34, 41, 50, 58, 68, 76, 84, 92];
  const maxY = 100;
  const w = 360, h = 130, padL = 8, padR = 8, padT = 8, padB = 18;
  const pts = (arr) =>
    arr.map((v, i) => {
      const x = padL + (i / (arr.length - 1)) * (w - padL - padR);
      const y = padT + (1 - v / maxY) * (h - padT - padB);
      return [x, y];
    });
  const toPath = (arr) => pts(arr).map(([x, y], i) => (i === 0 ? `M${x},${y}` : `L${x},${y}`)).join(' ');
  const toArea = (arr) => {
    const p = pts(arr);
    const last = p[p.length - 1];
    const first = p[0];
    return `${toPath(arr)} L${last[0]},${h - padB} L${first[0]},${h - padB} Z`;
  };

  return (
    <div className="pp-card" style={{ width: 420 }}>
      <div className="pp-chrome">
        <div className="pp-chrome-dots"><span /><span /><span /></div>
        <div className="pp-chrome-tab">Warranty P&L · Last 12 months</div>
      </div>
      <div className="pp-body" style={{ padding: 0 }}>
        {/* KPI row */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1, background: 'var(--border-default)',
          borderBottom: '1px solid var(--border-default)',
        }}>
          {[
            { l: 'Claim cost',    v: '$38K',  t: '−39%',  tone: 'success-text' },
            { l: 'EW revenue',    v: '$92K',  t: '+670%', tone: 'success-text' },
            { l: 'Net contribution', v: '+$54K', t: 'was −$50K', tone: 'success-text' },
          ].map((k, i) => (
            <div key={i} style={{ background: 'white', padding: '12px 14px' }}>
              <div style={{ fontSize: 10.5, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.4, fontWeight: 500 }}>{k.l}</div>
              <div style={{ marginTop: 4, display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.3px' }}>{k.v}</span>
                <span style={{ fontSize: 11, color: 'var(--color-success-text)', fontWeight: 500 }}>{k.t}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div style={{ padding: '14px 14px 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#1E293B' }}>Warranty P&L by month</div>
              <div style={{ fontSize: 11, color: '#64748B', marginTop: 1 }}>cost out vs revenue in</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 11, color: '#475569' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 10, height: 2, background: '#EF4444' }} /> Cost
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 10, height: 2, background: 'var(--color-success)' }} /> Revenue
              </span>
            </div>
          </div>
          <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none">
            {/* grid */}
            {[0, 1, 2, 3].map((j) => (
              <line key={j}
                x1={padL} x2={w - padR}
                y1={padT + (j / 3) * (h - padT - padB)}
                y2={padT + (j / 3) * (h - padT - padB)}
                stroke="var(--color-slate-100)" strokeWidth="1" />
            ))}
            {/* areas */}
            <path d={toArea(cost)} fill="rgba(239,68,68,0.10)" />
            <path d={toArea(revenue)} fill="rgba(10,190,82,0.12)" />
            {/* lines, animated */}
            <path d={toPath(cost)} fill="none" stroke="#EF4444" strokeWidth="2"
              strokeDasharray="600" strokeDashoffset={active ? 0 : 600}
              style={{ transition: 'stroke-dashoffset 1100ms cubic-bezier(.16,.84,.44,1)' }} />
            <path d={toPath(revenue)} fill="none" stroke="var(--color-success)" strokeWidth="2.4"
              strokeDasharray="600" strokeDashoffset={active ? 0 : 600}
              style={{ transition: 'stroke-dashoffset 1100ms cubic-bezier(.16,.84,.44,1) 250ms' }} />
            {/* end-cap dot for revenue */}
            {(() => {
              const last = pts(revenue).slice(-1)[0];
              return active && <circle cx={last[0]} cy={last[1]} r="3.5" fill="var(--color-success)" stroke="white" strokeWidth="2" />;
            })()}
            {/* x labels (sparse) */}
            {['J','M','M','J','S','N'].map((lbl, j) => (
              <text key={j} x={padL + ((j * 2) / 11) * (w - padL - padR)} y={h - 4}
                fontSize="9" fill="#94A3B8" textAnchor="middle"
                fontFamily="var(--font-body)">{lbl}</text>
            ))}
          </svg>
        </div>

        {/* Crossover callout */}
        <div style={{
          padding: '10px 14px 14px',
          display: 'flex', alignItems: 'center', gap: 10,
          borderTop: '1px solid var(--color-slate-100)',
        }}>
          <span style={{
            width: 26, height: 26, borderRadius: 8,
            background: 'var(--color-success-subtle)',
            color: 'var(--color-success-text)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M22 7 13.5 15.5 8.5 10.5 2 17"/><path d="M16 7h6v6"/></svg>
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--color-success-text)' }}>Crossed into profit in July</div>
            <div style={{ fontSize: 11.5, color: '#64748B', marginTop: 1 }}>EW revenue overtook claim costs · sustained for 6 months</div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  MarketerAudienceMock, WarrantyInboxMock, BusinessOwnerPLMock,
});


/* global React */
/* Shared site navigation — used by Home Page + every product page.
   - Hover-triggered mega-menu panels (Products, Solutions, Resources, Free Tools)
   - Mobile drawer below 980px
   - `activeProduct` prop highlights current product link in Products mega-menu
     ('product-registration' | 'warranty-claims' | 'extended-warranties' | undefined)
*/
var { useEffect: snUE, useState: snUS, useRef: snUR } = React;

const DYRECT_URLS = {
  home: '/',
  contact: 'https://www.dyrect.co/contact-us',
  pricing: '/pricing',
  showcase: 'https://www.dyrect.co/showcase',
  features: '/features',
  faqs: 'https://www.dyrect.co/faqs',
  blog: 'https://www.dyrect.co/blog',
  integrations: 'https://www.dyrect.co/integrations',
  caseStudies: 'https://www.dyrect.co/case-studies',
  helpCenter: 'https://help.dyrect.co/',
  partners: 'https://www.dyrect.co/partners-directory',
  security: 'https://www.dyrect.co/privacy-policy',
  status: 'https://status.dyrect.co/',
  warranty: 'https://www.dyrect.co/warranty',
  privacy: 'https://www.dyrect.co/privacy-policy',
  terms: 'https://www.dyrect.co/terms-conditions',
  productRegistration: '/product/product-registration-software',
  warrantyManagement: '/product/warranty-management-software',
  extendedWarranties: '/product/extended-warranties',
  productRegistrationLive: 'https://www.dyrect.co/product/product-registration-software',
  warrantyManagementLive: 'https://www.dyrect.co/product/warranty-management-software',
  warrantyRegistrationLive: 'https://www.dyrect.co/product/warranty-registration-software',
  postSalesExperience: 'https://www.dyrect.co/product/post-sales-experience-management-software',
  ownershipExperience: 'https://www.dyrect.co/product/ownership-experience-software',
  experienceBuilder: '/features#experience-builder',
  claimsManagement: '/features#claims-management',
  digitalWarrantyCard: '/features#digital-warranty-card',
  productSerialization: '/features#product-serialization',
  productManual: '/features#digital-product-manuals',
  formBuilder: '/features#form-builder',
  bulkQr: 'https://www.dyrect.co/bulk-qr-code-generator',
  serialNumber: 'https://www.dyrect.co/serial-number-generator',
  warrantyCost: 'https://www.dyrect.co/warranty-cost-calculator',
  shopifyWarranty: 'https://www.dyrect.co/warranty-registration-for-shopify',
  googleFormsComparison: 'https://www.dyrect.co/comparison/google-forms-vs-dyrect',
  leafletComparison: 'https://www.dyrect.co/comparison/manual-leaflet-vs-dyrect',
  websiteFormsComparison: 'https://www.dyrect.co/comparison/website-forms-vs-dyrect',
  howItWorksVideo: 'https://www.youtube.com/watch?v=qVzSytxsffY',
  howItWorksEmbed: 'https://www.youtube.com/embed/qVzSytxsffY?autoplay=1&rel=0&modestbranding=1',
};

const SOLUTION_LINKS = [
  { label: 'Electronics', href: '/solutions/electronics' },
  { label: 'Outdoors & Recreation', href: '/solutions/outdoors-recreation' },
  { label: 'Baby Gear', href: '/solutions/baby-gear' },
  { label: 'Beauty and Personal Care', href: '/solutions/beauty-personal-care' },
  { label: 'Mobile Accessories', href: '/solutions/mobile-accessories' },
  { label: 'Household Appliances', href: '/solutions/home-appliances' },
  { label: 'T.V, Audio and Video', href: '/solutions/tv-audio-video' },
  { label: 'Exercise and Fitness', href: '/solutions/exercise-fitness' },
  { label: 'Furniture', href: '/solutions/furniture' },
  { label: 'Smart Home and Network', href: '/solutions/smart-home-and-network' },
  { label: 'Cycling', href: '/solutions/cycling' },
];

const PRODUCT_LINKS = [
  { key: 'product-registration', icon: 'qr',
    name: 'Product Registration Software',
    desc: 'Provide omni-channel, delightful experience at scale.',
    href: DYRECT_URLS.productRegistration },
  { key: 'warranty-claims', icon: 'shield',
    name: 'Warranty Management Software',
    desc: 'Save costs, reduce overheads with faster, accurate claims processing.',
    href: DYRECT_URLS.warrantyManagement },
  { key: 'extended-warranties', icon: 'umbrella',
    name: 'Extended Warranties',
    desc: 'Offer protection plans across more touchpoints. Keep 100% of revenue in-house.',
    href: DYRECT_URLS.extendedWarranties },
];

const NAV_ITEMS = [
  {
    label: 'Products', menu: 'products', href: DYRECT_URLS.productRegistration,
    content: {
      type: 'two-col',
      left: { heading: 'Products', items: PRODUCT_LINKS },
      right: {
        heading: 'Features',
        items: [
          { label: 'No-code Experience Builder', href: DYRECT_URLS.experienceBuilder },
          { label: 'Claims Management', href: DYRECT_URLS.claimsManagement },
          { label: 'Digital Warranty Card', href: DYRECT_URLS.digitalWarrantyCard },
          { label: 'Product Serialization', href: DYRECT_URLS.productSerialization },
          { label: 'Digitize Product Manuals & Guides', href: DYRECT_URLS.productManual },
          { label: 'Powerful Form Builder', href: DYRECT_URLS.formBuilder },
        ],
        cta: 'See more features',
        ctaHref: DYRECT_URLS.features,
      },
    },
  },
  {
    label: 'Solutions', menu: 'solutions', href: '/solutions/electronics',
    content: {
      type: 'grid-2',
      heading: 'Industry',
      items: SOLUTION_LINKS,
    },
  },
  { label: 'Showcase', href: DYRECT_URLS.showcase },
  { label: 'Pricing', href: DYRECT_URLS.pricing },
  {
    label: 'Resources', menu: 'resources', href: DYRECT_URLS.blog,
    content: {
      type: 'simple-list',
      items: [
        { label: 'Help Center', href: DYRECT_URLS.helpCenter },
        { label: 'Blogs', href: DYRECT_URLS.blog },
        { label: 'Integrations', href: DYRECT_URLS.integrations },
        { label: 'Client Success Stories', href: DYRECT_URLS.caseStudies },
        { label: 'How it Works', href: DYRECT_URLS.howItWorksVideo, video: true },
        { label: "FAQ's", href: DYRECT_URLS.faqs },
      ],
    },
  },
  {
    label: 'Free Tools', menu: 'free-tools', href: DYRECT_URLS.warranty,
    content: {
      type: 'simple-list',
      items: [
        { label: 'Brand Warranties', href: DYRECT_URLS.warranty },
        { label: 'Bulk QR Code Generator', href: DYRECT_URLS.bulkQr },
        { label: 'Serial Number Generator', href: DYRECT_URLS.serialNumber },
        { label: 'Warranty Cost Calculator', href: DYRECT_URLS.warrantyCost },
      ],
    },
  },
];

function openHowItWorksVideo(e) {
  if (e && typeof e.preventDefault === 'function') e.preventDefault();
  const isMobileViewport = window.matchMedia && window.matchMedia('(max-width: 780px)').matches;
  if (isMobileViewport) {
    window.location.href = DYRECT_URLS.howItWorksVideo;
    return;
  }
  window.dispatchEvent(new CustomEvent('dyrect:open-video'));
}

function HowItWorksVideoModal() {
  const [open, setOpen] = snUS(false);
  snUE(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('dyrect:open-video', onOpen);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('dyrect:open-video', onOpen);
      window.removeEventListener('keydown', onKey);
    };
  }, []);
  snUE(() => {
    if (open) document.body.classList.add('video-modal-open');
    else document.body.classList.remove('video-modal-open');
    return () => document.body.classList.remove('video-modal-open');
  }, [open]);
  return (
    <div
      className={`video-modal-backdrop ${open ? 'is-open' : ''}`}
      aria-hidden={!open}
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
    >
      <div className="video-modal-dialog" role="dialog" aria-modal="true" aria-label="How Dyrect works">
        <button className="video-modal-close" aria-label="Close video" onClick={() => setOpen(false)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
        <div className="video-modal-frame">
          {open && (
            <iframe
              src={DYRECT_URLS.howItWorksEmbed}
              title="How Dyrect works"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </div>
  );
}

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
          {content.right.items.map((it, i) => (
            <a key={i} href={it.href || '#'} style={{
              padding: '8px 10px', borderRadius: 6,
              fontSize: 14, fontWeight: 500, color: '#1E293B',
              transition: 'all 160ms',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-slate-50)'; e.currentTarget.style.color = 'var(--color-brand-blue)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1E293B'; }}>
              {it.label || it}
            </a>
          ))}
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
        {content.items.map((it, i) => (
          <a key={i} href={it.href || '#'} style={{
            padding: '9px 10px', borderRadius: 6,
            fontSize: 14, fontWeight: 500, color: '#1E293B',
            transition: 'all 160ms',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-slate-50)'; e.currentTarget.style.color = 'var(--color-brand-blue)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1E293B'; }}>
            {it.label || it}
          </a>
        ))}
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
          onClick={it.video ? openHowItWorksVideo : undefined}
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
                      <>
                        <div style={{
                          padding: '10px 12px 4px',
                          fontSize: 10.5,
                          fontWeight: 700,
                          color: '#94A3B8',
                          letterSpacing: 1.2,
                          textTransform: 'uppercase',
                        }}>{item.content.left.heading}</div>
                        {item.content.left.items.map((it, i) => {
                          const active = activeProduct && it.key === activeProduct;
                          return (
                            <a key={`left-${i}`} href={it.href || '#'} style={{
                              display: 'block', padding: '10px 12px',
                              fontSize: 14, color: active ? 'var(--color-brand-blue)' : '#475569',
                              fontWeight: active ? 600 : 500, borderRadius: 6,
                            }}>{it.name}</a>
                          );
                        })}
                        <div style={{
                          padding: '14px 12px 4px',
                          fontSize: 10.5,
                          fontWeight: 700,
                          color: '#94A3B8',
                          letterSpacing: 1.2,
                          textTransform: 'uppercase',
                        }}>{item.content.right.heading}</div>
                        {item.content.right.items.map((it, i) => (
                          <a key={`right-${i}`} href={it.href || '#'} style={{
                            display: 'block', padding: '10px 12px',
                            fontSize: 14, color: '#475569', fontWeight: 500, borderRadius: 6,
                          }}>{it.label || it}</a>
                        ))}
                        <a href={item.content.right.ctaHref || '#'} style={{
                          display: 'block', padding: '10px 12px',
                          fontSize: 14, color: 'var(--color-brand-blue)', fontWeight: 600, borderRadius: 6,
                        }}>{item.content.right.cta}</a>
                      </>
                    )}
                    {item.content.type === 'grid-2' && (
                      item.content.items.map((it, i) => (
                        <a key={i} href={it.href || '#'} style={{
                          display: 'block', padding: '10px 12px',
                          fontSize: 14, color: '#475569', fontWeight: 500, borderRadius: 6,
                        }}>{it.label || it}</a>
                      ))
                    )}
                    {item.content.type === 'simple-list' && (
                      item.content.items.map((it, i) => (
                        <a key={i} href={it.href} style={{
                          display: 'block', padding: '10px 12px',
                          fontSize: 14, color: '#475569', fontWeight: 500, borderRadius: 6,
                        }}
                          onClick={(e) => {
                            if (it.video) openHowItWorksVideo(e);
                            onClose();
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
          <a href={DYRECT_URLS.contact} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
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
    <>
      <header style={{
        position: 'relative', zIndex: 50,
        background: 'white',
        borderBottom: '1px solid var(--border-default)',
      }}>
        <div className="container" style={{
          display: 'flex', alignItems: 'center', gap: 24,
          padding: '14px 24px',
        }}>
          <a href={DYRECT_URLS.home} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
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
          <a href={DYRECT_URLS.contact} className="btn btn-primary nav-cta" style={{ fontSize: 14, padding: '11px 18px', flexShrink: 0 }}>
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
      <HowItWorksVideoModal />
    </>
  );
}

Object.assign(window, { SiteNav, NAV_ITEMS, PRODUCT_LINKS, DYRECT_URLS, SOLUTION_LINKS, openHowItWorksVideo, HowItWorksVideoModal });


/* global React, CustomerProfileCard, TicketsCard, AnalyticsCard */
var { useEffect, useState, useRef } = React;

/* Rotating word for "Warranty Management Software for ___" */
function RotatingWord({ words, color = 'var(--color-brand-blue)' }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % words.length), 2400);
    return () => clearInterval(t);
  }, [words.length]);
  return (
    <span className="rotating-word" style={{ position: 'relative', display: 'inline-block', verticalAlign: 'baseline' }}>
      {/* invisible widest word reserves width */}
      <span style={{ visibility: 'hidden', whiteSpace: 'nowrap' }}>{words.reduce((a, b) => a.length > b.length ? a : b)}</span>
      {words.map((w, idx) => (
        <span key={w} style={{
          position: 'absolute', left: 0, top: 0,
          color, whiteSpace: 'nowrap',
          opacity: i === idx ? 1 : 0,
          transform: i === idx ? 'translateY(0)' : (idx === ((i - 1 + words.length) % words.length) ? 'translateY(-24%)' : 'translateY(24%)'),
          transition: 'opacity 500ms ease, transform 600ms cubic-bezier(.16,.84,.44,1)',
          letterSpacing: '-2px',
        }}>{w}</span>
      ))}
    </span>
  );
}

/* Active-cycler hook */
function useCycle(n, ms) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((v) => (v + 1) % n), ms);
    return () => clearInterval(t);
  }, [n, ms]);
  return [active, setActive];
}

function HeroHeadline({ words, fontSize }) {
  return (
    <h1 className="display-heading hero-headline" style={{ fontSize }}>
      <span className="hero-headline-line">
        The most <span className="em">seamless</span>
      </span>
      <span className="hero-headline-line hero-headline-line--product">
        warranty management software
      </span>
      <span className="hero-headline-line hero-headline-line--for">
        for <RotatingWord words={words} />
      </span>
    </h1>
  );
}

/* ───────────── Hero A: Stacked portal cards ───────────── */
function HeroStacked() {
  const [active, setActive] = useCycle(3, 4200);
  const cards = [
    { Comp: CustomerProfileCard, key: 'profile', label: 'Customer profile' },
    { Comp: TicketsCard,         key: 'tickets', label: 'Claims & tickets' },
    { Comp: AnalyticsCard,       key: 'analytics', label: 'Analytics' },
  ];
  // ordered positions: back, mid, front (active is front)
  const order = [
    (active + 2) % 3, // back
    (active + 1) % 3, // mid
    active,           // front
  ];
  // Cascade DOWN and slightly RIGHT — keeps everything inside the column.
  // Front card sits at top-left of the stage, back cards peek out behind it.
  const positions = [
    { x: 36, y: 56, rot: 0,  scale: 0.93, op: 0.55, blur: 1.2, z: 1 }, // back
    { x: 18, y: 28, rot: 0,  scale: 0.97, op: 0.85, blur: 0,   z: 2 }, // mid
    { x: 0,  y: 0,  rot: 0,  scale: 1,    op: 1,    blur: 0,   z: 3 }, // front
  ];
  return (
    <div style={{
      position: 'relative',
      width: 380, height: 520,
      margin: '0 auto',
    }}>
      {/* Glow */}
      <div aria-hidden style={{
        position: 'absolute', inset: '-40px',
        background: 'radial-gradient(closest-side, rgba(36,55,246,0.18), transparent 70%)',
        filter: 'blur(24px)', pointerEvents: 'none', zIndex: 0,
      }} />
      {order.map((cardIdx, layerIdx) => {
        const pos = positions[layerIdx];
        const isFront = layerIdx === 2;
        const C = cards[cardIdx].Comp;
        return (
          <div key={cards[cardIdx].key}
            onClick={() => setActive(cardIdx)}
            style={{
              position: 'absolute', top: pos.y + 60, left: pos.x,
              transform: `scale(${pos.scale})`,
              transformOrigin: 'top left',
              opacity: pos.op,
              filter: pos.blur ? `blur(${pos.blur}px)` : 'none',
              zIndex: pos.z,
              transition: 'all 700ms cubic-bezier(.16,.84,.44,1)',
              cursor: isFront ? 'default' : 'pointer',
            }}>
            <C active={isFront} />
          </div>
        );
      })}
      {/* Dots indicator below the stack */}
      <div style={{
        position: 'absolute', left: 0, top: 'calc(100% + 4px)',
        display: 'flex', gap: 8, zIndex: 4,
      }}>
        {cards.map((c, i) => (
          <button key={c.key} onClick={() => setActive(i)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500,
              padding: '6px 10px', borderRadius: 999,
              background: active === i ? '#0F172A' : 'white',
              color: active === i ? 'white' : '#475569',
              border: active === i ? '1px solid #0F172A' : '1px solid var(--border-default)',
              transition: 'all 220ms ease',
              cursor: 'pointer',
            }}>
            <span style={{
              width: 6, height: 6, borderRadius: 999,
              background: active === i ? '#2BC840' : '#CBD5E1',
            }} />
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ───────────── Hero B: Centered with floating product window ───────────── */
function HeroCentered() {
  const [active, setActive] = useCycle(3, 4200);
  const cards = [AnalyticsCard, TicketsCard, CustomerProfileCard];
  const labels = ['Analytics', 'Claims Management', 'Customers'];
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 980, margin: '0 auto', paddingTop: 8 }}>
      {/* tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
        {labels.map((l, i) => (
          <button key={l} onClick={() => setActive(i)}
            style={{
              fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500,
              padding: '8px 14px', borderRadius: 999,
              background: active === i ? '#EEF0FE' : 'white',
              color: active === i ? 'var(--color-brand-blue-deep)' : '#475569',
              border: active === i ? '1px solid #C7CDFD' : '1px solid var(--border-default)',
              transition: 'all 220ms ease',
            }}>{l}</button>
        ))}
      </div>
      {/* glow */}
      <div aria-hidden style={{
        position: 'absolute', left: '50%', top: '20%', width: '110%', height: '90%',
        transform: 'translateX(-50%)',
        background: 'radial-gradient(closest-side, rgba(36,55,246,0.20), transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />
      {/* Stage that swaps cards */}
      <div style={{ position: 'relative', minHeight: 520, display: 'flex', justifyContent: 'center' }}>
        {cards.map((C, i) => (
          <div key={i} style={{
            position: 'absolute', inset: 0,
            display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
            opacity: active === i ? 1 : 0,
            transform: active === i ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(12px)',
            transition: 'opacity 500ms ease, transform 600ms cubic-bezier(.16,.84,.44,1)',
            pointerEvents: active === i ? 'auto' : 'none',
          }}>
            <div style={{ transform: 'scale(1.2)', transformOrigin: 'top center' }}>
              <C active={active === i} />
            </div>
          </div>
        ))}
      </div>
      {/* Floating chips */}
      <div aria-hidden style={{
        position: 'absolute', left: -10, top: 200,
        background: 'white', border: '1px solid var(--border-default)',
        borderRadius: 10, padding: '8px 12px',
        display: 'flex', alignItems: 'center', gap: 10,
        boxShadow: 'var(--shadow-lg)', fontSize: 12,
        animation: 'floaty 6s ease-in-out infinite',
      }}>
        <span style={{ width: 26, height: 26, borderRadius: 8, background: '#DCFCE7', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#166534' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        </span>
        <div>
          <div style={{ fontSize: 11, color: '#64748B' }}>Claim resolved</div>
          <div style={{ fontSize: 12.5, color: '#1E293B', fontWeight: 500 }}>TS89260 · 18m</div>
        </div>
      </div>
      <div aria-hidden style={{
        position: 'absolute', right: -10, top: 320,
        background: 'white', border: '1px solid var(--border-default)',
        borderRadius: 10, padding: '8px 12px',
        display: 'flex', alignItems: 'center', gap: 10,
        boxShadow: 'var(--shadow-lg)', fontSize: 12,
        animation: 'floaty 5s ease-in-out infinite reverse',
      }}>
        <span style={{ width: 26, height: 26, borderRadius: 8, background: '#EEF0FE', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-brand-blue-deep)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 11h-6M19 8v6"/></svg>
        </span>
        <div>
          <div style={{ fontSize: 11, color: '#64748B' }}>New registration</div>
          <div style={{ fontSize: 12.5, color: '#1E293B', fontWeight: 500 }}>via Shopify · just now</div>
        </div>
      </div>
    </div>
  );
}

/* Hero shell — picks variation based on tweak */
function Hero({ variation }) {
  const headlineWords = ['D2C brands', 'Shopify merchants', 'retailers', 'manufacturers'];
  if (variation === 'centered') {
    return (
      <section className="hero hero--centered">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto', paddingBottom: 36 }}>
            <div className="pill" style={{ marginBottom: 22 }}>
              <span className="dot">★</span> Rated 4.8 on G2 · 5★ on Shopify
            </div>
            <HeroHeadline words={headlineWords} fontSize="clamp(32px, 4.6vw, 56px)" />
            <p style={{ fontSize: 18, color: 'var(--fg-secondary)', maxWidth: 680, margin: '22px auto 0', lineHeight: 1.55 }}>
              Warranty registration, claims management, and tracking unified in one system. Reduce the cost of every claim, manage warranties with more control, and turn the warranty lifecycle into a new revenue channel.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 30 }}>
              <a className="btn btn-primary btn-lg" href={window.DYRECT_URLS.contact}>
                Book a demo
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </a>
              <a className="btn btn-secondary btn-lg" href="#platform">
                See the platform
              </a>
            </div>
          </div>
          <HeroCentered />
        </div>
      </section>
    );
  }
  // Stacked (default)
  return (
    <section className="hero hero--stacked">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 460px', gap: 56, alignItems: 'start' }} className="hero-grid">
          <div>
            <div className="pill" style={{ marginBottom: 22 }}>
              <span className="dot">★</span> Rated 4.8 on G2 · 5★ on Shopify
            </div>
            <HeroHeadline words={headlineWords} fontSize="clamp(30px, 4vw, 48px)" />
            <p style={{ fontSize: 18, color: 'var(--fg-secondary)', maxWidth: 560, marginTop: 22, lineHeight: 1.55 }}>
              Warranty registration, claims management, and tracking unified in one system. Reduce the cost of every claim, manage warranties with more control, and turn the warranty lifecycle into a new revenue channel.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 30, flexWrap: 'wrap' }}>
              <a className="btn btn-primary btn-lg" href={window.DYRECT_URLS.contact}>
                Book a demo
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </a>
              <a className="btn btn-secondary btn-lg" href="#platform">
                See the platform
              </a>
            </div>
            <div className="hero-trust-row" style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap', marginTop: 36, color: '#64748B', fontSize: 13 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0ABE52" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                Live in &lt;30 min
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0ABE52" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                No developer needed
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0ABE52" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                Built for Shopify
              </div>
            </div>
          </div>
          <HeroStacked />
        </div>
      </div>
    </section>
  );
}

(function injectHeroStyles(){
  if (document.getElementById('hero-styles')) return;
  const s = document.createElement('style');
  s.id = 'hero-styles';
  s.textContent = `
    .hero {
      position: relative;
      padding: 56px 0 96px;
      overflow: hidden;
      background:
        radial-gradient(800px 400px at 85% 8%, rgba(36,55,246,0.06), transparent 70%),
        radial-gradient(600px 300px at 8% 12%, rgba(36,55,246,0.04), transparent 70%),
        linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%);
    }
    .hero::before {
      content: ''; position: absolute; inset: 0;
      background-image:
        linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px);
      background-size: 56px 56px;
      mask-image: radial-gradient(closest-side, black 30%, transparent 75%);
      -webkit-mask-image: radial-gradient(closest-side, black 30%, transparent 75%);
      pointer-events: none;
    }
    .hero .container { position: relative; z-index: 1; }
    .hero--centered { padding-top: 64px; padding-bottom: 64px; }
    @keyframes floaty {
      0%, 100% { transform: translateY(0); }
      50%      { transform: translateY(-8px); }
    }
    @media (max-width: 980px) {
      .hero-grid { grid-template-columns: 1fr !important; gap: 60px !important; }
    }
  `;
  document.head.appendChild(s);
})();

Object.assign(window, { Hero, RotatingWord });


/* global React, Badge, CustomerProfileCard, TicketsCard, AnalyticsCard */
var { useEffect, useState, useRef } = React;

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
  const morph = Math.max(0, Math.min(1, (p - 0.18) / 0.32));
  const afterAmt = Math.max(0, Math.min(1, (p - 0.52) / 0.28));

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
    <section ref={sectionRef} id="platform" className="platform-section" style={{
      position: 'relative',
      height: '330vh',
      background: stageBg,
    }}>
      <div className="platform-sticky" style={{
        position: 'sticky', top: 0,
        height: '100vh',
        minHeight: 760,
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

        <div className="container platform-intro" style={{
          paddingTop: 56, paddingBottom: 20,
          opacity: Math.max(0, 1 - p * 5),
          transition: 'opacity 200ms linear',
        }}>
          <div style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto' }}>
            <p className="eyebrow">Platform</p>
            <h2 className="section-title" style={{ marginTop: 10 }}>
              All-in-one warranty management. <span className="em">Seamless</span> for your team. <span className="em">Effortless</span> for your customers.
            </h2>
            <p className="section-sub" style={{ marginTop: 12 }}>
              Registration, claims, service, protection plans, and analytics no longer need separate tools.
            </p>
          </div>
        </div>

        <div className="container platform-grid" style={{
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
              const active = (i === 0 && p < 0.18) || (i === 1 && p >= 0.18 && p < 0.52) || (i === 2 && p >= 0.52);
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
    <div className="platform-visual" style={{
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
    tabLabel: 'Product Registration',
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
    href: window.DYRECT_URLS.productRegistration,
  },
  {
    key: 'claims',
    tabLabel: 'Claims Management',
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
    href: window.DYRECT_URLS.warrantyManagement,
  },
  {
    key: 'warranties',
    tabLabel: 'Extended Warranties',
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
    href: window.DYRECT_URLS.extendedWarranties,
  },
  {
    key: 'analytics',
    tabLabel: 'Insights & Analytics',
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
    href: window.DYRECT_URLS.warrantyManagement,
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
              {pp.tabLabel || pp.eyebrow.split('&')[0].trim()}
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
            <a href={p.href || window.DYRECT_URLS.contact} style={{
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
      href: window.DYRECT_URLS.productRegistration,
    },
    {
      role: 'Warranty manager',
      title: 'Your claims process was',
      titleEm: 'not built to scale',
      body: 'Claims come in through email, WhatsApp, and phone calls. Each one gets logged manually, followed up individually, and resolved slowly. Dyrect replaces that with a structured system where every claim is validated against a serial number, assigned to the right person, tracked in real time, and closed without manual chasing.',
      bullets: ['Serial-number validation', 'Smart assignment to dealers', 'Repair + chargeback in one workflow'],
      Visual: window.WarrantyInboxMock,
      href: window.DYRECT_URLS.warrantyManagement,
    },
    {
      role: 'Business owner',
      title: 'Your after-sales operation',
      titleEm: 'costs money and earns none',
      body: 'Every warranty claim your team resolves is an expense with no return. Dyrect turns each service interaction into a revenue touchpoint by surfacing extended warranty plans and upsell offers at the right moment, so the same operation that was draining margin starts generating it.',
      bullets: ['100% in-house extended warranties', '3x higher attach rate (avg.)', 'P&L visibility on every claim'],
      Visual: window.BusinessOwnerPLMock,
      href: window.DYRECT_URLS.extendedWarranties,
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
            <a href={p.href} style={{
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

Object.assign(window, { LogoCloud, PlatformOverview, Products, Personas });


/* global React */
var { useEffect, useState, useRef } = React;

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
              <a href={window.DYRECT_URLS.shopifyWarranty} className="btn btn-primary">Install on Shopify</a>
              <a href={window.DYRECT_URLS.integrations} className="btn btn-ghost">See all integrations &nbsp;→</a>
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
            <a href={window.DYRECT_URLS.integrations} style={{
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
            <a href={window.DYRECT_URLS.contact} className="btn btn-secondary" style={{ marginTop: 16 }}>
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
              <a href={window.DYRECT_URLS.contact} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 22px', borderRadius: 8,
                background: 'white', color: 'var(--color-brand-blue-deep)',
                fontWeight: 600, fontSize: 15,
              }}>
                {pl}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </a>
              <a href={window.DYRECT_URLS.shopifyWarranty} style={{
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
    { l: 'Product Registration Software', href: window.DYRECT_URLS.productRegistration, key: 'product-registration' },
    { l: 'Warranty Management Software',  href: window.DYRECT_URLS.warrantyManagement, key: 'warranty-claims' },
    { l: 'Extended Warranties',           href: window.DYRECT_URLS.extendedWarranties, key: 'extended-warranties' },
  ].map(p => ({ ...p, active: activeProduct === p.key }));
  const cols = [
    { h: 'Products', links: productLinks },
    {
      h: 'Free Tools',
      links: [
        { l: 'Bulk QR Code Generator', href: window.DYRECT_URLS.bulkQr },
        { l: 'Serial Number Generator', href: window.DYRECT_URLS.serialNumber },
        { l: 'Warranty Cost Calculator', href: window.DYRECT_URLS.warrantyCost },
      ],
    },
    {
      h: 'Solutions',
      links: window.SOLUTION_LINKS.filter((link) => link.label !== 'Automotive').map((link) => ({ l: link.label, href: link.href })),
    },
    {
      h: 'Company',
      links: [
        { l: 'Features', href: window.DYRECT_URLS.features },
        { l: 'Pricing', href: window.DYRECT_URLS.pricing },
        { l: 'Contact Us', href: window.DYRECT_URLS.contact },
      ],
      sub: {
        h: 'Features',
        links: [
          { l: 'Digitalize Warranty', href: window.DYRECT_URLS.digitalWarrantyCard },
          { l: 'Form Builder (No-Code)', href: window.DYRECT_URLS.formBuilder },
          { l: 'Digitize Product Manual', href: window.DYRECT_URLS.productManual },
          { l: 'Serial Number Validator', href: window.DYRECT_URLS.productSerialization },
          { l: 'Claims Management', href: window.DYRECT_URLS.claimsManagement },
          { l: 'All Features', href: window.DYRECT_URLS.features },
        ],
      },
    },
    {
      h: 'Resources',
      links: [
        { l: 'FAQs', href: window.DYRECT_URLS.faqs },
        { l: 'Blog', href: window.DYRECT_URLS.blog },
        { l: 'Integrations', href: window.DYRECT_URLS.integrations },
        { l: 'Brand Warranties', href: window.DYRECT_URLS.warranty },
        { l: 'Our Partners', href: window.DYRECT_URLS.partners },
      ],
      sub: {
        h: 'Alternatives',
        links: [
          { l: 'Google Forms vs Dyrect', href: window.DYRECT_URLS.googleFormsComparison },
          { l: 'Manual Leaflet vs Dyrect', href: window.DYRECT_URLS.leafletComparison },
          { l: 'Website Forms vs Dyrect', href: window.DYRECT_URLS.websiteFormsComparison },
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
              <a href="https://www.linkedin.com/company/dyrect/" aria-label="LinkedIn" style={{
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
            <a href={window.DYRECT_URLS.privacy} style={{ color: 'inherit', transition: 'color 160ms' }}
              onMouseEnter={(e)=>e.currentTarget.style.color='white'} onMouseLeave={(e)=>e.currentTarget.style.color='rgba(255,255,255,0.50)'}>Privacy</a>
            <a href={window.DYRECT_URLS.terms} style={{ color: 'inherit', transition: 'color 160ms' }}
              onMouseEnter={(e)=>e.currentTarget.style.color='white'} onMouseLeave={(e)=>e.currentTarget.style.color='rgba(255,255,255,0.50)'}>Terms</a>
            <a href={window.DYRECT_URLS.security} style={{ color: 'inherit', transition: 'color 160ms' }}
              onMouseEnter={(e)=>e.currentTarget.style.color='white'} onMouseLeave={(e)=>e.currentTarget.style.color='rgba(255,255,255,0.50)'}>Security</a>
            <a href={window.DYRECT_URLS.status} style={{ color: 'inherit', transition: 'color 160ms' }}
              onMouseEnter={(e)=>e.currentTarget.style.color='white'} onMouseLeave={(e)=>e.currentTarget.style.color='rgba(255,255,255,0.50)'}>Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  Capabilities, Stats, Testimonials, ShopifySection, Integrations, BlogSection, FAQ, FinalCTA, SiteFooter,
});


/* global React, ReactDOM, SiteNav, Hero, LogoCloud, PlatformOverview, Products, Personas, Capabilities, Stats, Testimonials, ShopifySection, Integrations, BlogSection, FAQ, FinalCTA, SiteFooter, TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakSelect, TweakToggle, TweakColor */
var { useEffect, useState, useRef } = React;

/* Reveal-on-scroll observer */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ───────────── App ───────────── */
function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useReveal();

  // Apply density via CSS var
  useEffect(() => {
    document.documentElement.style.setProperty('--section-pad', tweaks.density === 'airy' ? '120px' : tweaks.density === 'compact' ? '64px' : '96px');
  }, [tweaks.density]);

  // Apply primary color
  useEffect(() => {
    document.documentElement.style.setProperty('--color-brand-blue', tweaks.primaryColor);
    // derive hover (darker) and subtle (lighter) crudely
    const hex = tweaks.primaryColor.replace('#', '');
    const r = parseInt(hex.slice(0,2),16), g=parseInt(hex.slice(2,4),16), b=parseInt(hex.slice(4,6),16);
    const dark = `rgb(${Math.max(0,r-22)}, ${Math.max(0,g-22)}, ${Math.max(0,b-22)})`;
    const deep = `rgb(${Math.max(0,r-50)}, ${Math.max(0,g-50)}, ${Math.max(0,b-50)})`;
    document.documentElement.style.setProperty('--color-brand-blue-hover', dark);
    document.documentElement.style.setProperty('--color-brand-blue-deep', deep);
    document.documentElement.style.setProperty('--color-brand-blue-subtle', `rgba(${r},${g},${b},0.07)`);
    document.documentElement.style.setProperty('--color-brand-blue-light', `rgba(${r},${g},${b},0.14)`);
  }, [tweaks.primaryColor]);

  return (
    <>
      <SiteNav />
      <main>
        <Hero variation={tweaks.heroVariation} />
        {tweaks.show_logos && <LogoCloud />}
        {tweaks.show_platform && <PlatformOverview />}
        {tweaks.show_products && <Products />}
        {tweaks.show_personas && <Personas />}
        {tweaks.show_capabilities && <Capabilities />}
        {tweaks.show_stats && <Stats />}
        {tweaks.show_testimonials && <Testimonials />}
        {tweaks.show_shopify && <ShopifySection />}
        {tweaks.show_integrations && <Integrations />}
        {tweaks.show_blog && <BlogSection />}
        {tweaks.show_faq && <FAQ />}
        {tweaks.show_cta && <FinalCTA />}
      </main>
      <SiteFooter />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Hero">
          <TweakRadio label="Layout"
            value={tweaks.heroVariation}
            onChange={(v) => setTweak('heroVariation', v)}
            options={[
              { value: 'stacked',  label: 'Stacked cards' },
              { value: 'centered', label: 'Centered' },
            ]} />
        </TweakSection>

        <TweakSection label="Style">
          <TweakColor label="Primary color"
            value={tweaks.primaryColor}
            onChange={(v) => setTweak('primaryColor', v)}
            options={['#2437F6', '#0F1FB8', '#7C3AED', '#0EA5E9']} />
          <TweakRadio label="Density"
            value={tweaks.density}
            onChange={(v) => setTweak('density', v)}
            options={[
              { value: 'compact', label: 'Compact' },
              { value: 'default', label: 'Default' },
              { value: 'airy',    label: 'Airy' },
            ]} />
        </TweakSection>

        <TweakSection label="Sections">
          <TweakToggle label="Logo cloud"     value={tweaks.show_logos}        onChange={(v)=>setTweak('show_logos', v)} />
          <TweakToggle label="Platform (Before / After)" value={tweaks.show_platform} onChange={(v)=>setTweak('show_platform', v)} />
          <TweakToggle label="Products tabs"  value={tweaks.show_products}     onChange={(v)=>setTweak('show_products', v)} />
          <TweakToggle label="Personas"       value={tweaks.show_personas}     onChange={(v)=>setTweak('show_personas', v)} />
          <TweakToggle label="Capabilities"   value={tweaks.show_capabilities} onChange={(v)=>setTweak('show_capabilities', v)} />
          <TweakToggle label="Stats banner"   value={tweaks.show_stats}        onChange={(v)=>setTweak('show_stats', v)} />
          <TweakToggle label="Testimonials"   value={tweaks.show_testimonials} onChange={(v)=>setTweak('show_testimonials', v)} />
          <TweakToggle label="Shopify"        value={tweaks.show_shopify}      onChange={(v)=>setTweak('show_shopify', v)} />
          <TweakToggle label="Integrations"   value={tweaks.show_integrations} onChange={(v)=>setTweak('show_integrations', v)} />
          <TweakToggle label="Blog"           value={tweaks.show_blog}         onChange={(v)=>setTweak('show_blog', v)} />
          <TweakToggle label="FAQ"            value={tweaks.show_faq}          onChange={(v)=>setTweak('show_faq', v)} />
          <TweakToggle label="Final CTA"      value={tweaks.show_cta}          onChange={(v)=>setTweak('show_cta', v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}




export default App;
