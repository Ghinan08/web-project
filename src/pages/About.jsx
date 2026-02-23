import React from 'react';
import './About.css';

const CheckCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8 12.5L10.8 15L16 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconItem = ({ children }) => (
  <li>
    <span className="icon-box"><CheckCircleIcon /></span>
    {children}
  </li>
);

const About = () => {
  return (
    <div className="about-page">
      <section className="about-header text-center">
        <h1>Tentang Sankara</h1>
        <p>Mengenal lebih dekat fondasi dan perjalanan kami.</p>
      </section>

      <div className="container about-content-wrapper">
        
        <div className="legal-box text-center">
          <p className="legal-subtitle">KEPUTUSAN MENTERI HUKUM DAN HAK ASASI MANUSIA REPUBLIK INDONESIA</p>
          <h3 className="legal-number">NOMOR AHU-0031749.AH.01.04.Tahun 2016</h3>
          <p className="legal-desc">TENTANG PENGESAHAN PENDIRIAN BADAN HUKUM YAYASAN IMANDA</p>
        </div>

        <div className="about-section-row">
          <div className="about-img-container">
            <img src="/img/social.png" alt="Ilustrasi Sosial" />
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

        <div className="lists-grid">
            <div>
                <h3 className="mb-4">Aktivitas Yayasan</h3>
                <ul className="icon-list">
                  <IconItem>Program Sekolah Penggerak Kober Imanda</IconItem>
                  <IconItem>HIMPAUDI Kecamatan Andir</IconItem>
                  <IconItem>Pokja PAUD HIBER Kota Bandung</IconItem>
                  <IconItem>Pokja Bunda PAUD Kecamatan Andir</IconItem>
                  <IconItem>Zona Wilayah Mutu PNF Wilayah Zona A</IconItem>
                </ul>
            </div>

            <div>
                <h3 className="mb-4">Prestasi Yayasan</h3>
                <ul className="icon-list">
                  <IconItem>Pemenang Ke-2 Apresiasi Kepala Sekolah Kategori Kober/SPS (2015)</IconItem>
                  <IconItem>Kepala Sekolah Percontohan PAUD HIBER (2019)</IconItem>
                  <IconItem>Kepala Sekolah Percontohan PAUD Inklusi (2019)</IconItem>
                  <IconItem>Nominator Penerima Penghargaan Anugerah Widya Pratama (2019)</IconItem>
                </ul>
            </div>
        </div>

      </div>
    </div>
  );
};

export default About;