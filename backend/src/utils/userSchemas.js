import Joi from "joi";


export const registerSchema = Joi.object({
    name: Joi.string().min(2).required().messages({
        "string.empty": " el nombre es obligatorio",
        "string.min":  " el nombre debe tener al menos 2 caracteres"
    }),
    email: Joi.string().email().required().messages({
        "string.empty": " el email es obligatorio",
        "string.email": "el email no tiene un formato válido"
    }),
    password: Joi.string().min(6).required().messages({
        "string.empty": " la contraseña es obligatoria",
        "string.min": " la contraseña debe tener al menos 6 caracteres"
    })
})


export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})