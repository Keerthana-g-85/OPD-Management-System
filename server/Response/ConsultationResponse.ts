import { ObjectType, Field } from "type-graphql";
import Consultation from "../models/Consultation.js";

@ObjectType()
export default class ConsultationResponse {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => String)
  message!: string;

  @Field(() => Consultation, { nullable: true })
  consultation?: Consultation;
}
