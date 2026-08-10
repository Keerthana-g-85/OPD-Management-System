import { GraphQLError } from "graphql";
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
      throw new GraphQLError("Error while getting doctors");
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
      return await database.transaction(async (manager) => {
        const userRepo = manager.getRepository(Users);
        const doctorRepo = manager.getRepository(Doctor);
        const departmentRepo = manager.getRepository(Department);

        const userEmail = await userRepo.findOneBy({
          email: email,
        });

        if (userEmail) {
          throw new GraphQLError("User already present");
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

        const userId = await userRepo.save(user);

        const departmentId = await departmentRepo.findOneBy({
          id: department,
        });

        if (!departmentId) {
          throw new GraphQLError("Department not found");
        }

        const doctors = doctorRepo.create({
          users: userId,
          department: departmentId,
          qualification,
          experience,
          charges,
        });

        await doctorRepo.save(doctors);

        return {
          success: true,
          message: "Doctor successfully added",
        };
      });
    } catch (error) {
      console.log(error);
      throw new GraphQLError("Error while creating the doctors");
    }
  }

  async updateDoctor(input: UpdateDoctorArguments) {
    try {
      return await database.transaction(async (manager) => {
        const usersRepo = manager.getRepository(Users);
        const doctorRepo = manager.getRepository(Doctor);
        const user = await usersRepo.findOneBy({ id: input.id });
        if (!user) {
          throw new GraphQLError("Doctor not present");
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
          await usersRepo.update({ id: input.id }, { ...userData });
        }
        const doctor = await doctorRepo.findOne({
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
          await doctorRepo.update({ id: doctor.id }, doctorInput);
        } else {
          console.log("No doctor");
        }
        return {
          success: true,
          message: "Doctor updated",
        };
      });
    } catch (error) {
      console.log(error);
      throw new GraphQLError("Error while updating doctors ");
    }
  }
}
