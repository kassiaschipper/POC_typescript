import { Query, QueryResult } from "pg";
import connection from "../db/db.js";
import { Appointment, AppointmentEntity, AppointmentStatus } from "../protocols/Appointment.js";

const getAppointments = async (): Promise<QueryResult<AppointmentEntity>> => {
    return (await connection.query(`SELECT * FROM appointments;`));
};

const postAppointments = async (specialistDoctor:string, appointmentDate:string | Date, appointmentAddress:string, comments:string, status:string): Promise<QueryResult> => {
    return await connection.query(`INSERT INTO appointments 
    ("specialistDoctor", "appointmentDate", "appointmentAddress", comments, status) VALUES ($1, $2, $3, $4, $5);`, 
    [specialistDoctor, appointmentDate, appointmentAddress, comments, status])
}

const findAppointmentById =async (id:string) => {
    return (await connection.query(`SELECT * FROM appointments WHERE id = $1;`,[id])).rows;
}

const deleteAppointment = async (id:string): Promise<QueryResult> => {
    return connection.query(`DELETE FROM appointments WHERE id = $1;`,[id])
}

const putAppointment =async (status:AppointmentStatus, id:string):Promise<QueryResult> => {
    return await connection.query(`Update appointments SET status =$1 WHERE id = $2;`,[status, id])
}

const findAppointmentByStatus =async (status:string): Promise<QueryResult> => {
    return connection.query(`SELECT * FROM appointments WHERE status = $1;`,[status])
}

const getScheduledAppontments =async ():Promise<QueryResult<[]>> => {
    return connection.query(`SELECT COUNT("specialistDoctor") AS "scheduledAppointments", "specialistDoctor" FROM appointments GROUP BY "specialistDoctor";`)
}

export { getAppointments, postAppointments, deleteAppointment,findAppointmentById, putAppointment, findAppointmentByStatus, getScheduledAppontments }