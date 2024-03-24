import express from 'express';
import { createTask } from '../controllers/task-controllers/create-task.controller';
import { deleteTask } from '../controllers/task-controllers/delete-task.controller';
import { getTasks } from '../controllers/task-controllers/get-non-completed-tasks.controller';
import { updateTask } from '../controllers/task-controllers/update-task.controller';
import { authenticate } from '../middleware/require-auth.middleware';

export const router = express.Router();

router.use(authenticate);

router.get('/', getTasks);

router.post('/', createTask);

router.patch('/:id', updateTask);

router.delete('/:id', deleteTask);
