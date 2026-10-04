import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <main id="main-content">
      {/* HERO */}
      <section
        className="hero-contact"
        aria-labelledby="contact-hero-title"
      >
        <div className="container">
          <div className="hero-contact__content">
            <span className="hero-contact__badge">
              Atención personalizada
            </span>

            <h1 id="contact-hero-title">
              Ponete en contacto con nuestro equipo hoy
            </h1>

            <p className="hero-contact__description">
              Estamos aquí para resolver tus dudas sobre el catálogo,
              coordinar visitas a nuestro taller o asesorarte en proyectos
              de diseño a medida.
            </p>

            <div
              className="hero-contact__notice"
              role="note"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                />

                <polyline points="12 6 12 12 16 14" />
              </svg>

              <span>
                Respondemos todas las consultas en un plazo máximo de 24
                horas hábiles.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CANALES DE CONTACTO */}
      <section
        className="contact-channels"
        aria-label="Canales principales de contacto"
      >
        <div className="container">
          <div className="contact-channels__grid">
            <article className="contact-card">
              <div
                className="contact-card__icon"
                aria-hidden="true"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
                  <circle
                    cx="12"
                    cy="10"
                    r="3"
                  />
                </svg>
              </div>

              <h2 className="contact-card__title">
                Showroom &amp; Casa Taller
              </h2>

              <address className="contact-card__info">
                Av. San Juan 2847, C1232AAB
                <br />
                Barrio de San Cristóbal, Buenos Aires
              </address>

              <p className="contact-card__subtext">
                <strong>Horarios:</strong>
                <br />
                Lun a Vie: 10:00 - 19:00 hs
                <br />
                Sábados: 10:00 - 14:00 hs
              </p>
            </article>

            <article className="contact-card">
              <div
                className="contact-card__icon"
                aria-hidden="true"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect
                    width="20"
                    height="16"
                    x="2"
                    y="4"
                    rx="2"
                  />

                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>

              <h2 className="contact-card__title">
                Atención Digital
              </h2>

              <p className="contact-card__info">
                <strong>General:</strong>{' '}
                <a
                  href="mailto:info@hermanosjota.com.ar"
                  className="contact-card__link"
                >
                  info@hermanosjota.com.ar
                </a>

                <br />

                <strong>Ventas:</strong>{' '}
                <a
                  href="mailto:ventas@hermanosjota.com.ar"
                  className="contact-card__link"
                >
                  ventas@hermanosjota.com.ar
                </a>
              </p>

              <p className="contact-card__subtext">
                <strong>WhatsApp:</strong>{' '}
                <a
                  href="https://wa.me/541145678900"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-card__link"
                >
                  +54 11 4567-8900
                </a>
              </p>
            </article>

            <article className="contact-card">
              <div
                className="contact-card__icon"
                aria-hidden="true"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>

              <h2 className="contact-card__title">
                Proyectos A Medida
              </h2>

              <p className="contact-card__info">
                ¿Ya tenés un proyecto en mente?
              </p>

              <p className="contact-card__subtext">
                Coordiná una llamada con nuestro equipo de diseño para
                pensarlo juntos.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* FORMULARIO */}
      <section
        className="contact-form-section"
        aria-labelledby="form-section-title"
      >
        <div className="container">
          <div className="contact-form-container">
            <header className="contact-form-container__header">
              <h2
                id="form-section-title"
                className="contact-form-container__title"
              >
                Envianos un mensaje
              </h2>

              <p className="contact-form-container__subtitle">
                Completa el formulario y nos pondremos en contacto a la
                brevedad.
              </p>
            </header>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="contact-faq"
        aria-labelledby="faq-section-title"
      >
        <div className="container">
          <h2
            id="faq-section-title"
            className="contact-faq__title"
          >
            Preguntas Frecuentes
          </h2>

          <div className="contact-faq__grid">
            <article className="faq-item">
              <h3 className="faq-item__question">
                ¿Realizan envíos a todo el país?
              </h3>

              <p className="faq-item__answer">
                Sí, embalamos cuidadosamente nuestras piezas con
                protección ecológica y coordinamos envíos a todo el
                territorio argentino con transporte especializado.
              </p>
            </article>

            <article className="faq-item">
              <h3 className="faq-item__question">
                ¿Puedo solicitar muestras de maderas o cueros?
              </h3>

              <p className="faq-item__answer">
                Ofrecemos el envío de un muestrario físico a tu domicilio
                o la posibilidad de verlos y tocarlos directamente en
                nuestro Showroom.
              </p>
            </article>

            <article className="faq-item">
              <h3 className="faq-item__question">
                ¿Qué garantía tienen los muebles?
              </h3>

              <p className="faq-item__answer">
                Todas nuestras piezas ingresan al Programa Herencia Viva,
                con hasta 10 años de garantía en estructura.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}