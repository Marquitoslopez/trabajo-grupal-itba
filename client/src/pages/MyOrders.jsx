import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMisPedidos } from '../services/api';
import { formatPrice } from '../utils/format';

function formatOrderDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Fecha no disponible';

  return new Intl.DateTimeFormat('es-AR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    getMisPedidos()
      .then((result) => {
        if (active) setOrders(result);
      })
      .catch((requestError) => {
        if (active) setError(`${requestError.message} Comprobá que el backend esté activo.`);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <main id="main-content" className="container admin-page">
      <div className="admin-page__heading">
        <span className="admin-page__eyebrow">Tu cuenta</span>
        <h1>Mis pedidos</h1>
        <p>Este historial está vinculado a este navegador; no se comparten tus datos por email.</p>
      </div>

      {error && <p className="admin-alert admin-alert--error" role="alert">{error}</p>}

      {loading ? (
        <p className="admin-page__empty" role="status">Cargando pedidos…</p>
      ) : orders.length === 0 && !error ? (
        <div className="admin-page__empty">
          <p>Todavía no registraste pedidos desde este navegador.</p>
          <Link to="/catalogo">Explorar el catálogo</Link>
        </div>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <article className="order-card" key={order._id}>
              <header className="order-card__header">
                <div>
                  <h2>Pedido {order._id}</h2>
                  <p>{formatOrderDate(order.createdAt)}</p>
                </div>
                <span className="order-card__status">{order.estado}</span>
              </header>

              <ul className="order-card__items">
                {(order.items || []).map((item, index) => (
                  <li key={`${order._id}-${item.producto || index}`}>
                    <span>{item.nombreProducto} × {item.cantidad}</span>
                    <strong>{formatPrice(item.subtotal)}</strong>
                  </li>
                ))}
              </ul>

              <p className="order-card__total">
                <span>Total</span>
                <strong>{formatPrice(order.total)}</strong>
              </p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
