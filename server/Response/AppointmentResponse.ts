import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class AppointmentResponse {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => String)
  message!: string;
}
