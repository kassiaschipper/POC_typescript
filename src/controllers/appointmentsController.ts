import { Request, Response } from "express";
import connection from "../db/db.js";
import { AppointmentSchema } from "../schemas/appointmentSchema.js";

async function listAppointments(req:Request, res:Response){
    try {
        const result = (await connection.query(`SELECT * FROM appointments;`)).rows;
        return res.send(result)
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
         
}


function insertAppointment(req:Request, res:Response){
    
    
    
    const newAppointment = req.body; // as Appointment
    const { error } = AppointmentSchema.validate(newAppointment);
    if(error){ 
        return res.status(400).send({erro: error.message})
    }
}

export {listAppointments, insertAppointment}