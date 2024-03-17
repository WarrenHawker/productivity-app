import { Request, Response } from 'express';
import { Task } from '../../models/task.model';
import { ErrorReturn } from '../../types/error-return';
import validator from 'validator';
import { TaskPriority, TaskStatus, TaskUdateData } from '../../types/task';
import { isTaskPriority, isTaskStatus } from '../../utils/functions';

const { isEmpty, escape, isDate } = validator;

export const updateTask = async (req: Request, res: Response) => {
  let { title, content, category, priority, status, dueDate } = req.body;
  const taskId = req.params.id;

  const updateData: TaskUdateData = {
    updated_on: new Date(),
  };

  if (title) {
    title = escape(title as string).trim();
    if (!isEmpty(title, { ignore_whitespace: true })) {
      updateData.title = title;
    }
  }

  if (content) {
    content = escape(content as string).trim();
    if (!isEmpty(content, { ignore_whitespace: true })) {
      updateData.content = content;
    }
  }

  if (category) {
    category = escape(category as string).trim();
    if (!isEmpty(category, { ignore_whitespace: true })) {
      updateData.category = category;
    }
  }

  if (priority) {
    if (!isTaskPriority(priority as string)) {
      const error: ErrorReturn = {
        code: 400,
        message: 'Invalid "priority" body parameter.',
        params: ['priority'],
      };
      res.status(400).json(error);
      return;
    } else {
      priority = escape(priority as string).trim();
      if (!isEmpty(priority, { ignore_whitespace: true })) {
        updateData.priority = priority as TaskPriority;
      }
    }
  }

  if (status) {
    if (!isTaskStatus(status as string)) {
      const error: ErrorReturn = {
        code: 400,
        message: 'Invalid "status" body parameter.',
        params: ['status'],
      };
      res.status(400).json(error);
      return;
    } else {
      status = escape(status as string).trim();
      if (!isEmpty(status, { ignore_whitespace: true })) {
        updateData.status = status as TaskStatus;
      }
    }
  }

  if (dueDate) {
    if (!isDate(dueDate)) {
      const error: ErrorReturn = {
        code: 400,
        message: 'Invalid "dueDate" body parameter.',
        params: ['status'],
      };
      res.status(400).json(error);
      return;
    } else {
      updateData.due_date = new Date(dueDate);
    }
  }

  try {
    const task = await Task.findByIdAndUpdate(taskId, updateData, {
      returnDocument: 'after',
    });
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
