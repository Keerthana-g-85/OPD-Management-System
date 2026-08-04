import { ArgsType , Field, Int} from "type-graphql";
import { Role } from "../../models/Users.js";

@ArgsType()
export default class GetUser{
    @Field(()=> Role , {nullable:true})
    role? : Role
}