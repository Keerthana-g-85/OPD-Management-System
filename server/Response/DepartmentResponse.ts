import { Field, ObjectType } from "type-graphql";
import Department from "../models/Department.js";
@ObjectType()
export default class DepartmentResponse {
      @Field(() => Boolean)
      success!: boolean;
    
      @Field(() => String)
      message!: string;

      @Field(()=>[Department])
      departments? : Department[]
}