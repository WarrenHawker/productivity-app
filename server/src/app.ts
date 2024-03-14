//import packages
import cors from 'cors';
import express from 'express';
import { router as todoRoutes } from './routes/todo.routes';

//initialise express app
export const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use('/todo', todoRoutes);
