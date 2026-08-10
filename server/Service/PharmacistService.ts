import { error } from "node:console";
import CreatePharmacistArguments from "../Arguments/Pharmacist/CreatePharmacist.js";
import UpdatePharmacistArguments from "../Arguments/Pharmacist/UpdatePharmacist.js";
import { database } from "../database.js";
import Pharmacist from "../models/Pharmacist.js";
import Users from "../models/Users.js";
import bcrypt from "bcrypt";
import { GraphQLError } from "graphql";

export default class PharmacistService {
  private pharmacistRepo = database.getRepository(Pharmacist);
  private usersRepo = database.getRepository(Users);

  async getPharmacist() {
    try {
      const pharmacists = await this.pharmacistRepo.find({
        relations: { users: true },
      });
      return {
        success: true,
        message: "pharmacists successfully fetched",
        pharmacists,
      };
    } catch (error) {
      console.log(error);
      throw new GraphQLError("Error while getting the pharmacists")
    }
  }

  async createPharmacist({
    name,
    email,
    age,
    gender,
    address,
    phone,
    password,
    role,
    image,
    qualification,
    experience,
    status,
  }: CreatePharmacistArguments) {
    try {
      const userEmail = await this.usersRepo.findOneBy({ email: email });
      if (userEmail) {
        throw new GraphQLError("User already present")
      }
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const user = this.usersRepo.create({
        name,
        email,
        age,
        gender,
        address,
        phone,
        password: hashPassword,
        role,
        image,
        status,
      });

      const userId = await this.usersRepo.save(user);
      if (userId) {
        const pharmacists = this.pharmacistRepo.create({
          users: userId,
          qualification,
          experience,
        });

        await this.pharmacistRepo.save(pharmacists);
      }
      return {
        success: true,
        message: "pharmacist successfully added",
      };
    } catch (error) {
      console.log(error);
      throw new GraphQLError("Error while creating pharmacists")
    }
  }

  async updatePharmacist(input: UpdatePharmacistArguments): Promise<
    | {
        success: boolean;
        message: string;
      }
    | GraphQLError
  > {
    try {
      const user = await this.usersRepo.findOneBy({ id: input.id });
      if (!user) {
        throw new GraphQLError("pharmacist not present pharmacists");
      }
      const userInput = {
        name: input.name || user.name,
        age: input.age || user.age,
        email: input.email || user.email,
        gender: input.gender || user.gender,
        address: input.address || user.address,
        phone: input.phone || user.phone,
        image: input.image || user.image,

        status: input.status ?? user.status,
      };
      const userData: Users = {
        ...user,
        ...userInput,
      };
      if (userData) {
        await this.usersRepo.update({ id: input.id }, { ...userData });
      }
      const pharmacist = await this.pharmacistRepo.findOne({
        where: { users: { id: user.id } },
      });
      console.log(pharmacist);
      if (pharmacist) {
        const pharmacistInput = {
          qualification: input.qualification || pharmacist.qualification,
          experience: input.experience || pharmacist.experience,
        };
        console.log(input.status);
        await this.pharmacistRepo.update(
          { id: pharmacist.id },
          pharmacistInput,
        );
      } else {
        console.log("No pharmacist");
      }
      return {
        success: true,
        message: "pharmacist updated",
      };
    } catch (error) {
      console.log("bfxgf", error);
      throw new GraphQLError("Error while updating the pharmacists", {
        extensions: {
          code: "FORBIDDEN",
        },
      });
    }
  }
}
