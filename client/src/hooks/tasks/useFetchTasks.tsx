import { useQuery } from '@tanstack/react-query';
import { FetchTaskOptions } from '../../types/task';

export const fetchTasks = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
  return data;
};

const useFetchTasks = (options?: FetchTaskOptions) => {
  let fetchUrl = `${import.meta.env.VITE_API_BASE_URL}/task`;

  if (options) {
    if (options.title) {
      if (fetchUrl.includes('?')) {
        fetchUrl += `&title=${options.title}`;
      } else {
        fetchUrl += `?title=${options.title}`;
      }
    }

    if (options.content) {
      if (fetchUrl.includes('?')) {
        fetchUrl += `&content=${options.content}`;
      } else {
        fetchUrl += `?content=${options.content}`;
      }
    }

    if (options.category) {
      if (fetchUrl.includes('?')) {
        fetchUrl += `&category=${options.category}`;
      } else {
        fetchUrl += `?category=${options.category}`;
      }
    }

    if (options.priority) {
      if (fetchUrl.includes('?')) {
        fetchUrl += `&priority=${options.priority}`;
      } else {
        fetchUrl += `?priority=${options.priority}`;
      }
    }

    if (options.status) {
      if (fetchUrl.includes('?')) {
        fetchUrl += `&status=${options.status}`;
      } else {
        fetchUrl += `?status=${options.status}`;
      }
    }

    if (options.page) {
      if (fetchUrl.includes('?')) {
        fetchUrl += `&page=${options.page}`;
      } else {
        fetchUrl += `?page=${options.page}`;
      }
    }

    if (options.limit) {
      if (fetchUrl.includes('?')) {
        fetchUrl += `&limit=${options.limit}`;
      } else {
        fetchUrl += `?limit=${options.limit}`;
      }
    }
  }

  const result = useQuery({
    queryKey: options?.queryKey || ['tasks'],
    queryFn: () => fetchTasks(fetchUrl),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  return result;
};

export default useFetchTasks;
