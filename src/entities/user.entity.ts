import { 
  BaseEntity, 
  Entity, 
  Column, 
  PrimaryColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable
} from "typeorm";
import { SkillToUser } from "./skillToUser.entities";


@Entity()
export default class User extends BaseEntity {
  @PrimaryColumn()
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => SkillToUser, skillToUser => skillToUser.user, { eager: true })
  //@JoinTable()
  public skillToUser!: SkillToUser[];
}