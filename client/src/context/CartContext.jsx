import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

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
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

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

  useEffect(() => {
    return () => clearTimeout(toastTimer.current);
  }, []);

  const showToast = useCallback((message, type = 'success') => {
    clearTimeout(toastTimer.current);
    setToast({ message, type });
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  }, []);

  const addToCart = useCallback((productId) => {
    const id = String(productId);
    setCart((prev) => [...prev.map(String), id]);
    setIsFavoritesOpen(false);
    setIsCartOpen(true);
    showToast('Producto agregado al carrito');
  }, [showToast]);

  const increaseQuantity = useCallback((productId) => {
    const id = String(productId);
    setCart((prev) => [...prev.map(String), id]);
  }, []);

  const removeFromCart = useCallback((productId) => {
    const id = String(productId);
    setCart((prev) => {
      const normalized = prev.map(String);
      const idx = normalized.indexOf(id);
      if (idx === -1) return prev;
      const next = [...normalized];
      next.splice(idx, 1);
      return next;
    });
  }, []);

  const removeAllOf = useCallback((productId) => {
    const id = String(productId);
    setCart((prev) => prev.map(String).filter((storedId) => storedId !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleFavorite = useCallback((productId) => {
    const id = String(productId);
    const exists = favorites.map(String).includes(id);
    setFavorites((prev) => {
      const normalized = prev.map(String);
      return exists
        ? normalized.filter((storedId) => storedId !== id)
        : [...normalized, id];
    });
    showToast(exists ? 'Producto quitado de favoritos' : 'Producto agregado a favoritos');
  }, [favorites, showToast]);

  const isFavorite = useCallback(
    (productId) => favorites.map(String).includes(String(productId)),
    [favorites]
  );

  const getGroupedCart = useCallback((productsMap) => {
    const quantities = new Map();
    cart.forEach((id) => {
      const normalizedId = String(id);
      quantities.set(normalizedId, (quantities.get(normalizedId) || 0) + 1);
    });
    return [...quantities].map(([productId, quantity]) => ({
      productId,
      quantity,
      product: productsMap?.[String(productId)] || null,
    }));
  }, [cart]);

  const openCart = useCallback(() => {
    setIsFavoritesOpen(false);
    setIsCartOpen(true);
  }, []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const openFavorites = useCallback(() => {
    setIsCartOpen(false);
    setIsFavoritesOpen(true);
  }, []);
  const closeFavorites = useCallback(() => setIsFavoritesOpen(false), []);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount: cart.length,
        favorites,
        favoriteCount: favorites.length,
        addToCart,
        increaseQuantity,
        removeFromCart,
        removeAllOf,
        clearCart,
        toggleFavorite,
        isFavorite,
        getGroupedCart,
        isCartOpen,
        openCart,
        closeCart,
        isFavoritesOpen,
        openFavorites,
        closeFavorites,
        toast,
        setToast,
        showToast,
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