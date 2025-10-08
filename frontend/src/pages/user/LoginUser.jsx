import { useState } from "react"
import { useNavigate, Navigate, Link } from "react-router-dom"
import { useAuth } from '../../context/AuthContext.jsx'

export default function LoginUser() {
  const { login, loading, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null) 

  
  if (isAuthenticated) {
    return <Navigate to="/user/dashboard" replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    
    try {
      await login(email, password)
      navigate("/user/dashboard")
    } catch (err) {
     
      setError(err.response?.data?.error || "Credenciales inválidas")
      console.error("Error al iniciar sesión:", err)
    }
  }

  
  if (loading) {
    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    )
  }

  return (  
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h2 className="text-center mb-3">Iniciar Sesión</h2>
        
        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@dominio.com"
              required
              disabled={loading} // ← Deshabilitar mientras carga  
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
              disabled={loading} // ← Deshabilitar mientras carga
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{fontWeight: 'bold'}}
            disabled={loading} // ← Deshabilitar mientras carga
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Ingresando...
              </>
            ) : (
              'Ingresar'
            )}
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          ¿No tienes una cuenta?{' '}
          <Link 
            to="/user/register" 
            className="text-decoration-none"
            style={{color:"#1c3374ff"}}
          >
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  )
}