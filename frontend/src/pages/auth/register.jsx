import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";
import FadeInSection from "../../components/FadeInSection.jsx";
import bgImage from "../../assets/mesa.jpg";

export default function Register() {
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    try {
      await registerUser(name, email, password);
      navigate("/user/dashboard");
    } catch (err) {
      setError(err.message || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="absolute inset-0 bg-black/5"></div>

      <FadeInSection>
        <div className="relative flex justify-center items-center min-h-screen">
          <div className="bg-white/90 p-10 rounded-2xl shadow-2xl w-[380px] sm:w-[420px] md:w-[460px] backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
              Crear Cuenta
            </h2>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {loading && <LoadingSpinner />}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nombre completo"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Contraseña"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Confirmar contraseña"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition"
              >
                {loading ? "Registrando..." : "Registrarse"}
              </button>
            </form>

            <p className="text-sm text-center mt-4 text-gray-700">
              ¿Ya tienes una cuenta?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-amber-600 hover:underline cursor-pointer"
              >
                Inicia sesión
              </span>
            </p>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
}