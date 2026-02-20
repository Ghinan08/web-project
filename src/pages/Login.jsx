import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await loginUser(form);
      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.message ?? 'Login gagal.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      <div className="program-card" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div className="program-content">
          <h1 className="program-title">Masuk</h1>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '14px' }}>
            <label>
              <span style={{ display: 'block', marginBottom: '6px', color: '#334155', fontWeight: 600 }}>Email</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '10px' }}
              />
            </label>
            <label>
              <span style={{ display: 'block', marginBottom: '6px', color: '#334155', fontWeight: 600 }}>Password</span>
              <input
                type="password"
                required
                value={form.password}
                onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '10px' }}
              />
            </label>
            {error && <p style={{ color: '#b91c1c' }}>{error}</p>}
            <button disabled={isLoading} className="btn btn-primary" type="submit" style={{ width: '100%', justifyContent: 'center' }}>
              {isLoading ? 'Memproses...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
