import User from "../entities/user.entity";
import Skill from "../entities/skill.entity";
import { SkillToUser } from "../entities/skillToUser.entities";
import { createdUserInterface, UserInDB, UserInterface } from "../types/user";
import { SkillToUserInterface } from "../types/skillToUser";
import { SkillSendByUser } from "../types/skill";
import databaseConfig from "../config/database/config";

const userRepository = databaseConfig.getRepository(User);
const skillRepository = databaseConfig.getRepository(Skill);
const skillToUserRepository = databaseConfig.getRepository(SkillToUser);

export class UserService {

  public static async getAll(): Promise<Array<User>> {
    return await userRepository.find();
  }


  public static async getById(id: number): Promise<User | null> {
    return await userRepository.findOneBy({
      id: id
    });
  }


  public static async create(user: createdUserInterface): Promise<createdUserInterface | void> {
    
    const createdUser = await userRepository.save(user);
    const newSkills = [];
    for(let i = 0; i < user.skills.length; i++) {
      const skill = await skillToUserRepository.save({vote: user.skills[i].vote, skillId: user.skills[i].id, userId: user.id})
      console.log("skill created =>", skill);
      
    }
    return createdUser;

    // if (user.skills.length) {
    //   for (let i = 0; i < user.skills.length; i++) {
    //     const isSkillExist = await skillRepository.findOneBy({
    //       id: user.skills[0].id
    //     })
    //     if (!isSkillExist || isSkillExist.name !== user.skills[0].name) {
    //       throw new Error(`The skill ${user.skills[i].name} doesn't exist in database`)
    //     } 
    //   }
    // }
    
    // let createdUser: createdUserInterface = await userRepository.save(user);
    // console.log("created user step1 =>", createdUser)
    
    // if (user.skills.length) {
    //   let skills = await Promise.all(user.skills.map(async skill => {
    //     return await skillToUserRepository.save({  
    //       vote: skill.vote, 
    //       skill: skill.id,
    //       user: createdUser.id
    //     })
    //   }))
    //   console.log("Skill new =>", skills)
    //   console.log("created user step2 =>", createdUser)
    //   return createdUser;
    // } else {
    //   return await userRepository.save(user);
    // }
  }


  public static async update(userId: number, user: UserInterface): Promise<UserInterface> {
    const userToUpdate = await userRepository.findOneBy({
      id: userId
    });
    const updatedUser = {...userToUpdate, ...user};
    return await userRepository.save(updatedUser);
  }


  public static async delete(userId: number) {
    const userToRemove = await userRepository.findOneBy({id: userId});
    if (userToRemove) {
      return await userRepository.remove(userToRemove);
    } else {
      throw new Error("Problem to remove user or user doesn't exist in database")
    }
  }
}