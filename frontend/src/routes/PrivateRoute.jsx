import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ requiredRole }) {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) return <p>Cargando...</p>;

  if (!isAuthenticated) return <Navigate to="/login" />;

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}