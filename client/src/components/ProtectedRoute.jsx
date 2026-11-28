
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, authLoading, user } = useAuth();
  const location = useLocation();

  if (authLoading) {
    return (
      <main className="container auth-page">
        <p>Verificando sesión...</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (requiredRole && user?.rol !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}
