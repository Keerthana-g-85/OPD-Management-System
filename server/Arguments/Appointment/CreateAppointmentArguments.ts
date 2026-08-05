import { Field, ID, InputType } from "type-graphql";
@InputType()
export default class CreateAppointmentArguments {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  email!: string;

  @Field(() => Date)
  appointment_date!: Date;

  @Field(() => ID)
  slot_id!: string;

  @Field(() => ID)
  doctor_id!: string;
}
