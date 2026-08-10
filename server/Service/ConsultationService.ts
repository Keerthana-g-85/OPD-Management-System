import type CreateConsultationArguments from "../Arguments/Consultation.ts/CreateConsultationArguments.js";
import { database } from "../database.js";
import Consultation from "../models/Consultation.js";
import Prescription from "../models/Prescription.js";
import Appointment, { APStatus } from "../models/Appointment.js";
import { GraphQLError } from "graphql";

export default class ConsultationService {
  private consultationRepo = database.getRepository(Consultation);
  private prescriptionRepo = database.getRepository(Prescription);
  private appointmentRepo = database.getRepository(Appointment);
  async addConsultation({
    appointment_id,
    notes,
    follow_up,
    status,
    prescriptions,
  }: CreateConsultationArguments) {
    try {
      const appoExist = await this.consultationRepo.findOne({
        where: { appoitment: { id: appointment_id } },
        relations: { appoitment: true },
      });

      if (appoExist) {
        return {
          success: false,
          message: "Consultation already exist",
        };
      }

      const consult = this.consultationRepo.create({
        appoitment: { id: appointment_id },
        notes,
        follow_up,
        status,
      });
      const consultation = await this.consultationRepo.save(consult);

      for (const item of prescriptions) {
        const prescription = this.prescriptionRepo.create({
          consultation: {
            id: consultation.id,
          },
          name: item.name,
          dosage: item.dosage,
          frequency: item.frequency,
          duration: item.duration,
        });

        await this.prescriptionRepo.save(prescription);
        await this.appointmentRepo.update(
          { id: appointment_id },
          {
            status: APStatus.prescription_generated,
          },
        );
      }

      return {
        success: true,
        message: "consultation created",
        consultation,
      };
    } catch (error) {
      console.log(error);
      throw new GraphQLError("Error while creating consultation")
    }
  }
}
