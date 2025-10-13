// utils/reservationSchemas.js
import Joi from 'joi'

export const createReservationSchema = Joi.object({
  table_id: Joi.number().integer().required(),
  num_people: Joi.number().integer().min(1).max(50).required(),
  service: Joi.string().valid('desayuno', 'almuerzo', 'cena').required(),
  reservation_date: Joi.date().iso().min('now').required(),
  reservation_time: Joi.string().pattern(/^([01]\d|2[0-3]):[0-5]\d$/).required(),
  duration: Joi.number().integer().min(1).max(8).required()
})

export const updateReservationSchema = Joi.object({
  table_id: Joi.number().integer().required(),
  num_people: Joi.number().integer().min(1).max(50).required(),
  service: Joi.string().valid('desayuno', 'almuerzo', 'cena').required(),
  reservation_date: Joi.date().iso().min('now').required(),
  reservation_time: Joi.string().pattern(/^([01]\d|2[0-3]):[0-5]\d$/).required(),
  duration: Joi.number().integer().min(1).max(8).required()
})

export const createTableSchema = Joi.object({
  number: Joi.string().required(),
  capacity: Joi.number().integer().min(1).max(50).required(),
  location: Joi.string().optional()
})

export const updateTableSchema = Joi.object({
  number: Joi.string().required(),
  capacity: Joi.number().integer().min(1).max(50).required(),
  location: Joi.string().optional()
})