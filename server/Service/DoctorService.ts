import type CreateDoctorArguments from "../Arguments/Doctor/CreateDoctor.js";
import { database } from "../database.js";
import Department from "../models/Department.js";
import Doctor from "../models/Doctor.js";
import Users from "../models/Users.js";
import bcrypt from "bcrypt";

export default class DoctorService {
  private doctorRepo = database.getRepository(Doctor);

  async getDoctor() {
    try {
      const doctors = await this.doctorRepo.find({
        relations: { users: true , department: true,},
      });
      return {
        success: true,
        message: "Doctors successfully fetched",
        doctors,
       
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Error while getting the doctors",
      };
    }
  }

  async createDoctor({
    name,
    email,
    age,
    gender,
    address,
    phone,
    password,
    role,
    image,
    department,
    qualification,
    experience,
    charges,
  }: CreateDoctorArguments) {
    try {
      console.log(name,
    email,
    age,
    gender,
    address,
    phone,
    password,
    role,
    image,
    department,
    qualification,
    experience,
    charges,)
      const usersRepo = database.getRepository(Users);
      const depeartmentRepo = database.getRepository(Department);
      const userEmail = await usersRepo.findOneBy({ email: email });
      if (userEmail) {
        return {
          success: false,
          message: "User already present",
        };
      }
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const user = usersRepo.create({
        name,
        email,
        age,
        gender,
        address,
        phone,
        password: hashPassword,
        role,
        image,
      });

      const userId = await usersRepo.save(user);
      const departmentId = await depeartmentRepo.findOneBy({ id: department });
      if (!departmentId) {
        return {
          success: false,
          message: "Department not found",
        };
      }
      if (userId) {
        const doctors = this.doctorRepo.create({
          users: userId,
          department: departmentId,
          qualification,
          experience,
          charges,
        });

        await this.doctorRepo.save(doctors);
      }

      

      return {
        success: true,
        message: "Doctor successfully added",
      };
    } catch (error) {
      console.log(error)
      return {
        success: false,
        message: "Error while creating the doctors",
      };
    }
  }
}
