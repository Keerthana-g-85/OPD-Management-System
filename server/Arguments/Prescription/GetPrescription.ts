import { ArgsType, Field, ID } from "type-graphql";

@ArgsType()
export default class GetPrescriptionArguments {
  @Field(() => ID)
  appointment_id!: string;
}