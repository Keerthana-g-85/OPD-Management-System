import type CreateDoctorArguments from "../Arguments/Doctor/CreateDoctor.js";
import type GetDoctorArguments from "../Arguments/Doctor/GetDoctor.js";
import type UpdateDoctorArguments from "../Arguments/Doctor/UpdateDoctor.js";
import { database } from "../database.js";
import Department from "../models/Department.js";
import Doctor from "../models/Doctor.js";
import Users from "../models/Users.js";
import bcrypt from "bcrypt";

export default class DoctorService {
  private doctorRepo = database.getRepository(Doctor);
  private usersRepo = database.getRepository(Users);

  async getDoctor({ department_id }: GetDoctorArguments) {
    let doctors;
    try {
      if (department_id) {
        doctors = await this.doctorRepo.find({
          where: { department: { id: department_id } },
          relations: {
            department: true,
            users: true,
          },
          order: {
            users: {
              createdAt: "DESC",
            },
          },
        });
      } else {
        doctors = await this.doctorRepo.find({
          relations: { users: true, department: true },
          order: {
            users: {
              createdAt: "DESC",
            },
          },
        });
      }
      return {
        success: true,
        message: "Doctors successfully fetched",
        doctors,
      };
    } catch (error) {
      console.log(error);
      throw {
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
    status,
  }: CreateDoctorArguments) {
    try {
      console.log(
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
      );

      const depeartmentRepo = database.getRepository(Department);
      const userEmail = await this.usersRepo.findOneBy({ email: email });
      if (userEmail) {
        throw {
          success: false,
          message: "User already present",
        };
      }
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const user = this.usersRepo.create({
        name,
        email,
        age,
        gender,
        address,
        phone,
        password: hashPassword,
        role,
        image,
        status,
      });

      const userId = await this.usersRepo.save(user);
      const departmentId = await depeartmentRepo.findOneBy({ id: department });
      if (!departmentId) {
        throw {
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
      console.log(error);
      throw {
        success: false,
        message: "Error while creating the doctors",
      };
    }
  }

  async updateDoctor(input: UpdateDoctorArguments) {
    try {
      const user = await this.usersRepo.findOneBy({ id: input.id });
      if (!user) {
        return {
          success: false,
          message: "Doctor not present doctors",
        };
      }
      const userInput = {
        name: input.name || user.name,
        age: input.age || user.age,
        email: input.email || user.email,
        gender: input.gender || user.gender,
        address: input.address || user.address,
        phone: input.phone || user.phone,
        image: input.image || user.image,
        status: input.status ?? user.status,
      };
      const userData: Users = {
        ...user,
        ...userInput,
      };
      if (userData) {
        await this.usersRepo.update({ id: input.id }, { ...userData });
      }
      const doctor = await this.doctorRepo.findOne({
        where: { users: { id: user.id } },
      });
      console.log(doctor);
      if (doctor) {
        const doctorInput = {
          qualification: input.qualification || doctor.qualification,
          experience: input.experience || doctor.experience,
          charges: input.charges || doctor.charges,
        };
        console.log(input);
        await this.doctorRepo.update({ id: doctor.id }, doctorInput);
      } else {
        console.log("No doctor");
      }
      return {
        success: true,
        message: "Doctor updated",
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Error while updating the doctors",
      };
    }
  }
}
