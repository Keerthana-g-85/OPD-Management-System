import { Field, InputType, Int } from "type-graphql";
import { Role } from "../../models/Users.js";

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

  @Field(() => String)
  phone!: string;

  @Field(() => Role)
  role!: Role;

  @Field(() => String)
  image!: string;

  @Field(() => Boolean)
  status!: boolean;
}
