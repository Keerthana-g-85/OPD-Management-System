import { ObjectType, Field, Int, ID } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Users from "./Users.js";

@ObjectType()
@Entity()
export default class Pharmacist {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => Users)
  @OneToOne(() => Users, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  users!: Users;

  @Field(() => String)
  @Column({ type: "varchar" })
  qualification!: string;

  @Field(() => Int)
  @Column({ type: "int" })
  experience!: number;
}
