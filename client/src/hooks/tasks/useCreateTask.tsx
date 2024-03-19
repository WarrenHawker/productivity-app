import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateTaskData, TaskData, TaskDataPagination } from '../../types/task';

export const createTask = async (taskData: CreateTaskData) => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/task`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
  return data;
};

const useCreateTask = () => {
  const queryClient = useQueryClient();
  // return useMutation<TaskData, Error, CreateTaskData>(createTask);
  return useMutation({
    mutationFn: createTask,
    onSuccess: (task: TaskData) => {
      queryClient.setQueryData(
        ['tasks'],
        (prevData: TaskDataPagination | undefined) => {
          if (prevData) {
            if (!prevData.tasks) {
              return { ...prevData, tasks: [task] };
            } else return { ...prevData, tasks: [...prevData.tasks, task] };
          }
        }
      );
    },
  });
};

export default useCreateTask;

// const queryClient = useQueryClient();
// return useMutation<TaskData, Error, CreateTaskOptions>(createTask, {
//   onSuccess: (task: TaskData) => {
//     queryClient.setQueryData(
//       ['tasks'],
//       (prevData: TaskData[] | undefined) => {
//         if (!prevData) {
//           return [task];
//         }
//         return [...prevData, task];
//       }
//     );
//   },
// });
