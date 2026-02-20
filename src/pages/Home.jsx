import React from 'react';

// --- DATA DUMMY ---
const programsData = [
  { id: 1, title: 'MALANG MENYAPA #3', category: 'REGIONAL MALANG', date: '22 Feb 2026', location: 'Panti Jompo Kasih', price: 'Rp 55.000', registered: 26, quota: 26, image: 'https://images.unsplash.com/photo-1542601902044-22b4676c77e3?q=80&w=800&auto=format&fit=crop' },
  { id: 2, title: 'PROJECT LEADER RECRUITMENT', category: 'SANKARA PUSAT', date: '16 Feb 2026', location: 'Online (Zoom)', price: 'Gratis', registered: 17, quota: null, image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop' },
  { id: 3, title: 'BANDUNG MENYAPA #10', category: 'REGIONAL BANDUNG', date: '15 Feb 2026', location: 'Rumah Quran Isyarah', price: 'Rp 60.000', registered: 14, quota: 25, image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop' },
];

const volunteersData = [
    { id: 1, name: 'Ahmad Fauzi', region: 'Semarang', events: 6 },
    { id: 2, name: 'Sarah Dewi', region: 'Bandung', events: 5 },
    { id: 3, name: 'Budi Santoso', region: 'Surabaya', events: 5 },
];

// --- PASTE COMPONENT HERO DI SINI ---
// --- HERO COMPONENT ---
const Hero = () => (
  <section className="hero container" id="home">
    <div className="hero-content">
      <div style={{display: 'inline-block', padding: '8px 16px', background: 'rgba(255,255,255,0.1)', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.2)', color: '#bae6fd', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '24px'}}>
         ✨ Bersama Membangun Harapan
      </div>
      <h1>Keadilan dimulai saat ketidaksetaraan berakhir.</h1>
      <p>
        Platform kolaborasi sosial terbesar di Indonesia. Bergabunglah dengan ribuan relawan lainnya untuk menciptakan dampak nyata hari ini.
      </p>
      <div className="hero-buttons">
        <button className="btn btn-primary">Jelajahi Program</button>
        <button className="btn btn-outline-white">Gabung Relawan</button>
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
);

// --- PASTE COMPONENT LEADERBOARD DI SINI ---
const Leaderboard = () => (
    <div className="container leaderboard-section">
      <div className="text-center" style={{marginBottom: '50px'}}>
        <p className="text-primary font-bold" style={{textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem'}}>Top Performance</p>
        <h2 style={{fontSize: '2.2rem', marginTop: '10px', color: '#0f172a'}}>Relawan Teraktif</h2>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <p style={{color: '#64748b', fontWeight: 'bold'}}>TOTAL RELAWAN</p>
          <div className="stat-value">685+</div>
        </div>
        <div className="stat-card">
          <p style={{color: '#64748b', fontWeight: 'bold'}}>PROGRAM SUKSES</p>
          <div className="stat-value">35+</div>
        </div>
        <div className="stat-card">
          <p style={{color: '#64748b', fontWeight: 'bold'}}>REGIONAL</p>
          <div className="stat-value">10+</div>
        </div>
      </div>
      
      {/* Table Ranking */}
      <div className="ranking-card">
          {volunteersData.map((vol, idx) => (
              <div key={vol.id} className="rank-row">
                  <div style={{display: 'flex', gap: '20px', alignItems: 'center', width: '100%'}}>
                      <div className="rank-badge">{idx + 1}</div>
                      <div style={{flexGrow: 1}}>
                          <div style={{fontWeight: 'bold', fontSize: '1.1rem', color: '#0f172a'}}>{vol.name}</div>
                          <div style={{fontSize: '0.9rem', color: '#64748b'}}>📍 {vol.region}</div>
                      </div>
                      <div style={{fontWeight: 'bold', color: '#15803d', background: '#dcfce7', padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', whiteSpace: 'nowrap'}}>
                         {vol.events} Events
                      </div>
                  </div>
              </div>
          ))}
      </div>
    </div>
);

// --- PASTE COMPONENT PROGRAMS DI SINI ---
const Programs = () => (
  <section className="programs-section container" id="program">
      <div className="section-header">
        <div>
          <h2>Program Unggulan</h2>
          <p style={{color: '#64748b', fontSize: '1.1rem'}}>Pilih kegiatan sosial yang sesuai dengan minatmu.</p>
        </div>
        <button className="btn btn-link">Lihat Semua Program →</button>
      </div>

      <div className="programs-grid">
        {programsData.map(program => (
          <div className="program-card" key={program.id}>
            <div className="program-img-header">
              <img src={program.image} alt={program.title} />
              <div className="program-category-badge">
                {program.category}
              </div>
            </div>
            <div className="program-content">
              <h3 className="program-title">{program.title}</h3>
              
              <ul className="program-meta">
                <li>📅 <span>{program.date}</span></li>
                <li>📍 <span>{program.location}</span></li>
                <li>💰 <span className="font-bold text-primary">{program.price}</span></li>
              </ul>
              
              <div style={{marginTop: 'auto', paddingTop: '20px'}}>
                  <button className="btn btn-primary btn-full" style={{backgroundColor: '#0f172a', color: 'white'}}>Detail Program</button>
              </div>
            </div>
          </div>
        ))}
      </div>
  </section>
);

// --- KOMPONEN UTAMA HOME ---
const Home = () => {
  return (
    <>
      <Hero />
      <div className="white-section-wrapper">
         <Leaderboard />
         <Programs />
      </div>
    </>
  );
};

export default Home;