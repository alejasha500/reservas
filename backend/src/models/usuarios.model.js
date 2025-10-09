// models/usuarios.model.js
import { query } from '../config/database.js'

/* ============================================================
                       USUARIO NORMAL
   ============================================================ */

// Crear usuario (registro)
export async function createUser({ name, email, password }) {
  const sql = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'user')`
  const result = await query(sql, [name, email, password])
  return { id: result.insertId, name, email, role: 'user' } || null
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

// Obtener todos los usuarios (solo admin puede usarlo, pero es base)
export async function getAllUsers() {
  const sql = `SELECT id, name, email, role, created_at FROM users`
  const rows = await query(sql)
  return rows || []
}

// Obtener datos del perfil del usuario por ID
export async function getUserById(id) {
  const sql = 'SELECT id, name, email, role, created_at FROM users WHERE id = ?'
  const rows = await query(sql, [id])
  return rows[0] || null
}

// Actualizar perfil del usuario (solo su propio perfil)
export async function updateUserProfile({ id, name, email }) {
  const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?'
  await query(sql, [name, email, id])
  return getUserById(id)
}

// Cambiar contraseña del usuario
export async function updatePassword({ id, hashedPassword }) {
  const sql = 'UPDATE users SET password = ? WHERE id = ?'
  await query(sql, [hashedPassword, id])
  return true
}

// Eliminar cuenta del usuario
export async function deleteUser(id) {
  const sql = 'DELETE FROM users WHERE id = ?'
  const result = await query(sql, [id])
  return result.affectedRows > 0
}

/* ============================================================
                        ADMINISTRADOR
   ============================================================ */

// ADMIN: obtener usuario por ID
export async function adminGetUserById(id) {
  const sql = 'SELECT id, name, email, role, created_at FROM users WHERE id = ?'
  const rows = await query(sql, [id])
  return rows[0] || null
}

// ADMIN: actualizar usuario (incluye cambio de rol)
export async function adminUpdateUser({ id, name, email, role }) {
  const sql = 'UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?'
  await query(sql, [name, email, role, id])
  return getUserById(id)
}

// ADMIN: eliminar usuario
export async function adminDeleteUser(id) {
  const sql = 'DELETE FROM users WHERE id = ?'
  const result = await query(sql, [id])
  return result.affectedRows > 0
}