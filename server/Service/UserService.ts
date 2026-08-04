import type CreateUserArguments from "../Arguments/User/CreateUser.js";
import type GetUser from "../Arguments/User/GetUser.js";
import type LoginUser from "../Arguments/User/LoginUser.js";
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
  }: CreateUserArguments) {
    try {
      const userEmail = await this.userRepo.findOneBy({ email: email });
      if (userEmail) {
        return {
          success: false,
          message: "User already present",
        };
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

  async getUser({ role }: GetUser) {
    try {
      let users;
      if (role) {
        users = await this.userRepo.find({ where: { role: Role[role] } });
      }else{
      users = await this.userRepo.find();
      }

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

  async loginUser({ email, password }: LoginUser) {
    try {
      const user = await this.userRepo.findOneBy({ email: email });
      if (!user) {
        return {
          success: false,
          message: "Email not yet registred",
        };
      }
      console.log(user);

      const isPassword = await bcrypt.compare(password, user.password);
      if (!isPassword) {
        return {
          success: false,
          message: "Invalid Password",
        };
      }

      const accesstoken = jwt.sign(
        { id: user.id, name: user.name },
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
      return {
        success: false,
        message: "Error while loging in",
      };
    }
  }
}
