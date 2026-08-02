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
import Department from "./Department.js";

@ObjectType()
@Entity()
export default class Doctor {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => Users)
  @OneToOne(() => Users, { onDelete: "CASCADE" })
  users!: Users;

  @Field(() => Department)
  @ManyToOne(() => Department)
  department!: Department;

  @Field(() => String)
  @Column({ type: "varchar" })
  qualification!: string;

  @Field(() => String)
  @Column({ type: "varchar" })
  experience!: string;

  @Field(() => Int)
  @Column({ type: "int" })
  charges!: number;
}
