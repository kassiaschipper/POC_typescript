export type Appointment = {
    specialistDoctor: string,
    appointmentDate: string | Date,
    appointmentAddress: string,
    comments?: string, 
    status: string,
}