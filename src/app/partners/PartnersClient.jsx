'use client';
import {useState} from 'react';
import PartnerCard from '../../components/cms/PartnerCard';

export default function PartnersClient({partners}) {
  const types = ['All', ...Array.from(new Set(partners.map((p) => p.type).filter(Boolean))).sort()];
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? partners : partners.filter((p) => p.type === active);

  return (
    <main className="partners-page">
      {/* Hero */}
      <section className="partners-hero">
        <p className="eyebrow">Partners</p>
        <h1>Here are our Partners</h1>
        <p>Don't leave your old tools behind, integrate them.</p>
      </section>

      {/* Body: sidebar + grid */}
      <div className="partners-body">
        {/* Sidebar filter */}
        <aside className="partners-sidebar">
          {types.map((t) => (
            <button
              key={t}
              className={`partners-filter-btn${active === t ? ' active' : ''}`}
              onClick={() => setActive(t)}
            >
              {t === 'All' ? 'All' : t + ' Partners'}
            </button>
          ))}
        </aside>

        {/* Cards */}
        <section className="partners-grid">
          {filtered.length ? (
            filtered.map((partner) => (
              <PartnerCard key={partner._id} partner={partner} />
            ))
          ) : (
            <div className="partners-empty">
              <p>No partners in this category yet.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
