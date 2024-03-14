//import packages
import mongoose from 'mongoose';
import { app } from './app';
require('dotenv').config();
//port and database variables - imported from .env file
const port = process.env.PORT || 5000;
const mongodb = process.env.MONGO_DB;

//currently active environment (development or production), used by email templates
export let activeEnvironment: string;

//start server
app.listen(port, async () => {
  await mongoose.connect(mongodb!, { dbName: 'test' });
  console.log(`server running on port ${port}`);
  console.log('environment: ', app.get('env'));
  activeEnvironment = app.get('env');
});
