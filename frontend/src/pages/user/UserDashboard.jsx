import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import FadeInSection from "../../components/FadeInSection.jsx";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";

import bgImage from "../../assets/mesa.jpg"; 


export default function UserDashboard() {
  const { user, isAuthenticated, loading, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !isAuthenticated) navigate("/login")
  }, [isAuthenticated, loading, navigate])

  if (loading) return <LoadingSpinner />
  if (!isAuthenticated) return null   

  const handleProfile = () => navigate("/user/profile")
  const handleReservations = () => navigate("/user/reservations")
  const handleNewReservation = () => navigate("/user/new-reservation")
   

  return (
    <div
      className="bg-gradient-to-br from-green-900 to-black font-body"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundBlendMode: "overlay",
      }}
    >
      
      <nav className="fixed top-0 w-full backdrop-blur-lg bg-white/10 border-b border-white/20 shadow-lg z-50 px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-display font-bold text-white tracking-wide">
            🥂 La Reserva Gourmet
          </h1>
          <div className="flex gap-4">
            <button
              onClick={handleProfile}
              className="px-6 py-2 backdrop-blur-lg bg-white/20 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/30 transition-all"
            >
              Mi perfil
            </button>
            <button
              onClick={handleReservations}
              className="px-6 py-2 backdrop-blur-lg bg-white/20 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/30 transition-all"
            >
              Mis reservas
            </button>
            <button
              onClick={logout}
              className="px-6 py-2 bg-red-600/70 border border-red-500/30 text-white rounded-lg font-semibold hover:bg-red-600 transition-all"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </nav>

     
      <section className="min-h-screen flex items-center justify-center text-white pt-20 px-8">
        <FadeInSection>
          <div className="bg-white/10 border border-white/10 rounded-sm p-16 text-center max-w-4xl shadow-2xl">
            <h1 className="font-display text-6xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
              Bienvenido, {user?.name} 👋
            </h1>
            <p className="font-body text-2xl mb-8 text-gray-200 font-light">
              Disfruta tu experiencia personalizada
            </p>
            <button
              onClick={handleNewReservation}
              className="px-8 py-4 backdrop-blur-lg bg-white/20 border border-white/30 text-white rounded-full font-semibold text-lg hover:scale-105 hover:bg-white/30 transform transition-all duration-300 shadow-2xl"
            >
              🍽️ Hacer una nueva reserva
            </button>
          </div>
        </FadeInSection>
      </section>

     
      <section id="menu-section" className="py-24 px-8">
        

        
        <div className="text-center mt-16">
          <button
            onClick={handleNewReservation}
            className="px-10 py-4 backdrop-blur-lg bg-white/20 border border-white/30 text-white rounded-full font-bold text-xl hover:bg-white/30 hover:scale-105 transform transition-all duration-300 shadow-2xl"
          >
            Reserva tu mesa favorita
          </button>
        </div>
      </section>

      
      <footer className="backdrop-blur-lg bg-black/40 border-t border-white/10 text-white py-8 text-center">
        <p className="font-body text-lg">
          ©️ {new Date().getFullYear()} La Reserva Gourmet — Todos los derechos
          reservados.
        </p>
      </footer>
    </div>
  )
}