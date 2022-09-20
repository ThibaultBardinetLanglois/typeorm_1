import { SkillInterface, SkillInDB, SkillSendByUser } from "./skill";

export interface UserInterface {
  name: string;
  skills: SkillInterface[];
}

export interface UserInDB extends UserInterface {
  id: number;
}

export interface createdUserInterface {
  id: number,
  name: string;
  skills: SkillSendByUser[];
}