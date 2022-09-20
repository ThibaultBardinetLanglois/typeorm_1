import { Request, Response } from "express";
import { UserService } from "../../services/user.service";
import { sayHelloEvent } from "../../subscribers/index.subscriber";


export class UserController {
  public static getAll = async (req: Request, res: Response) => {
    try {
      const users = await UserService.getAll();
      res.status(200).send (users);
    } catch (err) {
      res.status(500).send("Internal connection error")
    } 
  }

  public static getById = async (req: Request, res: Response) => {
    try {
      const user = await UserService.getById(Number(req.params.id));
      sayHelloEvent.emit('coucou', user?.name)
      res.status(200).send (user);
    } catch (err) {
      res.status(500).send("Internal connection error")
    }
  }

  public static create = async (req: Request, res: Response) => {
    try {
      const user = await UserService.create(req.body);
      res.status(201).send (user);
    } catch (err) {
      res.status(500).send(err.message)
    }
  }

  public static update = async (req: Request, res: Response) => {
    try {
      const user = await UserService.update(Number(req.params.id), req.body);
      res.status(201).send(user);
    } catch {
      res.status(500).send("Internal connection error")
    }
  }

  public static delete = async (req: Request, res: Response) => {
    try {
      await UserService.delete(Number(req.params.id));
      res.status(204).end();
    } catch {
      res.status(500).send("Internal connection error")
    }
  }
}