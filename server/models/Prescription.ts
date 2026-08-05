import { ObjectType, Field, ID, Int } from "type-graphql";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import Medicine from "./Medicine.js";
import Consultation from "./Consultation.js";
import PrescripMedicine from "./PrescripMedicine.js";

@ObjectType()
@Entity()
export default class Prescription {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => Consultation)
  @ManyToOne(() => Consultation)
  consultation!: Consultation;

  @Field(()=>String)
  @Column({ type: "varchar" })
  name! : string

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
