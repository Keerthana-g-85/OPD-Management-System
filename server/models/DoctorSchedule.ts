import { ObjectType, Field, Int, ID } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Doctor from "./Doctor.js";
@ObjectType()
@Entity()
export default class DoctorSchedule {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => Doctor)
  @ManyToOne(() => Doctor)
  @JoinColumn({ name: "doctor_id" })
  doctor!: Doctor;

  @Field(() => String)
  @Column({ type: "varchar" })
  day!: string;

  @Field(() => String)
  @Column({ type: "time" })
  start_time!: string;

  @Field(() => String)
  @Column({ type: "time" })
  end_time!: string;
}
