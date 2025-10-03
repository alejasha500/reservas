import express from "express"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import { notFound, errorHandler } from "./middlewares/errorHandler.js"
import userRouter from './routes/usuarios.routes.js'


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))


app.use(helmet())
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100 
}))

app.use('/reservas/usuarios', userRouter)

app.use('/health', (req, res)=> {
    res.status(200).json({ message: "API is healthy" })
}) 


 app.use(notFound)
 app.use(errorHandler)

export default app