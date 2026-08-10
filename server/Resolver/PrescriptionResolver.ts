import { Resolver, Query, Args, Authorized } from "type-graphql";

import PrescriptionService from "../Service/PrescriptionService.js";
import PrescriptionResponse from "../Response/PrescriptionResponse.js";
import GetPrescriptionArguments from "../Arguments/Prescription/GetPrescription.js";
const prescriptionService = new PrescriptionService();
@Authorized()
@Resolver()
export default class PrescriptionResolver {
  // @Mutation(()=>PrescriptionResponse)
  // addPrescription(@Arg("input" ,()=>CreatePrescriptionArguments ) input : CreatePrescriptionArguments){
  //     return prescriptionService.addPrescription(input)
  // }

  @Query(() => PrescriptionResponse)
  getPrescriptions(
    @Args(() => GetPrescriptionArguments)
    args: GetPrescriptionArguments,
  ) {
    return prescriptionService.getPrescriptions(args.appointment_id);
  }
}
