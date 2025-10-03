import app from './app.js'
import { connectDB, closeDB } from  './config/database.js'


const PORT = 3000


const startServer = async () => {
   try {
         await connectDB()
           const server = app.listen(PORT, () => {
              console.log(`Server is running on port ${PORT}`)
           })
         process.on("SIGINT", async () => {
              console.log("apagando el servidor...")
              await closeDB()
              server.close(() => process.exit(0))
         })

         process.on("SIGTERM", async () => {
            console.log("servidor terminado...")
            await closeDB()
            server.close(() => process.exit(0))
         })

  } catch (error) {
      console.error("Error al iniciar el servidor:", error.message)
      process.exit(1)
   }
}


startServer()
