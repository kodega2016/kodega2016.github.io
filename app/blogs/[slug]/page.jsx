import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data } = await supabase.from('blogs').select('title').eq('slug', slug).single();
  if (!data) return { title: 'Blog Not Found' };
  return { title: `${data.title} — Khadga Bahadur Shrestha` };
}

export default async function BlogDetail({ params }) {
  const { slug } = await params;
  const { data: blog } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!blog) notFound();

  return (
    <article className="section">
      <div className="container">
        <div style={{ marginBottom: '40px' }}>
          <Link href="/#blogs" className="back-link">← Back to blog</Link>
        </div>
        <p className="card-meta" style={{ marginBottom: '8px' }}>{blog.meta}</p>
        <h1 className="detail-title">{blog.title}</h1>
        <div
          className="detail-content"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </article>
  );
}
