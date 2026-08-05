import { Field, InputType } from "type-graphql";

@InputType()
export default class CreateConsultationArguments{

    @Field(()=>String)
    appointment_id! : string

    @Field(()=>String)
    notes! : string

    @Field(()=>String)
    follow_up! :string 

    @Field(()=>Boolean)
    status! : boolean
}