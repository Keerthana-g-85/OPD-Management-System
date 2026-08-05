import { Arg, Mutation, Resolver } from "type-graphql";
import ConsultationService from "../Service/ConsultationService.js";
import CreateConsultationArguments from "../Arguments/Consultation.ts/CreateConsultationArguments.js";
import ConsultationResponse from "../Response/ConsultationResponse.js";

const consultationService = new ConsultationService();
@Resolver()
export default class ConsultationResolver {
  @Mutation(()=>ConsultationResponse)
  addConsultation(
    @Arg("input", () => CreateConsultationArguments)
    input: CreateConsultationArguments,
  ) {
    return consultationService.addConsultation(input);
  }
}
