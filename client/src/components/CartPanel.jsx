import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { getProductos } from '../services/api';
import { formatPrice } from '../utils/format';

export default function CartPanel() {
  const {
    isCartOpen,
    closeCart,
    getGroupedCart,
    removeFromCart,
    removeAllOf,
    clearCart,
    cartCount,
  } = useCart();
  const [productsMap, setProductsMap] = useState({});

  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add('cart-drawer-open');
    } else {
      document.body.classList.remove('cart-drawer-open');
    }
    return () => document.body.classList.remove('cart-drawer-open');
  }, [isCartOpen]);

  useEffect(() => {
    getProductos()
      .then((list) => {
        const map = {};
        list.forEach((p) => { map[p.id] = p; });
        setProductsMap(map);
      })
      .catch(() => {});
  }, []);

  if (!isCartOpen) return null;

  const grouped = getGroupedCart(productsMap);
  const total = grouped.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  return (
    <>
      <div className="cart-drawer-backdrop" onClick={closeCart} aria-hidden="true" />
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Carrito de compras">
        <header className="cart-drawer__header">
          <span className="cart-drawer__eyebrow">Tu selección</span>
          <h2>Carrito ({cartCount})</h2>
          <button type="button" className="cart-drawer__close" onClick={closeCart} aria-label="Cerrar carrito">
            ×
          </button>
        </header>

        <div className="cart-drawer__body">
          {grouped.length === 0 ? (
            <div className="cart-drawer__empty">
              <div className="cart-drawer__empty-icon" aria-hidden="true">🛒</div>
              <h3>Tu carrito está vacío</h3>
              <p>Agregá productos desde el catálogo.</p>
            </div>
          ) : (
            <ul className="cart-drawer__items">
              {grouped.map(({ productId, quantity, product }) =>
                product ? (
                  <li key={productId} className="cart-drawer__item">
                    <img
                      src={`/assets/${product.image}`}
                      alt={product.name}
                      className="cart-drawer__thumb"
                      width="64"
                      height="64"
                    />
                    <div className="cart-drawer__item-info">
                      <h3 className="cart-drawer__item-name">{product.name}</h3>
                      <p className="cart-drawer__item-meta">
                        {quantity} × {formatPrice(product.price)}
                      </p>
                    </div>
                    <div className="cart-drawer__item-actions">
                      <button type="button" onClick={() => removeFromCart(productId)} aria-label="Quitar una unidad">
                        −
                      </button>
                      <button type="button" onClick={() => removeAllOf(productId)} aria-label="Eliminar">
                        Eliminar
                      </button>
                    </div>
                  </li>
                ) : null
              )}
            </ul>
          )}
        </div>

        {grouped.length > 0 && (
          <footer className="cart-drawer__footer">
            <p className="cart-drawer__total">
              Total: <strong>{formatPrice(total)}</strong>
            </p>
            <button type="button" className="btn btn--primary" onClick={clearCart}>
              Vaciar carrito
            </button>
          </footer>
        )}
      </aside>
    </>
  );
}
