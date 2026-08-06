import { ObjectType, Field, Int, ID , registerEnumType} from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";
import Doctor from "./Doctor.js";
import Patient from "./Patient.js";
import Slot from "./Slot.js";

export enum APStatus {
  booked = "Booked",
  checked_in = "Checked In",
  prescription_generated = "Prescription Generated",
  medicines_dispensed = "Medicines Dispensed",
  cancelled = "Cancelled",
}
registerEnumType(APStatus, { name: "AppointmentStatus" });
@ObjectType()
@Entity()
export default class Appointment {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => String)
  @Column({ type: "date" })
  appointment_date!: string;

  @Field(()=>Slot)
  @ManyToOne(()=>Slot)
  @JoinColumn({name : "slot_id"})
  slot!:Slot;

  @Field(() => Patient)
  @ManyToOne(() => Patient)
  @JoinColumn({ name: "user_id" })
  patient!: Patient;

  @Field(() => Doctor)
  @ManyToOne(() => Doctor)
  @JoinColumn({ name: "doctor_id" })
  doctor!: Doctor;

  @Field(()=>APStatus)
  @Column({ type : "enum" , enum : APStatus})
  status! : APStatus

  @Field(() => Date)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt!: Date;
}
