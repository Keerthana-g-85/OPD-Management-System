import { Mutation, Arg, Resolver, Query, Args } from "type-graphql";
import UserService from "../Service/UserService.js";
import CreateUserArguments from "../Arguments/User/CreateUser.js";
import CreateUserResponse from "../Response/UserResponse.js";
import Users from "../models/Users.js";
import LoginUser from "../Arguments/User/LoginUser.js";
import LoginResponse from "../Response/LoginResponse.js";
import GetUser from "../Arguments/User/GetUser.js";

const userService = new UserService();
@Resolver(() => Users)
export default class UserResolver {
  @Mutation(() => CreateUserResponse)
  addUser(@Arg("input", () => CreateUserArguments) input: CreateUserArguments) {
    return userService.createUser(input);
  }

  @Query(() => CreateUserResponse)
  getUser(@Args(()=>GetUser) args: GetUser){
    return userService.getUser(args);
  }

  @Mutation(() => LoginResponse)
  loginUser(@Arg("input", () => LoginUser) input: LoginUser) {
    return userService.loginUser(input);
  }
}
