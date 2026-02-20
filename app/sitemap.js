import { supabase } from '@/lib/supabase';

const SITE_URL = 'https://khadgabahadur.com.np';

export default async function sitemap() {
  const [{ data: projects }, { data: blogs }] = await Promise.all([
    supabase.from('projects').select('slug, updated_at'),
    supabase.from('blogs').select('slug, updated_at'),
  ]);

  const projectUrls = (projects || []).map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: project.updated_at || new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const blogUrls = (blogs || []).map((blog) => ({
    url: `${SITE_URL}/blogs/${blog.slug}`,
    lastModified: blog.updated_at || new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...projectUrls,
    ...blogUrls,
  ];
}
