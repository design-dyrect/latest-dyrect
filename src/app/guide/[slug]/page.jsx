import {notFound} from 'next/navigation';
import {client} from '../../../sanity/lib/client';
import {urlFor} from '../../../sanity/lib/image';
import {buildMetadata} from '../../../sanity/lib/metadata';
import {guideBySlugQuery} from '../../../sanity/lib/queries';
import GuideBody from '../../../components/cms/GuideBody';
import JsonLd from '../../../components/JsonLd';

export const dynamic = 'force-dynamic';

export async function generateMetadata({params}) {
  const {slug} = await params;
  const guide = await client.fetch(guideBySlugQuery, {slug});
  return buildMetadata(guide, {
    titleSuffix: ' — Dyrect Guide',
    defaultTitle: 'Guide | Dyrect',
    path: `/guide/${slug}`,
  });
}

export default async function GuideDetailPage({params}) {
  const {slug} = await params;
  const guide = await client.fetch(guideBySlugQuery, {slug});
  if (!guide) notFound();

  const coverUrl = guide.coverImage ? urlFor(guide.coverImage).width(1200).height(630).fit('crop').url() : null;

  // Article structured data
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.excerpt || guide.seoDescription || '',
    ...(coverUrl && {
      image: {
        '@type': 'ImageObject',
        url: coverUrl,
        width: 1200,
        height: 630,
        ...(guide.coverImage?.alt && {name: guide.coverImage.alt}),
      },
    }),
    ...(guide.publishedAt && {datePublished: guide.publishedAt}),
    dateModified: guide.publishedAt || new Date().toISOString(),
    ...(guide.authorName && {
      author: {
        '@type': 'Person',
        name: guide.authorName,
      },
    }),
    publisher: {
      '@type': 'Organization',
      name: 'Dyrect',
      url: 'https://dyrect.co',
      logo: {
        '@type': 'ImageObject',
        url: 'https://dyrect.co/assets/logo-blue-wordmark.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://dyrect.co/guide/${slug}`,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {'@type': 'ListItem', position: 1, name: 'Home', item: 'https://dyrect.co'},
      {'@type': 'ListItem', position: 2, name: 'Guides', item: 'https://dyrect.co/guide'},
      {'@type': 'ListItem', position: 3, name: guide.title, item: `https://dyrect.co/guide/${slug}`},
    ],
  };

  return (
    <main className="guide-page">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Hero */}
      <section className="guide-hero">
        {coverUrl && (
          <div className="guide-hero-image">
            <img
              src={coverUrl}
              alt={guide.coverImage?.alt || guide.title}
              width={1200}
              height={630}
              fetchPriority="high"
              decoding="async"
            />
          </div>
        )}
        <div className="guide-hero-text">
          <h1>{guide.title}</h1>
          {guide.excerpt && <p className="guide-hero-excerpt">{guide.excerpt}</p>}
          <div className="guide-hero-meta">
            {guide.authorName && <span>By {guide.authorName}</span>}
            {guide.readingTime && <span>{guide.readingTime}</span>}
            {guide.publishedAt && (
              <time dateTime={guide.publishedAt}>
                {new Date(guide.publishedAt).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
              </time>
            )}
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="guide-article">
        <GuideBody blocks={guide.body || []} />
      </article>

      {/* CTA */}
      <section className="guide-cta">
        <h2>Ready to streamline your warranty management?</h2>
        <p>See how Dyrect can help your brand automate warranty registration, claims, and post-purchase experiences.</p>
        <a href="https://www.dyrect.co/contact-us" className="btn btn-primary btn-lg">Book a Free Demo →</a>
      </section>
    </main>
  );
}
