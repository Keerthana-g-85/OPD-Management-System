import { Field, ID, InputType, Int } from "type-graphql";
import { Role } from "../../models/Users.js";

@InputType()
export default class UpdatePharmacistArguments {
  @Field(() => ID)
  id!: string;
  
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field(() => String, { nullable: true })
  gender?: string;

  @Field(() => String, { nullable: true })
  address?: string;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => Role, { nullable: true })
  role?: Role;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => String, { nullable: true })
  qualification?: string;

  @Field(() => Int, { nullable: true })
  experience?: number;

  @Field(() => Boolean, { nullable: true })
  status?: boolean;
}
