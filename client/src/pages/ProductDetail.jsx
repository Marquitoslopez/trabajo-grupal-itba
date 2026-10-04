import { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductoById, getProductos } from '../services/api';
import { formatPrice } from '../utils/format';
import { useCart } from '../context/CartContext';

const PRODUCT_DETAILS = {
  p1: {
    category: "Living Room",
    description: "Sofá de tres cuerpos inspirado en los paisajes patagónicos. Su estructura de madera maciza y tapizado de textura suave combinan comodidad cotidiana con una presencia cálida y atemporal.",
    specs: [
      ["Medidas", "220 × 90 × 82 cm"],
      ["Materiales", "Madera maciza y tapizado de alta resistencia"],
      ["Acabado", "Cera natural de bajo impacto"],
      ["Capacidad", "3 personas"],
      ["Garantía", "10 años en estructura"]
    ],
    rating: "4.9",
    ratingCount: 418,
  },
  p2: {
    category: "Living Room",
    description: "Sillón lounge en cuero cognac con base giratoria en acero. Inspirado en la estética brasilera moderna de los 60, combina comodidad excepcional con un diseño que trasciende tendencias y épocas.",
    specs: [
      ["Medidas", "90 × 85 × 95 cm"],
      ["Materiales", "Cuero curtido vegetal y acero pintado"],
      ["Acabado", "Cuero anilina premium"],
      ["Rotación", "360° silenciosa y suave"],
      ["Garantía", "10 años en estructura"]
    ],
    rating: "4.8",
    ratingCount: 529,
  },
  p3: {
    category: "Living Room",
    description: "Butaca de líneas envolventes y proporciones equilibradas. La madera natural dialoga con un tapizado confortable para crear una pieza versátil, ideal para rincones de lectura y livings contemporáneos.",
    specs: [
      ["Medidas", "78 × 82 × 85 cm"],
      ["Materiales", "Madera de lenga y espuma de alta densidad"],
      ["Tapizado", "Tela antimanchas de trama natural"],
      ["Carga máxima", "130 kg"],
      ["Garantía", "5 años en estructura"]
    ],
    rating: "4.7",
    ratingCount: 286,
  },
  p4: {
    category: "Living Room",
    description: "Mesa de centro de madera maciza con bordes suavemente redondeados. Su diseño liviano realza la veta natural y aporta una superficie funcional sin sobrecargar el ambiente.",
    specs: [
      ["Medidas", "110 × 60 × 42 cm"],
      ["Materiales", "Madera maciza de araucaria"],
      ["Acabado", "Aceite vegetal satinado"],
      ["Peso", "24 kg"],
      ["Garantía", "5 años"]
    ],
    rating: "4.8",
    ratingCount: 193,
  },
  p5: {
    category: "Habitación",
    description: "Mesa de noche compacta con cajón de apertura suave y espacio inferior de guardado. Una pieza serena que combina detalles artesanales con funcionalidad para el uso diario.",
    specs: [
      ["Medidas", "50 × 42 × 58 cm"],
      ["Materiales", "Madera de petiribí seleccionada"],
      ["Acabado", "Laca al agua mate"],
      ["Guardado", "1 cajón y estante inferior"],
      ["Garantía", "5 años"]
    ],
    rating: "4.9",
    ratingCount: 174,
  },
  p6: {
    category: "Habitación",
    description: "Biblioteca vertical de inspiración mid-century, pensada para organizar libros y objetos sin perder ligereza visual. Sus estantes amplios acompañan distintos espacios del hogar.",
    specs: [
      ["Medidas", "100 × 35 × 190 cm"],
      ["Materiales", "Madera maciza y enchapado natural"],
      ["Acabado", "Cera de origen vegetal"],
      ["Estantes", "5 niveles reforzados"],
      ["Garantía", "7 años"]
    ],
    rating: "4.7",
    ratingCount: 231,
  },
  p7: {
    category: "Cocina",
    description: "Mesa de comedor amplia y robusta, creada para reuniones cotidianas. La tapa de madera maciza conserva la expresión de la veta y se apoya sobre una base estable de líneas puras.",
    specs: [
      ["Medidas", "180 × 90 × 76 cm"],
      ["Materiales", "Madera maciza de algarrobo"],
      ["Acabado", "Aceite natural resistente al uso"],
      ["Capacidad", "6 personas"],
      ["Garantía", "10 años"]
    ],
    rating: "4.9",
    ratingCount: 347,
  },
  p8: {
    category: "Cocina",
    description: "Juego de sillas de comedor con respaldo ergonómico y estructura firme. Su silueta simple recupera el carácter del mobiliario clásico argentino con una lectura contemporánea.",
    specs: [
      ["Medidas", "48 × 54 × 82 cm cada una"],
      ["Materiales", "Madera maciza y asiento tapizado"],
      ["Acabado", "Protección mate al agua"],
      ["Incluye", "Juego de 4 sillas"],
      ["Garantía", "5 años"]
    ],
    rating: "4.8",
    ratingCount: 312,
  },
  p9: {
    category: "Cocina",
    description: "Aparador de gran capacidad con puertas de apertura suave y estantes interiores. Su frente limpio permite guardar vajilla y objetos manteniendo una estética ordenada.",
    specs: [
      ["Medidas", "160 × 42 × 78 cm"],
      ["Materiales", "Madera noble de algarrobo"],
      ["Acabado", "Cera natural color miel"],
      ["Guardado", "3 puertas y estantes regulables"],
      ["Garantía", "7 años"]
    ],
    rating: "4.7",
    ratingCount: 208,
  },
  p10: {
    category: "Oficina",
    description: "Escritorio minimalista con superficie amplia y cajón integrado. Fue diseñado para crear un espacio de trabajo ordenado, cálido y cómodo durante toda la jornada.",
    specs: [
      ["Medidas", "140 × 65 × 76 cm"],
      ["Materiales", "Madera maciza y correderas metálicas"],
      ["Acabado", "Aceite vegetal mate"],
      ["Guardado", "1 cajón de apertura invisible"],
      ["Garantía", "7 años"]
    ],
    rating: "4.9",
    ratingCount: 264,
  },
  p11: {
    category: "Oficina",
    description: "Silla de trabajo ergonómica con estructura de madera y apoyo confortable. Su diseño acompaña largas jornadas sin perder la identidad cálida del mobiliario artesanal.",
    specs: [
      ["Medidas", "58 × 60 × 86 cm"],
      ["Materiales", "Madera maciza y tapizado respirable"],
      ["Ergonomía", "Respaldo curvo y asiento acolchado"],
      ["Carga máxima", "120 kg"],
      ["Garantía", "5 años"]
    ],
    rating: "4.8",
    ratingCount: 301,
  },
};

