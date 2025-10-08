import { query } from  '../config/database.js'



export async function createUser({name, email, password}) {
     const sql = `INSERT INTO users (name, email, password, role) VALUES (?,?,?, 'user')`
      const result = await query(sql, [name, email, password])
      return {id: result.insertId, name, email, role: 'user'} || null
}


export async function loginUser ({email}) {
              const sql = `SELECT id, name, email, password, role FROM users WHERE email = ? LIMIT 1`
                const rows = await query(sql, [email])
              return rows[0] || null
          }  



export  async function findUserByEmail(email){
         const sql = `SELECT  email FROM users WHERE email = ? LIMIT 1`
         const rows = await query(sql, [email])
         return rows[0] || null
    }



export async function getAllUsers(){
    const sql = `SELECT id, name, email, role, created_at FROM users` 
    const rows = await query(sql)
    return rows || []
}




