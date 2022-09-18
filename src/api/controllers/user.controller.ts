import { Request, Response } from "express";
import { UserService } from "../../services/UserService";

export class UserController {
  public static getAll = async (req: Request, res: Response) => {
    try {
      const users = await UserService.getAll();
      res.status(200).send (users);
    } catch {
      res.status(500).send("Internal connection error")
    }
  }

  public static getById = async (req: Request, res: Response) => {
    try {
      const user = await UserService.getById(Number(req.params.id));
      res.status(200).send (user);
    } catch {
      res.status(500).send("Internal connection error")
    }
  }

  public static create = async (req: Request, res: Response) => {
    try {
      const user = await UserService.create(req.body);
      res.status(201).send (user);
    } catch {
      res.status(500).send("Internal connection error")
    }
  }
}