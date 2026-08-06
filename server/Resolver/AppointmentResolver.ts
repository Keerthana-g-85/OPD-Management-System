import { Arg, Mutation, Resolver, Query, Args } from "type-graphql";
import AppoitmentService from "../Service/AppointmentService.js";
import CreateAppointmentArguments from "../Arguments/Appointment/CreateAppointmentArguments.js";
import AppointmentResponse from "../Response/AppointmentResponse.js";
import { GetAppointmentArgument } from "../Arguments/Appointment/GetAppointment.js";

const appointmentService = new AppoitmentService();
@Resolver()
export default class AppointmentResolver {
  @Mutation(() => AppointmentResponse)
  async bookAppointment(
    @Arg("input", () => CreateAppointmentArguments)
    input: CreateAppointmentArguments,
  ) {
    return appointmentService.createAppitment(input);
  }

  @Query(() => AppointmentResponse)
  getAppointment() {
    return appointmentService.getAppointments();
  }

  @Query(() => AppointmentResponse)
  getDoctorAppointment(
    @Args(() => GetAppointmentArgument) args: GetAppointmentArgument,
  ) {
    return appointmentService.getAppointmentSlots(args);
  }
}
