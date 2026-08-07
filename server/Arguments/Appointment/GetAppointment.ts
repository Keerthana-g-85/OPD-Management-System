import { ArgsType, Field, ID } from "type-graphql";

@ArgsType()
export class GetAppointmentArgument {
  @Field(()=>ID)
  doctor_id!: string;

  @Field(()=>String , {nullable : true})
  appointment_date?: string;
}