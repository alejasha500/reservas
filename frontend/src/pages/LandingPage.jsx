// src/pages/LandingPage.jsx

import { useNavigate } from "react-router-dom";
import FadeInSection from '../components/FadeInSection.jsx'
import bgImage from '../assets/mesa-vintage.jpg'

const LandingPage = () => {
    const navigate = useNavigate();

    const scrollToMenu = () => {
        document.getElementById('menu-section').scrollIntoView({ 
            behavior: 'smooth' 
        });
    };

    return (
        <div className="bg-gradient-to-br from-green-900 to-black"  
            style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'overlay'
             }}>
            {/* NAVBAR */}
            <nav className="fixed top-0 w-full backdrop-blur-lg bg-white/10 border-b border-white/20 shadow-lg z-50 px-8 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white">🥂 La Reserva Gourmet</h1>
                    <div className="flex gap-4">
                        <button 
                            onClick={() => navigate('/login')}
                            className="px-6 py-2 text-white font-semibold hover:text-purple-300 transition-colors"
                        >
                            Iniciar sesión
                        </button>
                        <button 
                            onClick={() => navigate('/register')}
                            className="px-6 py-2 backdrop-blur-lg bg-white/20 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/30 transition-all"
                        >
                            Registrarse
                        </button>
                    </div>
                </div>
            </nav>

                                                            {/* HERO SECTION con foto de fondo */}
            <section className="min-h-screen flex items-center justify-center text-white pt-20 px-8 ">
                     {/* Overlay oscuro para que las letras se lean */}
            
    
                {/* Contenido */}
             <FadeInSection>
                     <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-sm p-16 text-center max-w-4xl shadow-2xl">
                        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                           Una experiencia gastronómica única
                        </h1>
                     <p className="text-2xl mb-8 text-gray-200">
                           En cada plato
                      </p>
                            <button 
                          onClick={scrollToMenu}
                                  className="px-8 py-4 backdrop-blur-lg bg-white/20 border border-white/30 text-white rounded-full font-semibold text-lg hover:scale-105 hover:bg-white/30 transform transition-all duration-300 shadow-2xl"
                               >
                               🍽️ Ver nuestro menú
                             </button>
                        </div>
              </FadeInSection>
            </section>

            {/* NUESTRA HISTORIA */}
            <section className="min-h-screen flex items-center justify-center px-8 py-20">
                <FadeInSection>
                    <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-sm p-16 max-w-4xl shadow-2xl">
                        <h2 className="text-5xl font-bold mb-8 text-white text-center">
                            🏛️ Nuestra Historia
                        </h2>
                        <p className="text-xl text-gray-200 leading-relaxed mb-6">
                            Desde 1995, <span className="font-semibold text-purple-300">La Reserva Gourmet</span> ha sido sinónimo de excelencia culinaria en el corazón de la ciudad.
                        </p>
                        <p className="text-xl text-gray-200 leading-relaxed">
                            Nuestros chefs combinan técnicas tradicionales con toques modernos para crear experiencias inolvidables en cada visita. Cada plato es una obra de arte diseñada para deleitar tus sentidos.
                        </p>
                    </div>
                </FadeInSection>
            </section>

            {/* AMBIENTE */}
            <section className="py-20 px-8">
                <FadeInSection>
                    <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-sm p-16 max-w-4xl mx-auto text-center shadow-2xl">
                        <h2 className="text-5xl font-bold mb-8 text-white">
                            🌿 Nuestro Ambiente
                        </h2>
                        <p className="text-2xl text-gray-200 italic">
                            "Comida gourmet, atención excepcional y ambiente acogedor."
                        </p>
                    </div>
                </FadeInSection>
            </section>

            {/* MENÚ VISUAL */}
            <section id="menu-section" className="min-h-screen py-20 px-8">
                <FadeInSection>
                    <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-sm p-12 mb-12 max-w-4xl mx-auto shadow-2xl">
                        <h2 className="text-6xl font-bold text-center text-white">
                            Nuestro Menú
                        </h2>
                    </div>
                </FadeInSection>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <FadeInSection>
                        <MenuCard
                            emoji="🍝"
                            name="Pasta Toscana"
                            description="Pasta artesanal con salsa de tomates frescos"
                            price="$45.000"
                        />
                    </FadeInSection>

                    <FadeInSection>
                        <MenuCard
                            emoji="🥩"
                            name="Corte Angus Premium"
                            description="Carne selecta con guarnición de vegetales"
                            price="$70.000"
                        />
                    </FadeInSection>

                    <FadeInSection>
                        <MenuCard
                            emoji="🍰"
                            name="Postre de Chocolate Artesanal"
                            description="Delicia de chocolate belga con frutos rojos"
                            price="$20.000"
                        />
                    </FadeInSection>

                    <FadeInSection>
                        <MenuCard
                            emoji="☕"
                            name="Café Gourmet de la Casa"
                            description="Café de origen colombiano, tostado especial"
                            price="$12.000"
                        />
                    </FadeInSection>
                </div>

                <div className="text-center mt-16">
                    <button 
                        onClick={() => navigate('/register')}
                        className="px-10 py-4 backdrop-blur-lg bg-white/20 border border-white/30 text-white rounded-full font-bold text-xl hover:bg-white/30 hover:scale-105 transform transition-all duration-300 shadow-2xl"
                    >
                        Reserva tu mesa ahora
                    </button>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="backdrop-blur-lg bg-black/40 border-t border-white/10 text-white py-8 text-center">
                <p className="text-lg">
                    © {new Date().getFullYear()} La Reserva Gourmet — Todos los derechos reservados.
                </p>
            </footer>
        </div>
    );
};

// Componente de tarjeta del menú con efecto glass
function MenuCard({ emoji, name, description, price }) {
    return (
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-2xl hover:bg-white/15 transition-all duration-300 cursor-pointer">
            <div className="h-64 backdrop-blur-lg bg-white/5 flex items-center justify-center text-9xl border-b border-white/10">
                {emoji}
            </div>
            <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-white">{name}</h3>
                <p className="text-gray-200 mb-4">{description}</p>
                <p className="text-3xl text-purple-300 font-bold">{price}</p>
            </div>
        </div>
    );
}

export default LandingPage;