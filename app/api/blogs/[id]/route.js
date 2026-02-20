import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { authenticate } from '@/lib/auth';

export async function GET(_request, { params }) {
  const { id } = await params;

  const isSlug = isNaN(Number(id));
  const query = isSlug
    ? supabase.from('blogs').select('*').eq('slug', id).single()
    : supabase.from('blogs').select('*').eq('id', id).single();

  const { data, error } = await query;
  if (error || !data) return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(request, { params }) {
  const user = authenticate(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const { slug, title, meta, summary, content } = await request.json();
  if (!slug || !title || !meta || !summary || !content) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('blogs')
    .update({ slug, title, meta, summary, content, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'A blog with this slug already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data) return NextResponse.json({ error: 'Blog not found' }, { status: 404 });

  return NextResponse.json(data);
}

export async function DELETE(request, { params }) {
  const user = authenticate(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const { error } = await supabase.from('blogs').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ message: 'Deleted' });
}
