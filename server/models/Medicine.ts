import { Field, ID, Int, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn , CreateDateColumn , UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity()
export default class Medicine {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => String)
  @Column({ type: "varchar" })
  name!: string;

  @Field(() => Int)
  @Column({ type: "int" })
  price!: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt!: Date;
}
