import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProductos } from '../services/api';
import ProductCard from '../components/ProductCard';

const faqs = [
  {
    id: 1,
    question: '¿Cómo funcionan los envíos a todo el país sin plásticos?',
    answer: 'Coordinamos envíos protegidos utilizando fundas reutilizables de tela y cartón comprimido reciclado, eliminando completamente el uso de plásticos de un solo uso.',
  },
  {
    id: 2,
    question: '¿Qué garantía tienen los muebles de Hermanos Jota?',
    answer: 'Ofrecemos nuestro programa Herencia Viva: 10 años de garantía estructural sobre ensambles y maderas nativas.',
  },
  {
    id: 3,
    question: '¿Puedo visitar la Casa Taller antes de encargar una pieza?',
    answer: '¡Por supuesto! Te esperamos en San Cristóbal, CABA, de Lunes a Viernes de 10 a 19 hs y Sábados de 10 a 14 hs.',
  },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    getProductos()
      .then((list) => setProducts(list.slice(0, 6)))
      .catch(() => setProducts([]))
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
              El <span className="hero__title--highlight">alma</span> del bosque en el corazón de tu{' '}
              <span className="hero__title--highlight">hogar</span>
            </h1>
            <p className="hero__subtitle">
              Nos especializamos en piezas de alta calidad con una estética distintiva,
              curadas y diseñadas para habitar tu espacio con distinción.
            </p>
            <div className="hero__actions">
              <Link to="/catalogo" className="btn btn--primary">Explorar Colección</Link>
            </div>
          </div>
        </div>
        <a href="#tienda" className="hero__scroll-indicator" aria-label="Desplazarse a productos destacados">
          <span className="hero__scroll-ring" aria-hidden="true"></span>
        </a>
      </section>

      <section className="products-section" id="tienda" aria-labelledby="collections-title">
        <div className="container">
          <div className="section-header">
            <h2 id="collections-title" className="section-header__title">Nuestras Nuevas Colecciones</h2>
            <p className="section-header__subtitle">
              Piezas únicas esculpidas en maderas nativas argentinas. Acabados
              100% naturales en aceite de lino y cera de abejas que cuidan el planeta y tu espacio.
            </p>
          </div>

          {loading ? (
            <p>Cargando productos…</p>
          ) : products.length === 0 ? (
            <p>No se pudieron cargar los productos.</p>
          ) : (
            <div className="products-grid">
              {products.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          )}

          <div className="products-section__action">
            <Link to="/catalogo" className="btn btn--outline">Ver Todos Los Productos</Link>
          </div>
        </div>
      </section>

      <section className="categories-section" id="colecciones" aria-labelledby="recommended-title">
        <div className="container">
          <div className="section-header">
            <h2 id="recommended-title" className="section-header__title">Productos Recomendados Para Ti</h2>
            <p className="section-header__subtitle">
              Pensamos cada detalle para que no tengas que hacerlo tú. Una selección donde la innovación
              en el diseño se une a nuestra tradición maderera para acompañar tu espacio.
            </p>
          </div>

          <div className="categories-mosaic">
            {[
              ['kitchen', 'Muebles de Cocina', 'cocina.png'],
              ['living', 'Muebles de Sala de Estar', 'living.png'],
              ['office', 'Muebles de Oficina', 'oficina.png'],
              ['bedroom', 'Muebles de Habitación', 'habitacion.png'],
            ].map(([id, title, image]) => (
              <article key={id} className={`category-card category-card--${id}`}>
                <img className="category-card__bg" src={`/assets/${image}`} alt={title} loading="lazy" width="600" height="400" />
                <div className="category-card__content">
                  <h3 className="category-card__title">{title}</h3>
                  <Link to={`/catalogo?cat=${id === 'kitchen' ? 'cocina' : id === 'office' ? 'oficina' : id === 'bedroom' ? 'habitacion' : id}`} className="btn btn--small">EXPLORAR COLECCIÓN</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="offers-section" id="nosotros" aria-labelledby="offers-title">
        <div className="container">
          <div className="section-header">
            <h2 id="offers-title" className="section-header__title">Nosotros Te Ofrecemos</h2>
            <p className="section-header__subtitle">
              Diseños de alta calidad, funcionales y atemporales, creados para transformar tu hogar con confort y distinguida simplicidad.
            </p>
          </div>

          <div className="offers-flower">
            <aside className="offers-flower__side-card offers-flower__side-card--left">
              <div className="offers-flower__side-icon" aria-hidden="true"></div>
              <h3 className="offers-flower__side-title">Haz Tu Orden</h3>
              <p className="offers-flower__side-text">Todas las piezas realizadas bajo pedido por usted.</p>
            </aside>

            <div className="offers-flower__center">
              <article className="offers-flower__petal offers-flower__petal--tl">
                <span className="offers-flower__badge offers-flower__badge--tl">Herencia Viva</span>
                <p className="offers-flower__petal-text">Garantía de 10 años en estructura y programa de recompra hasta el 40% de su valor.</p>
              </article>
              <article className="offers-flower__petal offers-flower__petal--tr">
                <span className="offers-flower__badge offers-flower__badge--tr">Maderas FSC</span>
                <p className="offers-flower__petal-text">Procedencia transparente de bosques responsables argentinos (Algarrobo, Quebracho, Caldén).</p>
              </article>
              <article className="offers-flower__petal offers-flower__petal--bl">
                <span className="offers-flower__badge offers-flower__badge--bl">Cero Plástico</span>
                <p className="offers-flower__petal-text">Embalajes 100% reciclables y libre de plásticos de un solo uso en todas nuestras entregas.</p>
              </article>
              <article className="offers-flower__petal offers-flower__petal--br">
                <span className="offers-flower__badge offers-flower__badge--br">Acabados BIO</span>
                <p className="offers-flower__petal-text">Protección natural con aceite de lino prensado en frío y tintes vegetales sin COV.</p>
              </article>
            </div>

            <aside className="offers-flower__side-card offers-flower__side-card--right">
              <div className="offers-flower__side-icon" aria-hidden="true"></div>
              <h3 className="offers-flower__side-title">Free Delivery</h3>
              <p className="offers-flower__side-text">Entrega gratuita para pedidos en todo el mundo.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="reviews-section" aria-labelledby="reviews-title">
        <div className="container">
          <div className="section-header">
            <h2 id="reviews-title" className="section-header__title">Lo Que Dicen Quienes Conviven Con Hermanos Jota</h2>
            <p className="section-header__subtitle">
              Descubre cómo nuestras piezas cobran vida en el día a día y moldean no solo sus ambientes, sino la manera de habitarlos.
            </p>
          </div>
          <div className="reviews-grid">
            {[
              ['M', 'Mike Wazowski', 'Monsters University', '5.0', '"Compramos la mesa de quebracho hace 2 años. El aroma de los aceites naturales y el tacto de la madera no tienen comparación. Inversión para toda la vida."'],
              ['C', 'Clarence', 'Escuela Primaria de Aberdale', '4.5', '"El diseño es precioso y los materiales se sienten de excelente calidad. Una pieza que realmente acompaña el espacio."'],
              ['H', 'Homero Simpson', 'Springfield High School', '5.0', '"Visitar la Casa Taller en San Cristóbal te hace entender el amor que le ponen a cada ensamble. Muy atentos en todo el proceso de entrega."'],
            ].map(([initial, name, source, rating, text]) => (
              <article className="review-card" key={name}>
                <header className="review-card__header">
                  <div className="review-card__user">
                    <div className="review-card__avatar" aria-hidden="true">{initial}</div>
                    <div>
                      <h3 className="review-card__name">{name}</h3>
                      <span className="review-card__source">{source}</span>
                    </div>
                  </div>
                  <div className="review-card__rating" aria-label={`Calificación ${rating} de 5 estrellas`}>
                    <span aria-hidden="true">★ {rating}</span>
                  </div>
                </header>
                <p className="review-card__text">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-section" id="faq" aria-labelledby="faq-title">
        <div className="container container--narrow">
          <div className="section-header">
            <h2 id="faq-title" className="section-header__title">Preguntas Frecuentes</h2>
            <p className="section-header__subtitle">Resolvemos tus dudas sobre nuestro proceso artesanal, garantías y envíos.</p>
          </div>
          <ul className="accordion" role="list">
            {faqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <li className="accordion__item" key={faq.id}>
                  <h3>
                    <button
                      type="button"
                      className="accordion__trigger"
                      aria-expanded={isOpen}
                      aria-controls={`faq-ans-${faq.id}`}
                      id={`faq-btn-${faq.id}`}
                      onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    >
                      {faq.question}
                      <svg className="accordion__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                  </h3>
                  <div
                    id={`faq-ans-${faq.id}`}
                    className="accordion__panel"
                    role="region"
                    aria-labelledby={`faq-btn-${faq.id}`}
                    hidden={!isOpen}
                  >
                    <p>{faq.answer}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="cta-banner" aria-labelledby="cta-banner-title">
        <div className="cta-banner__container">
          <img className="cta-banner__bg" src="/assets/living.png" alt="" loading="lazy" width="1600" height="600" />
          <div className="cta-banner__overlay" aria-hidden="true"></div>
          <div className="cta-banner__content">
            <h2 id="cta-banner-title" className="cta-banner__title">
              Construye tu hogar <span className="cta-banner__title--highlight">pieza a pieza</span>
            </h2>
            <p className="cta-banner__subtitle">
              Más que decorar un ambiente, se trata de crear el lugar donde siempre quieres volver.
            </p>
            <Link to="/catalogo" className="btn btn--primary">EXPLORAR COLECCIÓN</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
