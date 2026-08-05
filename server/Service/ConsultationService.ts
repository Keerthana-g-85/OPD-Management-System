import type CreateConsultationArguments from "../Arguments/Consultation.ts/CreateConsultationArguments.js";
import { database } from "../database.js";
import Consultation from "../models/Consultation.js";

export default class ConsultationService {
  private consultationRepo = database.getRepository(Consultation);
  async addConsultation({
    appointment_id,
    notes,
    follow_up,
    status
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

      const consultation = await this.consultationRepo.create({
        appoitment: { id: appointment_id },
        notes,
        follow_up,
        status
      });
      await this.consultationRepo.save(consultation);
      return {
        success: true,
        message: "consultation created",
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Error while creating consultation",
      };
    }
  }
}
