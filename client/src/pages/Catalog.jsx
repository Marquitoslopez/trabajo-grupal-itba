import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProductos } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchParams] = useSearchParams();
  const catParam = searchParams.get('cat') || '';

  useEffect(() => {
    getProductos()
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let list = products;
    if (catParam) {
      list = list.filter((p) =>
        (p.categories || '').toLowerCase().includes(catParam.toLowerCase())
      );
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.categories || '').toLowerCase().includes(q)
      );
    }
    return list;
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
              {['', 'living', 'habitacion', 'cocina', 'oficina', 'casa'].map((c) => (
                <a
                  key={c || 'all'}
                  href={c ? `/catalogo?cat=${c}` : '/catalogo'}
                  className={`filter-chip${catParam === c ? ' filter-chip--active' : ''}`}
                >
                  {c === '' ? 'Todos' : c.charAt(0).toUpperCase() + c.slice(1)}
                </a>
              ))}
            </div>
          </div>

          {loading ? (
            <p>Cargando catálogo…</p>
          ) : filtered.length === 0 ? (
            <p>No se encontraron productos.</p>
          ) : (
            <div className="product-grid">
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
