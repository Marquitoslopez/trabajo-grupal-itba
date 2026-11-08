import { Link } from 'react-router-dom';

export default function MyOrders() {
  return (
    <main className="container auth-page">
      <div className="admin-page__heading"><span className="admin-page__eyebrow">Mi cuenta</span><h1>Mis pedidos</h1><p>Esta sección estará disponible cuando se implemente el registro de pedidos.</p></div>
      <Link className="btn btn--outline" to="/perfil">Volver a mi perfil</Link>
    </main>
  );
}
