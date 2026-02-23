import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Sensor untuk menutup menu jika layar dibesarkan
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

        {/* DESKTOP MENU */}
        <ul className="nav-menu">
          <li><NavLink to="/" className="nav-link">Home</NavLink></li>
          
          {/* DROPDOWN  */}
          <li className="nav-item-dropdown">
            <span className="nav-link dropdown-trigger" style={{ cursor: 'pointer' }}>
              Tentang Kami <span className="chevron-down">▼</span>
            </span>
            <ul className="dropdown-menu">
              <li><Link to="/about">Tentang Sankara</Link></li>
              <li><Link to="/team">Tim Kami</Link></li>
              <li><Link to="/vision-and-mission">Vsis & Misi</Link></li>
              <li><Link to="/reports">Laporan Tahunan</Link></li>
              <li><Link to="/testimonials">Testimoni</Link></li>
            </ul>
          </li>

          {/* LINK */}
          <li><NavLink to="/programs" className="nav-link">Program</NavLink></li>
          <li><NavLink to="/news" className="nav-link">Berita</NavLink></li>
          <li><NavLink to="/store" className="nav-link">Store</NavLink></li>
        </ul>

        {/* DESKTOP BUTTONS */}
        <div className="nav-buttons">
             <Link to="/login" className="btn btn-outline-white" style={{padding: '8px 24px', textDecoration: 'none'}}>Masuk</Link>
             <Link to="/register" className="btn btn-primary" style={{padding: '8px 24px', textDecoration: 'none'}}>Daftar</Link>
        </div>

        {/* HAMBURGER ICON */}
        <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* MOBILE MENU OVERLAY */}
        <div className={`mobile-menu-overlay ${isOpen ? 'active' : ''}`}>
           <NavLink to="/" className="nav-link" style={{fontSize: '1.2rem'}} onClick={() => setIsOpen(false)}>Home</NavLink>
           
           {/* Mobile Dropdown */}
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
                  <Link to="/team" className="nav-link" style={{fontSize: '1rem'}} onClick={() => setIsOpen(false)}>Tim Kami</Link>
                  <Link to="/vision-and-mission" className="nav-link" style={{fontSize: '1rem'}} onClick={() => setIsOpen(false)}>Vsis & Misi</Link>
                  <Link to="/testimonials" className="nav-link" style={{fontSize: '1rem'}} onClick={() => setIsOpen(false)}>Testimoni</Link>
                  <Link to="/reports" className="nav-link" style={{fontSize: '1rem'}} onClick={() => setIsOpen(false)}>Laporan Tahunan</Link>
                </div>
             </div>
           </div>

           {/* LINK MOBILE */}
           <NavLink to="/programs" className="nav-link" style={{fontSize: '1.2rem'}} onClick={() => setIsOpen(false)}>Program</NavLink>
           <NavLink to="/news" className="nav-link" style={{fontSize: '1.2rem'}} onClick={() => setIsOpen(false)}>Berita</NavLink>
           <NavLink to="/store" className="nav-link" style={{fontSize: '1.2rem'}} onClick={() => setIsOpen(false)}>Store</NavLink>
           
           {/* BUTTON MOBILE AUTH */}
           <div style={{display: 'flex', flexDirection: 'column', gap: '15px', width: '80%', marginTop: '20px'}}>
              <Link to="/login" className="btn btn-outline-white btn-full" style={{textDecoration: 'none'}} onClick={() => setIsOpen(false)}>Masuk</Link>
              <Link to="/register" className="btn btn-primary btn-full" style={{textDecoration: 'none'}} onClick={() => setIsOpen(false)}>Daftar</Link>
           </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;