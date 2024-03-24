import { ErrorReturn } from '../../types/error-return';
import { Request, Response } from 'express';
import validator from 'validator';
import { ISession } from '../../types/express-session';

const { isEmail, isEmpty, isStrongPassword, normalizeEmail, escape } =
  validator;

export const signin = async (req: Request, res: Response) => {
  //get email and password from body params
  let { email, password } = req.body;

  //check all params exist
  const missingParams = [];
  if (!email) {
    missingParams.push('email');
  }
  if (!password) {
    missingParams.push('password');
  }
  if (missingParams.length > 0) {
    const error: ErrorReturn = {
      code: 400,
      message: 'Missing body parameters',
      params: missingParams,
    };
    res.status(400).json(error);
    return;
  }

  //check empty fields
  const emptyFields = [];
  if (isEmpty(email, { ignore_whitespace: true })) {
    emptyFields.push('name');
  }
  if (isEmpty(password, { ignore_whitespace: true })) {
    emptyFields.push('email');
  }
  if (emptyFields.length > 0) {
    const error: ErrorReturn = {
      code: 400,
      message: 'Empty input fields',
      params: emptyFields,
    };
    res.status(400).json(error);
    return;
  }

  //check email is valid
  if (!isEmail(email)) {
    const error: ErrorReturn = {
      code: 400,
      message: 'Invalid email',
      params: ['email'],
    };
    res.status(400).json(error);
    return;
  }

  //check password is valid
  if (!isStrongPassword(password)) {
    const error: ErrorReturn = {
      code: 400,
      message: 'Password not strong enough',
      params: ['password'],
    };
    res.status(400).json(error);
    return;
  }

  //sanitise inputs
  email = escape(email).trim();
  email = normalizeEmail(email, { gmail_remove_dots: false });
  password = password.trim();

  //check credentials
  const userCredentials = {
    username: process.env.USERNAME,
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
  };

  if (
    !userCredentials.username ||
    !userCredentials.email ||
    !userCredentials.password
  ) {
    const error: ErrorReturn = {
      code: 500,
      message: 'user credentials not found',
      params: [],
    };
    res.status(500).json(error);
    return;
  }

  if (
    !(email == userCredentials.email && password == userCredentials.password)
  ) {
    const error: ErrorReturn = {
      code: 400,
      message: 'wrong credentials',
      params: ['email', 'password'],
    };
    res.status(400).json(error);
    return;
  }

  //create session and store in Redis
  try {
    (req.session as ISession).user = {
      username: userCredentials.username,
      email: userCredentials.email,
    };
    res.status(200).json((req.session as ISession).user);
  } catch (err) {
    const error: ErrorReturn = {
      code: 500,
      message: (err as Error).message,
    };
    res.status(500).json(error);
    return;
  }
};
