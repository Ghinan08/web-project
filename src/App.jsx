import React, { useState, useEffect } from 'react';
import './App.css'; 

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


// --- NAVBAR COMPONENT ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Status menu mobile buka/tutup
  const [dropdownOpen, setDropdownOpen] = useState(false); // Status dropdown di mobile

  // --- FIX MASALAH 2: RESET MENU SAAT RESIZE ---
  // Fungsi ini akan memantau ukuran layar. Jika layar dibesarkan > 768px (mode laptop),
  // maka paksa tutup menu mobile agar tidak "nyangkut" atau aneh.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
        setDropdownOpen(false);
      }
    };

    // Pasang sensor resize
    window.addEventListener('resize', handleResize);

    // Copot sensor saat komponen hilang (clean up)
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <span>SANKARA</span>
        </div>

        {/* DESKTOP MENU */}
        <ul className="nav-menu">
          <li><a href="#home" className="nav-link">Home</a></li>
          
          {/* DROPDOWN DESKTOP */}
          <li className="nav-item-dropdown">
            <a href="#about" className="nav-link dropdown-trigger">
              Tentang Kami 
              <span className="chevron-down">▼</span>
            </a>
            <ul className="dropdown-menu">
              <li><a href="#sankara">Tentang Sankara</a></li>
              <li><a href="#team">Tim Kami</a></li>
              <li><a href="#vision">Visi & Misi</a></li>
              <li><a href="#report">Laporan Tahunan</a></li>
              <li><a href="#testimonials">Testimoni</a></li>
            </ul>
          </li>

          <li><a href="#program" className="nav-link">Program</a></li>
          <li><a href="#news" className="nav-link">Berita</a></li>
          <li><a href="#store" className="nav-link">Store</a></li>
        </ul>

        {/* DESKTOP BUTTONS */}
        <div className="nav-buttons">
             <button className="btn btn-outline-white" style={{padding: '8px 24px'}}>Masuk</button>
             <button className="btn btn-primary" style={{padding: '8px 24px'}}>Jadi Relawan</button>
        </div>

        {/* HAMBURGER ICON */}
        <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* MOBILE MENU OVERLAY */}
        <div className={`mobile-menu-overlay ${isOpen ? 'active' : ''}`}>
           <a href="#home" className="nav-link" style={{fontSize: '1.2rem'}} onClick={() => setIsOpen(false)}>Home</a>
           
           {/* --- FIX MASALAH 1: DROPDOWN MOBILE LENGKAP (5 ITEM) --- */}
           <div style={{textAlign: 'center', width: '100%'}}>
             <span 
                className="nav-link" 
                style={{fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}} 
                onClick={() => setDropdownOpen(!dropdownOpen)}
             >
               Tentang Kami <span style={{fontSize: '0.8rem'}}>{dropdownOpen ? '▲' : '▼'}</span>
             </span>
             
             {/* Sub-menu Mobile */}
             <div 
                style={{
                    maxHeight: dropdownOpen ? '500px' : '0', // Animasi slide sederhana
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease-in-out',
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '15px', 
                    marginTop: dropdownOpen ? '15px' : '0', 
                    background: 'rgba(255,255,255,0.05)', 
                    borderRadius: '12px',
                    width: '80%',
                    margin: dropdownOpen ? '15px auto 0 auto' : '0 auto'
                }}
             >
                <div style={{padding: '15px', display: 'flex', flexDirection: 'column', gap: '15px'}}>
                  <a href="#sankara" className="nav-link" style={{fontSize: '1rem'}} onClick={() => setIsOpen(false)}>Tentang Sankara</a>
                  <a href="#team" className="nav-link" style={{fontSize: '1rem'}} onClick={() => setIsOpen(false)}>Tim Kami</a>
                  <a href="#vision" className="nav-link" style={{fontSize: '1rem'}} onClick={() => setIsOpen(false)}>Visi & Misi</a>
                  {/* Item Tambahan yang sebelumnya hilang */}
                  <a href="#report" className="nav-link" style={{fontSize: '1rem'}} onClick={() => setIsOpen(false)}>Laporan Tahunan</a>
                  <a href="#testimonials" className="nav-link" style={{fontSize: '1rem'}} onClick={() => setIsOpen(false)}>Testimoni</a>
                </div>
             </div>
           </div>

           <a href="#program" className="nav-link" style={{fontSize: '1.2rem'}} onClick={() => setIsOpen(false)}>Program</a>
           <a href="#news" className="nav-link" style={{fontSize: '1.2rem'}} onClick={() => setIsOpen(false)}>Berita</a>
           
           <div style={{display: 'flex', flexDirection: 'column', gap: '15px', width: '80%', marginTop: '20px'}}>
              <button className="btn btn-outline-white btn-full">Masuk</button>
              <button className="btn btn-primary btn-full">Jadi Relawan</button>
           </div>
        </div>
      </div>
    </nav>
  );
};


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


// --- LEADERBOARD COMPONENT ---
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


// --- PROGRAMS COMPONENT ---
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


// --- MAIN APP ---
function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      
      {/* Wrapper Putih Melengkung */}
      <div className="white-section-wrapper">
         <Leaderboard />
         <Programs />
      </div>

      {/* Footer */}
      <footer style={{background: '#0f172a', color: '#94a3b8', padding: '60px 0 40px 0', textAlign: 'center', fontSize: '0.9rem', borderTop: '1px solid #1e293b'}}>
          <div className="container">
            <span style={{fontSize: '1.5rem', fontWeight: 'bold', color: 'white', display: 'block', marginBottom: '20px'}}>SANKARA</span>
            <p style={{maxWidth: '400px', margin: '0 auto 40px auto'}}>Mewujudkan masa depan yang adil dan berkelanjutan untuk semua.</p>
            <p>&copy; 2026 Sankara Indonesia. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );
}

export default App;