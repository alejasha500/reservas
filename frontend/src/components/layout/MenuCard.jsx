
function MenuCard({ image, name, description, price }) {
    return (
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-2xl hover:bg-white/15 transition-all duration-300 cursor-pointer">
            {/* Imagen en lugar de emoji */}
            <div className="h-64 overflow-hidden">
                <img 
                    src={image} 
                    alt={name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
            </div>
            <div className="p-4-">
                <h3 className="font-display text-2xl font-bold mb-2 text-white">{name}</h3>
                <p className="font-body text-gray-200 mb-4">{description}</p>
                <p className="font-display text-3xl text-purple-300 font-bold">{price}</p>
            </div>
        </div>
    );
}


export default MenuCard