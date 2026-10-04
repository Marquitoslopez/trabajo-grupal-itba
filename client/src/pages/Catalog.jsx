import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProductos, filterProducts, PRODUCT_CATEGORIES } from '../services/api';
import ProductCard from '../components/ProductCard';

const ALL_CATEGORIES = ['all', ...PRODUCT_CATEGORIES];

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const catParam = searchParams.get('cat') || 'all';
  const qParam = searchParams.get('q') || '';
  const [search, setSearch] = useState(qParam);

  useEffect(() => {
    setSearch(qParam);
  }, [qParam]);

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

  return (
    <main id="main-content" className="catalog-page">
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h1 className="section-header__title">Catálogo</h1>
            <p className="section-header__subtitle">
              Todas nuestras piezas de autor.
            </p>
          </div>

          <div className="catalog-filters">
            <input
              type="search"
              className="catalog-filters__search"
              placeholder="Buscar productos…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Buscar productos"
            />
            <div className="catalog-filters__cats">
              {ALL_CATEGORIES.map((c) => {
                const label = c === 'all' ? 'Todos' : c.charAt(0).toUpperCase() + c.slice(1);
                const href = c === 'all' ? '/catalogo' : `/catalogo?cat=${c}`;

                return (
                  <a
                    key={c}
                    href={href}
                    className={`filter-chip${catParam === c ? ' filter-chip--active' : ''}`}
                  >
                    {label}
                  </a>
                );
              })}
            </div>
          </div>

          {loading ? (
            <p>Cargando catálogo…</p>
          ) : filtered.length === 0 ? (
            <p>No se encontraron productos.</p>
          ) : (
            <div className="products-grid">
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
