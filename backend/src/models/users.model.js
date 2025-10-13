
import { query } from '../config/database.js'



// Crear usuario (registro)
export async function createUser({ name, email, password }) {
  const sql = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'user')`
  const result = await query(sql, [name, email, password])
  return { id: result.insertId, name, email, role: 'user' }
}

// Login del usuario (buscar por email)
export async function loginUser({ email }) {
  const sql = `SELECT id, name, email, password, role FROM users WHERE email = ? LIMIT 1`
  const rows = await query(sql, [email])
  return rows[0] || null
}

// Verificar si el email ya existe
export async function findUserByEmail(email) {
  const sql = `SELECT email FROM users WHERE email = ? LIMIT 1`
  const rows = await query(sql, [email])
  return rows[0] || null
}

// Obtener todos los usuarios (para admin)
export async function getAllUsers() {
  const sql = `SELECT id, name, email, role, created_at FROM users`
  const rows = await query(sql)
  return rows || []
}

// Obtener usuario por ID
export async function getUserById(id) {
  const sql = 'SELECT id, name, email, role, created_at FROM users WHERE id = ?'
  const rows = await query(sql, [id])
  return rows[0] || null
}
  
// Actualizar perfil del usuario (nombre y email)
export async function updateUserProfile({ id, name, email }) {
  const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?'
   const result = await query(sql, [name, email, id])
  return result.affectedRows > 0 
}
 
// Cambiar contraseña
export async function updatePassword({ id, hashedPassword }) {
  const sql = 'UPDATE users SET password = ? WHERE id = ?'
  const result = await query(sql, [hashedPassword, id])
  return result.affectedRows > 0
}

// Eliminar usuario 
export async function deleteUser(id) {
  const sql = 'DELETE FROM users WHERE id = ?'
  const result = await query(sql, [id])
  return result.affectedRows > 0
}

 