import { Router } from 'express'
import { authMiddleware } from '../middlewares/authMiddlewares.js'
import { validate } from '../middlewares/validate.js'
import { registerSchema, loginSchema } from '../utils/userSchemas.js'
import { checkRole } from '../middlewares/checkRole.js' 
import {
     getUsers,
      login,
      register,
      logout,
      getUser,
      deleteByUser
     } from '../controller/usuarios.controller.js'


const router = Router()

// 
router.post('/register', validate(registerSchema), register)
router.post('/login', validate(loginSchema), login)


// cerrar sesion
router.post('/logout', authMiddleware, logout)



// Ruta de admin 

router.get('/admin/users', authMiddleware, checkRole('admin'), getUsers)
router.get('/admin/users/:id', authMiddleware, checkRole('admin'), getUser)
router.delete('/admin/user/:id', authMiddleware, checkRole('admin'), deleteByUser)



export default router