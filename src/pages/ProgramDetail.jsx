import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { masterPrograms } from './Home'; 
import './ProgramDetail.css';

const ProgramDetail = () => {
  const { id } = useParams();
  
  const program = masterPrograms.find(p => p.id === parseInt(id));

  if (!program) {
    return (
      <div className="detail-page" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white'}}>
        <div style={{textAlign: 'center'}}>
           <h2>Program Tidak Ditemukan</h2>
           <Link to="/programs" className="btn btn-outline-white" style={{marginTop: '20px'}}>Kembali ke Daftar Program</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <div className="detail-hero">
        <img src={program.imageUrl} alt={program.title} className="detail-hero-img" />
        <div className="detail-hero-overlay">
          <div className="container">
            <span className="detail-badge">{program.category.toUpperCase()}</span>
            <h1 className="detail-title">{program.title}</h1>
          </div>
        </div>
      </div>

      <div className="container detail-content-wrapper">
        <div className="detail-grid">
          
          <div className="detail-main-content">
            <div className="content-box">
              <h2>Tentang Program</h2>
              <p>{program.summary}</p>
              <p>Ini adalah halaman detail untuk {program.title}. Nanti saat dihubungkan ke API, paragraf ini akan berisi penjelasan lengkap yang diketik oleh admin di halaman Dashboard.</p>

              <h3>Syarat Relawan</h3>
              <ul className="detail-list">
                <li>Berusia 17 - 30 Tahun.</li>
                <li>Memiliki kepedulian tinggi terhadap isu sosial.</li>
                <li>Sehat jasmani dan rohani.</li>
              </ul>
            </div>
          </div>

          <div className="detail-sidebar">
            <div className="action-card">
              <h3>Informasi Pelaksanaan</h3>
              <ul className="action-meta">
                <li><span className="icon">📅</span> <div><strong>Tanggal</strong><p>{program.eventDate}</p></div></li>
                <li><span className="icon">📍</span> <div><strong>Lokasi</strong><p>{program.location}</p></div></li>
                <li><span className="icon">💰</span> <div><strong>Biaya</strong><p className="price">{program.price > 0 ? `Rp ${program.price.toLocaleString('id-ID')}` : 'Gratis'}</p></div></li>
              </ul>

              <button className="btn btn-primary btn-full" style={{ padding: '15px', fontSize: '1.1rem', marginBottom: '15px' }}>Daftar Sekarang</button>
              <Link to="/programs" className="btn btn-outline-white btn-full" style={{ textAlign: 'center', textDecoration: 'none', color: '#475569', borderColor: '#cbd5e1' }}>Kembali ke Daftar</Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;