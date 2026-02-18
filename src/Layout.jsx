import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar'; // Sesuaikan path jika Navbar kamu ada di folder components
import Footer from './components/Footer'; // Sesuaikan path jika Footer kamu ada di folder components
// Kalau Navbar/Footer masih di dalam App.jsx, nanti kita pindahkan.

const Layout = () => {
  return (
    <>
      <Navbar />
      {/* Outlet adalah tempat konten halaman (Home/About) akan muncul. 
          Mirip @yield('content') di Laravel */}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;