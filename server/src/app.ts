//import packages
import cors from 'cors';
import express from 'express';
import { router as taskRoutes } from './routes/task.routes';
import { router as authRoutes } from './routes/auth.routes';
import session from './services/session.service';
import syncDatabases from './services/databaseSync.service';

//initialise express app
export const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(session);

//routes
app.use('/task', taskRoutes);
app.use('/auth', authRoutes);
