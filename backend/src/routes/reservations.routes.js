import { Router } from "express";
import { authMiddleware } from '../middlewares/authMiddlewares.js'
import { checkRole } from '../middlewares/checkRole.js'
import { createReservationSchema, updateReservationSchema, createTableSchema, updateTableSchema} from '../utils/reservationSchemas.js'
import { validate } from '../middlewares/validate.js'
import {createReservationController,
        getUserReservationsController,
        getReservationByIdController, 
       getAvailableTablesController,
       cancelMyReservationController,
       updateReservationController, 
       createReservationAdminController,
       updateReservationAdminController,
       getAllReservationsController,
       getAllTablesController,
       cancelAnyReservationController,
       createTableController,
       updateTableController,
       deleteTableController
    } from '../controller/reservations.controller.js'


const router = Router()


// USUARIO
router.get('/available-tables', authMiddleware, getAvailableTablesController)
router.post('/', authMiddleware, validate(createReservationSchema), createReservationController)
router.get('/my-reservations', authMiddleware, getUserReservationsController)
router.get('/:id', authMiddleware, getReservationByIdController)
router.put('/:id', authMiddleware, validate(updateReservationSchema), updateReservationController)
router.put('/:id/cancel', authMiddleware, cancelMyReservationController)

// ADMIN
router.get('/admin/reservations', authMiddleware, checkRole('admin'), getAllReservationsController)
router.post('/admin/reservations', authMiddleware, checkRole('admin'), createReservationAdminController)
router.put('/admin/reservations/:id', authMiddleware, checkRole('admin'), updateReservationAdminController)
router.put('/admin/reservations/:id/cancel', authMiddleware, checkRole('admin'), cancelAnyReservationController)

router.get('/admin/tables', authMiddleware, checkRole('admin'), getAllTablesController)
router.post('/admin/tables', authMiddleware, checkRole('admin'), validate(createTableSchema), createTableController)
router.put('/admin/tables/:id', authMiddleware, checkRole('admin'), validate(updateTableSchema), updateTableController)
router.delete('/admin/tables/:id', authMiddleware, checkRole('admin'), deleteTableController)



export default router

