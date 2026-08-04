import { ObjectType, Field, Int, ID } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn ,
  UpdateDateColumn
} from "typeorm";
import Users from "./Users.js";
import Doctor from "./Doctor.js";

@ObjectType()
@Entity()
export default class Appoitment {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => Date)
  @Column({ type: "date" })
  appoitment_date!: Date;

  @Field(() => String)
  @Column({ type: "varchar" })
  slot!: string;

  @Field(() => Users)
  @ManyToOne(() => Users)
  @JoinColumn({ name: "user_id" })
  users!: Users;

  @Field(() => Doctor)
  @ManyToOne(() => Doctor)
  @JoinColumn({ name: "doctor_id" })
  doctor!: Doctor;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt!: Date;
}
