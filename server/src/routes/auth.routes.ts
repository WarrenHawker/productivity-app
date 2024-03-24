import express from 'express';
import { signin } from '../controllers/auth-controllers/signin.controller';
import { signout } from '../controllers/auth-controllers/signout.controller';

export const router = express.Router();

router.post('/signin', signin);

router.post('/signout', signout);
