import { useState } from "react"
import { useNavigate, Navigate, Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext.jsx"

export default function RegisterUser() {
  const { registerUser, loading, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [passwordError, setPasswordError] = useState("")

  // ✅ Si ya está logueado, redirigir
  if (isAuthenticated) {
    return <Navigate to="/user/dashboard" replace /> 
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setPasswordError("")

    // ✅ Validaciones del lado del cliente
    if (name.trim().length < 2) {
      setError("El nombre debe tener al menos 2 caracteres")
      return
    }

    if (password.length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    try {
      await registerUser(name.trim(), email.trim(), password)
      navigate("/user/dashboard")
    } catch (err) {
      setError(err.response?.data?.error || "Error al registrarse. Intenta nuevamente.")
      console.error("Error al registrarse:", err)
    }
  }

  // 🌀 Mostrar spinner mientras verifica sesión
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
        <h2 className="text-center mb-3">Crear Cuenta</h2>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre completo</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Juan Pérez"
              required
              disabled={loading}
              minLength={2}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@dominio.com"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className={`form-control ${passwordError ? 'is-invalid' : ''}`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setPasswordError("") // Limpiar error al escribir
              }}
              placeholder="Mínimo 6 caracteres"
              required
              disabled={loading}
              minLength={6}
            />
            {passwordError && (
              <div className="invalid-feedback d-block">{passwordError}</div>
            )}
            <small className="form-text text-muted">
              Debe tener al menos 6 caracteres
            </small>
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
            style={{ fontWeight: "bold" }}
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Registrando...
              </>
            ) : (
              "Registrarse"
            )}
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          ¿Ya tienes cuenta?{" "}
          <Link
            to="/user/login"
            className="text-decoration-none"
            style={{ color: "#1c3374ff" }}
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}