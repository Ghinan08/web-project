import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Sensor untuk menutup menu jika layar dibesarkan ke mode laptop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
        setDropdownOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* LOGO */}
        <div className="logo">
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>🌿 SANKARA</Link>
        </div>

        {/* DESKTOP MENU (Hilang saat di HP) */}
        <ul className="nav-menu">
          <li><Link to="/" className="nav-link">Home</Link></li>
          
          <li className="nav-item-dropdown">
            <span className="nav-link dropdown-trigger" style={{ cursor: 'pointer' }}>
              Tentang Kami <span className="chevron-down">▼</span>
            </span>
            <ul className="dropdown-menu">
              <li><Link to="/about">Tentang Sankara</Link></li>
              <li><Link to="/about">Tim Kami</Link></li>
              <li><Link to="/about">Visi & Misi</Link></li>
              <li><Link to="/about">Laporan Tahunan</Link></li>
              <li><Link to="/about">Testimoni</Link></li>
            </ul>
          </li>

          <li><a href="#program" className="nav-link">Program</a></li>
          <li><a href="#news" className="nav-link">Berita</a></li>
          <li><a href="#store" className="nav-link">Store</a></li>
        </ul>

        {/* DESKTOP BUTTONS (Hilang saat di HP) */}
        <div className="nav-buttons">
             <button className="btn btn-outline-white">Masuk</button>
             <button className="btn btn-primary">Jadi Relawan</button>
        </div>

        {/* HAMBURGER ICON (Hanya muncul di HP) */}
        <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* MOBILE MENU OVERLAY (Layar Hitam Menu HP) */}
        <div className={`mobile-menu-overlay ${isOpen ? 'active' : ''}`}>
           <Link to="/" className="nav-link" style={{fontSize: '1.2rem'}} onClick={() => setIsOpen(false)}>Home</Link>
           
           {/* Dropdown versi Mobile */}
           <div style={{textAlign: 'center', width: '100%'}}>
             <span 
                className="nav-link" 
                style={{fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}} 
                onClick={() => setDropdownOpen(!dropdownOpen)}
             >
               Tentang Kami <span style={{fontSize: '0.8rem'}}>{dropdownOpen ? '▲' : '▼'}</span>
             </span>
             
             <div style={{
                    maxHeight: dropdownOpen ? '500px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease-in-out',
                    display: 'flex', flexDirection: 'column', gap: '15px', 
                    marginTop: dropdownOpen ? '15px' : '0', 
                    background: 'rgba(255,255,255,0.05)', 
                    borderRadius: '12px', width: '80%',
                    margin: dropdownOpen ? '15px auto 0 auto' : '0 auto'
                }}>
                <div style={{padding: '15px', display: 'flex', flexDirection: 'column', gap: '15px'}}>
                  <Link to="/about" className="nav-link" style={{fontSize: '1rem'}} onClick={() => setIsOpen(false)}>Tentang Sankara</Link>
                  <Link to="/about" className="nav-link" style={{fontSize: '1rem'}} onClick={() => setIsOpen(false)}>Tim Kami</Link>
                  <Link to="/about" className="nav-link" style={{fontSize: '1rem'}} onClick={() => setIsOpen(false)}>Visi & Misi</Link>
                  <Link to="/about" className="nav-link" style={{fontSize: '1rem'}} onClick={() => setIsOpen(false)}>Laporan Tahunan</Link>
                  <Link to="/about" className="nav-link" style={{fontSize: '1rem'}} onClick={() => setIsOpen(false)}>Testimoni</Link>
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

export default Navbar;