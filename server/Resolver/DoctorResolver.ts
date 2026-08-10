import { Arg, Mutation, Resolver, Query, Authorized, Args } from "type-graphql";
import DoctorService from "../Service/DoctorService.js";
import CreateDoctorArguments from "../Arguments/Doctor/CreateDoctor.js";
import DoctorResponse from "../Response/DoctorResponse.js";
import UpdateDoctorArguments from "../Arguments/Doctor/UpdateDoctor.js";
import { Role } from "../models/Users.js";
import GetDoctorArguments from "../Arguments/Doctor/GetDoctor.js";

const doctorService = new DoctorService();
@Authorized()
@Resolver()
export default class DoctorResolver {
  @Query(() => DoctorResponse)
  getDoctor(@Args(()=> GetDoctorArguments) args:GetDoctorArguments) {
    return doctorService.getDoctor(args);
  }

  @Authorized(Role.admin)
  @Mutation(() => DoctorResponse)
  addDoctor(
    @Arg("input", () => CreateDoctorArguments) input: CreateDoctorArguments,
  ) {
    return doctorService.createDoctor(input);
  }

  @Authorized(Role.admin)
  @Mutation(() => DoctorResponse)
  editDoctor(
    @Arg("input", () => UpdateDoctorArguments) input: UpdateDoctorArguments,
  ) {
    return doctorService.updateDoctor(input);
  }
}
