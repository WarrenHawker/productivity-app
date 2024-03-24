import { Request, Response } from 'express';
import { redisHashExists } from '../../utils/functions';
import { ErrorReturn } from '../../types/error-return';
import { Task } from '../../models/task.model';
import { redisClient } from '../../lib/client.redis';
import { escape } from 'validator';

const getNonCompletedTasks = async (res: Response) => {
  try {
    /*check hashkey exists
    If hashkey exists, pull from redis.
    If not, pull from mongodb and update redis
  */

    let tasks = [];
    const exists = await redisHashExists('tasks');

    if (exists) {
      const tasksObject = await redisClient.hGetAll('tasks');
      tasks = Object.values(tasksObject).map((taskStr) => JSON.parse(taskStr));
    } else {
      tasks = await Task.find({ isCompleted: false });
      const tasksHashKey = 'tasks';
      for (const task of tasks) {
        await redisClient.hSet(
          tasksHashKey,
          task.id.toString(),
          JSON.stringify(task)
        );
      }
    }

    if (tasks.length == 0) {
      const error: ErrorReturn = {
        code: 404,
        message: 'no tasks found',
      };
      res.status(404).json(error);
      return;
    }

    res.status(200).json(tasks);
  } catch (err) {
    const error: ErrorReturn = {
      code: 500,
      message: (err as Error).message,
    };
    res.status(500).json(error);
    return;
  }
};

const getCompletedTasks = async (res: Response) => {
  try {
    const tasks = await Task.find({ isCompleted: true });
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
};

export const getTasks = async (req: Request, res: Response) => {
  let { completed } = req.query;
  if (completed) {
    completed = escape(completed as string).trim();
  }

  if (completed == 'true') {
    getCompletedTasks(res);
  } else {
    getNonCompletedTasks(res);
  }
};
