import { Request, Response } from 'express';
import { Task } from '../../models/task.model';
import { ErrorReturn } from '../../types/error-return';

export const getTaskById = async (req: Request, res: Response) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      const error: ErrorReturn = {
        code: 404,
        message: 'task not found',
      };
      res.status(404).json(error);
      return;
    } else {
      res.status(200).json(task);
      return;
    }
  } catch (err) {
    const error: ErrorReturn = {
      code: 500,
      message: (err as Error).message,
    };
    res.status(500).json(error);
    return;
  }
};
