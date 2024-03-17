import { Document } from 'mongoose';

type TaskPriority = 'low' | 'medium' | 'high';
type TaskStatus = 'not started' | 'started' | 'completed';

export interface ITask extends Document {
  title: string;
  content: string;
  created_on: Date;
  updated_on: Date;
  category: string;
  priority: TaskPriority;
  due_date?: Date;
  status: TaskStatus;
}

export interface TaskSearchData {
  title?: { $regex: string; $options: string };
  content?: { $regex: string; $options: string };
  category?: { $regex: string; $options: string };
  priority?: TaskPriority;
  status?: TaskStatus;
}

export interface TaskUdateData {
  title?: string;
  content?: string;
  category?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  due_date?: Date;
  updated_on: Date;
}
