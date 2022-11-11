import { Request, Response } from "express";
import connection from "../db/db.js";
import { AppointmentSchema, updateStatusSchema } from "../schemas/appointmentSchema.js";
import { AppointmentEntity, Appointment, AppointmentStatus } from "../protocols/Appointment.js"
import { QueryResult } from "pg";


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

        const deleteOne:QueryResult = await connection.query(`DELETE FROM appointments WHERE id = $1;`,[id]);

        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}


// CRUD - UPDATE
async function updateAppointment(req:Request, res:Response) {
    const { id } = req.params;
    const  status = req.body.status as AppointmentStatus;

    try {
        const findId:number[] = (await connection.query(`SELECT * FROM appointments WHERE id = $1;`,[id])).rows;
        
        if(findId.length === 0){
            return res.sendStatus(404);
        }
        
        const { error } = updateStatusSchema.validate(req.body);
        if(error){ 
            return res.status(400).send({erro: error.message})
        }     
        const updateStatus:QueryResult = await connection.query(`Update appointments SET status =$1 WHERE id = $2;`,[status, id]);
        
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

//Filtro por status
async function appointmentsByStatus(req:Request, res:Response) {
    const  { status } = req.query as AppointmentStatus;
    try {
        const filterAppointments: QueryResult<AppointmentEntity> = await connection.query(`SELECT * FROM appointments WHERE status = $1;`,[status]);
        const result:AppointmentEntity[] = filterAppointments.rows;    
            
        const { error } = updateStatusSchema.validate(req.query);
        if(error){ 
            return res.status(400).send({erro: error.message})
        }     
        
        if(result.length === 0){
            return res.send(`Você não possui ${status}`);            
        }
        return res.send(result);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
    
}

async function appointmentsScheduled(req:Request, res: Response) {

    try {
        const appointments: QueryResult = await connection.query(`SELECT COUNT("specialistDoctor") AS "scheduledAppointments", "specialistDoctor" FROM appointments GROUP BY "specialistDoctor";`);
        const result: QueryResult[] = appointments.rows;
        return res.send(result);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
    
}

export { listAppointments, insertAppointment, deleteAppointment, updateAppointment, appointmentsByStatus, appointmentsScheduled }