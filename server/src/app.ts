//import packages
import cors from 'cors';
import express from 'express';
import { router as taskRoutes } from './routes/task.routes';

//initialise express app
export const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use('/task', taskRoutes);
