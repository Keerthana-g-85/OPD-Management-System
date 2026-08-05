import { Arg, Mutation, Resolver } from "type-graphql";
import PrescriptionService from "../Service/PrescriptionService.js";
import CreatePrescriptionArguments from "../Arguments/Prescription/CreatePrescriptionArguments.js";
import PrescriptionResponse from "../Response/PrescriptionResponse.js";

const prescriptionService = new PrescriptionService()
@Resolver()
export default class PrescriptionResolver{
    @Mutation(()=>PrescriptionResponse)
    addPrescription(@Arg("input" ,()=>CreatePrescriptionArguments ) input : CreatePrescriptionArguments){
        return prescriptionService.addPrescription(input)
    }
}