import { Arg, Mutation, Query, Resolver } from "type-graphql";
import DepartmentService from "../Service/DepartmentService.js";
import CreateDepartmentArguments from "../Arguments/Department/CreateDepartment.js";
import DepartmentResponse from "../Response/DepartmentResponse.js";

const departmentService = new DepartmentService()
@Resolver()
export default class DepartmentResolver{
    @Mutation(()=>DepartmentResponse)
    addDepartment(@Arg("input",()=>CreateDepartmentArguments)input:CreateDepartmentArguments){
        return departmentService.createDepeartment(input)
    }

    @Query(()=>DepartmentResponse)
    getDepartment(){
        return departmentService.getDepartment()
    }
}