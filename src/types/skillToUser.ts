export interface SkillToUserInterface {
  vote: number | null,
  skillId: number,
  userId: number
}

export interface SkillToUserInDBInterface {
  skillToUserId: number,
  vote: number | null,
  skillId: number,
  userId: number
}