import { Request, Response } from 'express';
import { Task } from '../../models/task.model';
import { ErrorReturn } from '../../types/error-return';
import { redisClient } from '../../lib/client.redis';

export const deleteTask = async (req: Request, res: Response) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      const error: ErrorReturn = {
        code: 404,
        message: 'task not found',
      };
      res.status(404).json(error);
      return;
    } else {
      //if deleted task is non-completed, remove from redis
      if (!task.isCompleted) {
        const redisTask = await redisClient.hDel('tasks', taskId);
      }
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
