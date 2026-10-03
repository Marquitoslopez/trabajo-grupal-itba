const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const PRODUCT_CATEGORIES = ['living', 'habitacion', 'cocina', 'oficina', 'casa'];

export function normalizeCategories(categories = '') {
  return String(categories)
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

export function filterProducts(products, { category = '', search = '' } = {}) {
  const normalizedCategory = category.trim().toLowerCase();
  const normalizedSearch = search.trim().toLowerCase();

  return products.filter((product) => {
    const categories = normalizeCategories(product?.categories);
    const matchesCategory =
      !normalizedCategory || categories.includes(normalizedCategory) || normalizedCategory === 'all';

    const haystack = `${product?.name ?? ''} ${product?.categories ?? ''}`.toLowerCase();
    const matchesSearch = !normalizedSearch || haystack.includes(normalizedSearch);

    return matchesCategory && matchesSearch;
  });
}

export async function getProductos() {
  const res = await fetch(`${API_BASE}/productos`);
  if (!res.ok) throw new Error('Error al obtener productos');
  return res.json();
}

export async function getProductoById(id) {
  const res = await fetch(`${API_BASE}/productos/${id}`);
  if (!res.ok) throw new Error('Producto no encontrado');
  return res.json();
}
