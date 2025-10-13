import { query } from '../config/database.js'


   // Verificar disponibilidad de mesa

export async function checkTableAvailable(table_id, reservation_date, reservation_time, duration) {
  const sql = `
    SELECT 1 FROM reservations
    WHERE table_id = ?
    AND reservation_date = ?
    AND reservation_time < DATE_ADD(?, INTERVAL ? HOUR)
    AND DATE_ADD(reservation_time, INTERVAL duration HOUR) > ?
    AND status != 'cancelada'
    LIMIT 1
  `
  const rows = await query(sql, [table_id, reservation_date, reservation_time, duration, reservation_time])
  return rows.length === 0
}

    
    // Obtener mesas disponibles

export async function getAvailableTables(reservation_date, reservation_time, duration, num_people) {
  const sql = `
    SELECT dt.*
    FROM dining_tables dt
    WHERE dt.capacity >= ?
    AND dt.id NOT IN (
      SELECT DISTINCT table_id
      FROM reservations
      WHERE reservation_date = ?
      AND reservation_time < DATE_ADD(?, INTERVAL ? HOUR)
      AND DATE_ADD(reservation_time, INTERVAL duration HOUR) > ?
      AND status != 'cancelada'
    )
    ORDER BY dt.capacity ASC
  `
  const rows = await query(sql, [num_people, reservation_date, reservation_time, duration, reservation_time])
  return rows || []
}

 
   // Crear reserva

export async function createReservation({ user_id, table_id, num_people, service, reservation_date, reservation_time, duration }) {
  const sql = `
    INSERT INTO reservations (user_id, table_id, num_people, service, reservation_date, reservation_time, duration, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'confirmada')
  `
  const result = await query(sql, [user_id, table_id, num_people, service, reservation_date, reservation_time, duration])
  
  if (result.affectedRows > 0) {
    return {
      id: result.insertId,
      user_id,
      table_id,
      num_people,
      service,
      reservation_date,
      reservation_time,
      duration,
      status: 'confirmada'
    }
  }
  return null
}

  
   // Obtener reservas del usuario

export async function getUserReservations(user_id) {
  const sql = `
    SELECT r.*, dt.number AS mesa_number, dt.location
    FROM reservations r
    JOIN dining_tables dt ON r.table_id = dt.id
    WHERE r.user_id = ?
    ORDER BY r.reservation_date DESC, r.reservation_time DESC
  `
  const rows = await query(sql, [user_id])
  return rows || []
}


   // Obtener una reserva específica

export async function getReservationById(reservation_id) {
  const sql = `
    SELECT r.*, dt.number AS mesa_number, dt.location, dt.capacity
    FROM reservations r
    JOIN dining_tables dt ON r.table_id = dt.id
    WHERE r.id = ?
  `
  const rows = await query(sql, [reservation_id])
  return rows[0] || null
}


   //   Cancelar reserva

export async function cancelReservation(reservation_id, reason) {
  const sql = `
    UPDATE reservations
    SET status = 'cancelada',
        cancellation_reason = ?,
        cancelled_at = NOW(),
        updated_at = NOW()
    WHERE id = ?
  `
  const result = await query(sql, [reason, reservation_id])
  return result.affectedRows > 0
}


  //  Actualizar reserva

export async function updateReservation({ reservation_id, table_id, num_people, service, reservation_date, reservation_time, duration }) {
  const sql = `
    UPDATE reservations
    SET table_id = ?, 
        num_people = ?, 
        service = ?, 
        reservation_date = ?, 
        reservation_time = ?, 
        duration = ?, 
        updated_at = NOW()
    WHERE id = ?
  `
  const result = await query(sql, [table_id, num_people, service, reservation_date, reservation_time, duration, reservation_id])
  return result.affectedRows > 0
}


  //  Obtener mesa por ID  (admin)

export async function getTableById(table_id) {
  const sql = `SELECT id, number, capacity FROM dining_tables WHERE id = ?`
  const rows = await query(sql, [table_id])
  return rows[0] || null
}




// Para admin - obtener TODAS las mesas
export async function getAllTables() {
  const sql = `SELECT * FROM dining_tables ORDER BY number ASC`
  const rows = await query(sql)
  return rows || []
}

// Para admin - obtener TODAS las reservas
export async function getAllReservations() {
  const sql = `
    SELECT r.*, u.name as user_name, u.email, dt.number as mesa_number
    FROM reservations r
    JOIN users u ON r.user_id = u.id
    JOIN dining_tables dt ON r.table_id = dt.id
    ORDER BY r.reservation_date DESC, r.reservation_time DESC
  `
  const rows = await query(sql)
  return rows || []
}


// Crear mesa
export async function createTable({ number, capacity, location }) {
  const sql = `
    INSERT INTO dining_tables (number, capacity, location)
    VALUES (?, ?, ?)
  `
  const result = await query(sql, [number, capacity, location])
  
  if (result.affectedRows > 0) {
    return {
      id: result.insertId,
      number,
      capacity,
      location
    }
  }
  return null
}

// Actualizar mesa
export async function updateTable({ id, number, capacity, location }) {
  const sql = `
    UPDATE dining_tables
    SET number = ?, capacity = ?, location = ?, updated_at = NOW()
    WHERE id = ?
  `
  const result = await query(sql, [number, capacity, location, id])
  return result.affectedRows > 0
}

// Eliminar/desactivar mesa
export async function deleteTable(id) {
  const sql = `DELETE FROM dining_tables WHERE id = ?`
  const result = await query(sql, [id])
  return result.affectedRows > 0
}