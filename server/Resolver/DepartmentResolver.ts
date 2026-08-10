import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import DepartmentService from "../Service/DepartmentService.js";
import CreateDepartmentArguments from "../Arguments/Department/CreateDepartment.js";
import DepartmentResponse from "../Response/DepartmentResponse.js";
import DeleteDepartmentArguments from "../Arguments/Department/DeleteDepartment.js";
import UpdateDepartmentArguments from "../Arguments/Department/UpdateDepartment.js";

const departmentService = new DepartmentService();
@Resolver()
export default class DepartmentResolver {
  @Authorized()
  @Mutation(() => DepartmentResponse)
  addDepartment(
    @Arg("input", () => CreateDepartmentArguments)
    input: CreateDepartmentArguments,
  ) {
    return departmentService.createDepeartment(input);
  }

  @Authorized()
  @Query(() => DepartmentResponse)
  getDepartment() {
    return departmentService.getDepartment();
  }

  @Authorized()
  @Mutation(() => DepartmentResponse)
  deleteDepartment(
    @Arg("input", () => DeleteDepartmentArguments)
    input: DeleteDepartmentArguments,
  ) {
    return departmentService.deleteDepartment(input);
  }
  @Authorized()
  @Mutation(() => DepartmentResponse)
  updateDepartment(
    @Arg("input", () => UpdateDepartmentArguments)
    input: UpdateDepartmentArguments,
  ) {
    return departmentService.updateDepartment(input);
  }
}
