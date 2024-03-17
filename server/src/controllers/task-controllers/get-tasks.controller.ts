import { Request, Response } from 'express';
import { TaskPriority, TaskSearchData, TaskStatus } from '../../types/task';
import { isNumber, isTaskPriority, isTaskStatus } from '../../utils/functions';
import { ErrorReturn } from '../../types/error-return';
import validator from 'validator';
import { Task } from '../../models/task.model';

const { isEmpty, escape } = validator;

export const getTasks = async (req: Request, res: Response) => {
  let { title, content, category, priority, status, page, limit } = req.query;

  const searchData: TaskSearchData = {};

  if (title) {
    title = escape(title as string).trim();
    if (!isEmpty(title, { ignore_whitespace: true })) {
      searchData.title = { $regex: title, $options: 'i' };
    }
  }

  if (content) {
    content = escape(content as string).trim();
    if (!isEmpty(content, { ignore_whitespace: true })) {
      searchData.content = { $regex: content, $options: 'i' };
    }
  }

  if (category) {
    category = escape(category as string).trim();
    if (!isEmpty(category, { ignore_whitespace: true })) {
      searchData.category = { $regex: category, $options: 'i' };
    }
  }

  if (priority) {
    if (!isTaskPriority(priority as string)) {
      const error: ErrorReturn = {
        code: 400,
        message: 'Invalid "priority" search parameter.',
        params: ['priority'],
      };
      res.status(400).json(error);
      return;
    } else {
      priority = escape(priority as string).trim();
      if (!isEmpty(priority, { ignore_whitespace: true })) {
        searchData.priority = priority as TaskPriority;
      }
    }
  }

  if (status) {
    if (!isTaskStatus(status as string)) {
      const error: ErrorReturn = {
        code: 400,
        message: 'Invalid "status" search parameter.',
        params: ['status'],
      };
      res.status(400).json(error);
      return;
    } else {
      status = escape(status as string).trim();
      if (!isEmpty(status, { ignore_whitespace: true })) {
        searchData.status = status as TaskStatus;
      }
    }
  }

  let pageNum: number = 1;
  if (page) {
    if (!isNumber(page as string)) {
      const error: ErrorReturn = {
        code: 400,
        message: 'Invalid "page" search parameter.',
        params: ['page'],
      };
      res.status(400).json(error);

      return;
    } else {
      pageNum = parseInt(escape(page as string).trim());
    }
  }

  let limitNum: number = 10;
  if (limit) {
    if (!isNumber(limit as string)) {
      const error: ErrorReturn = {
        code: 400,
        message: 'Invalid "limit" search parameter.',
        params: ['limit'],
      };
      res.status(400).json(error);
      return;
    } else {
      if (parseInt(escape(limit as string).trim()) > 10) {
        limitNum = 10;
      } else {
        limitNum = parseInt(escape(limit as string).trim());
      }
    }
  }

  try {
    const options = {
      page: pageNum,
      limit: limitNum,
    };
    /* 
      Query uses mongoose-paginate-v2 plugin. 
      For more details see https://www.npmjs.com/package/mongoose-paginate-v2
     */
    const tasks = await Task.paginate(searchData, options);

    const result = {
      currentPage: pageNum,
      totalPages: tasks.totalPages,
      numberOfResults: tasks.docs.length,
      totalNumberOfResults: tasks.totalDocs,
      tasks: tasks.docs,
    };
    res.status(200).json(result);
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
