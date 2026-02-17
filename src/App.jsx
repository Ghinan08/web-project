import React from 'react';
import './App.css'; // Pastikan file CSS tadi disimpan sebagai App.css atau index.css

// Komponen Navbar
const Navbar = () => (
  <nav className="navbar container">
    <div className="logo">
      <span style={{color: '#854d0e'}}>🌿</span> SANKARA
    </div>
    <ul className="nav-links">
      <li><a href="#">Home</a></li>
      <li><a href="#">Tentang Kami</a></li>
      <li><a href="#">Program</a></li>
      <li><a href="#">Berita</a></li>
      <li><a href="#">Mitra</a></li>
      <li><a href="#">Store</a></li>
    </ul>
    <button className="btn btn-primary">Jadi Relawan</button>
  </nav>
);

// Komponen Hero
const Hero = () => (
  <section className="hero container">
    <div className="hero-content">
      <div className="badge">✨ Bersama Membangun Harapan</div>
      <h1>Keadilan dimulai saat ketidaksetaraan berakhir.</h1>
      <p>
        Mari bersama wujudkan dunia di mana setiap orang memiliki kekuatan untuk
        membentuk masa depan mereka sendiri.
      </p>
      <div className="hero-buttons">
        <button className="btn btn-primary">Jelajahi Program</button>
        <button className="btn btn-outline">Gabung Relawan</button>
      </div>
    </div>
    
    <div className="hero-image-container">
      {/* Placeholder image - ganti src dengan gambar aslimu nanti */}
      <img 
        src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
        alt="Relawan Sankara" 
        className="main-img"
      />
    </div>
  </section>
);

// Data Dummy untuk Leaderboard
const volunteers = [
  { id: 1, name: 'Hidden Contender', region: 'Semarang', events: 4, level: 'Ranger' },
  { id: 2, name: 'Hidden Contender', region: 'Bandung', events: 4, level: 'Ranger' },
  { id: 3, name: 'Hidden Contender', region: 'Bandung +1', events: 3, level: 'Ranger' },
  { id: 4, name: 'Hidden Contender', region: 'Solo', events: 3, level: 'Ranger' },
  { id: 5, name: 'Hidden Contender', region: 'Bogor', events: 3, level: 'Ranger' },
];

// Komponen Leaderboard
const Leaderboard = () => (
  <section className="leaderboard-section">
    <div className="container">
      <div className="section-title">
        <p style={{color: '#15803d', fontWeight: 'bold', fontSize: '0.9rem'}}>PERINGKAT RELAWAN</p>
        <h2>Top 10 Relawan Teraktif</h2>
        <p style={{color: '#6b7280'}}>Apresiasi untuk relawan dengan partisipasi terbanyak dalam program Sankara Indonesia</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <p>TOTAL PESERTA</p>
          <div className="stat-value">685</div>
        </div>
        <div className="stat-card">
          <p>TOP SCORE</p>
          <div className="stat-value">4 Event</div>
        </div>
        <div className="stat-card">
          <p>REGIONAL AKTIF</p>
          <div className="stat-value">13</div>
        </div>
      </div>

      <div className="ranking-list">
        {/* Header Table */}
        <div style={{display: 'grid', gridTemplateColumns: '50px 2fr 1.5fr 1fr 1fr', padding: '0 20px', fontSize: '0.8rem', color: '#9ca3af', fontWeight: 'bold'}}>
          <span>RANK</span>
          <span>NAMA RELAWAN</span>
          <span>REGIONAL</span>
          <span>JUMLAH EVENT</span>
          <span>LEVEL</span>
        </div>

        {/* Rows */}
        {volunteers.map((vol, index) => (
          <div className="rank-item" key={vol.id}>
            <div className="rank-number">{index + 1}</div>
            <div style={{fontWeight: 'bold'}}>{vol.name}</div>
            <div><span className="location-badge">📍 {vol.region}</span></div>
            <div style={{fontWeight: 'bold', color: '#15803d'}}>{vol.events} event</div>
            <div><span className="level-badge">👑 {vol.level}</span></div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Leaderboard />
    </div>
  );
}

export default App;