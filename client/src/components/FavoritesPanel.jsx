
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getProductos, productImageSrc } from '../services/api';
import { formatPrice } from '../utils/format';

export default function FavoritesPanel() {
  const {
    isFavoritesOpen,
    closeFavorites,
    favorites,
    toggleFavorite,
    addToCart,
  } = useCart();

  const [productsMap, setProductsMap] = useState({});
  const closeBtnRef = useRef(null);
  const navigate = useNavigate();

  // Controlar la clase del body cuando el panel está abierto
  useEffect(() => {
    if (isFavoritesOpen) {
      document.body.classList.add('favorites-drawer-open');
    } else {
      document.body.classList.remove('favorites-drawer-open');
    }

    return () => {
      document.body.classList.remove('favorites-drawer-open');
    };
  }, [isFavoritesOpen]);

  // Obtener los productos para mostrar los favoritos
  useEffect(() => {
    if (!isFavoritesOpen) return;

    let active = true;

    getProductos()
      .then((list) => {
        if (!active) return;

        const map = {};

        list.forEach((product) => {
          map[String(product.id)] = product;
        });

        setProductsMap(map);
      })
      .catch((error) => {
        console.error('Error al cargar los favoritos:', error);
      });

    return () => {
      active = false;
    };
  }, [isFavoritesOpen]);

  // Cerrar con Escape y enfocar el botón de cierre
  useEffect(() => {
    if (!isFavoritesOpen) return undefined;

    closeBtnRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeFavorites();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isFavoritesOpen, closeFavorites]);

  if (!isFavoritesOpen) return null;

  // Obtener los productos que están guardados en favoritos
  const items = favorites
    .map((id) => productsMap[String(id)])
    .filter(Boolean);

  // Navegar al detalle del producto
  const handleViewProduct = (productId) => {
    closeFavorites();
    navigate(`/producto/${productId}`);
  };

  // Pasar un producto de favoritos al carrito
  const moveToCart = (productId) => {
    addToCart(productId);
    toggleFavorite(productId);
  };

  return (
    <>
      <div
        className="fav-drawer-backdrop"
        onClick={closeFavorites}
        aria-hidden="true"
      />

      <aside
        className="fav-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="favorites-drawer-title"
      >
        <header className="fav-drawer__header">
          <div>
            <span className="fav-drawer__eyebrow">
              TUS PIEZAS GUARDADAS
            </span>

            <h2 id="favorites-drawer-title">Favoritos</h2>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            className="fav-drawer__close"
            onClick={closeFavorites}
            aria-label="Cerrar favoritos"
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </header>

        <div className="fav-drawer__body">
          {items.length === 0 ? (
            <div className="fav-drawer__empty">
              <span
                className="fav-drawer__empty-icon"
                aria-hidden="true"
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </span>

              <h3>Todavía no guardaste piezas</h3>

              <p>
                Tocá el corazón en un producto para guardarlo acá.
              </p>
            </div>
          ) : (
            <div className="fav-drawer__items">
              {items.map((product) => (
                <article
                  key={product.id}
                  className="fav-item"
                >
                  <button
                    type="button"
                    className="fav-item__image-link"
                    onClick={() => handleViewProduct(product.id)}
                    aria-label={`Ver ${product.name}`}
                  >
                    <img
                      src={productImageSrc(product.image)}
                      alt={product.alt || product.name}
                      className="fav-item__image"
                    />
                  </button>

                  <div className="fav-item__content">
                    <div className="fav-item__heading">
                      <div>
                        <button
                          type="button"
                          className="fav-item__name"
                          onClick={() => handleViewProduct(product.id)}
                        >
                          {product.name}
                        </button>

                        <span className="fav-item__price">
                          {formatPrice(product.price)}
                        </span>
                      </div>

                      <button
                        type="button"
                        className="fav-item__remove"
                        onClick={() => toggleFavorite(product.id)}
                        aria-label={`Quitar ${product.name} de favoritos`}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          aria-hidden="true"
                        >
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
