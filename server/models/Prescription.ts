import { ObjectType, Field, ID, Int } from "type-graphql";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import Medicine from "./Medicine.js";

@ObjectType()
@Entity()
export default class Prescription {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => Medicine)
  medicine!: Medicine;

  @Field(() => String)
  @Column({ type: "varchar" })
  dosage!: string;

  @Field(() => Int)
  @Column({ type: "int" })
  frequency!: number;

  @Field(() => Int)
  @Column({ type: "int" })
  duration!: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt!: Date;
}
