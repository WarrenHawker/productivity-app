type TaskPriority = 'low' | 'medium' | 'high';
type TaskStatus = 'not started' | 'started' | 'completed';

export type FetchTaskOptions = {
  title?: string;
  content?: string;
  category?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  page?: number;
  limit?: number;
  queryKey?: string[];
};

export type TaskData = {
  title: string;
  content: string;
  category: string;
  priority: TaskPriority;
  status: TaskStatus;
  due_date?: string | Date;
  created_on: string | Date;
  updated_on?: string | Date;
  __v: number;
  _id: string;
};
