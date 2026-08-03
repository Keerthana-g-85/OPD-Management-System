import { Field, ObjectType } from "type-graphql";
import Doctor from "../models/Doctor.js";
import Users from "../models/Users.js";

@ObjectType()
export default class DoctorResponse {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => String)
  message!: string;

  @Field(()=> [Doctor] , { nullable: true })
  doctors? : Doctor[]

  // @Field(()=> Users , { nullable: true })
  // users? : Users
}
