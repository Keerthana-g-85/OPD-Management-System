import { Field, InputType } from "type-graphql";

@InputType()
export default class CreateDepartmentArguments{
    @Field(()=>String)
    name! : string

    @Field(()=>Boolean , )
    status! : boolean
}