import bcrypt from 'bcrypt'
import { createUser, loginUser, findUserByEmail, getAllUsers, getUserById, deleteUser, updateUserProfile, updatePassword } from '../models/usuarios.model.js'
import { generateToken } from '../config/token.js'
import { sanitizeUser } from '../utils/sanitizeUser.js'
import dotenv from 'dotenv'
dotenv.config()

export class AuthError extends Error {
     constructor(message, status, code){ 
            super(message)
            this.status = status
            this.code = code || 'AUTH_ERROR'
     }
    }



    // REGISTRO DE USUARIOS

 export async function register ( req, res, next) {
      try {
         const { name, email, password } = req.body
         const existingUser = await findUserByEmail(email)
         if (existingUser) { 
            throw new AuthError('Email en uso', 409, 'EMAIL_IN_USE')
         }

         const hashedPassword = await bcrypt.hash(password, 10)
         const newUser = await createUser({ name, email, password: hashedPassword })

         const token = generateToken({ id: newUser.id, role: newUser.role })
         
               res.cookie('token', token, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === 'production',
                   sameSite: 'strict',
                   maxAge: 15 * 60 * 1000 // 15 minutos
               })


         res.status(201).json({ 
              user: sanitizeUser(newUser),
             success: true
          }) 
      } catch (error) {
         next(error)
      }
 }

     // LOGIN 

   export async function login (req, res, next) {
      try {
          const { email, password } = req.body
          const user = await loginUser({ email })
            if (!user) {
               throw new AuthError('Email invalido', 401, 'INVALID_CREDENTIALS')
            }
            const passwordMatch = await bcrypt.compare(password, user.password)
            if (!passwordMatch) {
               throw new AuthError('Password invalido', 401, 'INVALID_CREDENTIALS')
            }

            const token = generateToken({ id: user.id, role: user.role })
            res.cookie('token', token, {
               httpOnly: true,
               secure: process.env.NODE_ENV === 'production',
               sameSite: 'strict',
               maxAge: 15 * 60 * 1000 // 15 minutos
            })


            res.json({ user: sanitizeUser(user), success: true })
      } catch (error) {
         next(error)
      }
   }


   //   CERRAR SESSION

  export async function logout(req, res, next) {
              try {
             res.clearCookie('token', {
             httpOnly: true,
             secure: process.env.NODE_ENV === 'production',
             sameSite: 'strict'
      })
    
          res.json({ success: true, message: 'Logout exitoso' })
       } catch (error) {
          next(error)
      }
}


       // OBTENER PERFIL PROPIO (USUARIO)

 export async function getProfile(req, res, next) {
     try {
        const userId = req.user.id
        const user = await getUserById(userId)
        if(!user){
            throw new AuthError('Usuario no encontrado', 404, 'USER_NOT_FOUND')
        }

         res.json({ user: sanitizeUser(user), success: true })
     } catch (error) {
         next(error)
     }
 } 

  //   ACTUALIZAR NOMBRE O EMAIL 

 export async function updateProfile(req, res, next) {
    try {
         const userId = req.user.id
         const { name , email } = req.body
         await updateUserProfile({id: userId, name, email})
         const updateUser = await getUserById(userId)
         res.json({
            success: true,
            message:' perfil actualizado correctamente',
            user: sanitizeUser(updateUser)
         })
    } catch (error) {
      next(error)
    }
 }


  //   CAMBIAR CONTRASEÑA 

 export async function changePassword(req, res, next) {
    try {
         const userId = req.user.id
         const { currentPassword, newPassword } = req.body
         
         const user = await loginUser({email: req.user.email})
         const passwordMatch = await bcrypt.compare(currentPassword, user.password)

         if(!passwordMatch){
             throw new AuthError('error al actualizar contraseña', 401, 'INVALID_PASSWORD')
         }

         const hashedPassword = await bcrypt.hash(newPassword, 10)
         await updatePassword({id: userId, hashedPassword})
         res.json({
            success:true,
            message: 'contraseña actualizada correctamente'
         })
         
    } catch (error) {
       next(error)
    }
 }






   // obtener todos los Usuarios (solo lo hace el admin)

   export async function getUsers (req, res, next) {
        try {
             const users = await getAllUsers() 
              
               if (!users) {
                      throw AuthError('  ')
                  }

             res.json({ users: users.map(sanitizeUser)})
        } catch (error) {
          next(error)
        }
   }


   // obtener usuario por id (admin)


   export async function getUser(req, res, next){
        try {
            const { id } = req.params
            const user =  await getUserById(id)
            res.json({user: sanitizeUser(user) })
        } catch (error) {
            next(error)
        }
   }


    // eliminar usuario el mismo o el admin 

   export async function deleteByUser(req, res, next) {
  try {
    const { id } = req.params
    
    // El usuario normal solo puede eliminar su propia cuenta
    if (req.user.role === 'user' && req.user.id !== parseInt(id)) {
      throw new AuthError('No puedes eliminar otra cuenta', 403, 'FORBIDDEN')
    }
    
    // Admin puede eliminar cualquier cuenta
    const deleted = await deleteUser(id)
    
    if (!deleted) {
      throw new Error('Usuario no encontrado')
    }
    
    res.json({ success: true, message: 'Usuario eliminado' })
  } catch (error) {
    next(error)
  }
}
