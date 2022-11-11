import express from "express";
import { listAppointments,insertAppointment, deleteAppointments, updateAppointment, appointmentsByStatus, appointmentsScheduled} from "../controllers/appointmentsController.js";

const router = express.Router();

router.get("/appointments",listAppointments); 
router.post("/appointments", insertAppointment); 
router.delete("/appointments/:id", deleteAppointments);
router.put("/appointments/:id", updateAppointment); 
router.get("/appointments/status", appointmentsByStatus);
router.get("/appointments/scheduled", appointmentsScheduled)
;
export default router;