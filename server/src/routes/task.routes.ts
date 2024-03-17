import express from 'express';
import { createTask } from '../controllers/task-controllers/create-task.controller';
import { deleteTask } from '../controllers/task-controllers/delete-task.controller';
import { getTaskById } from '../controllers/task-controllers/get-task.controller';
import { getTasks } from '../controllers/task-controllers/get-tasks.controller';
import { updateTask } from '../controllers/task-controllers/update-task.controller';

export const router = express.Router();

router.get('/', getTasks);

router.get('/:id', getTaskById);

router.post('/', createTask);

router.patch('/:id', updateTask);

router.delete('/:id', deleteTask);
