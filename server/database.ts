import { DataSource, type DataSourceOptions } from "typeorm";
import dotenv from "dotenv";
import Users from "./models/Users.js";
import Doctor from "./models/Doctor.js";
import Department from "./models/Department.js";
import Appoitment from "./models/Appoitment.js";
import Consultation from "./models/Consultation.js";
import Medicine from "./models/Medicine.js";
import Pharmacist from "./models/Pharmacist.js";
import Prescription from "./models/Prescription.js";
import Patient from "./models/Patient.js";

dotenv.config();

export const database = new DataSource({
  type: process.env.DB_TYPE as "postgres",
  username: process.env.DB_USER as string,
  host: process.env.DB_HOST as string,
  database: process.env.DB_NAME as string,
  password: process.env.DB_PASSWORD as string,
  port: Number(process.env.DB_PORT),
  synchronize: false,
  entities: [Users , Doctor , Department , Appoitment , Consultation , Medicine , Pharmacist , Prescription,Patient ],
  migrations: ["./migrations/*.ts"],
});

export const connection = async () => {
  try {
    await database.initialize();
    console.log("database connected");
  } catch (error) {
    console.log(error);
    throw error
  }
};
