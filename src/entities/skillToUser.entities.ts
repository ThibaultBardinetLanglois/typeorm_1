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
    public skillToUserId!: number

    @Column()
    public userId!: number

    @Column()
    public skillId!: number

    @Column({nullable: true})
    public vote!: number
    

    @ManyToOne(() => Skill, (skill) => skill.skillToUser)
    public skill!: Skill

    @ManyToOne(() => User, (user) => user.skillToUser)
    public user!: User
}