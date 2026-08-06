import { Field, ID, InputType } from "type-graphql";
import Patient from "../../models/Patient.js";
@InputType()
export default class CreateAppointmentArguments {
  @Field(() => ID)
  patient_id!: string;

  @Field(() => String)
  appointment_date!: string;

  @Field(() => ID)
  slot_id!: string;

  @Field(() => ID)
  doctor_id!: string;
}
