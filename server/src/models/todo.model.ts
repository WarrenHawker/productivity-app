import mongoose, { Document, Schema } from 'mongoose';

enum Priority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

enum Status {
  NotStarted = 'not started',
  Started = 'started',
  Completed = 'completed',
}

interface ITodo extends Document {
  title: string;
  content: string;
  created_on: Date;
  updated_on: Date;
  category: string;
  priority: Priority;
  due_date?: Date;
  status: Status;
}

const todoSchema: Schema<ITodo> = new Schema<ITodo>({
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
    default: 'medium' as Priority,
  },
  due_date: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['not started', 'started', 'completed'],
    default: 'not started' as Status,
  },
});

const Todo = mongoose.model<ITodo>('Todo', todoSchema);

export { Todo, ITodo };
