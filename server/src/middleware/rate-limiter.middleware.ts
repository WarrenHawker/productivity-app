/*
  "rate limiter" middleware

  the signin user endpoint is rate limited to 3 requests per email. 
  If the limit is reached, the account status will be changed to "locked" and cannot be unlocked
  until the session is cleared
*/

import { IOredisClient } from '../lib/client.redis';
import rateLimit from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import { sendEmail } from '../services/email.service';
import { ErrorReturn } from '../types/error-return';

export const signinRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many failed signin attemps',
  statusCode: 401,
  store: new RedisStore({
    // @ts-expect-error - Known issue: the `call` function is not present in @types/ioredis
    sendCommand: (...args: string[]) => IOredisClient.call(...args),
  }),
  handler: async (req, res, options) => {
    const recipient = 'hawker.warren@gmail.com';
    const subject = 'Rate Limit Exceeded';
    const text = `The rate limit has been exceeded for IP: ${req.ip}. Action may be required.`;
    const html = `The rate limit has been exceeded for IP: ${req.ip}. Action may be required.`;
    sendEmail(recipient, subject, text, html);
    const error: ErrorReturn = {
      code: 401,
      message: 'Too many failed signin attemps - account locked',
    };
    res.status(401).json(error);
  },
});
