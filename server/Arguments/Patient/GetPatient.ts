import { ArgsType, Field, ID } from "type-graphql";

@ArgsType()
export default class GetPatientArguments {
  @Field(() => ID, { nullable: true })
  id?: string;
}
