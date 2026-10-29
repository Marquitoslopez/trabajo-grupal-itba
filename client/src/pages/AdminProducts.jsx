import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { deleteProducto, getAdminProductos, productImageSrc } from '../services/api';
import { formatPrice } from '../utils/format';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(location.state?.notice || '');

  const loadProducts = async () => {
    setError('');
    try { setProducts(await getAdminProductos()); }
    catch (err) { setError(`${err.message || 'No se pudieron cargar los productos.'} Comprobá que el backend esté activo y conectado a MongoDB.`); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadProducts(); }, []);

  const handleDelete = async (product) => {
    if (!window.confirm(`¿Seguro que querés eliminar “${product.name}”? Esta acción no se puede deshacer.`)) return;
    setBusyId(product.id);
    setError('');
    setNotice('');
    try {
      await deleteProducto(product.id);
      setProducts((current) => current.filter((item) => item.id !== product.id));
      setNotice('Producto eliminado correctamente.');
    } catch (err) { setError(err.message || 'No se pudo eliminar el producto.'); }
    finally { setBusyId(''); }
  };

  return (
    <main id="main-content" className="container admin-page">
      <div className="admin-page__heading">
        <span className="admin-page__eyebrow">Administración</span>
        <h1>Productos existentes</h1>
        <p>Administrá los productos guardados en MongoDB mediante la API.</p>
      </div>
      <div className="admin-page__toolbar">
        <Link className="btn btn--primary" to="/admin/crear-producto">Crear producto</Link>
        <button className="btn btn--outline" type="button" onClick={() => { setLoading(true); loadProducts(); }}>Actualizar lista</button>
      </div>
      {notice && <p className="admin-alert admin-alert--success" role="status">{notice}</p>}
      {error && <p className="admin-alert admin-alert--error" role="alert">{error}</p>}
      {loading ? <p className="admin-page__empty">Cargando productos…</p> : products.length === 0 && !error ? (
        <div className="admin-page__empty"><p>Todavía no hay productos en la base de datos.</p><Link to="/admin/crear-producto">Crear el primer producto</Link></div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Producto</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr></thead>
            <tbody>{products.map((product) => (
              <tr key={product.id}>
                <td><div className="admin-product-cell">{product.image && <img src={productImageSrc(product.image)} alt="" onError={(event) => { event.currentTarget.style.visibility = 'hidden'; }} />}<span>{product.name}</span></div></td>
                <td>{formatPrice(product.price)}</td>
                <td>{product.stock ?? 0}</td>
                <td><div className="admin-table__actions"><button className="btn btn--small" type="button" onClick={() => navigate(`/admin/editar-producto/${product.id}`)}>Editar</button><button className="btn btn--small admin-delete-button" type="button" disabled={busyId === product.id} onClick={() => handleDelete(product)}>{busyId === product.id ? 'Eliminando…' : 'Eliminar'}</button></div></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
      <p className="admin-page__back"><Link to="/productos">Volver al catálogo</Link></p>
    </main>
  );
}
