import { 
  Entity, 
  Column, 
  ManyToOne, 
  PrimaryGeneratedColumn 
} from "typeorm";
import Skill from "./skill.entity";
import User from "./user.entity";

@Entity()
export class SkillToUser {
    @PrimaryGeneratedColumn()
    public skillToWilderId!: number

    @Column()
    public skill_id!: number

    @Column()
    public user_id!: number

    @Column()
    public vote!: number

    @ManyToOne(() => Skill, (skill) => skill.id)
    public skill!: Skill

    @ManyToOne(() => User, (user) => user.id)
    public user!: User
}