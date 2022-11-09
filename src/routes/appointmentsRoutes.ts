import express from "express";
import { listAppointments,insertAppointment } from "../controllers/appointmentsController.js";

const router = express.Router();

router.get("/appointments",listAppointments); //TODO - verificar necessidade de validar usuário
router.post("/appointments", insertAppointment); //TODO - validar usuario

export default router;