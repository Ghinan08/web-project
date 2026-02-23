import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Layout from './Layout';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team'; 
import ProgramPage from './pages/ProgramPage';
import ProgramDetail from './pages/ProgramDetail';
import ContentPage from './pages/ContentPage';
import Login from './pages/Login';
import Register from './pages/Register';

import './App.css'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="team" element={<Team />} />
        <Route path="programs" element={<ProgramPage />} />

        {/* saya disable kan, dikarenakan ingin mengubah ke file baru, dan jikalau ingin menambahkan fungsi fetch api dari contentPage nya, tinggal kopas aja ke programPagenya :D */}
        {/* <Route path="programs" element={<ContentPage type="programs" title="Program" />} /> */}
        <Route path="programs/:id" element={<ProgramDetail />} />
        <Route path="news" element={<ContentPage type="news" title="Berita" />} />
        <Route path="store" element={<ContentPage type="store-items" title="Store" />} />
        <Route path="reports" element={<ContentPage type="annual-reports" title="Laporan Tahunan" />} />
        <Route path="testimonials" element={<ContentPage type="testimonials" title="Testimoni" />} />
        
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        
      </Route>
    </Routes>
  );
}

export default App;