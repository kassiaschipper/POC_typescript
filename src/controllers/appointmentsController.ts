import { Request, Response } from "express";
import connection from "../db/db.js";
import { AppointmentSchema } from "../schemas/appointmentSchema.js";
import { AppointmentEntity, Appointment } from "../protocols/Appointment.js"
import { QueryResult } from "pg";
import { array, number } from "joi";

//CRUD - READ
async function listAppointments(req:Request, res:Response){
    try {
        const result:QueryResult<AppointmentEntity> = (await connection.query(`SELECT * FROM appointments;`));
        
        return res.send(result.rows)
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
         
}

//CRUD - CREATE
async function insertAppointment(req:Request, res:Response){
    const { specialistDoctor, appointmentDate, appointmentAddress, comments, status } = req.body as Appointment;
     
    try {
        const { error } = AppointmentSchema.validate(req.body);
        if(error){ 
            return res.status(400).send({erro: error.message})
        }
        await connection.query(`INSERT INTO appointments ("specialistDoctor", "appointmentDate", "appointmentAddress", comments, status) VALUES ($1, $2, $3, $4, $5);`,[specialistDoctor, appointmentDate, appointmentAddress, comments, status ])
        
        return res.send("Ok"); 

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }   
}

//CRUD - DELETE
async function deleteAppointment (req:Request, res:Response){
    const { id } = req.params;

    try {
        const findId:number[] = (await connection.query(`SELECT * FROM appointments WHERE id = $1;`,[id])).rows;
        
        if(findId.length === 0){
            return res.sendStatus(404);
        }

        const deleteAppointment:QueryResult = await connection.query(`DELETE FROM appointments WHERE id = $1;`,[id]);

        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}


// CRUD - UPDATE

export {listAppointments, insertAppointment, deleteAppointment}