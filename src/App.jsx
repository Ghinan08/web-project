import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import About from './pages/About';
import './App.css'; // Hanya menyisakan CSS Global

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route Induk (Membungkus semua halaman dengan Layout Navbar & Footer) */}
        <Route path="/" element={<Layout />}>
          
          {/* Jika URL-nya '/' (Awal), tampilkan halaman Home */}
          <Route index element={<Home />} />
          
          {/* Jika URL-nya '/about', tampilkan halaman About */}
          <Route path="about" element={<About />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;