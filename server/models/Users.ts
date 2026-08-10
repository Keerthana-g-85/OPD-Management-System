import { Field, ID, Int, ObjectType, registerEnumType } from "type-graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";

export enum Role {
  patient = "patient",
  admin = "admin",
  doctor = "doctor",
  receptionists = "receptionists",
  pharmacists = "pharmacists",
}

registerEnumType(Role, { name: "Role" });
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

  @Field(() => String)
  @Column({ type: "varchar" })
  phone!: string;

  @Field(() => Role)
  @Column({ type: "enum", enum: Role })
  role!: Role;

  @Field(() => String)
  @Column({ type: "varchar", default: null })
  image!: string;

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
