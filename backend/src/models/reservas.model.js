 import { query } from '../config/database.js'




   // crear reserva de usuario 
  

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





export async function checkTableAvailable(table_id, reservation_date, reservation_time, duration) {
  const sql = `
    SELECT * FROM reservations
    WHERE table_id = ?
    AND reservation_date = ?
    AND reservation_time < DATE_ADD(?, INTERVAL ? HOUR)
    AND DATE_ADD(reservation_time, INTERVAL duration HOUR) > ?
    AND status != 'cancelada'
  `
  const rows = await query(sql, [table_id, reservation_date, reservation_time, duration, reservation_time])
  return rows.length === 0

}