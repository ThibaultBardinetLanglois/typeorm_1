import { 
  BaseEntity, 
  Entity, 
  Column, 
  PrimaryColumn,
  PrimaryGeneratedColumn,
  OneToMany
} from "typeorm";
import { SkillToUser } from "./skillToUser.entities";


@Entity()
export default class Skill extends BaseEntity {
  @PrimaryColumn()
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => SkillToUser, skillToUser => skillToUser.skill_id)
  public users!: SkillToUser[];
}