import { Request, Response } from 'express';
import { TaskPriority, TaskSearchData, TaskStatus } from '../../types/task';
import { isNumber, isTaskPriority, isTaskStatus } from '../../utils/functions';
import { ErrorReturn } from '../../types/error-return';
import validator from 'validator';
import { Task } from '../../models/task.model';

const { isEmpty, escape } = validator;

export const getTasks = async (req: Request, res: Response) => {};
