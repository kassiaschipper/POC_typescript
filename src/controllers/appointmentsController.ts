import { Request, Response } from "express";
import connection from "../db/db.js";
import { AppointmentSchema } from "../schemas/appointmentSchema.js";
import { Appointment } from "../protocols/Appointment.js"

async function listAppointments(req:Request, res:Response){
    try {
        const result = (await connection.query(`SELECT * FROM appointments;`)).rows;
        return res.send(result)
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
         
}


async function insertAppointment(req:Request, res:Response){
    const { specialistDoctor, appointmentDate, appointmentAddress, comments, status } = req.body as Appointment;
     
    try {
        //validar user, pegar o id e inserir junto com o body
        const { error } = AppointmentSchema.validate(req.body);
        if(error){ 
            return res.status(400).send({erro: error.message})
        }
        const newAppointment:Appointment = await connection.query(`INSERT INTO appointments ("specialistDoctor", "appointmentDate", "appointmentAddress", comments, status) VALUES ($1, $2, $3, $4, $5);`,[specialistDoctor, appointmentDate, appointmentAddress, comments, status ])
        
        return res.send("Ok"); 

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
        
    }


    
}

export {listAppointments, insertAppointment}