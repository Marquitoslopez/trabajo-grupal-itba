import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CART_STORAGE_KEY = 'hermanos-jota-cart';
const FAVORITES_STORAGE_KEY = 'hermanos-jota-favorites';
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
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
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

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      /* ignore */
    }
  }, [favorites]);

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

  const toggleFavorite = useCallback((productId) => {
    setFavorites((prev) => {
      const exists = prev.includes(productId);
      return exists ? prev.filter((id) => id !== productId) : [...prev, productId];
    });
  }, []);

  const isFavorite = useCallback((productId) => favorites.includes(productId), [favorites]);

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
        favorites,
        favoriteCount: favorites.length,
        addToCart,
        removeFromCart,
        removeAllOf,
        clearCart,
        toggleFavorite,
        isFavorite,
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
