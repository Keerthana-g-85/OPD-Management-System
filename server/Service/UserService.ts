import { GraphQLError } from "graphql";
import type CreateUserArguments from "../Arguments/User/CreateUser.js";
import type GetUser from "../Arguments/User/GetUser.js";
import type LoginUser from "../Arguments/User/LoginUser.js";
import type UpdateUserArguments from "../Arguments/User/UpdateUser.js";
import { database } from "../database.js";
import Users, { Role } from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    role,
    image,
  }: CreateUserArguments) {
    try {
      const userEmail = await this.userRepo.findOneBy({ email: email });
      if (userEmail) {
        throw new GraphQLError("User already present");
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const user = this.userRepo.create({
        name,
        email,
        age,
        gender,
        address,
        phone,
        password: hashPassword,
        role,
        image,
      });
      await this.userRepo.save(user);

      return {
        success: true,
        message: "User successfully created",
      };
    } catch (error) {
      console.log(error);
      throw new GraphQLError("Error while creating the user");
    }
  }

  async getUser({ role }: GetUser) {
    try {
      let users;
      if (role) {
        users = await this.userRepo.find({ where: { role: Role[role] } });
      } else {
        users = await this.userRepo.find();
      }

      return {
        success: true,
        message: "All users",
        users,
      };
    } catch (error) {
      console.log(error);
      throw new GraphQLError("Error while getting the user");
    }
  }

  async loginUser({ email, password }: LoginUser) {
    try {
      const user = await this.userRepo.findOneBy({ email: email });
      if (!user) {
        throw new GraphQLError("Email not yet registred");
      }
      console.log(user.role);

      const isPassword = await bcrypt.compare(password, user.password);
      if (!isPassword) {
        throw new GraphQLError("Invalid Password");
      }

      const accesstoken = jwt.sign(
        { id: user.id, name: user.name, role: user.role },
        process.env.JW_SECRET as string,
        { expiresIn: "2hr" },
      );
      return {
        success: true,
        message: "User successfully logged in",
        accesstoken,
      };
    } catch (error) {
      console.log(error);
      throw new GraphQLError("Error while logging in ");
    }
  }

  async updateUser({
    id,
    name,
    email,
    age,
    gender,
    address,
    phone,
    image,
    status,
  }: UpdateUserArguments) {
    try {
      const user = await this.userRepo.findOneBy({ id: id });
      if (!user) {
        throw new GraphQLError("User not present pharmacists");
      }
      const userInput = {
        name: name || user.name,
        age: age || user.age,
        email: email || user.email,
        gender: gender || user.gender,
        address: address || user.address,
        phone: phone || user.phone,
        image: image || user.image,
        status: status ?? user.status,
      };
      await this.userRepo.update({ id: id }, { ...userInput });
    } catch (error) {
      console.log(error);
      throw new GraphQLError("Error while updating");
    }
  }
}
