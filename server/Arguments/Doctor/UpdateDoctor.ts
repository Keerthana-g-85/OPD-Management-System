import { Field, ID, InputType, Int } from "type-graphql";
import { Role } from "../../models/Users.js";

@InputType()
export default class UpdateDoctorArguments {
  @Field(() => ID)
  id!: string;
  @Field(() => String , {nullable:true})
  name?: string;

  @Field(() => String , {nullable:true})
  email?: string;

  @Field(() => String , {nullable:true})
  password?: string;

  @Field(() => Int , {nullable:true})
  age?: number;

  @Field(() => String , {nullable:true})
  gender?: string;

  @Field(() => String , {nullable:true})
  address?: string;

  @Field(() => String ,  {nullable:true})
  phone?: string;

  @Field(() => Role ,  {nullable:true})
  role?: Role;

  @Field(() => String , {nullable:true})
  image?: string;

  @Field(() => ID ,  {nullable:true})
  department?: string;

  @Field(() => String ,  {nullable:true})
  qualification?: string;

  @Field(() => Int ,  {nullable:true})
  experience?: number;

  @Field(() => Int ,  {nullable:true})
  charges?: number;

  @Field(() => Boolean ,  {nullable:true})
  status?: boolean;
}
