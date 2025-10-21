 import { createContext, useContext, useState, useCallback } from 'react'
import { 
  getMyReservationsApi, 
  createReservationApi, 
  cancelReservationApi 
} from '../api/reservationsApi.js'

const ReservationContext = createContext()

export const ReservationProvider = ({ children }) => {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchReservations = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getMyReservationsApi()
      setReservations(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Error al obtener reservas')
    } finally {
      setLoading(false)
    }
  }, [])

  const createReservation = useCallback(async (reservationData) => {
    setLoading(true)
    try {
      const newReservation = await createReservationApi(reservationData)
      setReservations(prev => [...prev, newReservation])
      return newReservation
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear reserva')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const cancelReservation = useCallback(async (id, reason) => {
    setLoading(true)
    try {
      await cancelReservationApi(id, reason)
      setReservations(prev => prev.filter(r => r.id !== id))
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cancelar reserva')
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <ReservationContext.Provider value={{
      reservations,
      loading,
      error,
      fetchReservations,
      createReservation,
      cancelReservation
    }}>
      {children}
    </ReservationContext.Provider>
  )
}

export const useReservations = () => {
  const context = useContext(ReservationContext)
  if (!context) throw new Error('useReservations debe usarse dentro de ReservationProvider')
  return context
}