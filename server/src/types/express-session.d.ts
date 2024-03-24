import { UserRole, UserStatus } from '@prisma/client';
import { Session } from 'express-session';

export interface ISession extends Session {
  user: {
    username: string;
    email: string;
  };
}
