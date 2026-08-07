import { Field, ObjectType } from "type-graphql";
import Appointment from "../models/Appointment.js";
import Slot from "../models/Slot.js";

@ObjectType()
export default class AppointmentResponse {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => String)
  message!: string;

  @Field(() => [Appointment], { nullable: true })
  appointment?: Appointment[];

  @Field(() => [Slot], { nullable: true })
  slots?: Slot[];
}
