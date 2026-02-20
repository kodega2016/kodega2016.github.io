import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export const revalidate = 60;

const SITE_URL = 'https://khadgabahadur.com.np';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data } = await supabase
    .from('projects')
    .select('title, summary, meta')
    .eq('slug', slug)
    .single();
  if (!data) return { title: 'Project Not Found' };

  const title = `${data.title} — Khadga Bahadur Shrestha`;
  const description = data.summary;
  const url = `${SITE_URL}/projects/${slug}`;

  return {
    title: data.title,
    description,
    alternates: { canonical: `/projects/${slug}` },
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

export default async function ProjectDetail({ params }) {
  const { slug } = await params;
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!project) notFound();

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/#projects` },
      { '@type': 'ListItem', position: 3, name: project.title, item: `${SITE_URL}/projects/${slug}` },
    ],
  };

  return (
    <article className="section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="container">
        <nav aria-label="Breadcrumb" style={{ marginBottom: '40px' }}>
          <Link href="/#projects" className="back-link">&larr; Back to projects</Link>
        </nav>
        <p className="card-meta" style={{ marginBottom: '8px' }}>{project.meta}</p>
        <h1 className="detail-title">{project.title}</h1>
        <div
          className="detail-content"
          dangerouslySetInnerHTML={{ __html: project.content }}
        />
      </div>
    </article>
  );
}
