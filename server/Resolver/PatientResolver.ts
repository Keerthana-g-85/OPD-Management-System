import { Resolver, Query, Mutation, Arg, Args, Authorized } from "type-graphql";
import PatientService from "../Service/PatientService.js";
import PatientResponse from "../Response/PatientResponse.js";
import CreatePatientArguments from "../Arguments/Patient/CreatePatient.js";
import UpdatepatientArguments from "../Arguments/Patient/UpdatePatient.js";
import GetPatientArguments from "../Arguments/Patient/GetPatient.js";

const patientService = new PatientService();
@Authorized()
@Resolver()
export default class PatientResolver {
  @Query(() => PatientResponse)
  getPatient(@Args(()=>GetPatientArguments) args:GetPatientArguments) {
    return patientService.getPatient(args);
  }

  @Mutation(() => PatientResponse)
  addPatient(
    @Arg("input", () => CreatePatientArguments) input: CreatePatientArguments,
  ) {
    return patientService.createPatient(input);
  }

  @Mutation(() => PatientResponse)
  editPatient(
    @Arg("input", () => UpdatepatientArguments) input: UpdatepatientArguments,
  ) {
    return patientService.updatepatient(input);
  }
}
