'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';

function getHeaders() {
  const headers = { 'Content-Type': 'application/json' };
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

/* ── HTML Toolbar ── */
const TOOLBAR_ITEMS = [
  { label: 'H2', tag: 'h2', block: true },
  { label: 'H3', tag: 'h3', block: true },
  { label: 'B', tag: 'strong', title: 'Bold' },
  { label: 'I', tag: 'em', title: 'Italic' },
  { label: '<>', tag: 'code', title: 'Inline code' },
  { label: 'Pre', tag: 'pre', block: true, wrap: 'code', title: 'Code block' },
  { label: 'A', tag: 'a', attr: 'href=""', title: 'Link' },
  { label: 'UL', tag: 'ul', block: true, inner: '\n  <li></li>\n', title: 'Unordered list' },
  { label: 'OL', tag: 'ol', block: true, inner: '\n  <li></li>\n', title: 'Ordered list' },
  { label: 'IMG', self: true, template: '<img src="" alt="" />', title: 'Image' },
  { label: 'HR', self: true, template: '<hr />', title: 'Horizontal rule' },
  { label: 'BQ', tag: 'blockquote', block: true, title: 'Blockquote' },
  { label: 'P', tag: 'p', block: true, title: 'Paragraph' },
  { label: 'Table', self: true, template: '<table>\n  <thead>\n    <tr>\n      <th>Header</th>\n      <th>Header</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Cell</td>\n      <td>Cell</td>\n    </tr>\n  </tbody>\n</table>', title: 'Table' },
];

function insertTag(textareaRef, item, form, setForm) {
  const el = textareaRef.current;
  if (!el) return;

  const start = el.selectionStart;
  const end = el.selectionEnd;
  const selected = form.content.substring(start, end);
  let insert = '';

  if (item.self) {
    insert = item.template;
  } else if (item.wrap) {
    const open = `<${item.tag}><${item.wrap}>`;
    const close = `</${item.wrap}></${item.tag}>`;
    insert = item.block
      ? `\n${open}${selected || 'code here'}${close}\n`
      : `${open}${selected}${close}`;
  } else if (item.inner) {
    insert = item.block
      ? `\n<${item.tag}>${item.inner}</${item.tag}>\n`
      : `<${item.tag}>${item.inner}</${item.tag}>`;
  } else {
    const attrStr = item.attr ? ` ${item.attr}` : '';
    const open = `<${item.tag}${attrStr}>`;
    const close = `</${item.tag}>`;
    insert = item.block
      ? `\n${open}${selected}${close}\n`
      : `${open}${selected}${close}`;
  }

  const newContent = form.content.substring(0, start) + insert + form.content.substring(end);
  setForm((prev) => ({ ...prev, content: newContent }));

  requestAnimationFrame(() => {
    el.focus();
    const cursorPos = start + insert.length;
    el.setSelectionRange(cursorPos, cursorPos);
  });
}

/* ── Item Form with Editor + Preview ── */
function ItemForm({ item, onSave, onCancel, type }) {
  const [form, setForm] = useState({
    title: item?.title || '',
    slug: item?.slug || '',
    meta: item?.meta || '',
    summary: item?.summary || '',
    content: item?.content || '',
  });
  const [editorMode, setEditorMode] = useState('split');
  const textareaRef = useRef(null);

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

  function handleKeyDown(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const el = textareaRef.current;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const newContent = form.content.substring(0, start) + '  ' + form.content.substring(end);
      setForm((prev) => ({ ...prev, content: newContent }));
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start + 2;
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="admin-editor-form">
      <div className="admin-form-top">
        <div className="form-group">
          <label htmlFor="field-title">Title</label>
          <input id="field-title" type="text" value={form.title} onChange={(e) => handleChange('title', e.target.value)} required />
        </div>
        <div className="admin-form-row">
          <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor="field-slug">Slug</label>
            <input id="field-slug" type="text" value={form.slug} onChange={(e) => handleChange('slug', e.target.value)} required />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor="field-meta">Meta ({type === 'project' ? 'e.g. DevOps / Infrastructure / 2024' : 'e.g. DevOps / Kubernetes / January 2024'})</label>
            <input id="field-meta" type="text" value={form.meta} onChange={(e) => handleChange('meta', e.target.value)} required />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="field-summary">Summary (shown on homepage)</label>
          <textarea id="field-summary" value={form.summary} onChange={(e) => handleChange('summary', e.target.value)} rows={2} required />
        </div>
      </div>

      <div className="admin-content-header">
        <label htmlFor="field-content">Content (HTML)</label>
        <div className="editor-mode-tabs">
          <button type="button" className={`editor-mode-btn ${editorMode === 'code' ? 'active' : ''}`} onClick={() => setEditorMode('code')}>Code</button>
          <button type="button" className={`editor-mode-btn ${editorMode === 'split' ? 'active' : ''}`} onClick={() => setEditorMode('split')}>Split</button>
          <button type="button" className={`editor-mode-btn ${editorMode === 'preview' ? 'active' : ''}`} onClick={() => setEditorMode('preview')}>Preview</button>
        </div>
      </div>

      <div className="editor-toolbar">
        {TOOLBAR_ITEMS.map((t) => (
          <button
            key={t.label}
            type="button"
            className="toolbar-btn"
            title={t.title || t.label}
            onClick={() => insertTag(textareaRef, t, form, setForm)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className={`editor-panes mode-${editorMode}`}>
        {editorMode !== 'preview' && (
          <div className="editor-code-pane">
            <textarea
              id="field-content"
              ref={textareaRef}
              value={form.content}
              onChange={(e) => handleChange('content', e.target.value)}
              onKeyDown={handleKeyDown}
              className="code-textarea"
              placeholder="Write HTML content here..."
              spellCheck={false}
              required
            />
          </div>
        )}
        {editorMode !== 'code' && (
          <div className="editor-preview-pane">
            <div className="detail-content" dangerouslySetInnerHTML={{ __html: form.content }} />
          </div>
        )}
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
  const [previewId, setPreviewId] = useState(null);

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
      <div className="container admin-container">
        <div className="admin-header">
          <h2>Admin Dashboard</h2>
          <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
        </div>

        <div className="admin-tabs">
          <button className={`tab ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => { setActiveTab('projects'); setEditing(null); setCreating(false); setPreviewId(null); }}>
            Projects
          </button>
          <button className={`tab ${activeTab === 'blogs' ? 'active' : ''}`} onClick={() => { setActiveTab('blogs'); setEditing(null); setCreating(false); setPreviewId(null); }}>
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
                <div key={item.id}>
                  <div className="admin-list-item">
                    <div>
                      <h3>{item.title}</h3>
                      <p className="project-meta">{item.meta}</p>
                    </div>
                    <div className="admin-list-actions">
                      <button
                        className="btn btn-small btn-secondary"
                        onClick={() => setPreviewId(previewId === item.id ? null : item.id)}
                      >
                        {previewId === item.id ? 'Hide' : 'Preview'}
                      </button>
                      <button className="btn btn-small" onClick={() => setEditing(item)}>Edit</button>
                      <button className="btn btn-small btn-danger" onClick={() => handleDelete(activeTab, item.id)}>Delete</button>
                    </div>
                  </div>
                  {previewId === item.id && (
                    <div className="admin-inline-preview">
                      <div className="admin-preview-header">
                        <span>Preview</span>
                      </div>
                      <div className="admin-preview-body">
                        <p className="card-meta">{item.meta}</p>
                        <h1 className="detail-title">{item.title}</h1>
                        <div className="detail-content" dangerouslySetInnerHTML={{ __html: item.content }} />
                      </div>
                    </div>
                  )}
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
