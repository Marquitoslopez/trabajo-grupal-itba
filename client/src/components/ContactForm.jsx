import { useEffect, useRef, useState } from 'react';

import { useCart } from '../context/CartContext';

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  privacy: false,
};

export default function ContactForm() {
  const { showToast } = useCart();

  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const privacyLinkRef = useRef(null);
  const closeButtonRef = useRef(null);
  const sentTimerRef = useRef(null);
  const confirmationRef = useRef(null);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));

    if (sent) {
      setSent(false);
    }
  };

  const validateName = () => {
    const value = form.name.trim();

    if (value === '') {
      return 'El nombre y apellido es obligatorio.';
    }

    if (value.length < 3) {
      return 'El nombre debe tener al menos 3 caracteres.';
    }

    if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñÜü\s]+$/.test(value)) {
      return 'El nombre solo puede contener letras y espacios.';
    }

    return '';
  };

  const validateEmail = () => {
    const value = form.email.trim();

    if (value === '') {
      return 'El correo electrónico es obligatorio.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      return 'Ingresá un correo electrónico válido.';
    }

    return '';
  };

  const validatePhone = () => {
    const value = form.phone.trim();

    if (value === '') {
      return '';
    }

    const phoneRegex = /^[0-9+\-()\s]{7,20}$/;

    if (!phoneRegex.test(value)) {
      return 'Ingresá un número de teléfono válido.';
    }

    return '';
  };

  const validateSubject = () => {
    if (form.subject === '') {
      return 'Seleccioná un motivo de consulta.';
    }

    return '';
  };

  const validateMessage = () => {
    const value = form.message.trim();

    if (value === '') {
      return 'El mensaje es obligatorio.';
    }

    if (value.length < 10) {
      return 'El mensaje debe tener al menos 10 caracteres.';
    }

    return '';
  };

  const validatePrivacy = () => {
    if (!form.privacy) {
      return 'Debés aceptar la política de privacidad.';
    }

    return '';
  };

  const validate = () => {
    const newErrors = {
      name: validateName(),
      email: validateEmail(),
      phone: validatePhone(),
      subject: validateSubject(),
      message: validateMessage(),
      privacy: validatePrivacy(),
    };

    Object.keys(newErrors).forEach((key) => {
      if (!newErrors[key]) {
        delete newErrors[key];
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isValid = validate();

    if (!isValid) {
      return;
    }

    setSent(true);
    showToast('Mensaje enviado correctamente');

    setForm(INITIAL_FORM);
    setErrors({});

    clearTimeout(sentTimerRef.current);

    sentTimerRef.current = setTimeout(() => {
      setSent(false);
    }, 5000);

    requestAnimationFrame(() => {
      confirmationRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    });
  };

  useEffect(() => {
    return () => {
      clearTimeout(sentTimerRef.current);
    };
  }, []);

  const openPrivacyModal = (event) => {
    event.preventDefault();
    setPrivacyOpen(true);
  };

  const closePrivacyModal = () => {
    setPrivacyOpen(false);

    setTimeout(() => {
      privacyLinkRef.current?.focus();
    }, 0);
  };

  useEffect(() => {
    if (privacyOpen) {
      closeButtonRef.current?.focus();
    }
  }, [privacyOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && privacyOpen) {
        closePrivacyModal();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [privacyOpen]);

  return (
    <>
      <div
        ref={confirmationRef}
        id="confirmacion-envio"
        className="contact-form__confirmation"
        role="status"
        aria-live="polite"
        aria-hidden={!sent}
        style={{ display: sent ? 'flex' : 'none' }}
      >
        <span
          className="contact-form__confirmation-icon"
          aria-hidden="true"
        >
          ✓
        </span>

        <p>
          ¡Gracias! Recibimos tu mensaje y te vamos a responder a la
          brevedad.
        </p>
      </div>

      <form
        className="contact-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="contact-form__grid">
          {/* NOMBRE */}
          <div className="contact-form__field">
            <label
              htmlFor="full-name"
              className="contact-form__label"
            >
              Nombre y Apellido{' '}
              <span
                className="contact-form__required"
                aria-hidden="true"
              >
                *
              </span>
            </label>

            <input
              type="text"
              id="full-name"
              name="name"
              className={`contact-form__input ${
                errors.name ? 'input-error' : ''
              }`}
              value={form.name}
              onChange={handleChange}
              onBlur={() => {
                const error = validateName();

                setErrors((prev) => ({
                  ...prev,
                  name: error,
                }));
              }}
              placeholder="Ej: Lucía Gómez"
              autoComplete="name"
              aria-invalid={!!errors.name}
              aria-describedby="full-name-error"
            />

            <p
              id="full-name-error"
              className="contact-form__error"
            >
              {errors.name || ''}
            </p>
          </div>

          {/* EMAIL */}
          <div className="contact-form__field">
            <label
              htmlFor="email"
              className="contact-form__label"
            >
              Correo Electrónico{' '}
              <span
                className="contact-form__required"
                aria-hidden="true"
              >
                *
              </span>
            </label>

            <input
              type="email"
              id="email"
              name="email"
              className={`contact-form__input ${
                errors.email ? 'input-error' : ''
              }`}
              value={form.email}
              onChange={handleChange}
              onBlur={() => {
                const error = validateEmail();

                setErrors((prev) => ({
                  ...prev,
                  email: error,
                }));
              }}
              placeholder="tu@email.com"
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
            />

            <p
              id="email-error"
              className="contact-form__error"
            >
              {errors.email || ''}
            </p>
          </div>

          {/* TELÉFONO */}
          <div className="contact-form__field">
            <label
              htmlFor="phone"
              className="contact-form__label"
            >
              Teléfono / WhatsApp
            </label>

            <input
              type="tel"
              id="phone"
              name="phone"
              className={`contact-form__input ${
                errors.phone ? 'input-error' : ''
              }`}
              value={form.phone}
              onChange={handleChange}
              onBlur={() => {
                const error = validatePhone();

                setErrors((prev) => ({
                  ...prev,
                  phone: error,
                }));
              }}
              placeholder="+54 11 2233-4455"
              autoComplete="tel"
              aria-invalid={!!errors.phone}
              aria-describedby="phone-error"
            />

            <p
              id="phone-error"
              className="contact-form__error"
            >
              {errors.phone || ''}
            </p>
          </div>

          {/* MOTIVO */}
          <div className="contact-form__field">
            <label
              htmlFor="subject"
              className="contact-form__label"
            >
              Motivo de Consulta{' '}
              <span
                className="contact-form__required"
                aria-hidden="true"
              >
                *
              </span>
            </label>

            <div className="contact-form__select-wrapper">
              <select
                name="subject"
                id="subject"
                className={`contact-form__select ${
                  errors.subject ? 'input-error' : ''
                }`}
                value={form.subject}
                onChange={handleChange}
                aria-invalid={!!errors.subject}
                aria-describedby="subject-error"
              >
                <option value="" disabled>
                  Seleccioná una opción
                </option>

                <option value="catalogo">
                  Consulta sobre un producto del catálogo
                </option>

                <option value="pedido">
                  Estado de mi pedido
                </option>

                <option value="medida">
                  Cotización para proyecto a medida
                </option>

                <option value="showroom">
                  Visita guiada al Showroom
                </option>

                <option value="otro">
                  Otro motivo
                </option>
              </select>
            </div>

            <p
              id="subject-error"
              className="contact-form__error"
            >
              {errors.subject || ''}
            </p>
          </div>

          {/* MENSAJE */}
          <div className="contact-form__field contact-form__field--full">
            <label
              htmlFor="message"
              className="contact-form__label"
            >
              Mensaje{' '}
              <span
                className="contact-form__required"
                aria-hidden="true"
              >
                *
              </span>
            </label>

            <textarea
              id="message"
              name="message"
              rows="5"
              className={`contact-form__textarea ${
                errors.message ? 'input-error' : ''
              }`}
              value={form.message}
              onChange={handleChange}
              onBlur={() => {
                const error = validateMessage();

                setErrors((prev) => ({
                  ...prev,
                  message: error,
                }));
              }}
              placeholder="Escribí aquí los detalles de tu consulta..."
              aria-invalid={!!errors.message}
              aria-describedby="message-error"
            />

            <p
              id="message-error"
              className="contact-form__error"
            >
              {errors.message || ''}
            </p>
          </div>

          {/* PRIVACIDAD */}
          <div className="contact-form__field contact-form__field--full">
            <label
              htmlFor="privacy"
              className="contact-form__checkbox-label"
            >
              <input
                type="checkbox"
                id="privacy"
                name="privacy"
                className="contact-form__checkbox"
                checked={form.privacy}
                onChange={handleChange}
                aria-invalid={!!errors.privacy}
                aria-describedby="privacy-error"
              />

              <span>
                Acepto la{' '}
                <a
                  ref={privacyLinkRef}
                  href="#privacy-modal"
                  className="contact-form__checkbox-link"
                  onClick={openPrivacyModal}
                >
                  política de privacidad
                </a>{' '}
                y el tratamiento de mis datos de contacto.
              </span>
            </label>

            <p
              id="privacy-error"
              className="contact-form__error"
            >
              {errors.privacy || ''}
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn--gold-pill contact-form__submit"
        >
          Enviar Mensaje
        </button>
      </form>

      {/* MODAL - POLÍTICA DE PRIVACIDAD */}
      {privacyOpen && (
        <div
          className="privacy-modal privacy-modal--open"
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-modal-title"
          aria-hidden="false"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closePrivacyModal();
            }
          }}
        >
          <div className="privacy-modal__content">
            <button
              ref={closeButtonRef}
              type="button"
              className="privacy-modal__close"
              aria-label="Cerrar política de privacidad"
              onClick={closePrivacyModal}
            >
              &times;
            </button>

            <h2 id="privacy-modal-title">
              Política de Privacidad
            </h2>

            <div className="privacy-modal__body">
              <p>
                En Hermanos Jota nos comprometemos a proteger la
                privacidad de nuestros usuarios y a tratar sus datos
                personales de manera responsable.
              </p>

              <h3>¿Qué datos recopilamos?</h3>

              <p>
                Podemos recopilar los datos que ingreses voluntariamente
                mediante nuestro formulario de contacto, como nombre,
                correo electrónico, teléfono y el contenido de tu
                consulta.
              </p>

              <h3>¿Para qué utilizamos tus datos?</h3>

              <p>
                Utilizamos esta información únicamente para responder
                consultas, brindar atención personalizada y comunicarnos
                con vos en relación con nuestros productos y servicios.
              </p>

              <h3>Protección de la información</h3>

              <p>
                Nos comprometemos a mantener tus datos protegidos y a no
                vender, alquilar ni compartir tu información personal con
                terceros con fines comerciales.
              </p>

              <h3>Aceptación</h3>

              <p>
                Al aceptar la política de privacidad, confirmás que leíste
                y comprendiste el tratamiento de tus datos personales
                descrito anteriormente.
              </p>
            </div>

            <button
              type="button"
              className="privacy-modal__button"
              onClick={closePrivacyModal}
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
}