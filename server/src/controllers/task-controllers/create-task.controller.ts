import { Request, Response } from 'express';
import { ErrorReturn } from '../../types/error-return';
import validator from 'validator';
import { isTaskPriority, isTaskStatus } from '../../utils/functions';
import { TaskPriority, TaskStatus } from '../../types/task';
import { Task } from '../../models/task.model';
import { redisClient } from '../../lib/client.redis';

const { isEmpty, escape, isDate } = validator;

export const createTask = async (req: Request, res: Response) => {
  const { title, content, category, priority, dueDate, status } = req.body;

  const missingFields = [];
  if (!title) {
    missingFields.push('title');
  }
  if (!content) {
    missingFields.push('content');
  }
  if (!category) {
    missingFields.push('category');
  }
  if (!priority) {
    missingFields.push('priority');
  }
  if (!status) {
    missingFields.push('status');
  }
  if (missingFields.length > 0) {
    const error: ErrorReturn = {
      code: 400,
      message: 'Missing body parameters',
      params: missingFields,
    };
    res.status(400).json(error);
    return;
  }

  const emptyFields = [];
  if (isEmpty(title, { ignore_whitespace: true })) {
    emptyFields.push('title');
  }
  if (isEmpty(content, { ignore_whitespace: true })) {
    emptyFields.push('content');
  }
  if (isEmpty(category, { ignore_whitespace: true })) {
    emptyFields.push('category');
  }
  if (isEmpty(priority, { ignore_whitespace: true })) {
    emptyFields.push('priority');
  }
  if (isEmpty(status, { ignore_whitespace: true })) {
    emptyFields.push('status');
  }
  if (emptyFields.length > 0) {
    const error: ErrorReturn = {
      code: 400,
      message: 'Empty input fields',
      params: emptyFields,
    };
    res.status(400).json(error);
    return;
  }

  if (!isTaskPriority(priority)) {
    const error: ErrorReturn = {
      code: 400,
      message: 'Invalid Task Priority',
      params: ['priority'],
    };
    res.status(400).json(error);
    return;
  }

  if (!isTaskStatus(status)) {
    const error: ErrorReturn = {
      code: 400,
      message: 'Invalid Task Status',
      params: ['status'],
    };
    res.status(400).json(error);
    return;
  }

  if (dueDate) {
    if (isDate(dueDate)) {
      const error: ErrorReturn = {
        code: 400,
        message: 'Invalid Due Date',
        params: ['dueDate'],
      };
      res.status(400).json(error);
      return;
    }
  }

  const taskData = {
    title: escape(title).trim(),
    content: escape(content).trim(),
    category: escape(category).trim(),
    priority: priority as TaskPriority,
    status: status as TaskStatus,
    created_on: new Date(),
    due_date: dueDate ? new Date(dueDate) : null,
  };

  try {
    const task = await Task.create(taskData);
    //if task is non-completed, sync to redis
    if (!task.isCompleted) {
      await redisClient.hSet('tasks', task.id.toString(), JSON.stringify(task));
    }
    res.status(201).json(task);
  } catch (err) {
    const error: ErrorReturn = {
      code: 500,
      message: (err as Error).message,
    };
    res.status(500).json(error);
    return;
  }
};
