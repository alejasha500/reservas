// context/AuthContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { verifyTokenApi, loginApi, logoutApi, registerApi } from '../api/userApi.js';

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    
    const verifySession = async () => {
      const hasSession = sessionStorage.getItem('hasSession')
      
      if (!hasSession) {
        setLoading(false)
        setIsAuthenticated(false)
        return
      }
      
      try {
        const data = await verifyTokenApi()
        
        if (!mounted) return
        
        if (data?.success) {
          setUser(data.user)
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
          sessionStorage.removeItem('hasSession')
        }
      } catch (error) {
        if (!mounted) return
        
        setIsAuthenticated(false)
        sessionStorage.removeItem('hasSession')
      } finally {
        if (!mounted) return
        setLoading(false)
      }
    }
    
    verifySession()
    return () => { mounted = false }
  }, [])

  const login = useCallback(async (email, password) => {
    setLoading(true)
    try {
      const data = await loginApi(email, password)
      setUser(data.user)
      setIsAuthenticated(true)
      sessionStorage.setItem('hasSession', 'true')
      return data
    } catch (err) {
      setIsAuthenticated(false)
      throw err
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
      sessionStorage.setItem('hasSession', 'true')
      return data
    } catch (err) {
      setIsAuthenticated(false)
      throw err
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
      sessionStorage.removeItem('hasSession')
    } finally {
      setLoading(false)
    }
  }, [])

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    registerUser,
    logout
  }

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