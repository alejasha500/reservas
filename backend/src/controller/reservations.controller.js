import { AuthError } from '../utils/AuthError.js'
import { 
    checkTableAvailable,
    getAvailableTables,
    getUserReservations,
    createReservation,
    getAllReservations,
    getReservationById,
    cancelReservation,
    updateReservation,
    getTableById,
    getAllTables,
    createTable,
    updateTable,
    deleteTable
 } from '../models/reservations.model.js'


// ============================================
// USUARIO - Funciones para el usuario normal
// ============================================

export async function createReservationController(req, res, next) {
  try {
    const { table_id, num_people, service, reservation_date, reservation_time, duration } = req.body
    const user_id = req.user.id

    const table = await getTableById(table_id)
    if (!table) throw new AuthError('la mesa no existe', 404, 'TABLE_NOT_FOUND')

    if (num_people > table.capacity) throw new AuthError('la mesa no tiene capacidad suficiente', 400, 'CAPACITY_EXCEEDED')

    const available = await checkTableAvailable(table_id, reservation_date, reservation_time, duration)
    if (!available) throw new AuthError('la mesa no está disponible', 400, 'NOT_AVAILABLE')
    
    const reservation = await createReservation({user_id, table_id, num_people, service, reservation_date, reservation_time, duration})

    res.status(201).json({success: true, message: 'reserva creada correctamente', data: reservation})
  } catch (error) {
    next(error)
  }
}

export async function getUserReservationsController(req, res, next) {
  try {
    const user_id = req.user.id
    const reservations = await getUserReservations(user_id)
    res.json({ success: true, data: reservations })
  } catch (error) {
    next(error)
  }
}

export async function getReservationByIdController(req, res, next) {
  try {
    const { id } = req.params
    const reservation = await getReservationById(id)

    if (!reservation) throw new AuthError('Reserva no encontrada', 404, 'NOT_FOUND')
    if (reservation.user_id !== req.user.id)
      throw new AuthError('No tienes permiso para ver esta reserva', 403, 'FORBIDDEN')

    res.json({ success: true, data: reservation })
  } catch (error) {
    next(error)
  }
}

export async function getAvailableTablesController(req, res, next) {
  try {
    const { reservation_date, reservation_time, duration, num_people } = req.query

    if (!reservation_date || !reservation_time || !duration || !num_people) {
      throw new AuthError('Faltan parámetros', 400, 'BAD_REQUEST')
    }

    const tables = await getAvailableTables(reservation_date, reservation_time, duration, num_people)
    res.json({ success: true, data: tables })
  } catch (error) {
    next(error)
  }
}

export async function cancelMyReservationController(req, res, next) {
  try {
    const { id } = req.params
    const { reason } = req.body

    const reservation = await getReservationById(id)
    
    if (!reservation) {
      throw new AuthError('Reserva no encontrada', 404, 'NOT_FOUND')
    }
    
    if (reservation.user_id !== req.user.id) {
      throw new AuthError('No tienes permiso', 403, 'FORBIDDEN')
    }

    const cancelled = await cancelReservation(id, reason)

    if (!cancelled) {
      throw new AuthError('No se pudo cancelar', 400, 'CANCEL_FAILED')
    }

    res.json({ success: true, message: 'Reserva cancelada' })
  } catch (error) {
    next(error)
  }
}

export async function updateReservationController(req, res, next) {
  try {
    const { id } = req.params
    const { table_id, num_people, service, reservation_date, reservation_time, duration } = req.body
    const user_id = req.user.id

    const reservation = await getReservationById(id)
    if (!reservation) throw new AuthError('Reserva no encontrada', 404, 'NOT_FOUND')
    if (reservation.user_id !== user_id) throw new AuthError('No puedes editar esta reserva', 403, 'FORBIDDEN')

    const table = await getTableById(table_id)
    if (!table) throw new AuthError('Mesa no encontrada', 404, 'TABLE_NOT_FOUND')
    if (num_people > table.capacity) throw new AuthError('la mesa no tiene capacidad suficiente', 400, 'CAPACITY_EXCEEDED')

    const available = await checkTableAvailable(table_id, reservation_date, reservation_time, duration)
    if (!available) throw new AuthError('La mesa no está disponible', 400, 'NOT_AVAILABLE')

    const updated = await updateReservation({
      reservation_id: id,
      table_id,
      num_people,
      service,
      reservation_date,
      reservation_time,
      duration
    })

    if (!updated) throw new AuthError('No se pudo actualizar la reserva', 400, 'UPDATE_FAILED')

    res.json({ success: true, message: 'Reserva actualizada correctamente' })
  } catch (error) {
    next(error)
  }
}


