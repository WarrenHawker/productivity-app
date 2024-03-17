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
