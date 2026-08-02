import { Field, ID, Int, ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CreateDateColumn } from "typeorm";

export enum Role {
  patient = "patient",
  admin = "admin",
  doctor = "doctor",
  receptionists = "receptionists",
  pharmacists = "pharmacists",
}
@ObjectType()
@Entity()
export default class Users {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => String)
  @Column({ type: "varchar" })
  name!: string;

  @Field(() => String)
  @Column({ type: "varchar" })
  email!: string;

  @Field(() => String)
  @Column({ type: "varchar" })
  password!: string;

  @Field(() => Int)
  @Column({ type: "int" })
  age!: number;

  @Field(() => String)
  @Column({ type: "varchar" })
  gender!: string;

  @Field(() => String)
  @Column({ type: "varchar" })
  address!: string;

  @Field(() => Int)
  @Column({ type: "int" })
  phone!: number;

  @Field(()=>Role)
  @Column({type : "enum", enum : Role})
  role!: Role;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt!: Date;
}
