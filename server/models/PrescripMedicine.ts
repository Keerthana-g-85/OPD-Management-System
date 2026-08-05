import { Field, ID, ObjectType } from "type-graphql";
import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import Prescription from "./Prescription.js";
import Medicine from "./Medicine.js";

@ObjectType()
@Entity()
export default class PrescripMedicine {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => Prescription)
  @ManyToOne(() => Prescription)
  prescription!: Prescription;

  @Field(() => Medicine)
  @ManyToOne(() => Medicine)
  medicine!: Medicine;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt!: Date;
}
