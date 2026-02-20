import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export const revalidate = 60;

const SITE_URL = 'https://khadgabahadur.com.np';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data } = await supabase
    .from('blogs')
    .select('title, summary, meta')
    .eq('slug', slug)
    .single();
  if (!data) return { title: 'Blog Not Found' };

  const title = `${data.title} — Khadga Bahadur Shrestha`;
  const description = data.summary;
  const url = `${SITE_URL}/blogs/${slug}`;

  return {
    title: data.title,
    description,
    alternates: { canonical: `/blogs/${slug}` },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      siteName: 'Khadga Bahadur Shrestha',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

export default async function BlogDetail({ params }) {
  const { slug } = await params;
  const { data: blog } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!blog) notFound();

  const parts = blog.meta.split(' / ');
  const dateStr = parts[parts.length - 1];
  const category = parts.slice(0, -1).join(' / ');

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.summary,
    author: {
      '@type': 'Person',
      name: 'Khadga Bahadur Shrestha',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: 'Khadga Bahadur Shrestha',
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blogs/${slug}`,
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/#blogs` },
      { '@type': 'ListItem', position: 3, name: blog.title, item: `${SITE_URL}/blogs/${slug}` },
    ],
  };

  return (
    <article className="section detail-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="container">
        <nav aria-label="Breadcrumb" style={{ marginBottom: '40px' }}>
          <Link href="/#blogs" className="back-link">&larr; Back to blog</Link>
        </nav>
        <p className="card-meta" style={{ marginBottom: '8px' }}>{dateStr} &middot; {category}</p>
        <h1 className="detail-title">{blog.title}</h1>
        <div
          className="detail-content"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </article>
  );
}
