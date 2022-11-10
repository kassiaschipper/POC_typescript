import express from "express";
import { listAppointments,insertAppointment, deleteAppointment } from "../controllers/appointmentsController.js";

const router = express.Router();

router.get("/appointments",listAppointments); 
router.post("/appointments", insertAppointment); 
router.delete("/appointments/:id", deleteAppointment);

export default router;