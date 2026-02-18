import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Header Section */}
      <section className="about-header text-center">
        <h1>Tentang Sankara</h1>
        <p>Mengenal lebih dekat fondasi dan perjalanan kami.</p>
      </section>

      {/* Content Wrapper (Kartu Putih Besar) */}
      <div className="container about-content-wrapper">
        
        {/* Legal Box */}
        <div className="legal-box text-center">
          <p className="legal-subtitle">KEPUTUSAN MENTERI HUKUM DAN HAK ASASI MANUSIA REPUBLIK INDONESIA</p>
          <h3 className="legal-number">NOMOR AHU-0031749.AH.01.04.Tahun 2016</h3>
          <p className="legal-desc">TENTANG PENGESAHAN PENDIRIAN BADAN HUKUM YAYASAN IMANDA</p>
        </div>

        {/* Jembatan Kebaikan (Image + Text) */}
        <div className="about-section-row">
          <div className="about-img-container">
            <img 
              src="https://images.unsplash.com/photo-1542810634-71277d95dcbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Anak-anak Sankara" 
            />
          </div>
          <div className="about-text-content">
            <h2>Jembatan Kebaikan Anda</h2>
            <p>
              Sankara berdiri di bawah naungan Yayasan Imanda, sebuah lembaga yang telah 
              mengabdikan diri pada dunia pendidikan dan sosial sejak tahun 2006. Kami adalah 
              perwujudan semangat kerelawanan yang berakar dari pengalaman panjang 
              yayasan dalam memberdayakan masyarakat.
            </p>
          </div>
        </div>

        {/* Jejak Langkah (Timeline) */}
        <div className="timeline-section">
          <h2 className="text-center mb-5">Jejak Langkah Yayasan Imanda</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>PAUD Imanda</h4>
                <span>2006 - Sekarang</span>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Sanggar Kreativitas Imanda</h4>
                <span>2010 - Sekarang</span>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Klab Belajar Imanda (KBI)</h4>
                <span>2020 - Sekarang</span>
              </div>
            </div>
             <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Tim Volunteer Sankara</h4>
                <span>2025 - Sekarang</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lists Grid (Aktivitas & Prestasi) */}
        <div className="lists-grid">
            {/* Kolom Kiri */}
            <div>
                <h3 className="mb-4">Aktivitas Yayasan</h3>
                <ul className="icon-list">
                    <li><span className="icon-box">📖</span> Program Sekolah Penggerak Kober Imanda</li>
                    <li><span className="icon-box">🚗</span> HIMPAUDI Kecamatan Andir</li>
                    <li><span className="icon-box">🏠</span> Pokja PAUD HIBER Kota Bandung</li>
                    <li><span className="icon-box">👤</span> Pokja Bunda PAUD Kecamatan Andir</li>
                    <li><span className="icon-box">🌳</span> Zona Wilayah Mutu PNF Wilayah Zona A</li>
                </ul>
            </div>

            {/* Kolom Kanan */}
            <div>
                <h3 className="mb-4">Prestasi Yayasan</h3>
                <ul className="icon-list">
                    <li><span className="icon-box">🏆</span> Pemenang Ke-2 Apresiasi Kepala Sekolah Kategori Kober/SPS (2015)</li>
                    <li><span className="icon-box">🌟</span> Kepala Sekolah Percontohan PAUD HIBER (2019)</li>
                    <li><span className="icon-box">🏫</span> Kepala Sekolah Percontohan PAUD Inklusi (2019)</li>
                    <li><span className="icon-box">📜</span> Nominator Penerima Penghargaan Anugerah Widya Pratama (2019)</li>
                </ul>
            </div>
        </div>

      </div>
    </div>
  );
};

export default About;