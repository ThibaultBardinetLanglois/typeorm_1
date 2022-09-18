import { 
  BaseEntity, 
  Entity, 
  Column, 
  PrimaryColumn,
  PrimaryGeneratedColumn 
} from "typeorm";


@Entity()
export default class User extends BaseEntity {
  @PrimaryColumn()
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
}