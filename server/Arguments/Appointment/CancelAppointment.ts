import { ArgsType, Field, ID } from "type-graphql";

@ArgsType()
export default class CancelAppointmentArguments {
  @Field(() => ID)
  id!: string;
}