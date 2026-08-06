import type CreateDepartmentArguments from "../Arguments/Department/CreateDepartment.js";
import { database } from "../database.js";
import Department from "../models/Department.js";

export default class DepartmentService {
  private departmentRepo = database.getRepository(Department);
  async createDepeartment({ name }: CreateDepartmentArguments) {
    try {
      const dep = await this.departmentRepo.findOneBy({ name });
      if (dep) {
        return {
          success: false,
          message: "department already present",
        };
      }
      const department = this.departmentRepo.create({ name });
      await this.departmentRepo.save(department);
      return {
        success: true,
        message: "Department successfully created",
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while creating department",
      };
    }
  }

  async getDepartment(){
    try{
      const departments = await this.departmentRepo.find()
      return {
        success : true ,
        message : "All departments",
        departments
      }

    }catch(error){
      console.log(error)
      return{
        success : false ,
        message : "Error while getting department"
      }
    }
  }
}
