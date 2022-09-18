import { Skill, SkillInDB } from "./skill";

export interface User {
  name: string;
  //skills: Skill[];
}

export interface UserInDB extends User {
  id: number;
  //skills: SkillInDB[];
}
