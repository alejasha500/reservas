import { Router } from 'express'
import { authMiddleware } from '../middlewares/authMiddlewares.js'
import { validate } from '../middlewares/validate.js'
import { registerSchema, loginSchema, updateProfileSchema, changePasswordSchema} from '../utils/userSchemas.js'
import { checkRole } from '../middlewares/checkRole.js' 
import {
     getUsers,
      login,
      register,
      logout,
      getUser,
      deleteByUser,
      getProfile,
      updateProfile,
      changePassword
     } from '../controller/usuarios.controller.js'


const router = Router()

// publicas 
router.post('/register', validate(registerSchema), register)
router.post('/login', validate(loginSchema), login)

 
// protegidas (usuario auntenticado )
router.post('/logout', authMiddleware, logout)
router.get('/profile', authMiddleware, getProfile)
router.put('/profile', authMiddleware, validate(updateProfileSchema), updateProfile)
router.post('/change-password', authMiddleware, validate(changePasswordSchema), changePassword)
router.delete('/profile', authMiddleware, deleteByUser)


// Ruta de admin 

router.get('/admin/users', authMiddleware, checkRole('admin'), getUsers)
router.get('/admin/users/:id', authMiddleware, checkRole('admin'), getUser)
router.delete('/admin/users/:id', authMiddleware, checkRole('admin'), deleteByUser)



export default router