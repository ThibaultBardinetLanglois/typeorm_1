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

export interface CreatedUserSkillRelation {
  userId: number,
  skillId: number,
  vote: number
}
