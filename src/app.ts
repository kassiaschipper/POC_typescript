import { Request, Response } from "express";
import express from "express"
import dotenv from "dotenv";

dotenv.config();

const server = express();
server.use(express.json());

server.get("/status", (req:Request, res:Response) => {
    return res.send("Rodando");
})


server.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})