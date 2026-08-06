import { Field, ObjectType } from "type-graphql";
import Slot from "../models/Slot.js";

@ObjectType()
export default class SlotResponse {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => String)
  message!: string;

  @Field(()=>[Slot])
  slots? :Slot[]
}
