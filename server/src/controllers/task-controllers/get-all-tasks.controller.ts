import { Request, Response } from 'express';
import validator from 'validator';
import { isBoolean } from '../../utils/functions';
import { ErrorReturn } from '../../types/error-return';
import { Task } from '../../models/task.model';

const { isEmpty, escape } = validator;

export const getAllTasks = async (req: Request, res: Response) => {
  let { completed } = req.query;

  if (completed) {
    completed = escape(completed as string).trim();
    if (!isBoolean(completed)) {
      const error: ErrorReturn = {
        code: 400,
        message: 'Invalid "completed" search parameter.',
        params: ['completed'],
      };
      res.status(400).json(error);
      return;
    } else {
      //fetch all tasks included completed
      try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
        return;
      } catch (err) {
        const error: ErrorReturn = {
          code: 500,
          message: (err as Error).message,
        };
        res.status(500).json(error);
        return;
      }
    }
  } else {
    try {
      //fetch all non-completed tasks
      const tasks = await Task.find({
        status: { $in: ['not started', 'started'] },
      });
      res.status(200).json(tasks);
    } catch (err) {
      const error: ErrorReturn = {
        code: 500,
        message: (err as Error).message,
      };
      res.status(500).json(error);
      return;
    }
  }
};
