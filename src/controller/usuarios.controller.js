import bcrypt from 'bcrypt'
import { generateToken } from '../config/token.js'
import { createUser, loginUser, findUserByEmail, getAllUsers } from '../models/usuarios.model.js'
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

 export async function register ( req, res, next) {
      try {
         const { name, email, password } = req.body
         const existingUser = await findUserByEmail(email)
         if (existingUser) { 
            throw new AuthError('Email already in use', 409, 'EMAIL_IN_USE')
         }

         const hashedPassword = await bcrypt.hash(password, 10)
         const newUser = await createUser({ name, email, password: hashedPassword })

         const token = generateToken({ id: newUser.id, role: newUser.role })
         res.setHeader('Authorization', `Bearer ${token}`)


         res.status(201).json({ user: sanitizeUser(newUser),
            token
          }) 
      } catch (error) {
         next(error)
      }
 }



   export async function login (req, res, next) {
      try {
          const { email, password } = req.body
          const user = await loginUser({ email })
            if (!user) {
               throw new AuthError('Invalid email or password', 401, 'INVALID_CREDENTIALS')
            }
            const passwordMatch = await bcrypt.compare(password, user.password)
            if (!passwordMatch) {
               throw new AuthError('Invalid email or password', 401, 'INVALID_CREDENTIALS')
            }

            const token = generateToken({ id: user.id, role: user.role })
            res.setHeader('Authorization', `Bearer ${token}`)
            res.json({ user: sanitizeUser(user), token })
      } catch (error) {
         next(error)
      }
   }



   export async function getUsers (req, res, next) {
        try {
           if(req.user.role !== 'admin'){
               throw new AuthError('Access denied', 403, 'ACCESS_DENIED')
           }
             const users = await getAllUsers() 
             res.json({ users: users.map(sanitizeUser) })
        } catch (error) {
          next(error)
        }
   }
