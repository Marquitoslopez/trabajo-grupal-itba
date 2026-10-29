import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__brand">
          <Link to="/" className="footer__logo-link">
            <img
              src="/assets/logo.svg"
              alt="Hermanos Jota"
              className="footer__logo-icon"
              width="60"
              aria-hidden="true"
            />
            <span className="footer__brand-name">Hermanos Jota</span>
          </Link>
        </div>

        <div className="footer__grid">
          <div className="footer__col">
            <h3 className="footer__title">Hermanos Jota</h3>
            <p className="footer__text">
              Casa Taller &amp; Showroom
              <br />
              Av. San Juan 2847
              <br />
              C1232AAB - Barrio de San Cristóbal
              <br />
              Buenos Aires, Argentina
            </p>
          </div>

          <div className="footer__col">
            <h3 className="footer__title">Horarios Showroom</h3>
            <p className="footer__text">
              Lunes a Viernes: 10:00 - 19:00 hs
              <br />
              Sábados: 10:00 - 14:00 hs
            </p>
          </div>

          <div className="footer__col">
            <h3 className="footer__title">Contacto Digital</h3>
            <p className="footer__text">
              Email:{' '}
              <a href="mailto:info@hermanosjota.com.ar" className="footer__link">
                info@hermanosjota.com.ar
              </a>
              <br />
              Ventas:{' '}
              <a href="mailto:ventas@hermanosjota.com.ar" className="footer__link">
                ventas@hermanosjota.com.ar
              </a>
              <br />
              WhatsApp:{' '}
              <a
                href="https://wa.me/541145678900"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link"
              >
                +54 11 4567-8900
              </a>
              <br />
              Instagram:{' '}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link"
              >
                @hermanosjota_ba
              </a>
            </p>
          </div>

          <div className="footer__col">
            <h3 className="footer__title">Compromiso Sustentable</h3>
            <p className="footer__text">
              Maderas nativas FSC (Algarrobo, Quebracho, Caldén). Acabados
              biológicos sin VOCs y embalaje ecológico.
            </p>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} Hermanos Jota. Todos los derechos
            reservados.
          </p>
          <nav className="footer__social-nav" aria-label="Redes sociales">
            <ul className="footer__social-list">
              <li>
                <a href="#twitter" className="footer__social-link">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#facebook" className="footer__social-link">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#instagram" className="footer__social-link">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#linkedin" className="footer__social-link">
                  Linkedin
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
