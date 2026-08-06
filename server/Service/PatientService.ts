import type CreatePatientArguments from "../Arguments/Patient/CreatePatient.js";
import { database } from "../database.js";
import Patient from "../models/Patient.js";
import Users from "../models/Users.js";
import UpdatepatientArguments from "../Arguments/Patient/UpdatePatient.js";

export default class PatientService {
  private patientRepo = database.getRepository(Patient);
  private usersRepo = database.getRepository(Users);
  async getPatient() {
    try {
      const patients = await this.patientRepo.find({
        relations: { users: true },
      });
      return {
        success: true,
        message: "Getting patient",
        patients,
      };
    } catch (error) {
      console.log(error);
      throw {
        success: false,
        message: "Error while getting patient",
      };
    }
  }

  async createPatient({
    name,
    email,
    age,
    gender,
    address,
    phone,
    password,
    role,
    image,
    height,
    weight,
    marital_status,
    occupation,
    allergies,
  }: CreatePatientArguments) {
    try {
      const userEmail = await this.usersRepo.findOneBy({ email: email });
      if (userEmail) {
        throw {
          success: false,
          message: "User already present",
        };
      }
      const user = this.usersRepo.create({
        name,
        email,
        age,
        gender,
        address,
        phone,
        password,
        role,
        image,
      });
      const userId = await this.usersRepo.save(user);
      if (userId) {
        const patient = this.patientRepo.create({
          users: userId,
          height,
          weight,
          marital_status,
          occupation,
          allergies,
        });

        await this.patientRepo.save(patient);
      }
      return {
        success: true,
        message: "Patient successfully added",
      };
    } catch (error) {
      console.log(error);
      throw {
        success: false,
        message: "Error while creating patient",
      };
    }
  }

  async updatepatient(input: UpdatepatientArguments) {
    try {
      const user = await this.usersRepo.findOneBy({ id: input.id });
      if (!user) {
        return {
          success: false,
          message: "patient not present patients",
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
      };
      const userData: Users = {
        ...user,
        ...userInput,
      };
      if (userData) {
        await this.usersRepo.update({ id: input.id }, { ...userData });
      }
      const patient = await this.patientRepo.findOne({
        where: { users: { id: user.id } },
      });
      console.log(patient);
      if (patient) {
        const patientInput = {
          marital_status: input.marital_status || patient.marital_status,
          occupation: input.occupation || patient.occupation,
          height: input.height || patient.height,
          weight: input.weight || patient.weight,
          allergies: input.allergies || patient.allergies,
        };

        await this.patientRepo.update({ id: patient.id }, patientInput);
      } else {
        console.log("No patient");
      }
      return {
        success: true,
        message: "patient updated",
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Error while updating the patients",
      };
    }
  }
}
