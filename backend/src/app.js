import express from "express"
import helmet from "helmet"
import cors from "cors"
import rateLimit from "express-rate-limit"
import cookieParser from "cookie-parser"
import { notFound, errorHandler } from "./middlewares/errorHandler.js"
import userRouter from './routes/users.routes.js'
import reservationsRouter from './routes/reservations.routes.js'


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())



app.use(helmet())
// app.js
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? false 
    : 'http://localhost:3000',
  credentials: true
}))
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100 
}))

// ruta de usuarios
app.use('/api/users', userRouter)

// ruta de reservas
app.use('/api/reservations', reservationsRouter)

app.use('/health', (req, res)=> {
    res.status(200).json({ message: "API is healthy" })
}) 


 app.use(notFound)
 app.use(errorHandler)

export default app