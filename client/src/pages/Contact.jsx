import { useState } from 'react';

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  privacy: false,
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'El nombre es obligatorio.';
    if (!form.email.trim()) e.email = 'El correo es obligatorio.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Ingresá un correo válido.';
    if (!form.subject) e.subject = 'Seleccioná un motivo de consulta.';
    if (!form.message.trim()) e.message = 'El mensaje es obligatorio.';
    if (!form.privacy) e.privacy = 'Debés aceptar la política de privacidad.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSent(true);
    setForm(initialForm);
  };

  return (
    <main id="contacto-main">
      <section className="hero-contact" aria-labelledby="contact-hero-title">
        <div className="container">
          <div className="hero-contact__content">
            <span className="hero-contact__badge">Atención personalizada</span>
            <h1 id="contact-hero-title">Ponete en contacto con nuestro equipo hoy</h1>
            <p className="hero-contact__description">
              Estamos aquí para resolver tus dudas sobre el catálogo, coordinar visitas a nuestro taller o
              asesorarte en proyectos de diseño a medida.
            </p>
            <div className="hero-contact__notice" role="note">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>Respondemos todas las consultas en un plazo máximo de 24 horas hábiles.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-channels" aria-label="Canales principales de contacto">
        <div className="container">
          <div className="contact-channels__grid">
            <article className="contact-card">
              <div className="contact-card__icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h2 className="contact-card__title">Showroom &amp; Casa Taller</h2>
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
              <div className="contact-card__icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <h2 className="contact-card__title">Atención Digital</h2>
              <p className="contact-card__info">
                <strong>General:</strong>{' '}
                <a href="mailto:info@hermanosjota.com.ar" className="contact-card__link">
                  info@hermanosjota.com.ar
                </a>
                <br />
                <strong>Ventas:</strong>{' '}
                <a href="mailto:ventas@hermanosjota.com.ar" className="contact-card__link">
                  ventas@hermanosjota.com.ar
                </a>
              </p>
              <p className="contact-card__subtext">
                <strong>WhatsApp:</strong>{' '}
                <a href="https://wa.me/541145678900" className="contact-card__link" target="_blank" rel="noopener noreferrer">
                  +54 11 4567-8900
                </a>
              </p>
            </article>

            <article className="contact-card">
              <div className="contact-card__icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
              <h2 className="contact-card__title">Proyectos A Medida</h2>
              <p className="contact-card__info">¿Ya tenés un proyecto en mente?</p>
              <p className="contact-card__subtext">
                Coordiná una llamada con nuestro equipo de diseño para pensarlo juntos.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="contact-form-section" aria-labelledby="form-section-title">
        <div className="container">
          <div className="contact-form-container">
            <header className="contact-form-container__header">
              <h2 id="form-section-title" className="contact-form-container__title">
                Envianos un mensaje
              </h2>
              <p className="contact-form-container__subtitle">
                Completa el formulario y nos pondremos en contacto a la brevedad.
              </p>
            </header>

            {sent && (
              <div className="contact-form__confirmation" role="status" aria-live="polite">
                <span className="contact-form__confirmation-icon" aria-hidden="true">✓</span>
                <p>¡Gracias! Recibimos tu mensaje y te vamos a responder a la brevedad.</p>
              </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="contact-form__grid">
                <div className="contact-form__field">
                  <label htmlFor="full-name" className="contact-form__label">
                    Nombre y Apellido <span className="contact-form__required" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    id="full-name"
                    name="full-name"
                    className="contact-form__input"
                    required
                    placeholder="Ej: Lucía Gómez"
                    autoComplete="name"
                    value={form.fullName}
                    onChange={(e) => update('fullName', e.target.value)}
                    aria-invalid={!!errors.fullName}
                    aria-describedby="full-name-error"
                  />
                  <p id="full-name-error" className="contact-form__error" role={errors.fullName ? 'alert' : undefined}>
                    {errors.fullName || ''}
                  </p>
                </div>

                <div className="contact-form__field">
                  <label htmlFor="email" className="contact-form__label">
                    Correo Electrónico <span className="contact-form__required" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="contact-form__input"
                    required
                    placeholder="tu@email.com"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    aria-invalid={!!errors.email}
                    aria-describedby="email-error"
                  />
                  <p id="email-error" className="contact-form__error" role={errors.email ? 'alert' : undefined}>
                    {errors.email || ''}
                  </p>
                </div>

                <div className="contact-form__field">
                  <label htmlFor="phone" className="contact-form__label">
                    Teléfono / WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="contact-form__input"
                    placeholder="+54 11 2233-4455"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    aria-describedby="phone-error"
                  />
                  <p id="phone-error" className="contact-form__error" />
                </div>

                <div className="contact-form__field">
                  <label htmlFor="subject" className="contact-form__label">
                    Motivo de Consulta <span className="contact-form__required" aria-hidden="true">*</span>
                  </label>
                  <div className="contact-form__select-wrapper">
                    <select
                      name="subject"
                      id="subject"
                      className="contact-form__select"
                      required
                      value={form.subject}
                      onChange={(e) => update('subject', e.target.value)}
                      aria-invalid={!!errors.subject}
                      aria-describedby="subject-error"
                    >
                      <option value="" disabled>
                        Selecciona una opción
                      </option>
                      <option value="catalogo">Consulta sobre un producto del catálogo</option>
                      <option value="pedido">Estado de mi pedido</option>
                      <option value="medida">Cotización para proyecto a medida</option>
                      <option value="showroom">Visita guiada al Showroom</option>
                      <option value="otro">Otro motivo</option>
                    </select>
                  </div>
                  <p id="subject-error" className="contact-form__error" role={errors.subject ? 'alert' : undefined}>
                    {errors.subject || ''}
                  </p>
                </div>

                <div className="contact-form__field contact-form__field--full">
                  <label htmlFor="message" className="contact-form__label">
                    Mensaje <span className="contact-form__required" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="contact-form__textarea"
                    required
                    placeholder="Escribe aquí los detalles de tu consulta..."
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    aria-invalid={!!errors.message}
                    aria-describedby="message-error"
                  />
                  <p id="message-error" className="contact-form__error" role={errors.message ? 'alert' : undefined}>
                    {errors.message || ''}
                  </p>
                </div>

                <div className="contact-form__field contact-form__field--full">
                  <label htmlFor="privacy" className="contact-form__checkbox-label">
                    <input
                      type="checkbox"
                      id="privacy"
                      name="privacy"
                      className="contact-form__checkbox"
                      required
                      checked={form.privacy}
                      onChange={(e) => update('privacy', e.target.checked)}
                      aria-invalid={!!errors.privacy}
                      aria-describedby="privacy-error"
                    />
                    <span>
                      Acepto la{' '}
                      <a href="#" className="contact-form__checkbox-link" onClick={(e) => e.preventDefault()}>
                        política de privacidad
                      </a>{' '}
                      y el tratamiento de mis datos de contacto.
                    </span>
                  </label>
                  <p id="privacy-error" className="contact-form__error" role={errors.privacy ? 'alert' : undefined}>
                    {errors.privacy || ''}
                  </p>
                </div>
              </div>

              <button type="submit" className="btn btn--gold-pill contact-form__submit">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="contact-faq" aria-labelledby="faq-section-title">
        <div className="container">
          <h2 id="faq-section-title" className="contact-faq__title">Preguntas Frecuentes</h2>
          <div className="contact-faq__grid">
            <article className="faq-item">
              <h3 className="faq-item__question">¿Realizan envíos a todo el país?</h3>
              <p className="faq-item__answer">
                Sí, embalamos cuidadosamente nuestras piezas con protección ecológica y coordinamos envíos a todo el
                territorio argentino con transporte especializado.
              </p>
            </article>
            <article className="faq-item">
              <h3 className="faq-item__question">¿Puedo solicitar muestras de maderas o cueros?</h3>
              <p className="faq-item__answer">
                Ofrecemos el envío de un muestrario físico a tu domicilio o la posibilidad de verlos y tocarlos
                directamente en nuestro Showroom.
              </p>
            </article>
            <article className="faq-item">
              <h3 className="faq-item__question">¿Qué garantía tienen los muebles?</h3>
              <p className="faq-item__answer">
                Todas nuestras piezas ingresan al Programa Herencia Viva, con hasta 10 años de garantía en estructura.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
