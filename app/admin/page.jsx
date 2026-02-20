'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

function getHeaders() {
  const headers = { 'Content-Type': 'application/json' };
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

function ItemForm({ item, onSave, onCancel, type }) {
  const [form, setForm] = useState({
    title: item?.title || '',
    slug: item?.slug || '',
    meta: item?.meta || '',
    summary: item?.summary || '',
    content: item?.content || '',
  });

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === 'title' && !item) {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setForm((prev) => ({ ...prev, slug }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="form-group">
        <label>Title</label>
        <input type="text" value={form.title} onChange={(e) => handleChange('title', e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Slug</label>
        <input type="text" value={form.slug} onChange={(e) => handleChange('slug', e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Meta ({type === 'project' ? 'e.g. DevOps / Infrastructure / 2024' : 'e.g. DevOps / Kubernetes / January 2024'})</label>
        <input type="text" value={form.meta} onChange={(e) => handleChange('meta', e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Summary (shown on homepage)</label>
        <textarea value={form.summary} onChange={(e) => handleChange('summary', e.target.value)} rows={3} required />
      </div>
      <div className="form-group">
        <label>Content (HTML for detail page)</label>
        <textarea
          value={form.content}
          onChange={(e) => handleChange('content', e.target.value)}
          rows={12}
          style={{ fontFamily: 'monospace', fontSize: '13px' }}
          placeholder="HTML content..."
          required
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn">{item ? 'Update' : 'Create'}</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default function Admin() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);

  const loadData = useCallback(async () => {
    const [pRes, bRes] = await Promise.all([fetch('/api/projects'), fetch('/api/blogs')]);
    if (pRes.ok) setProjects(await pRes.json());
    if (bRes.ok) setBlogs(await bRes.json());
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/login');
      return;
    }
    loadData();
  }, [router, loadData]);

  function handleLogout() {
    localStorage.removeItem('token');
    router.push('/');
  }

  async function handleSave(type, data) {
    const endpoint = type === 'projects' ? '/api/projects' : '/api/blogs';
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `${endpoint}/${editing.id}` : endpoint;

    const res = await fetch(url, { method, headers: getHeaders(), body: JSON.stringify(data) });
    if (!res.ok) { alert('Failed to save'); return; }

    setEditing(null);
    setCreating(false);
    loadData();
  }

  async function handleDelete(type, id) {
    if (!confirm(`Delete this ${type.slice(0, -1)}?`)) return;
    const endpoint = type === 'projects' ? `/api/projects/${id}` : `/api/blogs/${id}`;
    await fetch(endpoint, { method: 'DELETE', headers: getHeaders() });
    loadData();
  }

  const items = activeTab === 'projects' ? projects : blogs;

  return (
    <section className="section">
      <div className="container">
        <div className="admin-header">
          <h2>Admin Dashboard</h2>
          <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
        </div>

        <div className="admin-tabs">
          <button className={`tab ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => { setActiveTab('projects'); setEditing(null); setCreating(false); }}>
            Projects
          </button>
          <button className={`tab ${activeTab === 'blogs' ? 'active' : ''}`} onClick={() => { setActiveTab('blogs'); setEditing(null); setCreating(false); }}>
            Blogs
          </button>
        </div>

        {(editing || creating) ? (
          <ItemForm
            item={editing}
            onSave={(data) => handleSave(activeTab, data)}
            onCancel={() => { setEditing(null); setCreating(false); }}
            type={activeTab === 'projects' ? 'project' : 'blog'}
          />
        ) : (
          <>
            <button className="btn" style={{ marginBottom: '24px' }} onClick={() => setCreating(true)}>
              + New {activeTab === 'projects' ? 'Project' : 'Blog'}
            </button>
            <div>
              {items.map((item) => (
                <div className="admin-list-item" key={item.id}>
                  <div>
                    <h3>{item.title}</h3>
                    <p className="project-meta">{item.meta}</p>
                  </div>
                  <div className="admin-list-actions">
                    <button className="btn btn-small" onClick={() => setEditing(item)}>Edit</button>
                    <button className="btn btn-small btn-danger" onClick={() => handleDelete(activeTab, item.id)}>Delete</button>
                  </div>
                </div>
              ))}
              {items.length === 0 && <p>No {activeTab} yet.</p>}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
