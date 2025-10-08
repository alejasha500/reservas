import { verifyToken } from '../config/token.js'

export function authMiddleware(req, res, next) {
    // ✅ Leer token desde COOKIE (no desde headers)
    const token = req.cookies.token
    
    if (!token) {
        return res.status(401).json({ 
            message: "No autenticado",
            code: "NO_TOKEN" 
        })
    }

    try {
        const decoded = verifyToken(token)
        
        if (!decoded) {
            return res.status(401).json({ 
                message: "Token inválido o expirado",
                code: "INVALID_TOKEN"
            })
        }
        
        req.user = decoded // { id, role }
        next()
    } catch (err) {
        return res.status(401).json({ 
            message: "Error al verificar token",
            code: "AUTH_ERROR"
        }) 
    }
}