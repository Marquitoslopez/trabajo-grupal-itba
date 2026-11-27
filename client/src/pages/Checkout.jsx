import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createPedido, getProductosStrict, productImageSrc } from '../services/api';
import { formatPrice } from '../utils/format';

const INITIAL_CUSTOMER = {
  nombre: '',
  email: '',
  telefono: '',
  direccion: '',
};

export default function Checkout() {
  const { cart, clearCart, getGroupedCart } = useCart();
  const [productsMap, setProductsMap] = useState({});
  const [customer, setCustomer] = useState(INITIAL_CUSTOMER);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [order, setOrder] = useState(null);

  useEffect(() => {
    let active = true;

    getProductosStrict()
      .then((products) => {
        if (!active) return;
        setProductsMap(Object.fromEntries(products.map((product) => [product.id, product])));
        setError('');
      })
      .catch((requestError) => {
        if (active) {
          setError(`${requestError.message} Comprobá que el backend esté activo.`);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const grouped = useMemo(() => getGroupedCart(productsMap), [getGroupedCart, productsMap]);
  const hasUnavailableProducts = grouped.some((item) => !item.product);
  const total = grouped.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  const handleCustomerChange = (event) => {
    const { name, value } = event.target;
    setCustomer((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (busy || loading || cart.length === 0 || hasUnavailableProducts) return;

    setBusy(true);
    setError('');

    try {
      const createdOrder = await createPedido({
        cliente: customer,
        items: grouped.map(({ productId, quantity }) => ({
          productoId: productId,
          cantidad: quantity,
        })),
      });
      setOrder(createdOrder);
      clearCart();
    } catch (requestError) {
      setError(requestError.message || 'No se pudo registrar el pedido.');
    } finally {
      setBusy(false);
    }
  };

  if (order) {
    return (
      <main id="main-content" className="container admin-page">
        <div className="admin-page__heading">
          <span className="admin-page__eyebrow">Pedido registrado</span>
          <h1>¡Gracias por tu compra!</h1>
          <p>
            Tu pedido quedó registrado como pendiente. No se realizó ningún cobro.
            Número de pedido: <strong>{order._id}</strong>
          </p>
        </div>
        <div className="admin-page__toolbar">
          <Link className="btn btn--primary" to="/mis-pedidos">Ver mis pedidos</Link>
          <Link className="btn btn--outline" to="/catalogo">Seguir comprando</Link>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="container admin-page">
      <div className="admin-page__heading">
        <span className="admin-page__eyebrow">Finalizar compra</span>
        <h1>Datos de entrega</h1>
        <p>Registraremos el pedido como pendiente. Esta versión no procesa pagos.</p>
      </div>

      {error && <p className="admin-alert admin-alert--error" role="alert">{error}</p>}

      {cart.length === 0 ? (
        <div className="admin-page__empty">
          <p>Tu carrito está vacío.</p>
          <Link to="/catalogo">Volver al catálogo</Link>
        </div>
      ) : (
        <div className="checkout-layout">
          <form className="admin-form" onSubmit={handleSubmit}>
            <label className="admin-form__field">
              <span>Nombre completo</span>
              <input
                autoComplete="name"
                name="nombre"
                value={customer.nombre}
                onChange={handleCustomerChange}
                maxLength={120}
                required
              />
            </label>

            <label className="admin-form__field">
              <span>Email</span>
              <input
                autoComplete="email"
                type="email"
                name="email"
                value={customer.email}
                onChange={handleCustomerChange}
                maxLength={254}
                required
              />
            </label>

            <label className="admin-form__field">
              <span>Teléfono</span>
              <input
                autoComplete="tel"
                type="tel"
                name="telefono"
                value={customer.telefono}
                onChange={handleCustomerChange}
                maxLength={40}
                required
              />
            </label>

            <label className="admin-form__field">
              <span>Dirección de entrega</span>
              <textarea
                autoComplete="street-address"
                name="direccion"
                value={customer.direccion}
                onChange={handleCustomerChange}
                rows={3}
                maxLength={300}
                required
              />
            </label>

            <div className="admin-form__actions">
              <button
                className="btn btn--primary"
                type="submit"
                disabled={busy || loading || hasUnavailableProducts || cart.length === 0}
              >
                {busy ? 'Registrando pedido…' : 'Confirmar pedido'}
              </button>
              <Link className="btn btn--outline" to="/catalogo">Seguir comprando</Link>
            </div>
          </form>

          <section className="checkout-summary" aria-labelledby="checkout-summary-title">
            <h2 id="checkout-summary-title">Resumen del pedido</h2>
            {loading ? (
              <p role="status">Cargando productos…</p>
            ) : (
              <>
                {grouped.map(({ productId, quantity, product }) => (
                  <article className="checkout-summary__item" key={productId}>
                    {product ? (
                      <img src={productImageSrc(product.image)} alt="" />
                    ) : (
                      <span className="checkout-summary__unavailable">No disponible</span>
                    )}
                    <div>
                      <strong>{product?.name || 'Producto no disponible'}</strong>
                      <span>{quantity} × {formatPrice(product?.price || 0)}</span>
                    </div>
                    <strong>{formatPrice((product?.price || 0) * quantity)}</strong>
                  </article>
                ))}
                {hasUnavailableProducts && (
                  <p className="admin-alert admin-alert--error" role="alert">
                    Hay productos que ya no están disponibles. Volvé al carrito y quitá esos artículos.
                  </p>
                )}
                <p className="checkout-summary__total">
                  <span>Total estimado</span>
                  <strong>{formatPrice(total)}</strong>
                </p>
              </>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
