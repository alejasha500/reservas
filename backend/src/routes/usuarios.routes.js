import { Router } from 'express'
import { getUsers, login, register, logout } from '../controller/usuarios.controller.js'
import { authMiddleware } from '../middlewares/authMiddlewares.js'
import { validate } from '../middlewares/validate.js'
import { registerSchema, loginSchema } from '../utils/userSchemas.js'
import { checkRole } from '../middlewares/checkRole.js' 


const router = Router()


router.post('/register', validate(registerSchema), register)
router.post('/login', validate(loginSchema), login)

router.post('/logout', authMiddleware, logout)
// Ruta de admin 

router.get('/', authMiddleware, checkRole('admin'), getUsers)



export default router