import type CreateAppointmentArguments from "../Arguments/Appointment/CreateAppointmentArguments.js";
import { database } from "../database.js";
import Appoitment, { APStatus } from "../models/Appointment.js";
import Patient from "../models/Patient.js";

export default class AppoitmentService {
  private appoitmentRepo = database.getRepository(Appoitment);
  private patientRepo = database.getRepository(Patient);
  async createAppitment({
    name,
    email,
    doctor_id,
    slot_id,
    appointment_date,
  }: CreateAppointmentArguments) {
    try {
      const patient = await this.patientRepo.findOne({
        where: {
          users: {
            name,
            email,
          },
        },
        relations: {
          users: true,
        },
      });

      if (!patient) {
        return {
          success: false,
          message: "Please register first",
        };
      }

      const appoitmentExist = await this.appoitmentRepo.findOne({
        where: {
          doctor: {
            id: doctor_id,
          },
          slot: {
            id: slot_id,
          },
          appointment_date,
          status: APStatus.booked,
        },
        relations: {
          doctor: true,
          slot: true,
        },
      });
      if (appoitmentExist) {
        return {
          success: false,
          message: "slot is already booked.",
        };
      }
      const appointment = this.appoitmentRepo.create({
        appointment_date,
        patient: { id: patient.id },
        doctor: { id: doctor_id },
        slot: { id: slot_id },
        status: APStatus.booked,
      });
      await this.appoitmentRepo.save(appointment);

      return {
        success: true,
        message: "Appointment Booked",
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Error while Booking Appointment",
      };
    }
  }
}
