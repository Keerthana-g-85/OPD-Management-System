import Users, { Role } from "../models/Users.js";
import Appointment from "../models/Appointment.js";
import { database } from "../database.js";
import { GraphQLError } from "graphql";

export default class AdminDashboardService {
  private userRepository = database.getRepository(Users);
  private appointmentRepository = database.getRepository(Appointment);
  async getDashboard() {
    try {
      const totalDoctors = await this.userRepository.count({
        where: {
          role: Role.doctor,
        },
      });

      const totalReceptionists = await this.userRepository.count({
        where: {
          role: Role.receptionists,
        },
      });

      const totalPharmacists = await this.userRepository.count({
        where: {
          role: Role.pharmacists,
        },
      });

      const totalPatients = await this.userRepository.count({
        where: {
          role: Role.patient,
        },
      });

      const today = new Date().toISOString().split("T")[0]!;

      const todaysAppointments = await this.appointmentRepository.count({
        where: {
          appointment_date: today,
        },
      });

      const weekAppointment = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const appointmentDate = date.toISOString().split("T")[0]!;
        const count = await this.appointmentRepository.count({
          where: {
            appointment_date: appointmentDate,
          },
        });

        weekAppointment.push({
          day: appointmentDate,
          count: count,
        });
      }

      return {
        totalDoctors,
        totalReceptionists,
        totalPharmacists,
        totalPatients,
        todaysAppointments,
        weekAppointment,
      };
    } catch (error) {
      console.log(error);
      throw new GraphQLError("Error while getting dashboard details");
    }
  }
}
