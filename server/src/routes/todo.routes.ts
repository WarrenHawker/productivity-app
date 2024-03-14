import express from 'express';
import { ITodo, Todo } from '../models/todo.model';

export const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const todoData: ITodo = req.body;
    const newTodo = new Todo(todoData);
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Failed to create todo' });
  }
});
