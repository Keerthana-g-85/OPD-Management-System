import { Field, ObjectType } from "type-graphql";
import Pharmacist from "../models/Pharmacist.js";

@ObjectType()
export default class PharmacistResponse {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => String)
  message!: string;

  @Field(()=> [Pharmacist] , { nullable: true })
  pharmacists? : Pharmacist[]


}
