import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 

export const masterPrograms = [
  { 
    id: 1, title: 'Malang Menyapa #3', category: 'Regional', eventDate: '22 Feb 2026', location: 'Panti Jompo Kasih, Malang', price: 55000, 
    summary: 'Program kerelawanan unggulan yang berfokus pada kesejahteraan lansia di Panti Jompo Kasih, Malang.', 
    imageUrl: '/img/kU.avif' 
  },
  { 
    id: 2, title: 'Project Leader Recruitment', category: 'Pusat', eventDate: '16 Feb 2026', location: 'Online (Zoom)', price: 0, 
    summary: 'Pencarian talenta muda berbakat untuk memimpin proyek-proyek sosial Sankara di seluruh Indonesia.', 
    imageUrl: '/img/S4.jpg' 
  },
  { 
    id: 3, title: 'Bandung Menyapa #10', category: 'Regional', eventDate: '15 Feb 2026', location: 'Rumah Quran Isyarah, Bandung', price: 60000, 
    summary: 'Kegiatan mengajar dan berbagi inspirasi bersama anak-anak di Rumah Quran Isyarah, Bandung.', 
    imageUrl: '/img/Spa.avif' 
  },
  { 
    id: 4, title: 'Sankara Peduli Bencana', category: 'Pusat', eventDate: '10 Mar 2026', location: 'Lokasi Terdampak', price: 0, 
    summary: 'Penyaluran bantuan logistik darurat dan dukungan psikososial untuk korban terdampak bencana alam.', 
    imageUrl: '/img/VL.avif' 
  }
];

const volunteersData = [
    { id: 1, name: 'Ahmad Fauzi', region: 'Semarang', events: 6 },
    { id: 2, name: 'Sarah Dewi', region: 'Bandung', events: 5 },
    { id: 3, name: 'Budi Santoso', region: 'Surabaya', events: 5 },
];

const Hero = () => (
  <section className="hero container" id="home">
    <div className="hero-content">
      <div style={{display: 'inline-block', padding: '8px 16px', background: 'rgba(255,255,255,0.1)', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.2)', color: '#bae6fd', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '24px'}}>
         ✨ Bersama Membangun Harapan
      </div>
      <h1>Keadilan dimulai saat ketidaksetaraan berakhir.</h1>
      <p>Platform kolaborasi sosial terbesar di Indonesia. Bergabunglah dengan ribuan relawan lainnya untuk menciptakan dampak nyata hari ini.</p>
      <div className="hero-buttons">
        <Link to="/programs" className="btn btn-primary" style={{textDecoration: 'none'}}>Jelajahi Program</Link>
        <Link to="/register" className="btn btn-outline-white" style={{textDecoration: 'none'}}>Gabung Relawan</Link>
      </div>
    </div>
    <div className="hero-image-container">
      <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Relawan Sankara" className="main-img" />
    </div>
  </section>
);

const Leaderboard = () => (
    <div className="container leaderboard-section">
      <div className="text-center" style={{marginBottom: '50px'}}>
        <p className="text-primary font-bold" style={{textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem'}}>Top Performance</p>
        <h2 style={{fontSize: '2.2rem', marginTop: '10px', color: '#0f172a'}}>Relawan Teraktif</h2>
      </div>
      <div className="ranking-card">
          {volunteersData.map((vol, idx) => (
              <div key={vol.id} className="rank-row">
                  <div style={{display: 'flex', gap: '20px', alignItems: 'center', width: '100%'}}>
                      <div className="rank-badge">{idx + 1}</div>
                      <div style={{flexGrow: 1}}>
                          <div style={{fontWeight: 'bold', fontSize: '1.1rem', color: '#0f172a'}}>{vol.name}</div>
                          <div style={{fontSize: '0.9rem', color: '#64748b'}}>📍 {vol.region}</div>
                      </div>
                      <div style={{fontWeight: 'bold', color: '#15803d', background: '#dcfce7', padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', whiteSpace: 'nowrap'}}>{vol.events} Events</div>
                  </div>
              </div>
          ))}
      </div>
    </div>
);

const Home = () => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
     setPrograms(masterPrograms.slice(0, 3));
  }, []);

  return (
    <>
      <Hero />
      <div className="white-section-wrapper">
         <Leaderboard />
         
         <section className="programs-section container" id="program">
            <div className="section-header">
              <div>
                <h2>Program Unggulan</h2>
                <p style={{color: '#64748b', fontSize: '1.1rem'}}>Pilih kegiatan sosial yang sesuai dengan minatmu.</p>
              </div>
              <Link to="/programs" className="btn btn-link" style={{textDecoration: 'none'}}>Lihat Semua Program →</Link>
            </div>

            <div className="programs-grid">
              {programs.map((program) => (
                <div className="program-card" key={program.id}>
                  <div className="program-img-header">
                    <img src={program.imageUrl} alt={program.title} />
                    <div className="program-category-badge">{program.category}</div>
                  </div>
                  <div className="program-content">
                    <h3 className="program-title">{program.title}</h3>
                    <ul className="program-meta">
                      <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>📅 <span>{program.eventDate}</span></li>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>📍 <span>{program.location}</span></li>
                      <li>💰 <span className="font-bold text-primary">{program.price > 0 ? `Rp ${program.price.toLocaleString('id-ID')}` : 'Gratis'}</span></li>
                    </ul>
                    <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                        <Link className="btn btn-primary btn-full" style={{ backgroundColor: '#0f172a', color: 'white', textDecoration: 'none' }} to={`/programs/${program.id}`}>
                           Detail Program
                        </Link>
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