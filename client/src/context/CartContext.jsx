import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CART_STORAGE_KEY = 'hermanos-jota-cart';
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      /* ignore */
    }
  }, [cart]);

  const addToCart = useCallback((productId) => {
    setCart((prev) => [...prev, productId]);
    setToast({ message: 'Producto agregado al carrito', type: 'success' });
    setTimeout(() => setToast(null), 2500);
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prev) => {
      const idx = prev.indexOf(productId);
      if (idx === -1) return prev;
      const next = [...prev];
      next.splice(idx, 1);
      return next;
    });
  }, []);

  const removeAllOf = useCallback((productId) => {
    setCart((prev) => prev.filter((id) => id !== productId));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const getGroupedCart = useCallback((productsMap) => {
    const quantities = new Map();
    cart.forEach((id) => {
      quantities.set(id, (quantities.get(id) || 0) + 1);
    });
    return [...quantities].map(([productId, quantity]) => ({
      productId,
      quantity,
      product: productsMap?.[productId] || null,
    }));
  }, [cart]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount: cart.length,
        addToCart,
        removeFromCart,
        removeAllOf,
        clearCart,
        getGroupedCart,
        isCartOpen,
        openCart,
        closeCart,
        toast,
        setToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
