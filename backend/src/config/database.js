import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

let db = null

function makeError(type, orig, statusCode = 500) {
    const error = new Error(orig.message)
    error.type = type
    error.statusCode = statusCode
    return error
}



export async function connectDB() {
    if(db) return db
        try { 
           db = await mysql.createConnection({
               host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            multipleStatements: true,
            
           })
           console.log('DB connected')
        }catch(err){
            console.log("error al conectar la base de datos", err)
            db = null
            throw makeError("DB_CONNECTION_ERROR", err, 503)
        }
}


function poolInstance(){
       if(!db){
        throw makeError("DB_NOT_CONNECTED", new Error("pool de conexiones no iniciado, llama a connect() primero"), 500)
       }
         return db
}



export async function query(sql, params) {
    try {
        const pool = poolInstance()
        const [results] = await pool.execute(sql, params)
        return results 
    } catch (error) {
        throw makeError("DB_QUERY_ERROR", error, 500)
    }
}


export async function closeDB() {
    if(db) {
        try {
            await db.end()
            console.log("DB closed")
            db = null
        } catch (error) {
            console.log("error al cerrar la base de datos", error)
            throw makeError("DB_CLOSE_ERROR", error, 500)
        }
    }
}