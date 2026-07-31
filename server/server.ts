import express from "express";
import dotenv from "dotenv";
import { connection } from "./database.js";
dotenv.config();

const app = express();
app.use(express.json());
await connection();
app.listen(process.env.PORT, () => {
  console.log("server started");
});
