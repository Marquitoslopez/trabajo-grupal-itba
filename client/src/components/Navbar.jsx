import { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SearchPanel from './SearchPanel';

export default function Navbar() {
  const { cartCount, favoriteCount, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomeHash = location.pathname === '/' && ['#colecciones', '#nosotros'].includes(location.hash);
  const closeMenu = () => setMenuOpen(false);

  const openSearch = () => {
    closeMenu();
    setSearchOpen(true);
  };

  const goToSearch = () => {
    closeMenu();
    navigate('/catalogo');
  };

  return (
    <>
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo-link" aria-label="Hermanos Jota - Inicio" onClick={closeMenu}>
          <img src="/assets/logo.svg" className="header__logo-icon" width="120" alt="Hermanos Jota" />
        </Link>

        <input
          type="checkbox"
          id="header-menu-toggle"
          className="header__checkbox"
          aria-hidden="true"
          checked={menuOpen}
          onChange={() => setMenuOpen((open) => !open)}
        />
        <label
          htmlFor="header-menu-toggle"
          className="header__toggle"
          aria-label="Abrir o cerrar menú de navegación"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setMenuOpen((open) => !open);
            }
          }}
        >
          <span className="header__toggle-bar"></span>
          <span className="header__toggle-bar"></span>
          <span className="header__toggle-bar"></span>
        </label>

        <nav className="header__nav" aria-label="Navegación principal">
          <ul className="header__menu">
            <li className="header__menu-item">
              <NavLink to="/" end className={({ isActive }) => `header__menu-link${isActive ? ' header__menu-link--active' : ''}`} onClick={closeMenu}>
                Inicio
              </NavLink>
            </li>
            <li className="header__menu-item">
              <NavLink to="/catalogo" className={({ isActive }) => `header__menu-link${isActive ? ' header__menu-link--active' : ''}`} onClick={closeMenu}>
                Tienda
              </NavLink>
            </li>
            <li className="header__menu-item">
              <Link
                to={{ pathname: '/', hash: '#colecciones' }}
                className={`header__menu-link${isHomeHash && location.hash === '#colecciones' ? ' header__menu-link--active' : ''}`}
                onClick={closeMenu}
              >
                Colecciones
              </Link>
            </li>
            <li className="header__menu-item">
              <Link
                to={{ pathname: '/', hash: '#nosotros' }}
                className={`header__menu-link${isHomeHash && location.hash === '#nosotros' ? ' header__menu-link--active' : ''}`}
                onClick={closeMenu}
              >
                Nosotros
              </Link>
            </li>
            <li className="header__menu-item">
              <NavLink to="/contacto" className={({ isActive }) => `header__menu-link${isActive ? ' header__menu-link--active' : ''}`} onClick={closeMenu}>
                Contacto
              </NavLink>
            </li>
          </ul>

          <div className="header__actions">
            <button type="button" className="header__action-btn" aria-label="Buscar productos" aria-expanded={searchOpen} aria-controls="global-search-panel" onClick={openSearch}>
              <svg className="header__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>

            <button type="button" className="header__action-btn" aria-label={`Ver favoritos, ${favoriteCount} guardados`} onClick={goToSearch}>
              <svg className="header__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </button>

            <button type="button" className="header__action-btn" aria-label="Ver carrito de compras" onClick={openCart}>
              <svg className="header__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="header__cart-count" aria-hidden="true">{cartCount}</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
      <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );

}
