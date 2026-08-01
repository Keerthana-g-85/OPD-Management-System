import type CreateUserArguments from "../Arguments/User/CreateUser.js";
import { database } from "../database.js";
import Users from "../models/Users.js";

export default class UserService {
  private userRepo = database.getRepository(Users);
  async createUser({
    name,
    email,
    age,

    gender,
    address,
    phone,
    password,
  }: CreateUserArguments) {
    try {
      const user = this.userRepo.create({
        name,
        email,
        age,

        gender,
        address,
        phone,
        password,
      });
      await this.userRepo.save(user);

      return {
        success: true,
        message: "User successfully created",
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Error while creating the user",
      };
    }
  }

  async getUser() {
    try {
      const users = this.userRepo.find();

      return {
        success: true,
        message: "All users",
        users,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Error while getting the user",
      };
    }
  }
}
