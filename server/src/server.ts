//import packages
import mongoose from 'mongoose';
import { app } from './app';
require('dotenv').config();
import { Task } from './models/task.model';
import syncDatabases from './services/databaseSync.service';
import { redisClient } from './lib/client.redis';

//port and database variables - imported from .env file
const port = process.env.PORT || 5000;
const mongodb = process.env.MONGO_DB;

//start server
app.listen(port, async () => {
  try {
    //connect to redis and mongoDB databases
    await redisClient.connect();
    await mongoose.connect(mongodb!, { dbName: 'test' });

    //clear redis database
    redisClient.flushAll();

    //pull all non-completed tasks into Redis
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

    //register bull job to resync databases every 6 hours
    syncDatabases();

    console.log(`server running on port ${port}`);
    console.log('environment: ', app.get('env'));
  } catch (error) {
    console.error(error);
  }
});
