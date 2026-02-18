import React, { useState, useEffect } from 'react';
import './Navbar.css'; // <--- Tambahkan ini
import { Link } from 'react-router-dom'; // Import ini

// Ganti ini:
// <a href="#about" ...>Tentang Kami</a> 

// Jadi ini (untuk link dropdown):
// <Link to="/about" className="nav-link">Tentang Sankara</Link>