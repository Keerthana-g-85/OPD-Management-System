import { ObjectType, Field } from "type-graphql";

@ObjectType()
export default class PrescriptionResponse {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => String)
  message!: string;
}
