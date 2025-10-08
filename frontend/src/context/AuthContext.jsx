import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { checkSession, loginUser, logoutUser, register } from '../api/authApi.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    
    const verifySession = async () => {
      try {
        const data = await checkSession();
        if (!mounted) return;
        
        if (data?.user) {
          setUser(data.user);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        if (!mounted) return;
        setIsAuthenticated(false);b 
        
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };
    
    verifySession();
    return () => { mounted = false; };
  }, []);

  // ✅ useCallback para evitar recrear funciones en cada render
  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const data = await loginUser(email, password);
      setUser(data.user);
      setIsAuthenticated(true);
      return data;
    } catch (err) {
      setIsAuthenticated(false);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const registerUserCallback = useCallback(async (name, email, password) => {
    setLoading(true);
    try {
      const data = await register(name, email, password);
      setUser(data.user);
      setIsAuthenticated(true);
      return data;
    } catch (err) {
      setIsAuthenticated(false);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await logoutUser();
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Solo user, isAuthenticated, loading en dependencias
  const value = useMemo(() => ({
    user,
    isAuthenticated,
    loading,
    login,
    registerUser: registerUserCallback,
    logout
  }), [user, isAuthenticated, loading, login, registerUserCallback, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};