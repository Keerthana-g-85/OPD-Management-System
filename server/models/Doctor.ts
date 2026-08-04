import { ObjectType, Field, Int, ID } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
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
  @JoinColumn({name : "user_id"})
  users!: Users;

  @Field(() => Department)
  @ManyToOne(() => Department)
  @JoinColumn({ name: "department_id" })
  department!: Department;

  @Field(() => String)
  @Column({ type: "varchar" })
  qualification!: string;

  @Field(() => Int)
  @Column({ type: "int" })
  experience!: number;

  @Field(() => Int)
  @Column({ type: "int" })
  charges!: number;

  @Field(()=>Boolean)
  @Column({ type : "boolean" , default: true})
  status! : boolean
}
