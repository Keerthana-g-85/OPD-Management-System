import { GraphQLError } from "graphql";
import type CreatePrescriptionArguments from "../Arguments/Prescription/CreatePrescriptionArguments.js";
import { database } from "../database.js";
import Consultation from "../models/Consultation.js";
import Prescription from "../models/Prescription.js";

export default class PrescriptionService {
  private prescriptionRepo = database.getRepository(Prescription);
  private consultationRepo = database.getRepository(Consultation);
  // async addPrescription({
  //   consultation_id,
  //   frequency,
  //   dosage,
  //   duration,
  //   name
  // }: CreatePrescriptionArguments) {
  //   try {
  //     const consultation = await this.consultationRepo.findOneBy({
  //       id: consultation_id,
  //     });
  //     if (!consultation) {
  //       return {
  //         success: false,
  //         message: "Consultation not present ",
  //       };
  //     }
  //     const prescription = this.prescriptionRepo.create({
  //       consultation: { id: consultation_id },
  //       frequency,
  //       dosage,
  //       duration,
  //       name
  //     });

  //     await this.prescriptionRepo.save(prescription);
  //     return{
  //       success : true ,
  //       message : "Prescription added"
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     return {
  //       success: false,
  //       message: "Error while creating prescription",
  //     };
  //   }
  // }

  async getPrescriptions(appointment_id: string) {
    try {
      const prescriptions = await this.prescriptionRepo.find({
        where: {
          consultation: {
            appoitment: {
              id: appointment_id,
            },
          },
        },
      });

      return {
        success: true,
        message: "Prescriptions fetched successfully",
        prescriptions,
      };
    } catch (error) {
      console.log(error);
      throw new GraphQLError("Error while getting prescriptions");
    }
  }
}
