import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { 
  getMyReservationsApi, 
  createReservationApi, 
  cancelReservationApi 
} from '../api/reservationsApi.js'

const ReservationContext = createContext(null)

export const ReservationProvider = ({ children }) => {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchReservations = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getMyReservationsApi()
      setReservations(data.reservations || data)
    } catch (err) {
      setError(err.response?.data?.error || 'Error al obtener reservas')
    } finally {
      setLoading(false)
    }
  }, [])

  const createReservation = useCallback(async (reservationData) => {
    setLoading(true)
    setError(null)
    try {
      const newReservation = await createReservationApi(reservationData)
      setReservations(prev => [...prev, newReservation])
      return newReservation
    } catch (err) {
      setError(err.response?.data?.error || 'Error al crear reserva')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const cancelReservation = useCallback(async (id, reason) => {
    setLoading(true)
    setError(null)
    try {
      await cancelReservationApi(id, reason)
      setReservations(prev => prev.map(r => 
        r.id === id ? {...r, status: 'cancelada'} : r
      ))
    } catch (err) {
      setError(err.response?.data?.error || 'Error al cancelar reserva')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const clearError = useCallback(() => setError(null), [])

  const value = useMemo(() => ({
    reservations,
    loading,
    error,
    fetchReservations,
    createReservation,
    cancelReservation,
    clearError
  }), [reservations, loading, error, fetchReservations, createReservation, cancelReservation, clearError])

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  )
}

export const useReservations = () => {
  const context = useContext(ReservationContext)
  if (!context) throw new Error('useReservations debe usarse dentro de ReservationProvider')
  return context
}