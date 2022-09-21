import User from "../entities/user.entity";
import Skill from "../entities/skill.entity";
import { SkillToUser } from "../entities/skillToUser.entities";
import { createdUserInterface, UserInDB, UserInterface } from "../types/user";
import databaseConfig from "../config/database/config";
import { checkIfAllSkillsExist, retrieveUserSkill } from "./skill.service";
import { CustomError } from "../types/customError.types";
import { SkillToUserInDBInterface, UserSkillRelationToDelete } from "../types/skillToUser";
import { CreatedUserSkillRelation, SkillSendByUser } from "../types/skill";

const userRepository = databaseConfig.getRepository(User);
const skillRepository = databaseConfig.getRepository(Skill);
const skillToUserRepository = databaseConfig.getRepository(SkillToUser);


//***************  CRUD  ********************
//**********************************************

/**
 * Returns all user from database
 * @returns User[]
*/
export const getAll = async (): Promise<Array<User>> => {
  const users: User[] = await userRepository.find({
    relations: {
      skillToUser: true
    }
  });

  if (users !== null) {
    return users;
  } else {
    throw new Error(`There is a problem to load users from the database`);
  }
}
  


/**
 * Returns a user by its id from database
 * 
 * @param {number} id The id to use to retrieve a specific user
 * @returns user
*/
export const getById = async (id: number): Promise<User | null> => {
  const isUserExist: User | null = await userRepository.findOneBy({
    id: id
  });

  if (isUserExist && Object.keys(isUserExist).length > 0) {
    return isUserExist;
  } else {
    throw new Error(`The skill with the id ${id} doesn't exist in database`);
  }
}
  

/**
 * Create and return a user
 * @param {user} user {
      constructor(parameters) {
      name: string
      }
    }}
  @returns created user
*/
export const create = async (user: createdUserInterface): Promise<createdUserInterface | void> => {
  // Check possibles errors or corrupted datas sent by the client
  // Check if the user doesn't exist in the database
  const isUserExist: boolean = await isUserAlreadyExistsByName(user.name) 
  if(isUserExist === true) throw new CustomError(400, `The user with the name ${user.name} already exist in database`);
  
  
  // Check all possible wrong id or name for the user skills
  // If the id doesn't exist or if it exist but its name doesn't correspond we return an error message
  if (user.skills.length > 0) {
    await checkIfAllSkillsExist(user.skills);
  }
  
  // If all is good we create the user and its skills
  const createdUser: createdUserInterface =  await userRepository.save(user);
  
  user.skills.forEach(async skill => {
    await skillToUserRepository.save({vote: skill.vote, skillId: skill.id, userId: createdUser.id})
  });
  
  return createdUser;
}


export const update = async (userId: number, user: createdUserInterface): Promise<createdUserInterface> => {
  // Check possibles errors or corrupted datas sent by the client
  // Check if the user doesn't exist in the database
  const isUserExistById: boolean = await isUserAlreadyExistsById(user.id) 
  if(isUserExistById === false) throw new CustomError(400, `The user with the identifier ${userId} doesn't exist in database`);

  // If name already exists for another user in database return an error message
  const isUserExistByName: User | null = await userRepository.findOneBy({ name: user.name });
  if (
    isUserExistByName !== null &&
    isUserExistByName.id !== user.id
  ) throw new CustomError(400, `The user with the name ${user.name} already exist in database`);

  // Check if the skills provided are valid
  let retrievedUserSkills: SkillToUserInDBInterface[] | null = [];
  if (user.skills.length > 0) {
    
  }

  const userToUpdate: User | null = await userRepository.findOneBy({
    id: userId
  });
  const updatedUser = {...userToUpdate, ...user};

  return await userRepository.save(updatedUser);
}

export const updateUserSkills = async (userId: number, skills: SkillSendByUser[]): Promise<SkillToUserInDBInterface[] | any | unknown> => {
  const newSkills: Promise<SkillSendByUser & SkillToUser>[] = skills.map(async skill => {
    const newSkill = await skillToUserRepository.save(skill)
    if (newSkill === null) {
      throw new CustomError(400, `There is a problem to update the skills`);
    } 
    return newSkill;
  })

  if (
    newSkills !== null &&
    newSkills.length > 0
    ) {
    return newSkills;
  } else {
    return new CustomError(400, `There is a problem to update the skills`);
  }
}


export const deleteUser = async (userId: number) => {
  const userToRemove: User | null = await userRepository.findOneBy({id: userId});
  if (userToRemove) {
    return await userRepository.remove(userToRemove);
  } else {
    throw new Error("Problem to remove user or user doesn't exist in database")
  }
}


//***************  HELPERS  ********************
//**********************************************

export const isUserAlreadyExistsByName = async (name: string): Promise<boolean> => {
  const isNameExist: User | null = await userRepository.findOneBy({
    name: name
  });

  // return appropriate error if it already exist
  if (isNameExist && Object.keys(isNameExist).length > 0) {
    return true;
  } else {
     return false;
  }
}

export const isUserAlreadyExistsById = async (id: number): Promise<boolean> => {
  const isIdExist: User | null = await userRepository.findOneBy({
    id: id
  });

  // return appropriate error if it already exist
  if (isIdExist && Object.keys(isIdExist).length > 0) {
    return true;
  } else {
     return false;
  }
}


export const deleteUsersSkills = async (skills: UserSkillRelationToDelete[]): Promise<any> => {
  return skills.map(async skill => {
    const relationToRemove: SkillToUser | null = await skillToUserRepository.findOneBy({skillToUserId: skill.skillToUserId});
    
    
    if (relationToRemove !== null) {
      return await skillToUserRepository.remove(relationToRemove);
    } else {
      throw new Error("Problem to remove user or user doesn't exist in database")
    }
  });
}



