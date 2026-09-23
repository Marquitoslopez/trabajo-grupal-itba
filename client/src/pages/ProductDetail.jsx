import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductoById, getProductos } from '../services/api';
import { formatPrice } from '../utils/format';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    getProductoById(id)
      .then(setProduct)
      .catch(async () => {
        // Fallback: buscar en lista completa si no hay endpoint por id
        try {
          const list = await getProductos();
          const found = list.find((p) => p.id === id);
          if (found) setProduct(found);
          else setError('Producto no encontrado');
        } catch {
          setError('Producto no encontrado');
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <main className="container"><p>Cargando…</p></main>;
  if (error || !product)
    return (
      <main className="container">
        <p>{error || 'Producto no encontrado'}</p>
        <Link to="/catalogo">Volver al catálogo</Link>
      </main>
    );

  return (
    <main id="main-content" className="product-detail-page">
      <section className="section">
        <div className="container product-detail">
          <div className="product-detail__gallery">
            <img
              src={`/assets/${product.image}`}
              alt={product.alt || product.name}
              className="product-detail__image"
            />
          </div>
          <div className="product-detail__info">
            <h1 className="product-detail__title">{product.name}</h1>
            <p className="product-detail__price">{formatPrice(product.price)}</p>
            <p className="product-detail__categories">
              Categorías: {product.categories}
            </p>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => addToCart(product.id)}
            >
              Agregar al carrito
            </button>
            <Link to="/catalogo" className="btn btn--secondary">
              Volver al catálogo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
