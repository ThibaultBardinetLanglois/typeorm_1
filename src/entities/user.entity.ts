import { 
  BaseEntity, 
  Entity, 
  Column, 
  PrimaryColumn,
  PrimaryGeneratedColumn,
  OneToMany, 
  JoinTable
} from "typeorm";
import Skill  from "./skill.entity";
import { SkillToUser } from "./skillToUser.entities";


@Entity()
export default class User extends BaseEntity {
  @PrimaryColumn()
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => SkillToUser, skillToUser => skillToUser.user_id)
  public skills!: SkillToUser[];
}