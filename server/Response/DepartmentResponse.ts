import { Field, ObjectType } from "type-graphql";
@ObjectType()
export default class DepartmentResponse {
      @Field(() => Boolean)
      success!: boolean;
    
      @Field(() => String)
      message!: string;
}