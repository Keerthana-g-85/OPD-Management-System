import { Field, ObjectType } from "type-graphql";
import Patient from "../models/Patient.js";

@ObjectType()
export default class PatientResponse {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => String)
  message!: string;

  @Field(() => [Patient], { nullable: true })
  patients?: Patient[];
}
