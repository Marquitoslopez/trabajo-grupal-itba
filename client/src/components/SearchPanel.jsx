import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getProductos } from '../services/api';
import { formatPrice } from '../utils/format';

const CATEGORY_LABELS = {
  living: 'Living',
  habitacion: 'Habitación',
  cocina: 'Cocina',
  oficina: 'Oficina',
  casa: 'Casa',
};

const SUGGESTIONS = ['Sofá', 'Mesa', 'Sillón', 'Oficina', 'Cocina', 'Biblioteca'];

function normalizeText(value = '') {
  return String(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Panel de búsqueda global (equivalente a scripts/buscador.js).
 * Se usa desde el Navbar y está disponible en todas las rutas.
 */
export default function SearchPanel({ open, onClose }) {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loaded, setLoaded] = useState(false);
  const inputRef = useRef(null);
  const panelRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Cerrar al cambiar de ruta
  useEffect(() => {
    if (open) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Cargar productos una vez (todas las páginas)
  useEffect(() => {
    let cancelled = false;
    getProductos()
      .then((list) => {
        if (!cancelled) {
          setProducts(Array.isArray(list) ? list : []);
          setLoaded(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setProducts([]);
          setLoaded(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (open) {
      document.body.classList.add('catalog-search-open');
      setActiveIndex(-1);
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      document.body.classList.remove('catalog-search-open');
      setQuery('');
      setActiveIndex(-1);
      setActiveCategory('all');
    }
    return () => document.body.classList.remove('catalog-search-open');
  }, [open]);

  // Escape + atajo Ctrl/Cmd+K desde cualquier página
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && open) {
        e.preventDefault();
        onClose();
        return;
      }
      const isShortcut =
        (e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey);
      if (isShortcut) {
        e.preventDefault();
        if (!open) {
          // El padre controla open; disparamos click en el botón de buscar si existe
          document
            .querySelector('.header__action-btn[aria-label="Buscar productos"]')
            ?.click();
        } else {
          inputRef.current?.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const matches = useMemo(() => {
    const q = normalizeText(query.trim());
    return products.filter((p) => {
      const cats = String(p.categories || '')
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean);
      const matchesCategory =
        activeCategory === 'all' || cats.includes(activeCategory);
      const haystack = normalizeText(`${p.name ?? ''} ${p.categories ?? ''}`);
      const matchesSearch = !q || haystack.includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [products, query, activeCategory]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [query, activeCategory]);

  const goToProduct = (id) => {
    onClose();
    navigate(`/producto/${id}`);
  };

  const goToCatalog = () => {
    onClose();
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (activeCategory !== 'all') params.set('cat', activeCategory);
    const qs = params.toString();
    navigate(qs ? `/catalogo?${qs}` : '/catalogo');
  };

  const onInputKeyDown = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const delta = e.key === 'ArrowDown' ? 1 : -1;
      setActiveIndex((prev) => {
        if (!matches.length) return -1;
        const next = prev + delta;
        if (next < 0) return matches.length - 1;
        if (next >= matches.length) return 0;
        return next;
      });
    }
    if (e.key === 'Enter') {
      if (activeIndex >= 0 && matches[activeIndex]) {
        e.preventDefault();
        goToProduct(matches[activeIndex].id);
      } else {
        e.preventDefault();
        goToCatalog();
      }
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === panelRef.current) onClose();
  };

  const showResults = query.trim().length > 0 || activeCategory !== 'all';

  return (
    <div
      ref={panelRef}
      className={`catalog-search-panel${open ? ' catalog-search-panel--open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Buscar productos"
      aria-hidden={!open}
      hidden={!open}
      onClick={handleBackdropClick}
    >
      <div
        className="catalog-search-panel__content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="catalog-search-panel__heading">
          <div>
            <p className="catalog-search-panel__eyebrow">Búsqueda</p>
            <p>Encontrá tu próxima pieza</p>
            <small>Disponible en todas las páginas · Ctrl/⌘ K · Esc para cerrar</small>
          </div>
          <button
            type="button"
            className="catalog-search-panel__close"
            aria-label="Cerrar búsqueda"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="catalog-search__field">
          <span className="catalog-search__icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </span>
          <input
            ref={inputRef}
            type="search"
            className="catalog-search__input"
            placeholder="Sofá, mesa, sillón, oficina…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKeyDown}
            aria-autocomplete="list"
            aria-controls="catalog-search-results"
            autoComplete="off"
          />
          {query.trim() && (
            <button
              type="button"
              className="catalog-search__clear"
              aria-label="Limpiar búsqueda"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
            >
              Limpiar
            </button>
          )}
        </div>

        <div className="catalog-search-discover" hidden={query.trim().length > 0}>
          <span>Sugerencias</span>
          <div className="catalog-search-discover__list">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setQuery(s);
                  inputRef.current?.focus();
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div
          className="filter-bar"
          style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}
          role="group"
          aria-label="Filtrar por categoría"
        >
          {['all', 'living', 'habitacion', 'cocina', 'oficina', 'casa'].map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-bar__pill${activeCategory === cat ? ' filter-bar__pill--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'all' ? 'Todos' : CATEGORY_LABELS[cat] || cat}
            </button>
          ))}
        </div>

        <div
          id="catalog-search-results"
          className="catalog-search-results"
          role="listbox"
          hidden={!showResults}
        >
          {!loaded ? (
            <p style={{ padding: '1rem' }}>Cargando productos…</p>
          ) : matches.length === 0 ? (
            <p style={{ padding: '1rem' }}>No se encontraron productos.</p>
          ) : (
            matches.map((product, index) => {
              const firstCat = String(product.categories || '')
                .split(/\s+/)
                .filter(Boolean)[0];
              const catLabel = CATEGORY_LABELS[firstCat] || 'Mueble de autor';
              const active = index === activeIndex;
              return (
                <Link
                  key={product.id}
                  to={`/producto/${product.id}`}
                  className={`catalog-search-result${active ? ' catalog-search-result--active' : ''}`}
                  role="option"
                  aria-selected={active}
                  id={`catalog-search-option-${index}`}
                  onClick={onClose}
                >
                  <span className="catalog-search-result__image">
                    <img src={`/assets/${product.image}`} alt="" loading="lazy" />
                  </span>
                  <span className="catalog-search-result__copy">
                    <strong>{product.name}</strong>
                    <span>
                      {catLabel} · {formatPrice(product.price)}
                    </span>
                  </span>
                  <span className="catalog-search-result__arrow" aria-hidden="true">
                    ↗
                  </span>
                </Link>
              );
            })
          )}
        </div>

        <div style={{ marginTop: '1rem', textAlign: 'right' }}>
          <button type="button" className="btn btn--outline" onClick={goToCatalog}>
            Ver catálogo completo
          </button>
        </div>
      </div>
    </div>
  );
}
