import api from './axiosConfig'

// Usuario
export const getAvailableTablesApi = async (reservation_date, reservation_time, duration, num_people) => {
  const response = await api.get('/reservations/available-tables', {
    params: { reservation_date, reservation_time, duration, num_people }
  })
  return response.data
}

export const createReservationApi = async (reservationData) => {
  const response = await api.post('/reservations', reservationData)
  return response.data
}

export const getMyReservationsApi = async () => {
  const response = await api.get('/reservations/my-reservations')
  return response.data
}

export const getReservationByIdApi = async (id) => {
  const response = await api.get(`/reservations/${id}`)
  return response.data
}

export const updateReservationApi = async (id, reservationData) => {
  const response = await api.put(`/reservations/${id}`, reservationData)
  return response.data
}

export const cancelReservationApi = async (id, reason) => {
  const response = await api.put(`/reservations/${id}/cancel`, { reason })
  return response.data
}

// Admin
export const getAllReservationsApi = async () => {
  const response = await api.get('/reservations/admin/reservations')
  return response.data
}

export const updateReservationAdminApi = async (id, reservationData) => {
  const response = await api.put(`/reservations/admin/reservations/${id}`, reservationData)
  return response.data
}

export const cancelReservationAdminApi = async (id, reason) => {
  const response = await api.put(`/reservations/admin/reservations/${id}/cancel`, { reason })
  return response.data
}

export const getAllTablesApi = async () => {
  const response = await api.get('/reservations/admin/tables')
  return response.data
}

export const createTableApi = async (tableData) => {
  const response = await api.post('/reservations/admin/tables', tableData)
  return response.data
}

export const updateTableApi = async (id, tableData) => {
  const response = await api.put(`/reservations/admin/tables/${id}`, tableData)
  return response.data
}

export const deleteTableApi = async (id) => {
  const response = await api.delete(`/reservations/admin/tables/${id}`)
  return response.data
}
