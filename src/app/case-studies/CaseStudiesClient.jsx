'use client';
import {useState} from 'react';
import CaseStudyCard from '../../components/cms/CaseStudyCard';

export default function CaseStudiesClient({caseStudies}) {
  const industries = ['All', ...Array.from(new Set(caseStudies.map((c) => c.industry).filter(Boolean))).sort()];
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? caseStudies : caseStudies.filter((c) => c.industry === active);

  return (
    <main className="dir-page">
      <section className="dir-hero">
        <p className="eyebrow">Case Studies</p>
        <h1>Real results from real brands</h1>
        <p>See how product brands use Dyrect to build better ownership experiences and grow customer relationships.</p>
      </section>

      <div className="dir-body">
        <aside className="dir-sidebar">
          {industries.map((ind) => (
            <button
              key={ind}
              className={`dir-filter-btn${active === ind ? ' active' : ''}`}
              onClick={() => setActive(ind)}
            >
              {ind === 'All' ? 'All Industries' : ind}
            </button>
          ))}
        </aside>

        <section className="dir-grid">
          {filtered.length ? (
            filtered.map((cs) => <CaseStudyCard key={cs._id} caseStudy={cs} />)
          ) : (
            <div className="dir-empty">No case studies in this category yet.</div>
          )}
        </section>
      </div>
    </main>
  );
}
