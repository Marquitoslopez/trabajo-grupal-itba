import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createProducto, getAdminProductoById, normalizeCategories, updateProducto } from '../services/api';

const EMPTY_FORM = { name: '', description: '', price: '', stock: '0', image: '', categories: '' };

export default function AdminProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if (!id) return;
    let active = true;
    getAdminProductoById(id)
      .then((product) => {
        if (!active) return;
        setForm({
          name: product.name ?? '',
          description: product.description ?? '',
          price: String(product.price ?? ''),
          stock: String(product.stock ?? 0),
          image: product.image ?? '',
          categories: normalizeCategories(product.categories).join(' '),
        });
      })
      .catch((err) => { if (active) setError(err.message || 'No se pudo cargar el producto.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setNotice('');
    if (!form.name.trim()) return setError('Ingresá el nombre del producto.');
    if (!form.categories.trim()) return setError('Seleccioná al menos una categoría.');
    if (form.price === '' || !Number.isFinite(Number(form.price)) || Number(form.price) < 0) {
      return setError('Ingresá un precio válido, igual o mayor a cero.');
    }
    if (form.stock === '' || !Number.isInteger(Number(form.stock)) || Number(form.stock) < 0) {
      return setError('El stock debe ser un número entero igual o mayor a cero.');
    }
    setSaving(true);
    try {
      const payload = { ...form, price: Number(form.price), stock: Number(form.stock) };
      if (isEditing) await updateProducto(id, payload);
      else await createProducto(payload);
      setNotice(isEditing ? 'Producto actualizado correctamente.' : 'Producto creado correctamente.');
      navigate('/admin/productos', { state: { notice: isEditing ? 'Producto actualizado correctamente.' : 'Producto creado correctamente.' } });
    } catch (err) {
      setError(err.message || 'No se pudo guardar el producto. Verificá que el backend esté conectado a MongoDB.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <main className="container admin-page"><p>Cargando producto…</p></main>;

  return (
    <main id="main-content" className="container admin-page">
      <div className="admin-page__heading">
        <span className="admin-page__eyebrow">Administración</span>
        <h1>{isEditing ? 'Editar producto' : 'Crear producto'}</h1>
        <p>Los cambios se guardan mediante la API en la base de datos configurada.</p>
      </div>
      {error && <p className="admin-alert admin-alert--error" role="alert">{error}</p>}
      {notice && <p className="admin-alert admin-alert--success" role="status">{notice}</p>}
      <form className="admin-form" onSubmit={handleSubmit}>
        <label className="admin-form__field">
          <span>Nombre del producto *</span>
          <input name="name" value={form.name} onChange={handleChange} required maxLength={120} />
        </label>
        <label className="admin-form__field">
          <span>Descripción</span>
          <textarea name="description" value={form.description} onChange={handleChange} rows={4} />
        </label>
        <fieldset className="admin-form__categories">
          <legend>Categoría del producto *</legend>
          <p>Podés elegir una o varias categorías para que el producto aparezca en los filtros correctos.</p>
          <div className="admin-form__category-options">
            {[
              ['living', 'Living'],
              ['habitacion', 'Habitación'],
              ['cocina', 'Cocina / Comedor'],
              ['oficina', 'Oficina'],
              ['casa', 'Casa / Decoración'],
            ].map(([value, label]) => {
              const checked = normalizeCategories(form.categories).includes(value);
              return (
                <label key={value} className="admin-form__category-option">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(event) => {
                      const selected = new Set(normalizeCategories(form.categories));
                      if (event.target.checked) selected.add(value);
                      else selected.delete(value);
                      setForm((current) => ({ ...current, categories: [...selected].join(' ') }));
                    }}
                  />
                  <span>{label}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
        <div className="admin-form__row">
          <label className="admin-form__field">
            <span>Precio (ARS) *</span>
            <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} required />
          </label>
          <label className="admin-form__field">
            <span>Stock *</span>
            <input name="stock" type="number" min="0" step="1" value={form.stock} onChange={handleChange} required />
          </label>
        </div>
        <label className="admin-form__field">
          <span>Imagen (URL o nombre de archivo en /assets)</span>
          <input name="image" type="text" value={form.image} onChange={handleChange} placeholder="https://… o sofa-patagonia.png" />
          <small>Podés pegar una URL accesible o el nombre de una imagen incluida en client/public/assets.</small>
        </label>
        {form.image && (
          <div className="admin-form__preview">
            <span>Vista previa</span>
            <img src={/^(https?:|data:|blob:|\/)/i.test(form.image) ? form.image : `/assets/${form.image}`} alt="Vista previa del producto" onError={(event) => { event.currentTarget.style.display = 'none'; }} />
          </div>
        )}
        <div className="admin-form__actions">
          <button className="btn btn--primary" type="submit" disabled={saving}>{saving ? 'Guardando…' : isEditing ? 'Guardar cambios' : 'Crear producto'}</button>
          <Link className="btn btn--outline" to="/admin/productos">Cancelar</Link>
        </div>
      </form>
    </main>
  );
}
