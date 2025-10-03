
import { verifyToken } from '../config/token.js'

export function authMiddleware(req, res, next) {
    const token = req.headers["authorization"]?.split(" ")[1]
    
    if (!token) {
        return res.status(401).json({ message: "token no proporcionado" })
    }

    try {
        const decoded = verifyToken(token) 
        req.user = decoded
        next()
    } catch (err) {
        return res.status(401).json({ message: "token inválido o expirado" }) 
    }
}