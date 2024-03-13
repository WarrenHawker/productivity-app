//import packages
import cors from 'cors';
import express from 'express';

// import { router as authRoutes } from './routes/auth.route';
// import { router as userRoutes } from './routes/user.route';
// import { router as sessionRoutes } from './routes/session.route';
// import { router as entryRoutes } from './routes/entry.route';
// import { router as logRoutes } from './routes/log.route';
// import session from './services/session.service';
// import { rateLimiter } from './middleware/rate-limiter.middleware';

//initialise express app
export const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
// app.use('/auth', authRoutes);
// app.use('/user', userRoutes);
// app.use('/session', sessionRoutes);
// app.use('/entry', entryRoutes);
// app.use('/log', logRoutes);
