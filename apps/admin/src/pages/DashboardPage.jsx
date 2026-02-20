/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { api } from '../api';
import { clearToken } from '../auth';

const CONTENT_TYPES = [
  { key: 'programs', label: 'Programs' },
  { key: 'news', label: 'News' },
  { key: 'testimonials', label: 'Testimonials' },
  { key: 'store-items', label: 'Store Items' },
  { key: 'annual-reports', label: 'Annual Reports' },
];

const emptyForm = {
  title: '',
  summary: '',
  content: '',
  imageUrl: '',
  slug: '',
  published: true,
};

const DashboardPage = () => {
  const [type, setType] = useState(CONTENT_TYPES[0].key);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const heading = useMemo(
    () => CONTENT_TYPES.find((item) => item.key === type)?.label ?? 'Content',
    [type],
  );

  const loadItems = useCallback(async () => {
    try {
      const response = await api.get(`/${type}`, { params: { admin: 1, limit: 100 } });
      setItems(response.data?.data?.items ?? []);
      setError('');
    } catch (err) {
      setError(err?.response?.data?.message ?? 'Gagal mengambil data.');
    }
  }, [type]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      if (editingId) {
        await api.put(`/${type}/${editingId}`, form);
      } else {
        await api.post(`/${type}`, form);
      }
      setForm(emptyForm);
      setEditingId(null);
      await loadItems();
    } catch (err) {
      setError(err?.response?.data?.message ?? 'Gagal menyimpan data.');
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({
      title: item.title ?? '',
      summary: item.summary ?? '',
      content: item.content ?? '',
      imageUrl: item.imageUrl ?? '',
      slug: item.slug ?? '',
      published: item.published ?? true,
    });
  };

  const deleteItem = async (id) => {
    try {
      await api.delete(`/${type}/${id}`);
      await loadItems();
    } catch (err) {
      setError(err?.response?.data?.message ?? 'Gagal menghapus data.');
    }
  };

  const doLogout = async () => {
    await api.post('/auth/logout');
    clearToken();
    window.location.href = '/login';
  };

  return (
    <div className="dashboard-shell">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button onClick={doLogout}>Logout</button>
      </header>

      <div className="tabs">
        {CONTENT_TYPES.map((item) => (
          <button
            key={item.key}
            className={item.key === type ? 'active' : ''}
            onClick={() => {
              setType(item.key);
              setForm(emptyForm);
              setEditingId(null);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <section className="dashboard-grid">
        <div className="admin-card">
          <h2>{editingId ? `Edit ${heading}` : `Tambah ${heading}`}</h2>
          <form onSubmit={submitForm} className="admin-form">
            <input placeholder="Title" value={form.title} onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))} required />
            <input placeholder="Slug (opsional)" value={form.slug} onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value }))} />
            <input placeholder="Image URL" value={form.imageUrl} onChange={(event) => setForm((prev) => ({ ...prev, imageUrl: event.target.value }))} />
            <textarea placeholder="Summary" value={form.summary} onChange={(event) => setForm((prev) => ({ ...prev, summary: event.target.value }))} />
            <textarea placeholder="Content" value={form.content} onChange={(event) => setForm((prev) => ({ ...prev, content: event.target.value }))} />
            <label className="check-row">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(event) => setForm((prev) => ({ ...prev, published: event.target.checked }))}
              />
              Published
            </label>
            <button type="submit">{editingId ? 'Update' : 'Create'}</button>
          </form>
          {editingId ? (
            <button className="secondary-btn" onClick={() => { setEditingId(null); setForm(emptyForm); }}>
              Batal Edit
            </button>
          ) : null}
        </div>

        <div className="admin-card">
          <h2>Daftar {heading}</h2>
          {error ? <p className="error-text">{error}</p> : null}
          <div className="content-list">
            {items.map((item) => (
              <article key={item.id} className="content-item">
                <h3>{item.title}</h3>
                <p>{item.summary || 'Tanpa ringkasan'}</p>
                <div className="item-actions">
                  <button onClick={() => startEdit(item)}>Edit</button>
                  <button className="danger" onClick={() => deleteItem(item.id)}>Delete</button>
                </div>
              </article>
            ))}
            {items.length === 0 ? <p>Belum ada data.</p> : null}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
