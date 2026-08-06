import type CreateAppointmentArguments from "../Arguments/Appointment/CreateAppointmentArguments.js";
import type { GetAppointmentArgument } from "../Arguments/Appointment/GetAppointment.js";
import { database } from "../database.js";
import Appoitment, { APStatus } from "../models/Appointment.js";
import Patient from "../models/Patient.js";

export default class AppoitmentService {
  private appoitmentRepo = database.getRepository(Appoitment);
  private patientRepo = database.getRepository(Patient);
  async createAppitment({
    patient_id,
    doctor_id,
    slot_id,
    appointment_date,
  }: CreateAppointmentArguments) {
    try {
      const patient = await this.patientRepo.findOneBy({ id: patient_id });
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
        patient: { id: patient_id },
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

  async getAppointments() {
    try {
      const appointment = await this.appoitmentRepo.find({
        relations: {
          slot: true,
          doctor: {
            users: true,
          },
          patient: {
            users: true,
          },
        },
      });
      return {
        success: true,
        message: "all appointments",
        appointment,
      };
    } catch (error) {
      throw {
        success: false,
        message: "Error while getting the appointment",
      };
    }
  }

  async getAppointmentSlots(args: GetAppointmentArgument) {
    try {
      const doctorappoint = await this.appoitmentRepo.find({
        where: {
          doctor: {
            id: args.doctor_id,
          },
          appointment_date: args.appointment_date,
        },
        relations: {
          slot: true,
        },
      });

      return {
        success: true,
        message: "Booked slots fetched successfully",
        slots: doctorappoint.map((a) => a.slot),
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: " unable to get the doctors slot",
      };
    }
  }
}