// ============================================
// ADMIN - Funciones para administrador
// ============================================

export async function createReservationAdminController(req, res, next) {
  try {
    const { user_id, table_id, num_people, service, reservation_date, reservation_time, duration } = req.body

    const table = await getTableById(table_id)
    if (!table) throw new AuthError('Mesa no encontrada', 404, 'TABLE_NOT_FOUND')

    if (num_people > table.capacity) throw new AuthError('la mesa no tiene capacidad suficiente', 400, 'CAPACITY_EXCEEDED')

    const available = await checkTableAvailable(table_id, reservation_date, reservation_time, duration)
    if (!available) throw new AuthError('Mesa no disponible', 400, 'NOT_AVAILABLE')

    const reservation = await createReservation({
      user_id,
      table_id,
      num_people,
      service,
      reservation_date,
      reservation_time,
      duration
    })

    res.status(201).json({ success: true, data: reservation })
  } catch (error) {
    next(error)
  }
}

export async function updateReservationAdminController(req, res, next) {
  try {
    const { id } = req.params
    const { table_id, num_people, service, reservation_date, reservation_time, duration } = req.body

    const reservation = await getReservationById(id)
    if (!reservation) throw new AuthError('Reserva no encontrada', 404, 'NOT_FOUND')

    const table = await getTableById(table_id)
    if (!table) throw new AuthError('Mesa no encontrada', 404, 'TABLE_NOT_FOUND')
    if (num_people > table.capacity) throw new AuthError('la mesa no tiene capacidad suficiente', 400, 'CAPACITY_EXCEEDED')

    const available = await checkTableAvailable(table_id, reservation_date, reservation_time, duration)
    if (!available) throw new AuthError('Mesa no disponible', 400, 'NOT_AVAILABLE')

    const updated = await updateReservation({
      reservation_id: id,
      table_id,
      num_people,
      service,
      reservation_date,
      reservation_time,
      duration
    })

    if (!updated) throw new AuthError('No se pudo actualizar la reserva', 400, 'UPDATE_FAILED')

    res.json({ success: true, message: 'Reserva actualizada por el admin' })
  } catch (error) {
    next(error)
  }
}

export async function getAllReservationsController(req, res, next) {
  try {
    const reservations = await getAllReservations()
    res.json({ success: true, data: reservations })
  } catch (error) {
    next(error)
  }
}

export async function getAllTablesController(req, res, next) {
  try {
    const tables = await getAllTables()
    res.json({ success: true, data: tables })
  } catch (error) {
    next(error)
  }
}

export async function cancelAnyReservationController(req, res, next) {
  try {
    const { id } = req.params
    const { reason } = req.body

    const cancelled = await cancelReservation(id, reason)

    if (!cancelled) {
      throw new AuthError('Reserva no encontrada', 404, 'NOT_FOUND')
    }

    res.json({ success: true, message: 'Reserva cancelada' })
  } catch (error) {
    next(error)
  }
}

export async function createTableController(req, res, next) {
  try {
    const { number, capacity, location } = req.body

    if (!number || !capacity) {
      throw new AuthError('Faltan datos requeridos', 400, 'BAD_REQUEST')
    }

    const table = await createTable({ number, capacity, location })

    if (!table) {
      throw new AuthError('No se pudo crear la mesa', 400, 'CREATE_FAILED')
    }

    res.status(201).json({ success: true, data: table })
  } catch (error) {
    next(error)
  }
}

export async function updateTableController(req, res, next) {
  try {
    const { id } = req.params
    const { number, capacity, location } = req.body

    if (!number || !capacity) {
      throw new AuthError('Faltan datos requeridos', 400, 'BAD_REQUEST')
    }

    const updated = await updateTable({ id, number, capacity, location })

    if (!updated) {
      throw new AuthError('Mesa no encontrada', 404, 'NOT_FOUND')
    }

    res.json({ success: true, message: 'Mesa actualizada' })
  } catch (error) {
    next(error)
  }
}

export async function deleteTableController(req, res, next) {
  try {
    const { id } = req.params

    const deleted = await deleteTable(id)

    if (!deleted) {
      throw new AuthError('Mesa no encontrada', 404, 'NOT_FOUND')
    }

    res.json({ success: true, message: 'Mesa eliminada' })
  } catch (error) {
    next(error)
  }
}