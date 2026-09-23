import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Nombre requerido';
    if (!form.email.trim()) e.email = 'Email requerido';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email inválido';
    if (!form.message.trim()) e.message = 'Mensaje requerido';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <main id="main-content">
      <section className="section">
        <div className="container container--narrow">
          <div className="section-header">
            <h1 className="section-header__title">Contacto</h1>
            <p className="section-header__subtitle">
              Escribinos y te respondemos a la brevedad.
            </p>
          </div>

          {sent && (
            <p className="form-success" role="status">
              ¡Mensaje enviado! Gracias por contactarnos.
            </p>
          )}

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                aria-invalid={!!errors.name}
              />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                aria-invalid={!!errors.email}
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                rows="5"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                aria-invalid={!!errors.message}
              />
              {errors.message && <span className="form-error">{errors.message}</span>}
            </div>
            <button type="submit" className="btn btn--primary">
              Enviar
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
