/* 
  Uses the bullmq package to queue up a job.
  Every 6 hours redis will pull data from mongodb
*/
import { Task } from '../models/task.model';
import { Queue, Worker } from 'bullmq';
import { IOredisClient, redisClient } from '../lib/client.redis';

const redisConnect = {
  connection: IOredisClient,
};

export const syncTasks = async () => {
  try {
    const tasks = await Task.find({ isCompleted: false });
    const tasksHashKey = 'tasks';
    await redisClient.del(tasksHashKey);
    for (const task of tasks) {
      await redisClient.hSet(
        tasksHashKey,
        task.id.toString(),
        JSON.stringify(task)
      );
    }
  } catch (error) {
    console.error(error);
  }
};

const syncDatabases = async () => {
  const hour = 6 * 60 * 60 * 1000;
  const databaseSync = new Queue('databaseSync', redisConnect);
  await databaseSync.add('tasks', {}, { repeat: { every: hour } });

  new Worker(
    'databaseSync',
    async (job) => {
      if (job.name == 'tasks') {
        await syncTasks();
      }
    },
    redisConnect
  );
};

export default syncDatabases;
