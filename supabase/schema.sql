-- Run this in Supabase SQL Editor to create the tables

create table if not exists projects (
  id bigint generated always as identity primary key,
  slug text unique not null,
  title text not null,
  meta text not null,
  summary text not null,
  content text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists blogs (
  id bigint generated always as identity primary key,
  slug text unique not null,
  title text not null,
  meta text not null,
  summary text not null,
  content text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Allow full access via service role key (no RLS needed for server-side only)
alter table projects enable row level security;
alter table blogs enable row level security;

-- Allow read access for everyone (public pages)
create policy "Public read projects" on projects for select using (true);
create policy "Public read blogs" on blogs for select using (true);

-- Allow full access for service role (admin operations via API)
create policy "Service role full access projects" on projects for all using (true) with check (true);
create policy "Service role full access blogs" on blogs for all using (true) with check (true);
