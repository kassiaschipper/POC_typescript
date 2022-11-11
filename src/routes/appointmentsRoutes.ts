import express from "express";
import { listAppointments,insertAppointment, deleteAppointment, updateAppointment, appointmentsByStatus, appointmentsScheduled} from "../controllers/appointmentsController.js";

const router = express.Router();

router.get("/appointments",listAppointments); 
router.post("/appointments", insertAppointment); 
router.delete("/appointments/:id", deleteAppointment);
router.put("/appointments/:id", updateAppointment); 
router.get("/appointments/status", appointmentsByStatus);
router.get("/appointments/scheduled", appointmentsScheduled)
;
export default router;