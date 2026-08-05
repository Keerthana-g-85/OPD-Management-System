import { ObjectType, Field } from "type-graphql";

@ObjectType()
export default class ConsultationResponse {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => String)
  message!: string;
}
