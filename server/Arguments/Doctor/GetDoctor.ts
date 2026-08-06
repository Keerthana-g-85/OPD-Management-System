import { ArgsType, Field, ID } from "type-graphql";

@ArgsType()
export default class GetDoctorArguments {

    @Field(()=>ID ,{nullable : true})
    department_id? :string
}