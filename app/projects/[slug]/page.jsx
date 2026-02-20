import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data } = await supabase.from('projects').select('title').eq('slug', slug).single();
  if (!data) return { title: 'Project Not Found' };
  return { title: `${data.title} — Khadga Bahadur Shrestha` };
}

export default async function ProjectDetail({ params }) {
  const { slug } = await params;
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!project) notFound();

  return (
    <article className="section">
      <div className="container">
        <div style={{ marginBottom: '40px' }}>
          <Link href="/#projects" className="back-link">← Back to projects</Link>
        </div>
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
