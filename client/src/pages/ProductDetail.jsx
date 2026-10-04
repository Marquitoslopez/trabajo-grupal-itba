import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductoById, getProductos, normalizeCategories } from '../services/api';
import { formatPrice } from '../utils/format';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { PRODUCT_EXTRAS, RATING_BARS, getReviews } from '../data/productExtras';

const CATEGORY_BADGES = {
  living: 'Living Room',
  habitacion: 'Habitación',
  cocina: 'Cocina',
  oficina: 'Oficina',
  casa: 'Casa',
};

const GALLERY_VIEWS = [
  { key: 'full', label: 'vista completa', thumbClass: 'product-gallery__thumb-img--full', mainClass: '' },
  { key: 'top', label: 'detalle superior', thumbClass: 'product-gallery__thumb-img--detail-top', mainClass: 'product-gallery__main-img--detail-top' },
  { key: 'bottom', label: 'detalle inferior', thumbClass: 'product-gallery__thumb-img--detail-bottom', mainClass: 'product-gallery__main-img--detail-bottom' },
];

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('full');
  const [added, setAdded] = useState(false);
  const { addToCart, toggleFavorite, isFavorite } = useCart();
  const favorite = product ? isFavorite(product.id) : false;

  useEffect(() => {
    setLoading(true);
    setError(null);
    setView('full');
    setAdded(false);
    window.scrollTo(0, 0);

    getProductoById(id)
      .then(setProduct)
      .catch(async () => {
        try {
          const list = await getProductos();
          const found = list.find((p) => p.id === id);
          if (found) setProduct(found);
          else setError('Producto no encontrado');
        } catch {
          setError('Producto no encontrado');
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    getProductos()
      .then(setAllProducts)
      .catch(() => setAllProducts([]));
  }, []);

  useEffect(() => {
    if (!added) return undefined;
    const timer = setTimeout(() => setAdded(false), 1200);
    return () => clearTimeout(timer);
  }, [added]);

  if (loading) return <main className="container"><p>Cargando…</p></main>;
  if (error || !product)
    return (
      <main className="container">
        <p>{error || 'Producto no encontrado'}</p>
        <Link to="/catalogo">Volver al catálogo</Link>
      </main>
    );

  const extras = PRODUCT_EXTRAS[product.id];
  const description = product.description ?? extras?.description;
  const reviews = getReviews(product.name);

  const categories = normalizeCategories(product.categories);
  const mainCategory = categories[0];
  const badge = CATEGORY_BADGES[mainCategory] ?? 'Mueble de autor';
  const activeView = GALLERY_VIEWS.find((v) => v.key === view) ?? GALLERY_VIEWS[0];

  // Relacionados: primero la misma categoría principal, y se completa hasta 3
  const others = allProducts.filter((p) => p.id !== product.id);
  const sameCategory = others.filter((p) => normalizeCategories(p.categories)[0] === mainCategory);
  const otherCategories = others.filter((p) => normalizeCategories(p.categories)[0] !== mainCategory);
  const related = [...sameCategory, ...otherCategories].slice(0, 3);

  const handleAdd = () => {
    addToCart(product.id);
    setAdded(true);
  };

  const imageSrc = `/assets/${product.image}`;
  const imageAlt = product.alt || product.name;

  return (
    <main id="main-content">
      <section className="product-detail" aria-labelledby="product-title">
        <div className="container">
          <div className="product-detail__grid">
            <div className="product-gallery">
              <div className="product-gallery__main">
                <div className="product-gallery__blob" aria-hidden="true"></div>
                <img
                  src={imageSrc}
                  alt={`${product.name}, ${activeView.label}`}
                  className={`product-gallery__main-img ${activeView.mainClass}`.trim()}
                  fetchPriority="high"
                />
              </div>

              <div
                className="product-gallery__thumbnails"
                role="region"
                aria-label="Detalles y acabados del producto"
              >
                {GALLERY_VIEWS.map((v) => (
                  <button
                    key={v.key}
                    type="button"
                    className={`product-gallery__thumb${view === v.key ? ' product-gallery__thumb--active' : ''}`}
                    onClick={() => setView(v.key)}
                    aria-label={`${product.name}, ${v.label}`}
                    aria-pressed={view === v.key}
                  >
                    <img
                      src={imageSrc}
                      alt=""
                      className={`product-gallery__thumb-img ${v.thumbClass}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="product-info">
              <span className="product-info__badge">{badge}</span>

              <h1 id="product-title" className="product-info__title">{product.name}</h1>

              <p className="product-info__price">{formatPrice(product.price)}</p>

              <div className="product-info__shipping-alert">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>
                  Haz tu pedido <strong>hoy mismo</strong> y recíbelo mañana
                </span>
              </div>

              {description && (
                <div className="product-info__description">
                  <h2 className="product-info__subheading">Descripción</h2>
                  <p>{description}</p>
                </div>
              )}

              {extras?.specs && (
                <dl className="product-specs">
                  {extras.specs.map(([term, detail]) => (
                    <div key={term} className="product-specs__row">
                      <dt className="product-specs__term">{term}</dt>
                      <dd className="product-specs__detail">{detail}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <div className="product-info__actions">
                <button
                  type="button"
                  className="btn btn--gold-pill btn--add-to-cart"
                  onClick={handleAdd}
                >
                  {added ? 'Añadido al carro' : 'Añadir al Carro'}
                </button>

                <button
                  type="button"
                  className="product-info__fav-btn"
                  onClick={() => toggleFavorite(product.id)}
                  aria-pressed={favorite}
                  aria-label={
                    favorite
                      ? `Quitar ${product.name} de favoritos`
                      : `Añadir ${product.name} a favoritos`
                  }
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="product-reviews-section" aria-labelledby="reviews-title">
        <div className="container">
          <h2 id="reviews-title" className="product-reviews-section__title">
            Opiniones del producto
          </h2>

          <div className="reviews-layout">
            <aside className="reviews-summary">
              {extras && (
                <div className="reviews-summary__score-container">
                  <span className="reviews-summary__score">{extras.rating}</span>
                  <div className="reviews-summary__stars-wrapper">
                    <div className="reviews-summary__stars" aria-label={`${extras.rating} de 5 estrellas`}>
                      ★★★★★
                    </div>
                    <span className="reviews-summary__count">
                      {extras.ratingCount} calificaciones
                    </span>
                  </div>
                </div>
              )}

              <div className="reviews-summary__bars">
                {RATING_BARS.map((bar) => (
                  <div key={bar.stars} className="rating-bar">
                    <span className="rating-bar__label">{bar.stars} ★</span>
                    <div className="rating-bar__track">
                      <div className="rating-bar__fill" style={{ width: `${bar.percent}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            <div className="reviews-feed">
              <h3 className="reviews-feed__title">Opiniones destacadas</h3>
              <div className="product-reviews-grid">
                {reviews.map((r) => (
                  <article key={r.name} className="review-card">
                    <header className="review-card__header">
                      <div className="review-card__user">
                        <div className="review-card__avatar" aria-hidden="true">{r.initial}</div>
                        <div>
                          <h4 className="review-card__name">{r.name}</h4>
                          <span className="review-card__source">Comprador verificado</span>
                        </div>
                      </div>
                      <div className="review-card__rating" aria-label={`Calificación ${r.rating} de 5 estrellas`}>
                        <span aria-hidden="true">
                          {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                        </span>
                      </div>
                    </header>
                    <p className="review-card__text">“{r.text}”</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="related-products" aria-labelledby="related-title">
          <div className="container">
            <h2 id="related-title" className="related-products__title">
              Productos recomendados
            </h2>
            <div className="related-products__grid">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}