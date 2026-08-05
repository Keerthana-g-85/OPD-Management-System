import { Arg, Mutation, Resolver } from "type-graphql";
import AppoitmentService from "../Service/AppointmentService.js";
import CreateAppointmentArguments from "../Arguments/Appointment/CreateAppointmentArguments.js";
import AppointmentResponse from "../Response/AppointmentResponse.js";

const appointmentService = new AppoitmentService();
@Resolver()
export default class AppointmentResolver {
    @Mutation(()=>AppointmentResponse)
  async bookAppointment(
    @Arg("input", () => CreateAppointmentArguments)
    input: CreateAppointmentArguments,
  ) {
    return appointmentService.createAppitment(input);
  }
}
