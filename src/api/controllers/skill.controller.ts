import { Request, Response } from "express";
import { SkillService } from "../../services/skill.service";

export class SkillController {
  public static getAll = async (req: Request, res: Response) => {
    try {
      const skills = await SkillService.getAll();
      res.status(200).send (skills);
    } catch {
      res.status(500).send("Internal connection error")
    }
  }

  public static getById = async (req: Request, res: Response) => {
    try {
      const skill = await SkillService.getById(Number(req.params.id));
      res.status(200).send(skill);
    } catch {
      res.status(500).send("Internal connection error")
    }
  }

  public static create = async (req: Request, res: Response) => {
    try {
      const skill = await SkillService.create(req.body);
      res.status(201).send (skill);
    } catch {
      res.status(500).send("Internal connection error")
    }
  }

  public static update = async (req: Request, res: Response) => {
    try {
      const skill = await SkillService.update(Number(req.params.id), req.body);
      res.status(201).send(skill);
    } catch {
      res.status(500).send("Internal connection error")
    }
  }

  public static delete = async (req: Request, res: Response) => {
    try {
      await SkillService.delete(Number(req.params.id));
      res.status(204).end();
    } catch {
      res.status(500).send("Internal connection error")
    }
  }
}