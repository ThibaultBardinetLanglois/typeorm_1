import { Request, Response } from "express";
import Skill from "src/entities/skill.entity";
import * as SkillService from "../../services/skill.service";


export const getAll = async (req: Request, res: Response): Promise<Skill[] | any> => {
    try {
      const skills: Skill[] = await SkillService.getAll();
      res.status(200).send (skills);
    } catch (err: any | unknown) {
      res.status(500).send(err.message)
    }
  }
  

export const getById = async (req: Request, res: Response): Promise<Skill | any> => {
  try {
    const skill: Skill | null = await SkillService.getById(Number(req.params.id));
    res.status(200).send(skill);
  } catch (err: any | unknown) {
    res.status(500).send(err.message)
  }
}


export const create = async (req: Request, res: Response): Promise<Skill | any> => {
  try {
    const skill: Skill = await SkillService.create(req.body);
    res.status(201).send (skill);
  } catch (err: any | unknown) {
    res.status(err.status).send(err.message)
  }
}


export const update = async (req: Request, res: Response): Promise<Skill | any> => {
  try {
    const skill: Skill = await SkillService.update(Number(req.params.id), req.body);
    res.status(201).send(skill);
  } catch (err: any | unknown) {
    res.status(500).send(err.message)
  }
}


export const deleteSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    await SkillService.deleteSkill(Number(req.params.id));
    res.status(204).end();
  } catch (err: any | unknown) {
    res.status(500).send(err.message)
  }
}
