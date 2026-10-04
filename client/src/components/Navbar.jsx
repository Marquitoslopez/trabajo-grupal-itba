import { useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { useCart } from '../context/CartContext';
import SearchPanel from './SearchPanel';

export default function Navbar() {
  const {
    cartCount,
    openCart,
    favoriteCount,
    openFavorites,
  } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const searchBtnRef = useRef(null);
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isHomeActive = isHome && location.hash === '';

  const isCollectionsActive =
    isHome && location.hash === '#colecciones';

  const isNosotrosActive =
    isHome && location.hash === '#nosotros';

  const closeMenu = () => {
    setMenuOpen(false);
    setSearchOpen(false);
  };

  const openSearch = () => {
    setMenuOpen(false);
    setSearchOpen(true);
  };

  const closeSearch = (returnFocus = false) => {
    setSearchOpen(false);

    if (returnFocus) {
      searchBtnRef.current?.focus();
    }
  };

  return (
    <header className="header">
      <div className="header__container">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="header__logo-link"
          aria-label="Hermanos Jota - Inicio"
        >
          <img
            src="/assets/logo.svg"
            className="header__logo-icon"
            width="120"
            alt="Hermanos Jota"
          />
        </Link>

        {/* Menú mobile */}
        <input
          type="checkbox"
          id="header-menu-toggle"
          className="header__checkbox"
          aria-hidden="true"
          checked={menuOpen}
          onChange={() => setMenuOpen(!menuOpen)}
        />

        <label
          htmlFor="header-menu-toggle"
          className="header__toggle"
          aria-label="Abrir o cerrar menú de navegación"
          role="button"
          tabIndex={0}
        >
          <span className="header__toggle-bar"></span>
          <span className="header__toggle-bar"></span>
          <span className="header__toggle-bar"></span>
        </label>

        {/* Navegación */}
        <nav
          className="header__nav"
          aria-label="Navegación principal"
        >
          <ul className="header__menu">

            {/* Inicio */}
            <li className="header__menu-item">
              <Link
                to="/"
                onClick={closeMenu}
                className={`header__menu-link${
                  isHomeActive
                    ? ' header__menu-link--active'
                    : ''
                }`}
              >
                Inicio
              </Link>
            </li>

            {/* Colecciones */}
            <li className="header__menu-item">
              <Link
                to={{
                  pathname: '/',
                  hash: '#colecciones',
                }}
                onClick={closeMenu}
                className={`header__menu-link${
                  isCollectionsActive
                    ? ' header__menu-link--active'
                    : ''
                }`}
              >
                Colecciones
              </Link>
            </li>

            {/* Nosotros */}
            <li className="header__menu-item">
              <Link
                to={{
                  pathname: '/',
                  hash: '#nosotros',
                }}
                onClick={closeMenu}
                className={`header__menu-link${
                  isNosotrosActive
                    ? ' header__menu-link--active'
                    : ''
                }`}
              >
                Nosotros
              </Link>
            </li>

            {/* Tienda */}
            <li className="header__menu-item">
              <NavLink
                to="/catalogo"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `header__menu-link${
                    isActive
                      ? ' header__menu-link--active'
                      : ''
                  }`
                }
              >
                Tienda
              </NavLink>
            </li>

            {/* Contacto */}
            <li className="header__menu-item">
              <NavLink
                to="/contacto"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `header__menu-link${
                    isActive
                      ? ' header__menu-link--active'
                      : ''
                  }`
                }
              >
                Contacto
              </NavLink>
            </li>

          </ul>

          {/* Acciones */}
          <div className="header__actions">

            {/* Buscar */}
            <button
              ref={searchBtnRef}
              type="button"
              className="header__action-btn"
              aria-label="Buscar productos"
              aria-controls="catalog-search-panel"
              aria-expanded={searchOpen}
              onClick={() =>
                searchOpen
                  ? closeSearch()
                  : openSearch()
              }
            >
              <svg
                className="header__icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="8"
                />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>

            {/* Favoritos */}
            <button
              type="button"
              className="header__action-btn"
              aria-label={`Ver favoritos, ${favoriteCount} ${
                favoriteCount === 1
                  ? 'guardado'
                  : 'guardados'
              }`}
              onClick={() => {
                closeMenu();
                openFavorites();
              }}
            >
              <svg
                className="header__icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>

              <span
                className="header__fav-count"
                aria-hidden="true"
              >
                {favoriteCount}
              </span>
            </button>

            {/* Carrito */}
            <button
              type="button"
              className="header__action-btn"
              aria-label="Ver carrito de compras"
              onClick={() => {
                closeMenu();
                openCart();
              }}
            >
              <svg
                className="header__icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <line
                  x1="3"
                  y1="6"
                  x2="21"
                  y2="6"
                />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>

              <span
                className="header__cart-count"
                aria-hidden="true"
              >
                {cartCount}
              </span>
            </button>

          </div>
        </nav>
      </div>

      <SearchPanel
        isOpen={searchOpen}
        onOpen={openSearch}
        onClose={closeSearch}
      />
    </header>
  );
}