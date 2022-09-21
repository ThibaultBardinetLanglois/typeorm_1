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

export interface UserSkillRelationToDelete {
  skillToUserId: 31,
  userId: 4,
  skillId: 15,
  vote: 6
  delete: true
}