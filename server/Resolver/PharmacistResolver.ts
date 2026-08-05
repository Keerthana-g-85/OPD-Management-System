import { Arg, Mutation, Resolver, Query } from "type-graphql";
import PharmacistService from "../Service/PharmacistService.js";
import CreatePharmacistArguments from "../Arguments/Pharmacist/CreatePharmacist.js";
import UpdatePharmacistArguments from "../Arguments/Pharmacist/UpdatePharmacist.js";
import PharmacistResponse from "../Response/PharmacistResponse.js";

const pharmacistService = new PharmacistService();
@Resolver()
export default class PharmacistResolver {
  @Query(() => PharmacistResponse)
  getPharmacist() {
    return pharmacistService.getPharmacist();
  }

  @Mutation(() => PharmacistResponse)
  addPharmacist(
    @Arg("input", () => CreatePharmacistArguments)
    input: CreatePharmacistArguments,
  ) {
    return pharmacistService.createPharmacist(input);
  }

  @Mutation(() => PharmacistResponse)
  editPharmacist(
    @Arg("input", () => UpdatePharmacistArguments)
    input: UpdatePharmacistArguments,
  ) {
    return pharmacistService.updatePharmacist(input);
  }
}
