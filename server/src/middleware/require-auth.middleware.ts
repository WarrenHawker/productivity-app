/*
  "require user authentication" middleware

  Runs before allowing access to any protected routes. 
  Checks both for a valid session  
*/

//import packages
import { NextFunction, Request, Response } from 'express';
import { ISession } from '../types/express-session';

interface ResError extends Error {
  statusCode?: number;
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!(req.session as ISession).user) {
    const err = new Error('Unauthenticated user') as ResError;
    err.statusCode = 401;
    next(err);
  } else {
    next();
  }
};
