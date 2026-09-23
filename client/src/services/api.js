const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

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
