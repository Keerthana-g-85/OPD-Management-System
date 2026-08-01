import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CreateDateColumn } from "typeorm";

@ObjectType()
@Entity()
export default class Users {
  @Field(() => String)
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

  @Field(()=> Int)
  @Column({type:"int"})
  phone! : number

  @Field(() => Date)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt!: Date;
}
