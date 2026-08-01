import { Field, InputType, Int } from "type-graphql";

@InputType()
export default class CreateUserArguments {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  password!: string;

  @Field(() => Int)
  age!: number;

  @Field(() => String)
  gender!: string;

  @Field(() => String)
  address!: string;

  @Field(()=>Int)
  phone! : number
}
