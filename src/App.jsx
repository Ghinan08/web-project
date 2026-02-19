import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import About from './pages/About';
import ContentPage from './pages/ContentPage';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/programs" element={<ContentPage type="programs" title="Program" />} />
        <Route path="/news" element={<ContentPage type="news" title="Berita" />} />
        <Route path="/store" element={<ContentPage type="store-items" title="Store" />} />
        <Route path="/reports" element={<ContentPage type="annual-reports" title="Laporan Tahunan" />} />
        <Route path="/testimonials" element={<ContentPage type="testimonials" title="Testimoni" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;