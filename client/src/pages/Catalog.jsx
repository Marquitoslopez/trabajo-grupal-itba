import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProductos, filterProducts, PRODUCT_CATEGORIES } from '../services/api';
import ProductCard from '../components/ProductCard';

const ALL_CATEGORIES = ['all', ...PRODUCT_CATEGORIES];

const CATEGORY_LABELS = {
  all: 'Todos',
  living: 'Living-Room',
  habitacion: 'Habitación',
  cocina: 'Cocina',
  oficina: 'Oficina',
  casa: 'Casa',
};

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const catParam = searchParams.get('cat') || 'all';
  const search = searchParams.get('q') || '';

  useEffect(() => {
    getProductos()
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const category = catParam === 'all' ? '' : catParam;
    return filterProducts(products, { category, search });
  }, [products, catParam, search]);

  const handleFilter = (c) => {
    const next = new URLSearchParams(searchParams);
    if (c === 'all') next.delete('cat');
    else next.set('cat', c);
    setSearchParams(next);
  };

  return (
    <main id="main-content">
      <section className="page-banner" aria-labelledby="shop-title">
        <div className="page-banner__overlay" aria-hidden="true"></div>
        <img
          className="page-banner__bg"
          src="/assets/bg-inicio.png"
          alt="Interior con mobiliario de madera noble Hermanos Jota"
          width="1920"
          height="400"
          fetchPriority="high"
        />
        <div className="page-banner__content">
          <h1 id="shop-title" className="page-banner__title">SHOP</h1>
        </div>
      </section>

      <section className="filter-bar" aria-label="Filtros de categoría de productos">
        <div className="container">
          <div className="filter-bar__list" role="tablist" aria-label="Categorías">
            {ALL_CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={catParam === c}
                className={`filter-bar__pill${catParam === c ? ' filter-bar__pill--active' : ''}`}
                onClick={() => handleFilter(c)}
              >
                {CATEGORY_LABELS[c] ?? c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="catalog" aria-labelledby="catalog-heading" id="catalogo">
        <h2 id="catalog-heading" className="sr-only">Catálogo Completo de Muebles</h2>
        <div className="container">
          {loading ? (
            <p className="catalog__empty">Cargando catálogo…</p>
          ) : filtered.length === 0 ? (
            <div className="catalog__empty">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" focusable="false">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <p>No encontramos productos con esa búsqueda.</p>
            </div>
          ) : (
            <div className="catalog__grid">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}