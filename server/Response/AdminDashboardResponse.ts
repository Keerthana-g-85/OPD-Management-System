import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export class WeekAppointment {
  @Field(() => String)
  day!: string;

  @Field(() => Int)
  count!: number;
}

@ObjectType()
export class AdminDashboardResponse {
  @Field(() => Int)
  totalDoctors!: number;

  @Field(() => Int)
  totalReceptionists!: number;

  @Field(() => Int)
  totalPharmacists!: number;

  @Field(() => Int)
  totalPatients!: number;

  @Field(() => Int)
  todaysAppointments!: number;

  @Field(() => Int)
  completedConsultations!: number;

  @Field(() => [WeekAppointment])
  weekAppointment!: WeekAppointment[];
}
