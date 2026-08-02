import { ObjectType, Field, Int, ID } from "type-graphql";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Users from "./Users.js";

@ObjectType()
@Entity()
export default class Receptionist {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => Users)
  @OneToOne(() => Users, { onDelete: "CASCADE" })
  users!: Users;

  @Field(() => String)
  @Column({ type: "varchar" })
  qualification!: string;

  @Field(() => String)
  @Column({ type: "varchar" })
  experience!: string;
}
