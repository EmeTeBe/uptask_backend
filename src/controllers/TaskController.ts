import type { Request, Response } from "express";
import Task from "../models/Task";

interface User {
  name: string;
}
interface user {
  email: string;
}

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    try {
      const task = new Task(req.body);
      task.project = req.project._id;
      req.project.tasks.push(task._id);
      await task.save();
      await req.project.save();
      res.send("Tarea creada correctamente");
    } catch (error) {
      console.log(error);
    }
  };
}
