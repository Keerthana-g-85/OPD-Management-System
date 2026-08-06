import { Mutation, Arg, Resolver, Query, Args } from "type-graphql";
import UserService from "../Service/UserService.js";
import CreateUserArguments from "../Arguments/User/CreateUser.js";
import UserResponse from "../Response/UserResponse.js";
import Users from "../models/Users.js";
import LoginUser from "../Arguments/User/LoginUser.js";
import LoginResponse from "../Response/LoginResponse.js";
import GetUser from "../Arguments/User/GetUser.js";
import UpdateUserArguments from "../Arguments/User/UpdateUser.js";

const userService = new UserService();
@Resolver(() => Users)
export default class UserResolver {
  @Mutation(() => UserResponse)
  addUser(@Arg("input", () => CreateUserArguments) input: CreateUserArguments) {
    return userService.createUser(input);
  }

  @Query(() => UserResponse)
  getUser(@Args(() => GetUser) args: GetUser) {
    return userService.getUser(args);
  }

  @Mutation(() => LoginResponse)
  loginUser(@Arg("input", () => LoginUser) input: LoginUser) {
    return userService.loginUser(input);
  }

  @Mutation(() => UserResponse)
  editUser(
    @Arg("input", () => UpdateUserArguments) input: UpdateUserArguments,
  ) {
    return userService.updateUser(input);
  }
}
