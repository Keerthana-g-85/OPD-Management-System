import { ObjectType, Field, ID, Int } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity()
export default class Pharmacist {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => String)
  @Column({ type: "varchar" })
  qualification!: string;

  @Field(() => Int)
  @Column({ type: "int" })
  experience!: number;

  @Field(() => Boolean)
  @Column({ type: "boolean" })
  status!: boolean;

}
