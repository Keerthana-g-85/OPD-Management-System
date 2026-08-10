import { Arg, Mutation, Resolver, Query, Args, Authorized } from "type-graphql";
import AppoitmentService from "../Service/AppointmentService.js";
import CreateAppointmentArguments from "../Arguments/Appointment/CreateAppointmentArguments.js";
import AppointmentResponse from "../Response/AppointmentResponse.js";
import { GetAppointmentArgument } from "../Arguments/Appointment/GetAppointment.js";
import CancelAppointmentArguments from "../Arguments/Appointment/CancelAppointment.js";
import { Role } from "../models/Users.js";
import RescheduleAppointmentArguments from "../Arguments/Appointment/ResheduleAppointment.js";

const appointmentService = new AppoitmentService();
@Resolver()
export default class AppointmentResolver {
  @Authorized(Role.receptionists, Role.patient)
  @Mutation(() => AppointmentResponse)
  async bookAppointment(
    @Arg("input", () => CreateAppointmentArguments)
    input: CreateAppointmentArguments,
  ) {
    return appointmentService.createAppitment(input);
  }

  @Authorized()
  @Query(() => AppointmentResponse)
  getAppointment() {
    return appointmentService.getAppointments();
  }

  @Authorized()
  @Query(() => AppointmentResponse)
  getDoctorAppointment(
    @Args(() => GetAppointmentArgument) args: GetAppointmentArgument,
  ) {
    return appointmentService.getAppointmentSlots(args);
  }

  @Authorized()
  @Query(() => AppointmentResponse)
  getPrescriptionGeneratedAppointments() {
    return appointmentService.getPrescriptionGeneratedAppointments();
  }

  @Authorized(Role.receptionists, Role.patient)
  @Mutation(() => AppointmentResponse)
  cancelAppointment(
    @Arg("input", () => CancelAppointmentArguments)
    input: CancelAppointmentArguments,
  ) {
    return appointmentService.cancelAppointment(input);
  }

  @Authorized(Role.receptionists, Role.patient)
  @Mutation(() => AppointmentResponse)
  async rescheduleAppointment(
    @Arg("input", () => RescheduleAppointmentArguments)
    input: RescheduleAppointmentArguments,
  ) {
    return appointmentService.rescheduleAppointment(input);
  }

  @Authorized(Role.receptionists)
  @Mutation(() => AppointmentResponse)
  async checkInAppointment(@Arg("input", () => String) input: string) {
    return appointmentService.checkedappointment(input);
  }
}
