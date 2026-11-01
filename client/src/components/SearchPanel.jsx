import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProductos, normalizeCategories } from '../services/api';
import { formatPrice } from '../utils/format';

const CATEGORY_LABELS = {
  living: 'Living',
  habitacion: 'Habitación',
  cocina: 'Cocina',
  oficina: 'Oficina',
  casa: 'Casa',
};

const SUGGESTIONS = [
  { label: 'Sofás', value: 'sofá' },
  { label: 'Mesas', value: 'mesa' },
  { label: 'Living', value: 'living' },
  { label: 'Oficina', value: 'oficina' },
];

const normalizeText = (text) =>
  String(text ?? '')
    .toLocaleLowerCase('es')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

function Highlight({ text, query }) {
  const index = normalizeText(text).indexOf(query);
  if (!query || index < 0) return text;
  return (
    <>
      {text.slice(0, index)}
      <mark>{text.slice(index, index + query.length)}</mark>
      {text.slice(index + query.length)}
    </>
  );
}

export default function SearchPanel({ isOpen, onOpen, onClose }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [value, setValue] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);

  const query = normalizeText(value);

  useEffect(() => {
    getProductos()
      .then(setProducts)
      .catch(() => setProducts([]));
  }, []);

  const matches = useMemo(() => {
    if (!query) return [];
    return products
      .map((product) => ({
        product,
        name: normalizeText(product.name),
        text: normalizeText(`${product.name} ${product.categories ?? ''}`),
      }))
      .filter((item) => item.text.includes(query))
      .sort((a, b) => Number(!a.name.startsWith(query)) - Number(!b.name.startsWith(query)))
      .map((item) => item.product);
  }, [products, query]);

  const results = matches.slice(0, 6);

  // clase en <body> (oscurece el fondo)
  useEffect(() => {
    document.body.classList.toggle('catalog-search-open', isOpen);
    return () => document.body.classList.remove('catalog-search-open');
  }, [isOpen]);

  // foco en el input al abrir
  useEffect(() => {
    if (!isOpen) return;
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  // atajos globales: Ctrl+K, "/", Escape y clic fuera del header
  useEffect(() => {
    const onKeyDown = (e) => {
      const shortcut = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k';
      const slash = e.key === '/' && !e.target.closest?.('input, textarea, select, [contenteditable]');
      if (shortcut || slash) {
        e.preventDefault();
        onOpen();
        return;
      }
      if (e.key === 'Escape' && isOpen) onClose(true);
    };
    const onDocClick = (e) => {
      if (isOpen && !e.target.closest('.header')) onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('click', onDocClick);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('click', onDocClick);
    };
  }, [isOpen, onOpen, onClose]);

  // mantener visible la opción activa
  useEffect(() => {
    if (activeIndex < 0) return;
    document
      .getElementById(`catalog-search-option-${activeIndex}`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  const updateValue = (next) => {
    setValue(next);
    setActiveIndex(-1);
  };

  const moveActive = (delta) => {
    if (results.length === 0) return;
    setActiveIndex((i) => {
      if (i === -1) return delta > 0 ? 0 : results.length - 1;
      return (i + delta + results.length) % results.length;
    });
  };

  const goToProduct = (id) => {
    onClose();
    navigate(`/producto/${id}`);
  };

  const goToCatalog = () => {
    onClose();
    const q = value.trim();
    navigate(q ? `/catalogo?q=${encodeURIComponent(q)}` : '/catalogo');
  };

  const handleShowAll = () => {
    if (matches.length === 1) goToProduct(matches[0].id);
    else goToCatalog();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      moveActive(e.key === 'ArrowDown' ? 1 : -1);
    }
    if (e.key === 'Enter' && activeIndex >= 0 && results[activeIndex]) {
      e.preventDefault();
      goToProduct(results[activeIndex].id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    goToCatalog();
  };

  let status = 'Escribí para ver resultados al instante.';
  if (query) {
    status = matches.length
      ? `${matches.length} ${matches.length === 1 ? 'coincidencia encontrada' : 'coincidencias encontradas'}.`
      : `No encontramos resultados para “${value.trim()}”.`;
  }

  return (
    <div
      className={`catalog-search-panel${isOpen ? ' catalog-search-panel--open' : ''}`}
      id="catalog-search-panel"
      aria-hidden={!isOpen}
    >
      <div className="container">
        <div className="catalog-search-panel__content" role="dialog" aria-label="Buscador de productos">
          <div className="catalog-search-panel__heading">
            <div>
              <span className="catalog-search-panel__eyebrow">BÚSQUEDA INTELIGENTE</span>
              <p>Encontrá tu próxima pieza</p>
              <small>Buscá por nombre o tipo de mueble.</small>
            </div>
            <button
              type="button"
              className="catalog-search-panel__close"
              onClick={() => onClose(true)}
              aria-label="Cerrar búsqueda"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <form className="catalog-search" role="search" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="catalog-search-input">
              Buscar productos en el catálogo
            </label>
            <div className="catalog-search__field">
              <svg className="catalog-search__icon" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                ref={inputRef}
                type="search"
                className="catalog-search__input"
                id="catalog-search-input"
                placeholder="Probá con “mesa”, “living” o “madera”..."
                autoComplete="off"
                role="combobox"
                aria-autocomplete="list"
                aria-controls="catalog-search-results"
                aria-expanded={results.length > 0}
                aria-activedescendant={activeIndex >= 0 ? `catalog-search-option-${activeIndex}` : undefined}
                value={value}
                onChange={(e) => updateValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <kbd className="catalog-search__shortcut" aria-hidden="true">Ctrl K</kbd>
              <button
                type="button"
                className="catalog-search__clear"
                aria-label="Limpiar búsqueda"
                hidden={value.length === 0}
                onClick={() => {
                  updateValue('');
                  inputRef.current?.focus();
                }}
              >
                ×
              </button>
            </div>
          </form>

          <div className="catalog-search-discover" hidden={Boolean(query)}>
            <span>Descubrí rápido</span>
            <div className="catalog-search-discover__list">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => {
                    updateValue(s.value);
                    inputRef.current?.focus();
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div
            className="catalog-search-results"
            id="catalog-search-results"
            role="listbox"
            aria-label="Productos encontrados"
            hidden={results.length === 0}
          >
            {results.map((product, index) => {
              const category = CATEGORY_LABELS[normalizeCategories(product.categories)[0]] ?? 'Mueble de autor';
              return (
                <Link
                  key={product.id}
                  to={`/producto/${product.id}`}
                  id={`catalog-search-option-${index}`}
                  className={`catalog-search-result${index === activeIndex ? ' catalog-search-result--active' : ''}`}
                  role="option"
                  aria-selected={index === activeIndex}
                  onClick={() => onClose()}
                >
                  <span className="catalog-search-result__image">
                    <img src={`/assets/${product.image}`} alt="" loading="lazy" />
                  </span>
                  <span className="catalog-search-result__copy">
                    <strong>
                      <Highlight text={product.name} query={query} />
                    </strong>
                    <span>{category} · {formatPrice(product.price)}</span>
                  </span>
                  <span className="catalog-search-result__arrow" aria-hidden="true">↗</span>
                </Link>
              );
            })}
          </div>

          <div className="catalog-search-panel__footer">
            <p className="catalog-search-panel__feedback" role="status" aria-live="polite">
              {status}
            </p>
            <button
              type="button"
              className="catalog-search-panel__show-all"
              hidden={!query || matches.length === 0}
              onClick={handleShowAll}
            >
              {matches.length === 1 ? 'Ver producto' : `Ver los ${matches.length} productos`}{' '}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}