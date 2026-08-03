import { Field, ObjectType } from "type-graphql";
import Users from "../models/Users.js";

@ObjectType()
export default class CreateUserResponse {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => String)
  message!: string;

  @Field(() => [Users], { nullable: true })
  users?: Users[];
}
