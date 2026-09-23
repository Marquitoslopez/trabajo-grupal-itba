import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProductos } from '../services/api';
import ProductCard from '../components/ProductCard';
import { formatPrice } from '../utils/format';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductos()
      .then((list) => setFeatured(list.slice(0, 4)))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main id="main-content">
      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <div className="hero__overlay" aria-hidden="true"></div>
        <img
          className="hero__bg-image"
          src="/assets/bg-inicio.png"
          alt="Salón decorado con sofá de lino, mesas de centro de madera maciza y sillón de autor"
          width="1920"
          height="1080"
          fetchPriority="high"
        />
        <div className="container hero__container">
          <div className="hero__content">
            <h1 id="hero-title" className="hero__title">
              Muebles de autor con maderas nativas
            </h1>
            <p className="hero__subtitle">
              Piezas artesanales elaboradas con algarrobo, quebracho y caldén. Diseño atemporal para tu hogar.
            </p>
            <Link to="/catalogo" className="btn btn--primary hero__cta">
              Explorar catálogo
            </Link>
          </div>
        </div>
      </section>

      <section className="section" id="destacados" aria-labelledby="destacados-title">
        <div className="container">
          <div className="section-header">
            <h2 id="destacados-title" className="section-header__title">
              Piezas destacadas
            </h2>
            <p className="section-header__subtitle">
              Una selección de nuestras creaciones más queridas.
            </p>
          </div>
          {loading ? (
            <p>Cargando productos…</p>
          ) : (
            <div className="product-grid">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
          <div className="section__cta">
            <Link to="/catalogo" className="btn btn--secondary">
              Ver todo el catálogo
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--alt" id="colecciones" aria-labelledby="colecciones-title">
        <div className="container">
          <div className="section-header">
            <h2 id="colecciones-title" className="section-header__title">
              Colecciones
            </h2>
          </div>
          <div className="collections-grid">
            {[
              { id: 'living', name: 'Living', img: 'living.png' },
              { id: 'habitacion', name: 'Habitación', img: 'habitacion.png' },
              { id: 'cocina', name: 'Cocina', img: 'cocina.png' },
              { id: 'oficina', name: 'Oficina', img: 'oficina.png' },
            ].map((c) => (
              <Link key={c.id} to={`/catalogo?cat=${c.id}`} className="collection-card">
                <img src={`/assets/${c.img}`} alt={c.name} className="collection-card__img" />
                <h3 className="collection-card__title">{c.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="nosotros" aria-labelledby="nosotros-title">
        <div className="container container--narrow">
          <div className="section-header">
            <h2 id="nosotros-title" className="section-header__title">
              Nosotros
            </h2>
            <p className="section-header__subtitle">
              En Hermanos Jota trabajamos con maderas nativas argentinas y técnicas artesanales para crear muebles que duran generaciones.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
