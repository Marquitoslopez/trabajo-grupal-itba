const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const PRODUCT_CATEGORIES = ['living', 'habitacion', 'cocina', 'oficina', 'casa'];

// Adapta el modelo de MongoDB (nombre, precio, imagenUrl, _id) al formato
// que ya utiliza la interfaz, sin cambiar las tarjetas ni el diseño.
export function normalizeProduct(product) {
  if (!product) return product;
  return {
    ...product,
    id: String(product.id ?? product._id ?? ''),
    name: product.name ?? product.nombre ?? '',
    description: product.description ?? product.descripcion ?? '',
    price: Number(product.price ?? product.precio ?? 0),
    stock: Number(product.stock ?? 0),
    image: product.image ?? product.imagenUrl ?? '',
    alt: product.alt ?? product.name ?? product.nombre ?? '',
    categories:
      product.categories ??
      product.categorias ??
      FALLBACK_PRODUCTS.find(
        (fallback) => fallback.name.toLowerCase() === String(product.name ?? product.nombre ?? '').toLowerCase()
      )?.categories ??
      'casa',
  };
}

export function productImageSrc(image) {
  if (!image) return '/assets/sofa-patagonia.png';
  if (/^(https?:|data:|blob:)/i.test(image) || image.startsWith('/')) return image;
  return `/assets/${image}`;
}

function toApiPayload(product) {
  return {
    nombre: String(product.name ?? product.nombre ?? '').trim(),
    descripcion: String(product.description ?? product.descripcion ?? '').trim(),
    precio: Number(product.price ?? product.precio),
    stock: Number(product.stock ?? 0),
    imagenUrl: String(product.image ?? product.imagenUrl ?? '').trim(),
    categorias: String(product.categories ?? product.categorias ?? '').trim(),
  };
}

async function requestProductos(path = '', options = {}) {
  const response = await fetch(`${API_BASE}/productos${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
  const body = await response.json().catch(() => null);
  if (!response.ok) throw new Error(body?.error || body?.message || 'No se pudo completar la operación con productos.');
  return body;
}

// Funciones estrictas para administración: no usan el catálogo de respaldo.
export async function getAdminProductos() {
  const products = await requestProductos();
  return Array.isArray(products) ? products.map(normalizeProduct) : [];
}

export async function getAdminProductoById(id) {
  return normalizeProduct(await requestProductos(`/${encodeURIComponent(id)}`));
}

export async function createProducto(product) {
  return normalizeProduct(await requestProductos('', { method: 'POST', body: JSON.stringify(toApiPayload(product)) }));
}

export async function updateProducto(id, product) {
  return normalizeProduct(await requestProductos(`/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(toApiPayload(product)) }));
}

export async function deleteProducto(id) {
  return requestProductos(`/${encodeURIComponent(id)}`, { method: 'DELETE' });
}

/** Catálogo completo (mismo que backend/src/data/productos.js) por si la API no responde. */
const FALLBACK_PRODUCTS = [
  {
    id: 'p1',
    name: 'Sofá Patagonia',
    price: 155000,
    categories: 'living casa',
    image: 'sofa-patagonia.png',
    alt: 'Sofá Patagonia de diseño moderno y acabado artesanal',
  },
  {
    id: 'p2',
    name: 'Sillón Copacabana',
    price: 190000,
    categories: 'living',
    image: 'sillon-copacabana.png',
    alt: 'Sillón Copacabana en madera nativa',
  },
  {
    id: 'p3',
    name: 'Butaca Mendoza',
    price: 110000,
    categories: 'living',
    image: 'butaca-mendoza.png',
    alt: 'Butaca Mendoza tapizada con estructura de madera',
  },
  {
    id: 'p4',
    name: 'Mesa de Centro Araucaria',
    price: 159000,
    categories: 'living casa',
    image: 'mesa-de-centro-araucaria.png',
    alt: 'Mesa de Centro Araucaria de madera maciza',
  },
  {
    id: 'p5',
    name: 'Mesa de Noche Aconcagua',
    price: 146000,
    categories: 'habitacion casa',
    image: 'mesa-de-noche-aconcagua.png',
    alt: 'Mesa de Noche Aconcagua para dormitorio',
  },
  {
    id: 'p6',
    name: 'Biblioteca Recoleta',
    price: 125000,
    categories: 'habitacion casa',
    image: 'biblioteca-recoleta.png',
    alt: 'Biblioteca Recoleta estilo mid-century',
  },
  {
    id: 'p7',
    name: 'Mesa Comedor Pampa',
    price: 174000,
    categories: 'cocina casa',
    image: 'mesa-comedor-pampa.png',
    alt: 'Mesa de comedor Pampa en madera maciza',
  },
  {
    id: 'p8',
    name: 'Sillas Córdoba',
    price: 163000,
    categories: 'cocina',
    image: 'sillas-cordoba.png',
    alt: 'Juego de sillas Córdoba de comedor',
  },
  {
    id: 'p9',
    name: 'Aparador Uspallata',
    price: 137000,
    categories: 'casa',
    image: 'aparador-uspallata.png',
    alt: 'Aparador Uspallata de madera natural',
  },
  {
    id: 'p10',
    name: 'Escritorio Costa',
    price: 170000,
    categories: 'oficina',
    image: 'escritorio-costa.png',
    alt: 'Escritorio Costa minimalista con cajón invisible',
  },
  {
    id: 'p11',
    name: 'Silla de Trabajo Belgrano',
    price: 140000,
    categories: 'oficina',
    image: 'silla-de-trabajo-belgrano.png',
    alt: 'Silla ergonómica de trabajo Belgrano',
  },
];

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
  try {
    const res = await fetch(`${API_BASE}/productos`);
    if (!res.ok) throw new Error('Error al obtener productos');
    const products = await res.json();
    return Array.isArray(products) ? products.map(normalizeProduct) : FALLBACK_PRODUCTS;
  } catch {
    return FALLBACK_PRODUCTS;
  }
}

export async function getProductoById(id) {
  try {
    const res = await fetch(`${API_BASE}/productos/${id}`);
    if (!res.ok) throw new Error('Producto no encontrado');
    return normalizeProduct(await res.json());
  } catch {
    const found = FALLBACK_PRODUCTS.find((p) => p.id === id);
    if (found) return found;
    throw new Error('Producto no encontrado');
  }
}
