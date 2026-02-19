import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchContentList } from '../services/contentService';

const fallbackPrograms = [
  {
    id: 1,
    title: 'Malang Menyapa #3',
    summary: 'Kegiatan sosial rutin untuk lansia dan masyarakat rentan.',
    imageUrl: 'https://images.unsplash.com/photo-1542601902044-22b4676c77e3?q=80&w=800&auto=format&fit=crop',
    location: 'Panti Jompo Kasih',
    eventDate: '2026-02-22',
    price: '55000',
  },
  {
    id: 2,
    title: 'Project Leader Recruitment',
    summary: 'Program perekrutan pemimpin proyek relawan nasional.',
    imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop',
    location: 'Online (Zoom)',
    eventDate: '2026-02-16',
    price: '0',
  },
];

const volunteersData = [
  { id: 1, name: 'Ahmad Fauzi', region: 'Semarang', events: 6 },
  { id: 2, name: 'Sarah Dewi', region: 'Bandung', events: 5 },
  { id: 3, name: 'Budi Santoso', region: 'Surabaya', events: 5 },
];

const PinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 22C12 22 19 16 19 10.5C19 6.35786 15.866 3 12 3C8.13401 3 5 6.35786 5 10.5C5 16 12 22 12 22Z" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="10.5" r="2.5" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M7 2V5M17 2V5M3 9H21M5 5H19C20.1046 5 21 5.89543 21 7V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V7C3 5.89543 3.89543 5 5 5Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const Home = () => {
  const [programs, setPrograms] = useState(fallbackPrograms);

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        const result = await fetchContentList('programs', { limit: 3 });
        if (result?.items?.length) {
          setPrograms(result.items);
        }
      } catch {
        setPrograms(fallbackPrograms);
      }
    };

    loadPrograms();
  }, []);

  return (
    <>
      <section className="hero container">
        <div className="hero-content">
          <div style={{ display: 'inline-block', padding: '8px 16px', background: 'rgba(255,255,255,0.1)', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.2)', color: '#bae6fd', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '24px' }}>
            Bersama Membangun Harapan
          </div>
          <h1>Keadilan dimulai saat ketidaksetaraan berakhir.</h1>
          <p>Platform kolaborasi sosial untuk menciptakan dampak nyata bagi komunitas di seluruh Indonesia.</p>
          <div className="hero-buttons">
            <Link className="btn btn-primary" to="/programs">Jelajahi Program</Link>
            <Link className="btn btn-outline-white" to="/register">Gabung Relawan</Link>
          </div>
        </div>

        <div className="hero-image-container">
          <img
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Relawan Sankara"
            className="main-img"
          />
        </div>
      </section>

      <div className="white-section-wrapper">
        <div className="container leaderboard-section">
          <div className="text-center" style={{ marginBottom: '50px' }}>
            <p className="text-primary font-bold" style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>Top Performance</p>
            <h2 style={{ fontSize: '2.2rem', marginTop: '10px', color: '#0f172a' }}>Relawan Teraktif</h2>
          </div>

          <div className="stats-grid">
            <div className="stat-card"><p style={{ color: '#64748b', fontWeight: 'bold' }}>TOTAL RELAWAN</p><div className="stat-value">685+</div></div>
            <div className="stat-card"><p style={{ color: '#64748b', fontWeight: 'bold' }}>PROGRAM SUKSES</p><div className="stat-value">35+</div></div>
            <div className="stat-card"><p style={{ color: '#64748b', fontWeight: 'bold' }}>REGIONAL</p><div className="stat-value">10+</div></div>
          </div>

          <div className="ranking-card">
            {volunteersData.map((vol, idx) => (
              <div key={vol.id} className="rank-row">
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', width: '100%' }}>
                  <div className="rank-badge">{idx + 1}</div>
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#0f172a' }}>{vol.name}</div>
                    <div style={{ fontSize: '0.9rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <PinIcon /> {vol.region}
                    </div>
                  </div>
                  <div style={{ fontWeight: 'bold', color: '#15803d', background: '#dcfce7', padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                    {vol.events} Events
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <section className="programs-section container">
          <div className="section-header">
            <div>
              <h2>Program Unggulan</h2>
              <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Pilih kegiatan sosial yang sesuai dengan minatmu.</p>
            </div>
            <Link className="btn btn-link" to="/programs">Lihat Semua Program</Link>
          </div>

          <div className="programs-grid">
            {programs.map((program) => (
              <div className="program-card" key={program.id}>
                <div className="program-img-header">
                  <img src={program.imageUrl ?? 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop'} alt={program.title} />
                </div>
                <div className="program-content">
                  <h3 className="program-title">{program.title}</h3>
                  <ul className="program-meta">
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CalendarIcon /> <span>{program.eventDate ?? 'TBA'}</span></li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><PinIcon /> <span>{program.location ?? 'Lokasi menyusul'}</span></li>
                    <li><span className="font-bold text-primary">{Number(program.price ?? 0) > 0 ? `Rp ${Number(program.price).toLocaleString('id-ID')}` : 'Gratis'}</span></li>
                  </ul>
                  <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                    <Link className="btn btn-primary btn-full" style={{ backgroundColor: '#0f172a', color: 'white' }} to="/programs">Detail Program</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
