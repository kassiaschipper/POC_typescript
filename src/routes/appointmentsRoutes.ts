import express from "express";
import { listAppointments } from "../controllers/appointmentsController.js";

const router = express.Router();

router.get("/appointments",listAppointments); //validar usuario

export default router;