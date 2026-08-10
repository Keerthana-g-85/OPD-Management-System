import { ArgsType, Field, ID } from "type-graphql";

@ArgsType()
export default class RescheduleAppointmentArguments {

  @Field(() => ID)
  id!: string;

  @Field(() => String)
  appointment_date!: string;

  @Field(() => ID)
  slot_id!: string;
}