import MenuCard from '../components/layout/MenuCard.jsx'
import { useNavigate } from "react-router-dom";
import FadeInSection from '../components/FadeInSection.jsx'
import { useAuth } from '../context/AuthContext.jsx'
  // imagenes 
  import bgImage from '../assets/mesa.jpg'
import  dessert from '../assets/frutosRojos.jpg'
import cakes from '../assets/panqueques.jpg'
import pizza from '../assets/pizza.jpg'
import burguer from '../assets/burguer.jpg'

const LandingPage = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth()


    const scrollToMenu = () => {
        document.getElementById('menu-section').scrollIntoView({ 
            behavior: 'smooth' 
        })
    }


     const handleReservations = () => {
          if(isAuthenticated){
             navigate("/user/dashboard")
          } else {
             navigate("/login")
          }
     }

    return (
        <div className="bg-gradient-to-br from-green-900 to-black font-body"  
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
                    <h1 className="text-2xl font-display font-bold text-white tracking-wide">🥂 La Reserva Gourmet</h1>
                    <div className="flex gap-4">
                        <button 
                            onClick={() => navigate('/login')}
                            className="px-6 py-2 backdrop-blur-lg bg-white/20 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/30 transition-all"
                        >
                            Iniciar sesión
                        </button>
                        <button 
                            onClick={() => navigate('/register')}
                            className="px-6 py-2 backdrop-blur-lg bg-white/20 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/30 transition-all"
                        >
                            Registrarse
                        </button>
                        <button onClick={handleReservations}
                            className="px-6 py-2 text-white font-semibold hover:text-purple-300 transition-colors">
                              tus reservas
                        </button>
                    </div>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="min-h-screen flex items-center justify-center text-white pt-20 px-8">
                <FadeInSection>
                    <div className=" bg-white/10 border border-white/10 rounded-sm p-16 text-center max-w-4xl shadow-2xl">
                        <h1 className="font-display text-6xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
                            Una experiencia gastronómica única
                        </h1>
                        <p className="font-body text-2xl mb-8 text-gray-200 font-light">
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
            <section className=" flex items-center justify-center px-8 pt-20">
                <FadeInSection>
                    <div className=" bg-white/10 border border-white/20 rounded-sm p-16 max-w-4xl shadow-2xl">
                        <h2 className="font-display text-5xl font-bold mb-8 text-white text-center tracking-tight">
                            🏛️ Nuestra Historia
                        </h2>
                        <p className="font-body text-xl text-gray-200 leading-relaxed mb-6">
                            Desde 2024, <span className="font-semibold text-purple-300">La Reserva Gourmet</span> ha sido sinónimo de excelencia culinaria en el corazón de la ciudad de barranquilla.
                        </p>
                        <p className="font-body text-xl text-gray-200 leading-relaxed">
                            Nuestros chefs combinan técnicas tradicionales con toques modernos para crear experiencias inolvidables en cada visita. Cada plato es una obra de arte diseñada para deleitar tus sentidos.
                        </p>
                    </div>
                </FadeInSection>
            </section>



            {/* MENÚ VISUAL */}
            <section id="menu-section" className=" py-24 px-8">
                <FadeInSection>
                    <div className="flex items-center justify-center backdrop-blur-lg bg-white/10 border border-white/20 rounded-sm p-12 mb-12 max-w-4xl mx-auto shadow-2xl">
                        <h2 className="font-display text-6xl font-bold text-center text-white tracking-tight">
                            lo mas pedido del menu
                        </h2>
                    </div>
                </FadeInSection>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <FadeInSection>
                        <MenuCard
                            image={dessert}
                            name="Cheesecake de frutos rojos"
                            description="cremoso, con coulis artesanal de frutos rojos"
                            price="$25.000"
                        />
                    </FadeInSection>

                    <FadeInSection>
                        <MenuCard
                             image={cakes}
                             name="Pancakes de frutos del bosque"
                             description="suaves, con miel y frutos rojos"
                             price="$20.000"
                        />
                    </FadeInSection>

                    <FadeInSection>
                         <MenuCard
                             image={pizza}
                             name="pizza de a casa"
                             description="masa artesanal, queso fundido y carnes selectas"
                             price="$30.000"
                        />
                    </FadeInSection>

                    <FadeInSection>
                         <MenuCard
                             image={burguer}
                             name="hamburguesa brioche"
                             description="doble carne angus y salsa especial en el pan brioche"
                             price="$35.000"
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
                <p className="font-body text-lg">
                    © {new Date().getFullYear()} La Reserva Gourmet — Todos los derechos reservados.
                </p>
            </footer>
        </div>
    )
}

export default LandingPage;