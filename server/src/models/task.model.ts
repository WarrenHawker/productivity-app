import mongoose, { Schema, model } from 'mongoose';
import { ITask, TaskPriority, TaskStatus } from '../types/task';
import paginate from 'mongoose-paginate-v2';

const taskSchema: Schema<ITask> = new Schema<ITask>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created_on: {
    type: Date,
    default: Date.now,
  },
  updated_on: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium' as TaskPriority,
  },
  due_date: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['not started', 'started', 'completed'],
    default: 'not started' as TaskStatus,
  },
});

taskSchema.plugin(paginate);

interface TaskDocument extends mongoose.Document, ITask {}

export const Task = model<TaskDocument, mongoose.PaginateModel<TaskDocument>>(
  'Task',
  taskSchema,
  'tasks'
);
