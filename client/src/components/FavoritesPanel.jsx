import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getProductos } from '../services/api';
import { formatPrice } from '../utils/format';

export default function FavoritesPanel() {
  const { isFavoritesOpen, closeFavorites, favorites, toggleFavorite, addToCart } = useCart();
  const [productsMap, setProductsMap] = useState({});
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (isFavoritesOpen) {
      document.body.classList.add('favorites-drawer-open');
    } else {
      document.body.classList.remove('favorites-drawer-open');
    }
    return () => document.body.classList.remove('favorites-drawer-open');
  }, [isFavoritesOpen]);

  useEffect(() => {
    getProductos()
      .then((list) => {
        const map = {};
        list.forEach((p) => { map[p.id] = p; });
        setProductsMap(map);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!isFavoritesOpen) return undefined;
    closeBtnRef.current?.focus();
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeFavorites();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isFavoritesOpen, closeFavorites]);

  if (!isFavoritesOpen) return null;

  const items = favorites
    .map((id) => productsMap[id])
    .filter(Boolean);

  const moveToCart = (productId) => {
    addToCart(productId);
    toggleFavorite(productId); // ya está en favoritos, así que lo quita
  };

  return (
    <>
      <div className="fav-drawer-backdrop" onClick={closeFavorites} aria-hidden="true" />
      <aside className="fav-drawer" role="dialog" aria-modal="true" aria-labelledby="favorites-drawer-title">
        <header className="fav-drawer__header">
          <div>
            <span className="fav-drawer__eyebrow">TUS PIEZAS GUARDADAS</span>
            <h2 id="favorites-drawer-title">Favoritos</h2>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            className="fav-drawer__close"
            onClick={closeFavorites}
            aria-label="Cerrar favoritos"
          >
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </header>

        <div className="fav-drawer__body">
          {favorites.length === 0 ? (
            <div className="fav-drawer__empty">
              <span className="fav-drawer__empty-icon" aria-hidden="true">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </span>
              <h3>Todavía no guardaste piezas</h3>
              <p>Tocá el corazón en un producto para guardarlo acá.</p>
            </div>
          ) : (
            <div className="fav-drawer__items">
              {items.map((product) => (
                <article key={product.id} className="fav-item">
                  <Link
                    to={`/producto/${product.id}`}
                    className="fav-item__image-link"
                    onClick={closeFavorites}
                    aria-label={`Ver ${product.name}`}
                  >
                    <img
                      src={`/assets/${product.image}`}
                      alt={product.alt || product.name}
                      className="fav-item__image"
                    />
                  </Link>

                  <div className="fav-item__content">
                    <div className="fav-item__heading">
                      <div>
                        <Link
                          to={`/producto/${product.id}`}
                          className="fav-item__name"
                          onClick={closeFavorites}
                        >
                          {product.name}
                        </Link>
                        <span className="fav-item__price">{formatPrice(product.price)}</span>
                      </div>
                      <button
                        type="button"
                        className="fav-item__remove"
                        onClick={() => toggleFavorite(product.id)}
                        aria-label={`Quitar ${product.name} de favoritos`}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                      </button>
                    </div>

                    <button
                      type="button"
                      className="fav-item__move btn btn--gold"
                      onClick={() => moveToCart(product.id)}
                    >
                      Llevar al carrito
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}