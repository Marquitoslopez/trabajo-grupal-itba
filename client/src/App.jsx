
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartPanel from './components/CartPanel';
import FavoritesPanel from './components/FavoritesPanel';
import Toast from './components/Toast';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import AdminProductForm from './pages/AdminProductForm';
import AdminProducts from './pages/AdminProducts';
import { CART_STORAGE_KEY, CartProvider } from './context/CartContext';

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  return (
    <CartProvider cart={cart} setCart={setCart}>
      <>
        <ScrollToTop />
        <Navbar cartCount={cart.length} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/productos" element={<Catalog />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/admin/productos" element={<AdminProducts />} />
          <Route path="/admin/crear-producto" element={<AdminProductForm />} />
          <Route path="/admin/editar-producto/:id" element={<AdminProductForm />} />
        </Routes>

        <Footer />
        <CartPanel />
        <FavoritesPanel />
        <Toast />
      </>
    </CartProvider>
  );
}
