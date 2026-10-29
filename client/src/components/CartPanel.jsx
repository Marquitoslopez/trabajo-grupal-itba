import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getProductos, productImageSrc } from '../services/api';
import { formatPrice } from '../utils/format';

export default function CartPanel() {
  const {
    isCartOpen,
    closeCart,
    getGroupedCart,
    increaseQuantity,
    removeFromCart,
    removeAllOf,
    clearCart,
    cartCount,
  } = useCart();
  const [productsMap, setProductsMap] = useState({});
  const [checkoutBusy, setCheckoutBusy] = useState(false);

  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add('cart-drawer-open');
    } else {
      document.body.classList.remove('cart-drawer-open');
    }
    return () => document.body.classList.remove('cart-drawer-open');
  }, [isCartOpen]);

  useEffect(() => {
    if (!isCartOpen) return;
    let active = true;
    getProductos()
      .then((list) => {
        if (!active) return;
        const map = {};
        list.forEach((p) => { map[String(p.id)] = p; });
        setProductsMap(map);
      })
      .catch(() => {});
    return () => { active = false; };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const grouped = getGroupedCart(productsMap);
  const visibleGrouped = grouped.filter((item) => item.product);
  const hasUnresolvedItems = grouped.some((item) => !item.product);
  const total = visibleGrouped.reduce(
    (sum, item) => sum + (item.product.price || 0) * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (visibleGrouped.length === 0 || hasUnresolvedItems || checkoutBusy) return;
    const confirmed = window.confirm(
      `Vas a finalizar una compra de prueba por ${formatPrice(total)}. Esta versión no procesa pagos reales ni registra pedidos en el servidor. ¿Querés continuar con la simulación?`
    );
    if (!confirmed) return;
    setCheckoutBusy(true);
    window.alert('Simulación de compra completada. No se realizó ningún cobro ni se registró un pedido real.');
    clearCart();
    setCheckoutBusy(false);
    closeCart();
  };

  return (
    <>
      <div className="cart-drawer-backdrop" onClick={closeCart} aria-hidden="true" />
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Carrito de compras">
        <header className="cart-drawer__header">
          <div>
            <span className="cart-drawer__eyebrow">TU SELECCIÓN</span>
            <h2>Carrito ({cartCount})</h2>
          </div>
          <button type="button" className="cart-drawer__close" onClick={closeCart} aria-label="Cerrar carrito">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </header>

        <div className="cart-drawer__body">
          {visibleGrouped.length === 0 ? (
            <div className="cart-drawer__empty">
              <div className="cart-drawer__empty-icon" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <h3>Tu carrito está vacío</h3>
              <p>Agregá productos desde el catálogo.</p>
            </div>
          ) : (
            <div className="cart-drawer__items">
              {visibleGrouped.map(({ productId, quantity, product }) =>
                product ? (
                  <article key={productId} className="cart-item">
                    <Link
                      to={`/producto/${productId}`}
                      className="cart-item__image-link"
                      onClick={closeCart}
                      aria-label={`Ver detalle de ${product.name}`}
                    >
                      <img
                        src={productImageSrc(product.image)}
                        alt={product.alt || product.name}
                        className="cart-item__image"
                      />
                    </Link>

                    <div className="cart-item__content">
                      <div className="cart-item__heading">
                        <div>
                          <Link
                            to={`/producto/${productId}`}
                            className="cart-item__name"
                            onClick={closeCart}
                          >
                            {product.name}
                          </Link>
                          <span className="cart-item__unit-price">
                            {formatPrice(product.price)} c/u
                          </span>
                        </div>
                        <button
                          type="button"
                          className="cart-item__remove"
                          onClick={() => removeAllOf(productId)}
                          aria-label={`Eliminar ${product.name} del carrito`}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                        </button>
                      </div>

                      <div className="cart-item__bottom">
                        <div className="cart-item__quantity">
                          <button
                            type="button"
                            onClick={() => removeFromCart(productId)}
                            disabled={quantity <= 1}
                            aria-label="Quitar una unidad"
                          >
                            −
                          </button>
                          <span aria-live="polite">{quantity}</span>
                          <button
                            type="button"
                            onClick={() => increaseQuantity(productId)}
                            aria-label="Agregar una unidad"
                          >
                            +
                          </button>
                        </div>
                        <strong className="cart-item__subtotal">
                          {formatPrice(product.price * quantity)}
                        </strong>
                      </div>
                    </div>
                  </article>
                ) : null
              )}
            </div>
          )}
        </div>

        {hasUnresolvedItems && (
          <div className="admin-alert admin-alert--error" role="alert">
            <p>Algunos productos guardados ya no están disponibles en el catálogo. Quitalos y volvé a agregarlos.</p>
            <button
              type="button"
              className="btn btn--outline"
              onClick={() => grouped.filter((item) => !item.product).forEach((item) => removeAllOf(item.productId))}
            >
              Quitar productos no disponibles
            </button>
          </div>
        )}

        {visibleGrouped.length > 0 && (
          <footer className="cart-drawer__footer">
            <div className="cart-drawer__total">
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </div>
            <button
              type="button"
              className="cart-drawer__checkout"
              onClick={handleCheckout}
              disabled={checkoutBusy || visibleGrouped.length === 0 || hasUnresolvedItems}
            >
              {checkoutBusy ? 'Procesando…' : 'Comprar carrito'}
            </button>
            <button type="button" className="btn btn--outline" onClick={clearCart}>
              Vaciar carrito
            </button>
          </footer>
        )}
      </aside>
    </>
  );
}