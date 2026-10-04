const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const PRODUCT_CATEGORIES = ['living', 'habitacion', 'cocina', 'oficina', 'casa'];

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
    return res.json();
  } catch {
    return FALLBACK_PRODUCTS;
  }
}

export async function getProductoById(id) {
  try {
    const res = await fetch(`${API_BASE}/productos/${id}`);
    if (!res.ok) throw new Error('Producto no encontrado');
    return res.json();
  } catch {
    const found = FALLBACK_PRODUCTS.find((p) => p.id === id);
    if (found) return found;
    throw new Error('Producto no encontrado');
  }
}
