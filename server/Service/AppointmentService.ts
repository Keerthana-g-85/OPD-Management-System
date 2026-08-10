import { GraphQLError } from "graphql";
import type CancelAppointmentArguments from "../Arguments/Appointment/CancelAppointment.js";
import type CreateAppointmentArguments from "../Arguments/Appointment/CreateAppointmentArguments.js";
import type { GetAppointmentArgument } from "../Arguments/Appointment/GetAppointment.js";
import { database } from "../database.js";
import Appoitment, { APStatus } from "../models/Appointment.js";
import Patient from "../models/Patient.js";
import type RescheduleAppointmentArguments from "../Arguments/Appointment/ResheduleAppointment.js";
import Slot from "../models/Slot.js";

export default class AppoitmentService {
  private appoitmentRepo = database.getRepository(Appoitment);
  private patientRepo = database.getRepository(Patient);
  private slotRepo = database.getRepository(Slot);
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

  async cancelAppointment({ id }: CancelAppointmentArguments) {
    try {
      const appointment = await this.appoitmentRepo.findOneBy({
        id,
      });

      if (!appointment) {
        throw new GraphQLError("Appointment not found");
      }

      if (appointment.status === APStatus.booked) {
        await this.appoitmentRepo.update(
          { id },
          {
            status: APStatus.cancelled,
          },
        );
      } else {
        throw new GraphQLError("Appointment can not be cancelled");
      }
      return {
        success: true,
        message: "Appointment cancelled successfully",
      };
    } catch (error) {
      console.log(error);
      throw new GraphQLError("Error while cancelling appointment");
    }
  }

  async rescheduleAppointment({
    id,
    appointment_date,
    slot_id,
  }: RescheduleAppointmentArguments) {
    try {
      const appointment = await this.appoitmentRepo.findOne({
        where: { id },
        relations: {
          doctor: true,
        },
      });

      if (!appointment) {
        throw new GraphQLError("Appointment not found");
      }

      if (appointment.status !== APStatus.booked) {
        throw new GraphQLError("Only booked appointments can be rescheduled");
      }

      const exist = await this.appoitmentRepo.findOne({
        where: {
          doctor: {
            id: appointment.doctor.id,
          },
          slot: {
            id: slot_id,
          },
          appointment_date,
          status: APStatus.booked,
        },
      });

      if (exist && exist.id !== id) {
        throw new GraphQLError("Slot already booked");
      }
      const slot = await this.slotRepo.findOneBy({
        id: slot_id,
      });
      if (!slot) {
        throw new GraphQLError("Slot not found");
      }
      await this.appoitmentRepo.update(
        { id },
        {
          appointment_date,
          slot,
        },
      );
      return {
        success: true,
        message: "Appointment rescheduled successfully",
      };
    } catch (error) {
      console.log(error);
      throw new GraphQLError("Error while rescheduling appointment");
    }
  }
  async checkedappointment(id: string) {
    try {
      const appointment = await this.appoitmentRepo.findOneBy({
        id,
      });

      if (!appointment) {
        throw new GraphQLError("Appointment not found");
      }

      if (appointment.status !== APStatus.booked) {
        throw new GraphQLError("Can check in only booked patients");
      }

      await this.appoitmentRepo.update(
        { id },
        {
          status: APStatus.checked_in,
        },
      );

      return {
        success: true,
        message: "Patient checked in successfully",
      };
    } catch (error) {
      console.log(error);
      throw new GraphQLError("Error while checking in patient");
    }
  }
}
