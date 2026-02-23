import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { masterPrograms } from './Home'; 
import './ProgramPage.css';

const ProgramPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');

  const filteredPrograms = masterPrograms.filter((program) => {
    const matchCategory = activeCategory === 'Semua' || program.category === activeCategory;
    const matchSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="program-page-wrapper">
      <section className="program-page-header container">
        <h1>Daftar Program Sankara</h1>
        <p>Temukan berbagai kegiatan sosial terbaru dan jadilah bagian dari perubahan nyata bersama kami.</p>
      </section>

      <section className="container" style={{ paddingBottom: '80px' }}>
        <div className="filter-container">
          <div className="search-box">
             <span className="search-icon">🔍</span>
             <input type="text" placeholder="Cari nama program..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />
          </div>
          <div className="filter-dropdown-box">
             <select className="filter-dropdown" value={activeCategory} onChange={(e) => setActiveCategory(e.target.value)}>
                <option value="Semua">Semua Kategori</option>
                <option value="Pusat">Pusat</option>
                <option value="Regional">Regional</option>
             </select>
          </div>
        </div>

        <div className="programs-grid">
          {filteredPrograms.length === 0 && (
             <div className="empty-state">
                <h3>Program tidak ditemukan</h3>
                <p>Coba gunakan kata kunci pencarian yang lain.</p>
             </div>
          )}

          {filteredPrograms.map((item) => (
            <article key={item.id} className="program-card">
              <div className="program-img-header">
                <img src={item.imageUrl} alt={item.title} />
                <span className="program-badge">{item.category}</span>
              </div>
              <div className="program-content">
                <h3 className="program-title">{item.title}</h3>
                <p className="program-desc">{item.summary}</p>
                <div style={{ marginTop: 'auto', paddingTop: '15px' }}>
                  <Link to={`/programs/${item.id}`} className="btn btn-primary btn-full" style={{ backgroundColor: '#0f172a', color: 'white', textDecoration: 'none', textAlign: 'center', padding: '12px' }}>
                      Lihat Selengkapnya
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProgramPage;