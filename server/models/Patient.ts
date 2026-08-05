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
export default class Patient {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => Users)
  @OneToOne(() => Users, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  users!: Users;

  @Field(() => String)
  @Column({ type: "varchar" })
  height!: string;

  @Field(() => String)
  @Column({ type: "varchar" })
  weight!: string;

  @Field(() => String)
  @Column({ type: "varchar" })
  marital_status!: string;

  @Field(() => String)
  @Column({ type: "varchar" })
  occupation!: string;

  @Field(() => String)
  @Column({ type: "varchar" })
  allergies!: string;
}
