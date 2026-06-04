'use client';
import {useState} from 'react';
import ShowcaseCard from '../../components/cms/ShowcaseCard';

export default function ShowcaseClient({brands}) {
  const solutions = ['All', ...Array.from(new Set(brands.map((b) => b.solutionUsed).filter(Boolean))).sort()];
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? brands : brands.filter((b) => b.solutionUsed === active);

  return (
    <main className="dir-page">
      <section className="dir-hero">
        <p className="eyebrow">Brand Showcase</p>
        <h1>See How Top Brands Effortlessly Streamline Warranties</h1>
        <p>Join the growing list of product brands delivering world-class ownership experiences with Dyrect.</p>
      </section>

      <div className="dir-body">
        <aside className="dir-sidebar">
          {solutions.map((s) => (
            <button
              key={s}
              className={`dir-filter-btn${active === s ? ' active' : ''}`}
              onClick={() => setActive(s)}
            >
              {s === 'All' ? 'All Solutions' : s}
            </button>
          ))}
        </aside>

        <section className="dir-grid dir-grid--showcase">
          {filtered.length ? (
            filtered.map((brand) => <ShowcaseCard key={brand._id} brand={brand} />)
          ) : (
            <div className="dir-empty">No brands in this category yet.</div>
          )}
        </section>
      </div>
    </main>
  );
}
