import { Arg, Mutation, Resolver, Query } from "type-graphql";
import DoctorService from "../Service/DoctorService.js";
import CreateDoctorArguments from "../Arguments/Doctor/CreateDoctor.js";
import DoctorResponse from "../Response/DoctorResponse.js";
import UpdateDoctorArguments from "../Arguments/Doctor/UpdateDoctor.js";

const doctorService = new DoctorService();
@Resolver()
export default class DoctorResolver {
  @Query(() => DoctorResponse)
  getDoctor() {
    return doctorService.getDoctor();
  }

  @Mutation(() => DoctorResponse)
  addDoctor(
    @Arg("input", () => CreateDoctorArguments) input: CreateDoctorArguments,
  ) {
    return doctorService.createDoctor(input);
  }

  @Mutation(() => DoctorResponse)
  editDoctor(
    @Arg("input", () => UpdateDoctorArguments) input: UpdateDoctorArguments,
  ) {
    return doctorService.updateDoctor(input);
  }
}
