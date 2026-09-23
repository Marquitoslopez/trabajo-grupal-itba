import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <div className="footer__brand">
          <Link to="/" className="footer__logo-link" aria-label="Hermanos Jota">
            <img src="/assets/logo.svg" className="footer__logo-icon" width="100" alt="Hermanos Jota" />
          </Link>
          <p className="footer__brand-name">Hermanos Jota</p>
          <p className="footer__tagline">Muebles de autor con maderas nativas argentinas.</p>
        </div>

        <div className="footer__grid">
          <div className="footer__col">
            <h3 className="footer__heading">Navegación</h3>
            <ul className="footer__links">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/catalogo">Tienda</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <h3 className="footer__heading">Colecciones</h3>
            <ul className="footer__links">
              <li><Link to="/catalogo?cat=living">Living</Link></li>
              <li><Link to="/catalogo?cat=habitacion">Habitación</Link></li>
              <li><Link to="/catalogo?cat=cocina">Cocina</Link></li>
              <li><Link to="/catalogo?cat=oficina">Oficina</Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <h3 className="footer__heading">Contacto</h3>
            <ul className="footer__links">
              <li>Buenos Aires, Argentina</li>
              <li>hola@hermanosjota.com</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Hermanos Jota. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
