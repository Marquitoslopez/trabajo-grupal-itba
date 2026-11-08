import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, logout } = useAuth();
  return (
    <main className="container auth-page">
      <div className="admin-page__heading"><span className="admin-page__eyebrow">Mi cuenta</span><h1>Mi perfil</h1><p>Información de tu cuenta de Hermanos Jota.</p></div>
      <section className="admin-form auth-form">
        <p><strong>Nombre:</strong> {user?.nombre}</p>
        <p><strong>Correo:</strong> {user?.email}</p>
        <div className="admin-form__actions"><Link className="btn btn--outline" to="/mis-pedidos">Mis pedidos</Link><button className="btn btn--primary" onClick={logout}>Cerrar sesión</button></div>
      </section>
    </main>
  );
}
