import { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext.jsx"
import { getUserReservations, cancelReservation } from "../../api/reservasApi.js"
import { useNavigate, Navigate } from "react-router-dom"

export default function UserDashboard() {
  const { user, logout, isAuthenticated, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  
  const [reservas, setReservas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  // ✅ Protección: Redirigir si no está autenticado
  if (!authLoading && !isAuthenticated) {
    return <Navigate to="/user/login" replace />
  }

  // ✅ Cargar reservas del usuario
  useEffect(() => {
    const fetchReservas = async () => {
      try {
        setLoading(true)
        setError(null)
        // El backend obtiene el ID del token, no se necesita pasarlo
        const data = await getUserReservations()
        setReservas(data.reservas || [])
      } catch (err) {
        console.error("Error al obtener reservas:", err)
        setError(err.response?.data?.error || "No se pudieron cargar las reservas.")
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated && user) {
      fetchReservas()
    }
  }, [user, isAuthenticated])

  // ✅ Cancelar una reserva
  const handleCancel = async (id) => {
    if (!window.confirm("¿Seguro que deseas cancelar esta reserva?")) return

    try {
      await cancelReservation(id)
      setReservas((prev) => prev.filter((r) => r.id !== id))
      setSuccessMessage("Reserva cancelada exitosamente.")
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (err) {
      console.error("Error al cancelar reserva:", err)
      setError(err.response?.data?.error || "No se pudo cancelar la reserva.")
    }
  }

  // ✅ Nueva reserva
  const handleNewReservation = () => {
    navigate("/user/reservar")
  }

  // ✅ Cerrar sesión
  const handleLogout = async () => {
    try {
      await logout()
      navigate("/user/login")
    } catch (err) {
      console.error("Error al cerrar sesión:", err)
    }
  }

  // 🌀 Mientras verifica autenticación o carga inicial
  if (authLoading || loading) {
    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mt-5">
      {/* Header con botón de logout */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Bienvenido, {user?.name || "Usuario"}</h2>
          <p className="text-muted mb-0">{user?.email}</p>
        </div>
        <button onClick={handleLogout} className="btn btn-outline-danger">
          <i className="bi bi-box-arrow-right me-2"></i>
          Cerrar sesión
        </button>
      </div>

      {/* Mensajes de éxito/error */}
      {successMessage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {successMessage}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setSuccessMessage(null)}
          ></button>
        </div>
      )}

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setError(null)}
          ></button>
        </div>
      )}

      {/* Card de reservas */}
      <div className="card shadow-sm">
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Tus Reservas</h4>
          <button className="btn btn-success" onClick={handleNewReservation}>
            <i className="bi bi-plus-circle me-2"></i>
            Nueva Reserva
          </button>
        </div>

        <div className="card-body">
          {reservas.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-calendar-x text-muted" style={{ fontSize: "3rem" }}></i>
              <p className="text-muted mt-3">No tienes reservas registradas.</p>
              <button className="btn btn-primary" onClick={handleNewReservation}>
                Hacer mi primera reserva
              </button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Personas</th>
                    <th>Estado</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {reservas.map((reserva) => (
                    <tr key={reserva.id}>
                      <td>
                        {new Date(reserva.fecha).toLocaleDateString("es-ES", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td>{reserva.hora}</td>
                      <td>{reserva.num_personas || reserva.personas} personas</td>
                      <td>
                        <span
                          className={`badge ${
                            reserva.estado === "pendiente"
                              ? "bg-warning text-dark"
                              : reserva.estado === "confirmada"
                              ? "bg-success"
                              : reserva.estado === "cancelada"
                              ? "bg-danger"
                              : "bg-secondary"
                          }`}
                        >
                          {reserva.estado.charAt(0).toUpperCase() + reserva.estado.slice(1)}
                        </span>
                      </td>
                      <td className="text-center">
                        {reserva.estado !== "cancelada" && (
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleCancel(reserva.id)}
                          >
                            <i className="bi bi-x-circle me-1"></i>
                            Cancelar
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}