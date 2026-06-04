export default function SanitySetupNotice() {
  return (
    <section className="cms-empty-state">
      <p className="eyebrow">CMS setup needed</p>
      <h1>Connect Sanity to start publishing CMS pages.</h1>
      <p>
        Add your Sanity project ID and dataset to <code>.env.local</code>, then restart the
        Next.js server. After that, entries published in Sanity Studio will appear here.
      </p>
      <pre>{`NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-06-03`}</pre>
      <a className="btn btn-primary" href="/studio">Open Studio</a>
    </section>
  );
}
