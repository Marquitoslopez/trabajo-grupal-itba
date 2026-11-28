
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMisPedidos } from '../services/api';
import { formatPrice } from '../utils/format';

export default function MyOrders() {
  const { token } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await getMisPedidos(token);

        if (active) {
          setOrders(
            Array.isArray(response.pedidos) ? response.pedidos : []
          );
        }
      } catch (requestError) {
        if (active) {
          setError(
            requestError.message || 'No se pudo cargar tu historial de pedidos.'
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    } else {
      setOrders([]);
      setLoading(false);
    }

    return () => {
      active = false;
    };
  }, [token]);

  const formatDate = (date) => {
    if (!date) return 'Fecha no disponible';

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return 'Fecha no disponible';
    }

    return new Intl.DateTimeFormat('es-AR', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(parsedDate);
  };

  const formatStatus = (status) => {
    if (!status) return 'Sin estado';

    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <main className="container auth-page">
      <div className="admin-page__heading">
        <span className="admin-page__eyebrow">Mi cuenta</span>
        <h1>Mis pedidos</h1>
        <p>Consultá el historial y el estado de tus compras.</p>
      </div>

      {loading && <p role="status">Cargando tus pedidos...</p>}

      {error && (
        <p className="admin-alert admin-alert--error" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && orders.length === 0 && (
        <div className="admin-page__empty">
          <p>Todavía no realizaste ningún pedido.</p>
          <Link to="/catalogo">Explorar catálogo</Link>
        </div>
      )}

      {!loading && !error && orders.length > 0 && (
        <section aria-label="Historial de pedidos">
          <p>
            Tenés {orders.length} {orders.length === 1 ? 'pedido' : 'pedidos'}.
          </p>

          {orders.map((order) => (
            <article
              className="checkout-summary"
              key={order._id}
            >
              <div className="admin-page__heading">
                <h2>Pedido #{order._id}</h2>
                <p>{formatDate(order.createdAt)}</p>
                <p>
                  Estado: <strong>{formatStatus(order.estado)}</strong>
                </p>
              </div>

              <div>
                <h3>Productos</h3>

                {order.items?.map((item, index) => (
                  <div key={`${order._id}-${index}`}>
                    <p>
                      <strong>{item.nombre || 'Producto'}</strong>
                    </p>
                    <p>
                      {item.cantidad} × {formatPrice(item.precioUnitario)}
                    </p>
                    <p>Subtotal: {formatPrice(item.subtotal)}</p>
                  </div>
                ))}
              </div>

              {order.datosEntrega && (
                <div>
                  <h3>Datos de entrega</h3>
                  <p>{order.datosEntrega.nombre}</p>
                  <p>{order.datosEntrega.email}</p>
                  <p>{order.datosEntrega.telefono}</p>
                  <p>{order.datosEntrega.direccion}</p>
                </div>
              )}

              <p className="checkout-summary__total">
                <span>Total del pedido</span>
                <strong>{formatPrice(order.total)}</strong>
              </p>
            </article>
          ))}
        </section>
      )}

      <div className="admin-page__toolbar">
        <Link className="btn btn--outline" to="/perfil">
          Volver a mi perfil
        </Link>
        <Link className="btn btn--primary" to="/catalogo">
          Seguir comprando
        </Link>
      </div>
    </main>
  );
}
