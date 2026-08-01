import { Mutation, Arg, Resolver,Query } from "type-graphql";
import UserService from "../Service/UserService.js";
import CreateUserArguments from "../Arguments/User/CreateUser.js";
import CreateUserResponse from "../Response/UserResponse.js";
import Users from "../models/Users.js";

const userService = new UserService();
@Resolver(() => Users)
export default class UserResolver {
  @Mutation(() => CreateUserResponse)
  addUser(@Arg("input", () => CreateUserArguments) input: CreateUserArguments) {
    return userService.createUser(input);
  }

  @Query(()=>CreateUserResponse)
  getUser(){
    return userService.getUser()
  }
}