const CATEGORY_LABEL = {
  living: 'Living Room',
  habitacion: 'Habitación',
  cocina: 'Cocina',
  oficina: 'Oficina',
  casa: 'Casa',
};

function enrich(product) {
  if (!product) return null;
  const extra = PRODUCT_DETAILS[product.id] || {};
  const firstCat = String(product.categories || '')
    .trim()
    .split(/\s+/)[0];
  return {
    ...product,
    categoryLabel: extra.category || CATEGORY_LABEL[firstCat] || firstCat || 'Mueble',
    description:
      extra.description ||
      `${product.name}. Pieza de autor en maderas nativas con acabados naturales.`,
    specs: extra.specs || [
      ['Materiales', 'Maderas nativas y acabados naturales'],
      ['Acabado', 'Aceite de lino y cera de abejas'],
      ['Garantía', 'Programa Herencia Viva'],
    ],
    rating: extra.rating || '4.8',
    ratingCount: extra.ratingCount || 120,
  };
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [thumbIndex, setThumbIndex] = useState(0);
  const { addToCart, toggleFavorite, isFavorite } = useCart();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setThumbIndex(0);

    (async () => {
      try {
        let found = null;
        try {
          found = await getProductoById(id);
        } catch {
          const list = await getProductos();
          found = list.find((p) => p.id === id) || null;
        }
        if (cancelled) return;
        if (!found) {
          setError('Producto no encontrado');
          setProduct(null);
          setRelated([]);
          return;
        }
        setProduct(enrich(found));

        const list = await getProductos();
        if (cancelled) return;
        const enrichedList = list.map(enrich).filter(Boolean);
        const same = enrichedList.filter(
          (p) => p.id !== found.id && p.categoryLabel === (PRODUCT_DETAILS[found.id]?.category || ''),
        );
        const others = enrichedList.filter(
          (p) => p.id !== found.id && !same.some((s) => s.id === p.id),
        );
        setRelated([...same, ...others].slice(0, 3));
      } catch {
        if (!cancelled) setError('Producto no encontrado');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const favorite = product ? isFavorite(product.id) : false;

  const mainImgClass = useMemo(() => {
    let cls = 'product-gallery__main-img';
    if (thumbIndex === 1) cls += ' product-gallery__main-img--detail-top';
    if (thumbIndex === 2) cls += ' product-gallery__main-img--detail-bottom';
    return cls;
  }, [thumbIndex]);

  if (loading) {
    return (
      <main className="container" id="product-main">
        <p>Cargando…</p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="container" id="product-main">
        <p>{error || 'Producto no encontrado'}</p>
        <Link to="/catalogo" className="btn btn--outline">
          Volver al catálogo
        </Link>
      </main>
    );
  }

  const imgSrc = `/assets/${product.image}`;

  return (
    <main id="product-main">
      <section className="product-detail" aria-labelledby="product-title">
        <div className="container">
          <div className="product-detail__grid">
            <div className="product-gallery">
              <div className="product-gallery__main">
                <div className="product-gallery__blob" aria-hidden="true" />
                <img
                  src={imgSrc}
                  alt={product.alt || product.name}
                  className={mainImgClass}
                  id="main-product-image"
                  fetchPriority="high"
                />
              </div>
              <div
                className="product-gallery__thumbnails"
                role="region"
                aria-label="Detalles y acabados del producto"
              >
                {[
                  ['Vista completa', 'product-gallery__thumb-img--full'],
                  ['Detalle superior', 'product-gallery__thumb-img--detail-top'],
                  ['Detalle inferior', 'product-gallery__thumb-img--detail-bottom'],
                ].map(([label, thumbCls], index) => (
                  <button
                    key={label}
                    type="button"
                    className={`product-gallery__thumb${thumbIndex === index ? ' product-gallery__thumb--active' : ''}`}
                    aria-label={label}
                    onClick={() => setThumbIndex(index)}
                  >
                    <img
                      src={imgSrc}
                      alt=""
                      className={`product-gallery__thumb-img ${thumbCls}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="product-info">
              <span className="product-info__badge" id="product-category">
                {product.categoryLabel}
              </span>
              <h1 id="product-title" className="product-info__title">
                {product.name}
              </h1>
              <p className="product-info__price" id="product-price">
                {formatPrice(product.price)}
              </p>

              <div className="product-info__shipping-alert">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>
                  Haz tu pedido <strong>hoy mismo</strong> y recíbelo mañana
                </span>
              </div>

              <div className="product-info__description">
                <h2 className="product-info__subheading">Descripción</h2>
                <p id="product-description">{product.description}</p>
              </div>

              <dl className="product-specs" id="product-specs">
                {product.specs.map(([term, detail]) => (
                  <div className="product-specs__row" key={term}>
                    <dt className="product-specs__term">{term}</dt>
                    <dd className="product-specs__detail">{detail}</dd>
                  </div>
                ))}
              </dl>

              <div className="product-info__actions">
                <button
                  type="button"
                  className="btn btn--gold-pill btn--add-to-cart"
                  onClick={() => addToCart(product.id)}
                >
                  Añadir al Carro
                </button>
                <button
                  type="button"
                  className="product-info__fav-btn"
                  onClick={() => toggleFavorite(product.id)}
                  aria-label={
                    favorite
                      ? `Quitar ${product.name} de favoritos`
                      : `Añadir ${product.name} a favoritos`
                  }
                  aria-pressed={favorite}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill={favorite ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
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
          <div className="product-reviews-layout">
            <aside className="reviews-summary" aria-labelledby="reviews-title">
              <h2 id="reviews-title" className="reviews-summary__title">
                Valoraciones
              </h2>
              <div className="reviews-summary__score">
                <span className="reviews-summary__number">{product.rating}</span>
                <span className="reviews-summary__stars" aria-hidden="true">
                  ★★★★★
                </span>
                <span className="reviews-summary__count">
                  {product.ratingCount} reseñas
                </span>
              </div>
              <div className="reviews-summary__bars">
                {[
                  [5, 85],
                  [4, 10],
                  [3, 3],
                  [2, 1],
                  [1, 1],
                ].map(([stars, pct]) => (
                  <div className="rating-bar" key={stars}>
                    <span className="rating-bar__label">{stars} ★</span>
                    <div className="rating-bar__track">
                      <div className="rating-bar__fill" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </aside>
            <div className="reviews-feed">
              <h3 className="reviews-feed__title">Opiniones destacadas</h3>
              <div className="product-reviews-grid">
                <article className="product-review-card">
                  <header className="product-review-card__header">
                    <strong>Cliente verificado</strong>
                    <span aria-hidden="true">★ {product.rating}</span>
                  </header>
                  <p>
                    Excelente calidad de materiales y terminaciones. La pieza llega impecable y
                    transforma el ambiente de inmediato.
                  </p>
                </article>
                <article className="product-review-card">
                  <header className="product-review-card__header">
                    <strong>Compra reciente</strong>
                    <span aria-hidden="true">★ 5.0</span>
                  </header>
                  <p>
                    Muy buena atención y envío sin plásticos. Se nota el trabajo artesanal en cada
                    detalle.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="related-products" aria-labelledby="related-title">
        <div className="container">
          <h2 id="related-title" className="related-products__title">
            Productos recomendados
          </h2>
          <div className="related-products__grid">
            {related.map((item) => (
              <article className="product-card" key={item.id} data-id={item.id}>
                <header className="product-card__header">
                  <div className="product-card__info">
                    <h3 className="product-card__title">{item.name}</h3>
                    <p className="product-card__price">{formatPrice(item.price)}</p>
                  </div>
                </header>
                <div className="product-card__image-wrapper">
                  <Link to={`/producto/${item.id}`} aria-label={`Ver detalle de ${item.name}`}>
                    <img
                      src={`/assets/${item.image}`}
                      alt={item.alt || item.name}
                      className="product-card__image"
                      loading="lazy"
                      width="300"
                      height="220"
                    />
                  </Link>
                </div>
                <div className="product-card__actions">
                  <div className="product-card__primary-actions">
                    <Link to={`/producto/${item.id}`} className="btn btn--primary">
                      Ver
                    </Link>
                    <button
                      type="button"
                      className="btn btn--gold"
                      onClick={() => addToCart(item.id)}
                      aria-label={`Agregar ${item.name} al carrito`}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                      </svg>
                    </button>
                  </div>
                  <div className="product-card__secondary-actions">
                    <Link to={`/producto/${item.id}`} className="product-card__link-detail">
                      Ver detalle
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
