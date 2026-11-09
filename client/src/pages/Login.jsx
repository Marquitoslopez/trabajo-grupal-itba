
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const submit = async (event) => {
    event.preventDefault();

    setError('');
    setBusy(true);

    try {
      await login(form);

      const destination = location.state?.from;
      const pathname = destination?.pathname;

      const safePath =
        typeof pathname === 'string' &&
        pathname.startsWith('/') &&
        !pathname.startsWith('//')
          ? pathname
          : '/perfil';

      navigate(safePath, { replace: true });
    } catch (err) {
      setError(err.message || 'No se pudo iniciar sesión.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="container auth-page">
      <div className="admin-page__heading">
        <span className="admin-page__eyebrow">Tu cuenta</span>
        <h1>Iniciar sesión</h1>
        <p>Ingresá a tu cuenta de Mueblería Hermanos Jota.</p>
      </div>

      <form className="admin-form auth-form" onSubmit={submit}>
        {error && (
          <p className="admin-alert admin-alert--error" role="alert">
            {error}
          </p>
        )}

        <label className="admin-form__field">
          <span>Correo electrónico</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={handleChange}
          />
        </label>

        <label className="admin-form__field">
          <span>Contraseña</span>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            required
            value={form.password}
            onChange={handleChange}
          />
        </label>

        <div className="admin-form__actions">
          <button
            className="btn btn--primary"
            type="submit"
            disabled={busy}
          >
            {busy ? 'Ingresando…' : 'Iniciar sesión'}
          </button>
        </div>

        <p>
          ¿Todavía no tenés cuenta?{' '}
          <Link to="/registro">Crear una cuenta</Link>
        </p>
      </form>
    </main>
  );
}
