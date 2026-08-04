import { Field, ID, InputType, Int } from "type-graphql";
import { Role } from "../../models/Users.js";

@InputType()
export default class CreateDoctorArguments {
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

  @Field(()=>String)
  image! : string

  @Field(()=>ID)
  department! : string ;

  @Field(() => String)
  qualification!: string;

  @Field(() => Int)
  experience!: number;

  @Field(() => Int)
  charges!: number;

  @Field(()=>Boolean)
  status! : boolean
}
