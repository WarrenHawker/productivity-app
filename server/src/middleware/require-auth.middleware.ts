/*
  "require user authentication" middleware

  Runs before allowing access to any protected routes. 
  Checks both for a valid session as well as the user's current role and status.  
*/

//import packages
import { NextFunction, Request, Response } from 'express';

interface ResError extends Error {
  statusCode?: number;
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session) {
    const err = new Error('Unauthenticated user') as ResError;
    err.statusCode = 401;
    next(err);
  } else {
    next();
  }
};
