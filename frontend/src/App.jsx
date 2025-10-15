// src/App.jsx

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8">
      
      {/* Contenedor principal */}
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Card 1 - Título */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Tailwind está funcionando 🎉
          </h1>
          <p className="text-gray-600">Si ves estos estilos, todo está bien configurado</p>
        </div>

        {/* Card 2 - Botones */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Prueba de Botones</h2>
          <div className="flex gap-3 flex-wrap">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
              Primario
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
              Éxito
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
              Peligro
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold transition-colors">
              Secundario
            </button>
          </div>
        </div>

        {/* Card 3 - Grid */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Grid Responsive</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-pink-400 to-red-500 p-4 rounded-lg text-white font-bold text-center">
              Box 1
            </div>
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-4 rounded-lg text-white font-bold text-center">
              Box 2
            </div>
            <div className="bg-gradient-to-br from-green-400 to-teal-500 p-4 rounded-lg text-white font-bold text-center">
              Box 3
            </div>
          </div>
        </div>

        {/* Card 4 - Animaciones */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Animaciones</h2>
          <div className="flex gap-6 items-center justify-around">
            <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            <div className="animate-ping w-4 h-4 bg-red-500 rounded-full"></div>
            <div className="animate-pulse bg-purple-500 text-white px-4 py-2 rounded">Pulse</div>
            <div className="animate-bounce text-4xl">🚀</div>
          </div>
        </div>

        {/* Card 5 - Inputs */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Formulario</h2>
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              type="password" 
              placeholder="Contraseña"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition-colors">
              Entrar
            </button>
          </div>
        </div>

        {/* Card 6 - Badges y Pills */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Badges</h2>
          <div className="flex gap-2 flex-wrap">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">Nuevo</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Activo</span>
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">Urgente</span>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">Pendiente</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App