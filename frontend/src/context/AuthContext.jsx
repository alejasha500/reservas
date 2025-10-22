import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { 
  verifyTokenApi, 
  loginApi, 
  logoutApi, 
  registerApi 
} from '../api/userApi.js';

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    
    const verifySession = async () => {
      try {
        const data = await verifyTokenApi() 
              if (!mounted) return 
        
              if (data?.success) {
                  setUser(data.user)
                 setIsAuthenticated(true)
                } else {
                    setIsAuthenticated(false)
                      }
      } catch (error) {
            if (!mounted) return
             setIsAuthenticated(false)
      } finally {
             if (!mounted) return
             setLoading(false)
      }
    }
    
    verifySession()
    return () => { mounted = false; }
  }, [])

  const login = useCallback(async (email, password) => {
    setLoading(true)
    try {
      const data = await loginApi(email, password)
      setUser(data.user)
      setIsAuthenticated(true)
      return data;
    } catch (err) {
      setIsAuthenticated(false)
      throw err;
    } finally {
      setLoading(false)
    }
  }, [])

  const registerUser = useCallback(async (name, email, password) => {
    setLoading(true)
    try {
      const data = await registerApi(name, email, password)
      setUser(data.user)
      setIsAuthenticated(true)
      return data;
    } catch (err) {
      setIsAuthenticated(false)
      throw err;
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    setLoading(true)
    try {
      await logoutApi()  
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }, [])

  const value = useMemo(() => ({
    user,
    isAuthenticated,
    loading,
    login,
    registerUser,
    logout
  }), [user, isAuthenticated, loading, login, registerUser, logout])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return context
}