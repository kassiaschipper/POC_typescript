export type AppointmentEntity = {
    id: number,
    specialistDoctor: string,
    appointmentDate: string | Date,
    appointmentAddress: string,
    comments?: string, 
    status: string,
}

export type Appointment = Omit<AppointmentEntity, "id" >; 

export type AppointmentStatus = Pick<AppointmentEntity, "status">;