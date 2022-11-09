import { Request, Response } from "express";
import express from "express"
import dotenv from "dotenv";
import appointmentsRoutes from "./routes/appointmentsRoutes.js"

dotenv.config();

const server = express();
server.use(express.json());

server.get("/status", (req:Request, res:Response) => {
    return res.send("Rodando");
})

server.use(appointmentsRoutes);

server.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})