import Joi from "joi";

export const AppointmentSchema = Joi.object({
    specialistDoctor: Joi.string().required(),
    appointmentDate: Joi.date().required(),
    appointmentAddress: Joi.string().required(),
    comments: Joi.string(), 
    status: Joi.string().valid("Consulta Marcada", "Consulta Cancelada", "Consulta Realizada").required(),
})

export const updateStatusSchema = Joi.object({
    status: Joi.string().valid("Consulta Marcada", "Consulta Cancelada", "Consulta Realizada").required(),
})