import { Request, Response } from "express";
import * as UserService from "../../services/user.service";
import { sayHelloEvent } from "../../subscribers/index.subscriber";
import User from "../../entities/user.entity";
import { createdUserInterface, UserInDB, UserInterface } from "src/types/user";
import { CustomError } from "../../types/customError.types";
import * as skillService from "../../services/skill.service";
import Skill from "../../entities/skill.entity";
import { SkillSendByUser, CreatedUserSkillRelation } from "../../types/skill";
import { SkillToUserInDBInterface, UserSkillRelationToDelete } from "../../types/skillToUser";
import { compareObjectsArray } from "../../utils/utils";

export const getAll = async (req: Request, res: Response): Promise<User[] | any> => {
  try {
    const users: User[] = await UserService.getAll();
    res.status(200).send (users);
  } catch (err: any | unknown) {
    res.status(500).send(err.message)
  } 
}

export const getById = async (req: Request, res: Response): Promise<User | any> => {
  try {
    const user: User | null = await UserService.getById(Number(req.params.id));
    sayHelloEvent.emit('coucou', user?.name)
    res.status(200).send (user);
  } catch (err: any | unknown) {
    res.status(500).send(err.message)
  }
}

export const create = async (req: Request, res: Response): Promise<User | any> => {
  try {
    const user: createdUserInterface | void = await UserService.create(req.body);
    res.status(201).send (user);
  } catch (err: any | unknown) {
    res.status(err.status).send(err.message)
  }
}

export const update = async (req: Request, res: Response): Promise<createdUserInterface | any> => {
  try {
    const user: createdUserInterface = await UserService.update(Number(req.params.id), req.body);
    res.status(201).send(user);
  } catch (err: any | unknown) {
    res.status(500).send(err.message)
  }
}


export const updateUserSkills = async (req: Request, res: Response): Promise<any> => {
  let actualSkills: SkillToUserInDBInterface[] | null = req.body.skills.filter((skill: SkillToUserInDBInterface)  => (Object.keys(skill).includes("skillToUserId") === true) && Object.keys(skill).includes("toDelete") === false);
  
  let newSkills: CreatedUserSkillRelation[] | null = req.body.skills.filter((skill: SkillSendByUser)  => Object.keys(skill).includes("skillToUserId") === false).map((skill: any )=> {
    return { userId: Number(req.params.id), skillId: skill.id, vote: skill.vote }
  });

  let skillsToDelete: UserSkillRelationToDelete[] = req.body.skills.filter((skill: UserSkillRelationToDelete) => Object.keys(skill).includes("toDelete") === true);
  
  console.log("to delete =>", skillsToDelete);
  
  if (skillsToDelete.length > 0) {
    await UserService.deleteUsersSkills(skillsToDelete);
  }
  
  const newSkillArray: (any)[] = [...actualSkills!, ...newSkills!]
  console.log("new Array =>", newSkillArray);
  
  let updatedSkills: SkillToUserInDBInterface[] | null;
  if (newSkillArray.length > 0) {
    updatedSkills = await UserService.updateUserSkills(parseInt(req.params.id), newSkillArray);
  }
  
  
  res.status(200).send("You have change your skills!");
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    await UserService.deleteUser(Number(req.params.id));
    res.status(204).end();
  } catch (err: any | unknown) {
    res.status(500).send(err.message)
  }
}
