import { Field, ObjectType } from "type-graphql";
import Prescription from "../models/Prescription.js";

@ObjectType()
export default class PrescriptionResponse {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => String)
  message!: string;

  @Field(() => [Prescription], { nullable: true })
  prescriptions?: Prescription[];
}