import { DataSource, type DataSourceOptions } from "typeorm";

import dotenv from "dotenv";
import Users from "./models/Users.js";
import Doctor from "./models/Doctor.js";
import Department from "./models/Department.js";

dotenv.config();

export const database = new DataSource({
  type: process.env.DB_TYPE as "postgres",
  username: process.env.DB_USER as string,
  host: process.env.DB_HOST as string,
  database: process.env.DB_NAME as string,
  password: process.env.DB_PASSWORD as string,
  port: Number(process.env.DB_PORT),
  synchronize: true,
  entities: [Users , Doctor , Department],
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
