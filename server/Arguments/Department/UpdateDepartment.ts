import { Field, ID, InputType } from "type-graphql";

@InputType()
export default class UpdateDepartmentArguments {
  @Field(() => ID)
  id!: string;

  @Field(() => Boolean, { nullable: true })
  status?: boolean;
}
