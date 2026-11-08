import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault(); setError('');
    if (form.password !== form.confirmPassword) { setError('Las contraseñas no coinciden.'); return; }
    setBusy(true);
    try {
      await register({ nombre: form.nombre, email: form.email, password: form.password });
      navigate('/perfil', { replace: true });
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };

  return (
    <main className="container auth-page">
      <div className="admin-page__heading"><span className="admin-page__eyebrow">Tu cuenta</span><h1>Crear una cuenta</h1><p>Registrate para acceder a tu perfil.</p></div>
      <form className="admin-form auth-form" onSubmit={submit}>
        {error && <p className="admin-alert admin-alert--error" role="alert">{error}</p>}
        <label className="admin-form__field"><span>Nombre y apellido</span><input required maxLength="80" autoComplete="name" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} /></label>
        <label className="admin-form__field"><span>Correo electrónico</span><input type="email" required autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
        <label className="admin-form__field"><span>Contraseña (mínimo 8 caracteres)</span><input type="password" required minLength="8" autoComplete="new-password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
        <label className="admin-form__field"><span>Repetir contraseña</span><input type="password" required minLength="8" autoComplete="new-password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} /></label>
        <div className="admin-form__actions"><button className="btn btn--primary" disabled={busy}>{busy ? 'Creando cuenta…' : 'Registrarme'}</button></div>
        <p>¿Ya tenés cuenta? <Link to="/login">Iniciar sesión</Link></p>
      </form>
    </main>
  );
}
