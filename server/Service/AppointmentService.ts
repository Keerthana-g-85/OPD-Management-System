import { GraphQLError } from "graphql";
import type CancelAppointmentArguments from "../Arguments/Appointment/CancelAppointment.js";
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
        throw new GraphQLError("Please register first");
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
        throw new GraphQLError("Slot already booked");
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
      throw new GraphQLError("Error while booking appointment");
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
      throw new GraphQLError("Error while getting appointment");
    }
  }

  async getAppointmentSlots(args: GetAppointmentArgument) {
    try {
      if (args.appointment_date !== undefined) {
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
      } else {
        console.log(args.doctor_id);
        const appointment = await this.appoitmentRepo.find({
          where: {
            doctor: {
              users: {
                id: args.doctor_id,
              },
            },
          },
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
        console.log(appointment);
        return {
          success: true,
          message: "Doctor aAppointment successfully fetched",
          appointment,
        };
      }
    } catch (error) {
      console.log(error);
      throw new GraphQLError("Unable to get doctor appointment");
    }
  }
  async getPrescriptionGeneratedAppointments() {
    try {
      const appointment = await this.appoitmentRepo.find({
        where: {
          status: APStatus.prescription_generated,
        },
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
        message: "Prescription generated appointments",
        appointment,
      };
    } catch (error) {
      console.log(error);
      throw new GraphQLError(
        "Error while getting prescription generated appointments",
      );
    }
  }

  // async cancelAppointment({ id }: CancelAppointmentArguments) {
  //   try {
  //     const appointment = await this.appoitmentRepo.findOneBy({
  //       id,
  //     });

  //     if (!appointment) {
  //       return {
  //         success: false,
  //         message: "Appointment not found",
  //       };
  //     }
  //     appointment.status = APStatus.cancelled;

  //     await this.appoitmentRepo.save(appointment);

  //     return {
  //       success: true,
  //       message: "Appointment cancelled successfully",
  //     };
  //   } catch (error) {
  //     console.log(error);
  //     throw new GraphQLError("Error while cancelling appointment")
  //   }
  // }
}
