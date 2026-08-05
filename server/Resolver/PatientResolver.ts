import { Resolver, Query, Mutation, Arg } from "type-graphql";
import PatientService from "../Service/PatientService.js";
import PatientResponse from "../Response/PatientResponse.js";
import CreatePatientArguments from "../Arguments/Patient/CreatePatient.js";
import UpdatepatientArguments from "../Arguments/Patient/UpdatePatient.js";

const patientService = new PatientService();
@Resolver()
export default class PatientResolver {
  @Query(() => PatientResponse)
  getPatient() {
    return patientService.getPatient();
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
