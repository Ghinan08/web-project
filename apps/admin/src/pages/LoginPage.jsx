import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import { setToken } from '../auth';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      const token = response.data?.data?.accessToken;
      const role = response.data?.data?.user?.role;

      if (!token || role !== 'admin') {
        setError('Akses ditolak. Akun admin diperlukan.');
        return;
      }

      setToken(token);
      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.message ?? 'Login gagal');
    }
  };

  return (
    <div className="admin-shell">
      <div className="admin-card">
        <h1>Admin Login</h1>
        <form onSubmit={onSubmit} className="admin-form">
          <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error ? <p className="error-text">{error}</p> : null}
          <button type="submit">Masuk</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
