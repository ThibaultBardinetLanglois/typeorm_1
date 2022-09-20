export interface SkillInterface {
  name: string
}

export interface SkillInDB extends SkillInterface {
  id: number;
}

export interface SkillSendByUser {
  id: number,
  name: string,
  vote: number
}