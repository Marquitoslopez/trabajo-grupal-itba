import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);
const TOKEN_KEY = 'hermanos-jota-token';
const USER_KEY = 'hermanos-jota-user';
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '');
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(USER_KEY) || 'null'); }
    catch { return null; }
  });
  const [authLoading, setAuthLoading] = useState(Boolean(token));

  const saveSession = useCallback((data) => {
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  }, []);

  const clearSession = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken('');
    setUser(null);
  }, []);

  useEffect(() => {
    let active = true;
    if (!token) { setAuthLoading(false); return undefined; }
    fetch(`${API_BASE}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(async (response) => {
        const body = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(body.error || 'Sesión inválida');
        if (active) {
          setUser(body.user);
          localStorage.setItem(USER_KEY, JSON.stringify(body.user));
        }
      })
      .catch(() => { if (active) clearSession(); })
      .finally(() => { if (active) setAuthLoading(false); });
    return () => { active = false; };
  }, [token, clearSession]);

  const authRequest = useCallback(async (endpoint, credentials) => {
    const response = await fetch(`${API_BASE}/auth/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.error || 'No se pudo completar la autenticación.');
    saveSession(body);
    return body.user;
  }, [saveSession]);

  const register = useCallback((data) => authRequest('registro', data), [authRequest]);
  const login = useCallback((data) => authRequest('login', data), [authRequest]);
  const logout = useCallback(() => clearSession(), [clearSession]);

  const value = useMemo(() => ({
    user, token, isAuthenticated: Boolean(token && user), authLoading,
    register, login, logout,
  }), [user, token, authLoading, register, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe utilizarse dentro de AuthProvider');
  return context;
}
