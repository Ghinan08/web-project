import React from 'react';
// PERBAIKAN: BrowserRouter dihapus dari sini karena sudah ada di main.jsx buatan temanmu
import { Routes, Route } from 'react-router-dom'; 
import Layout from './Layout';
import Home from './pages/Home';
import About from './pages/About';

// --- IMPORT DARI TEMANMU (API/CRUD) ---
import ContentPage from './pages/ContentPage';
import Login from './pages/Login';
import Register from './pages/Register';

import './App.css'; 

function App() {
  return (
    // PERBAIKAN: Langsung bungkus dengan <Routes>, tanpa <BrowserRouter>
    <Routes>
      {/* Route Induk (Layout dengan Navbar & Footer otomatis) */}
      <Route path="/" element={<Layout />}>
        
        {/* Halaman Utama (UI Buatanmu) */}
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        
        {/* --- ROUTE DINAMIS DARI TEMANMU --- */}
        <Route path="programs" element={<ContentPage type="programs" title="Program" />} />
        <Route path="news" element={<ContentPage type="news" title="Berita" />} />
        <Route path="store" element={<ContentPage type="store-items" title="Store" />} />
        <Route path="reports" element={<ContentPage type="annual-reports" title="Laporan Tahunan" />} />
        <Route path="testimonials" element={<ContentPage type="testimonials" title="Testimoni" />} />
        
        {/* Route Auth */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        
      </Route>
    </Routes>
  );
}

export default App;