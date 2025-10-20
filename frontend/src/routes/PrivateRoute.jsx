// src/routes/PrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PrivateRoute({ requiredRole }) {
  const [auth, setAuth] = useState({
    loading: true,
    isAuthenticated: false,
    role: null,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/auth/verify", {
          withCredentials: true, 
        });
        setAuth({
          loading: false,
          isAuthenticated: true,
          role: res.data.role, // el backend debe devolver el rol del usuario
        });
      } catch (err) {
        setAuth({ loading: false, isAuthenticated: false, role: null });
      }
    };

    checkAuth();
  }, []);

  if (auth.loading) return <p>Cargando...</p>;

  // Si no está autenticado, lo manda al login
  if (!auth.isAuthenticated) return <Navigate to="/login" />;

  // Si se requiere un rol (admin, user, etc.)
  if (requiredRole && auth.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  // Si pasa todas las validaciones, renderiza la ruta interna
  return <Outlet />;
}