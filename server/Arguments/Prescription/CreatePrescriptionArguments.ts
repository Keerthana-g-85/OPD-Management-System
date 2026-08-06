import { Field, ID, InputType, Int } from "type-graphql";

@InputType()
export default class CreatePrescriptionArguments {
  @Field(() => String)
  dosage!: string;

  @Field(() => Int)
  frequency!: number;

  @Field(() => Int)
  duration!: number;

  @Field(() => String)
  name!: string;
}
