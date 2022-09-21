import Skill from "../entities/skill.entity";
import databaseConfig from "../config/database/config";
import { SkillSendByUser } from "src/types/skill";
import { CustomError } from "../types/customError.types";
import { SkillToUserInDBInterface } from "../types/skillToUser";
import { SkillToUser } from "../entities/skillToUser.entities";

const skillRepository = databaseConfig.getRepository(Skill);
const skillToUserRepository = databaseConfig.getRepository(SkillToUser);

//***************  CRUD  ********************
//**********************************************

/**
 * Returns all skills from database
 * @returns Skill[]
 */
export const getAll = async (): Promise<Array<Skill>> => {
  const skills = await skillRepository.find();
  if (skills !== null) {
    return skills;
  } else {
    throw new Error(`There is a problem to load skills from the database`);
  }
}


/**
 * Returns a skill by its id from database
 * 
 * @param {number} id The id to use to retrieve a specific skill
 * @returns skill
 */
export const getById = async (id: number): Promise<Skill | null> => {
  const isSkillExist = await skillRepository.findOneBy({
    id: id
  });

  if (isSkillExist && Object.keys(isSkillExist).length > 0) {
    return isSkillExist;
  } else {
    throw new Error(`The skill with the id ${id} doesn't exist in database`);
  }
}

/**
 * Create and return a skill
 * @param {class} skill {
      constructor(parameters) {
      name: string
      }
    }}
    @returns created skill
  */
export const create = async (skill: Skill): Promise<Skill> => {
  const isSkillExist = await skillRepository.findOneBy({
    name: skill.name
  });

  if (isSkillExist && Object.keys(isSkillExist).length > 0) {
    throw new Error(`The skill ${skill.name} already exist in database`);
  }
  return await skillRepository.save(skill);
}


/**
 * Update a skill in database and return it
 * 
 * @param {number} skillId 
 * @param {class} skill 
 * @returns updated skill
 */
export const update = async (skillId: number, skill: Skill): Promise<Skill> => {
  const isNameAlreadyExist = await skillRepository.findOneBy({
    name: skill.name
  })

  const skillToUpdate = await skillRepository.findOneBy({
    id: skillId
  });

  if (isNameAlreadyExist && Object.keys(isNameAlreadyExist).length > 0) {
    throw new Error(`You cannot set a name which already exist in database, choose another name than ${skill.name}`);
  } else if (skillToUpdate !== null && Object.keys(skillToUpdate).length > 0) {
    const updatedSkill = {...skillToUpdate, ...skill};
    return await skillRepository.save(updatedSkill);
  }  else {
    throw new Error(`Problem to update skill with id ${skillId}, it probably doesn't exist in database`);
  }
}


/**
 * Delete a skill by its id in database
 * 
 * @param {number} skillId 
 * @returns no content
 */
export const deleteSkill = async (skillId: number) => {
  const skillToRemove = await skillRepository.findOneBy({id: skillId});
  if (skillToRemove) {
    return await skillRepository.remove(skillToRemove);
  } else {
    throw new CustomError(400, `Problem to remove skill with id ${skillId}, it probably doesn't exist in database`)
  }
}


//***************  HELPERS  ********************
//**********************************************

// Check if all skills exist in database
export const checkIfAllSkillsExist = async (skills: SkillSendByUser[]): Promise<boolean | any | unknown> => {
  const checkErrors: (string | undefined)[] = await Promise.all(skills.map(async skill => {
    const isSkillExist: Skill | null = await skillRepository.findOneBy({ id: skill.id });
    
    if (isSkillExist === null) {
      return `The skill with the identifier ${skill.id} isn't registered in database`;
    } else if (skill.name !== isSkillExist.name) {
      return `The skill ${skill.name} doesn't have the good identifier`;
    } else {
      return "";
    }
  }));
  
  // If there is some errors we return just the first one
  // We filter errors to remove undefined items
  const filteredCheckErrors: (string | undefined)[] = checkErrors.filter(error => typeof error === "string" && error.length > 0)
  if (filteredCheckErrors.length > 0) {
    throw new CustomError(400,  filteredCheckErrors[0]);
  }
  return true;
}

// Retrieve skills users in database
export const retrieveUserSkill = async (skillId: number, userId: number, skillName: string): Promise<SkillToUserInDBInterface | null> => {
  const relationFound = skillToUserRepository.findOneBy({
    skillId: skillId,
    userId: userId
  })

  if (relationFound === null) {
    throw new CustomError(400, `You don't have the skill ${skillName}`);
  }

  return relationFound
}
