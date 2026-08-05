import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { connection } from "./database.js";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { expressMiddleware } from "@as-integrations/express4";
import UserResolver from "./Resolver/UserResolver.js";
import DoctorResolver from "./Resolver/DoctorResolver.js";
import DepartmentResolver from "./Resolver/DepartmentResolver.js";
import PatientResolver from "./Resolver/PatientResolver.js";
import PharmacistResolver from "./Resolver/PharmacistResolver.js";
import AppointmentResolver from "./Resolver/AppointmentResolver.js";
import ConsultationResolver from "./Resolver/ConsultationResolver.js";
import PrescriptionResolver from "./Resolver/PrescriptionResolver.js";

dotenv.config();

const app = express();
app.use(cors({origin:"http://localhost:5173"}))
const schema = await buildSchema({resolvers :[UserResolver , DoctorResolver , DepartmentResolver , PatientResolver ,PharmacistResolver ,AppointmentResolver ,ConsultationResolver ,PrescriptionResolver]})
const server = new ApolloServer({schema})
server.start()

app.use(express.json());
await connection();
app.use("/graphql",express.json(),expressMiddleware(server))
app.listen(process.env.PORT, () => {
  console.log("server started");
});
