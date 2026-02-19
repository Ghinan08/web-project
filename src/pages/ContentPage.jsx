import { useEffect, useState } from 'react';
import { fetchContentList } from '../services/contentService';

const ContentPage = ({ type, title }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const result = await fetchContentList(type, { limit: 24 });
        setItems(result?.items ?? []);
        setError('');
      } catch {
        setError('Gagal mengambil data dari server.');
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [type]);

  return (
    <section className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      <h1 style={{ color: 'white', marginBottom: '24px', fontSize: '2rem' }}>{title}</h1>
      {isLoading && <p style={{ color: '#cbd5e1' }}>Memuat data...</p>}
      {error && <p style={{ color: '#fecaca' }}>{error}</p>}

      {!isLoading && !error && (
        <div className="programs-grid">
          {items.length === 0 && (
            <div className="program-card" style={{ padding: '24px' }}>
              <h3 className="program-title">Belum ada konten</h3>
              <p style={{ color: '#64748b' }}>Konten untuk halaman ini belum tersedia.</p>
            </div>
          )}
          {items.map((item) => (
            <article key={item.id} className="program-card">
              <div className="program-img-header">
                <img src={item.imageUrl ?? 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop'} alt={item.title} />
              </div>
              <div className="program-content">
                <h3 className="program-title">{item.title}</h3>
                <p style={{ color: '#64748b', lineHeight: 1.6 }}>{item.summary ?? 'Ringkasan belum tersedia.'}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default ContentPage;
