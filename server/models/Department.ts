import { ObjectType , Field, ID} from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export default class Department {
    @Field(()=>ID)
    @PrimaryGeneratedColumn("uuid")
    id! : string ;

    @Field(()=>String)
    @Column({type : "varchar"})
    name! : string ;
}