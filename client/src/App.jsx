
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
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import MyOrders from './pages/MyOrders';

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
    <AuthProvider>
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
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/perfil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/mis-pedidos" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
          <Route path="/admin/productos" element={<ProtectedRoute><AdminProducts /></ProtectedRoute>} />
          <Route path="/admin/crear-producto" element={<ProtectedRoute><AdminProductForm /></ProtectedRoute>} />
          <Route path="/admin/editar-producto/:id" element={<ProtectedRoute><AdminProductForm /></ProtectedRoute>} />
        </Routes>

        <Footer />
        <CartPanel />
        <FavoritesPanel />
        <Toast />
      </>
    </CartProvider>
    </AuthProvider>
  );
}
