import { Field, ID, InputType } from "type-graphql";

@InputType()
export default class DeleteDepartmentArguments {
    @Field(()=>ID)
    id! : string
}