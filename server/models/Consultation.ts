import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
import Appoitment from "./Appointment.js";

@ObjectType()
@Entity()
export default class Consultation {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => Appoitment)
  @OneToOne(() => Appoitment)
  @JoinColumn({name : "appointment_id"})
  appoitment!: Appoitment;

  @Field(() => String)
  @Column({ type: "varchar" })
  notes!: string;

  @Field(() => String)
  @Column({ type: "varchar" })
  follow_up!: string;

  @Field(() => Boolean)
  @Column({ type: "boolean" })
  status!: boolean;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt!: Date;
}
