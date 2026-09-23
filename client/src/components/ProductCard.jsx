import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/format';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  if (!product) return null;

  const productUrl = `/producto/${product.id}`;

  return (
    <article className="product-card" data-id={product.id} data-category={product.categories}>
      <header className="product-card__header">
        <div className="product-card__info">
          <h3 className="product-card__title">{product.name}</h3>
          <p className="product-card__price">{formatPrice(product.price)}</p>
        </div>
        <div className="product-card__swatches" aria-label="Variantes de color disponibles">
          <span className="product-card__swatch product-card__swatch--dark" title="Nogal Oscuro"></span>
          <span className="product-card__swatch product-card__swatch--gold" title="Cera Roble"></span>
          <span className="product-card__swatch product-card__swatch--wood" title="Madera Natural"></span>
        </div>
      </header>
      <div className="product-card__image-wrapper">
        <Link to={productUrl} aria-label={`Ver detalle de ${product.name}`}>
          <img
            src={`/assets/${product.image}`}
            alt={product.alt || product.name}
            className="product-card__image"
            loading="lazy"
            width="300"
            height="220"
          />
        </Link>
      </div>
      <div className="product-card__actions">
        <div className="product-card__primary-actions">
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => addToCart(product.id)}
          >
            Comprar
          </button>
          <button
            type="button"
            className="btn btn--gold"
            onClick={() => addToCart(product.id)}
            aria-label={`Agregar ${product.name} al carrito`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </button>
        </div>
        <div className="product-card__secondary-actions">
          <Link to={productUrl} className="product-card__link-detail">
            Ver detalle
          </Link>
          <button
            type="button"
            className="btn--icon"
            aria-label={`Añadir ${product.name} a favoritos`}
            aria-pressed="false"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
