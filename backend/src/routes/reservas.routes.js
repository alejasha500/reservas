import { Router } from "express";
import { authMiddleware } from '../middlewares/authMiddlewares.js'
import { checkRole } from '../middlewares/checkRole.js'


const router = Router()


 // crear una nueva reserva (usuario)
router.post('reservations')


//obtener todas las reservas activas 
router.get('reservations')

// ver detalles de una reserva especifica del usuario
router.get('reservations/:id')

// cancelar una reserva (actualizar enum en cancelada, guarda motivo_cancelacion y cancelled_at)
router.patch('reservations/:id/cancel')