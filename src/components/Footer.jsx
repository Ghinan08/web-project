import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="container" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <span style={{fontSize: '1.5rem', fontWeight: 'bold', color: 'white', display: 'block', marginBottom: '20px'}}>🌿 SANKARA</span>
        <p style={{maxWidth: '400px', margin: '0 auto 40px auto'}}>Mewujudkan masa depan yang adil dan berkelanjutan untuk semua.</p>
        <p>&copy; 2026 Sankara Indonesia. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;