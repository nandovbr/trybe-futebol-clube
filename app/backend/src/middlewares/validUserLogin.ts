import { Request, Response, NextFunction } from 'express';
import jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

const emailRegex = /^[a-zA-Z]+[a-zA-Z0-9_.]+@[a-zA-Z.]+[a-zA-Z]$/;

export const validUserLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (email === '' || password === '') {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (!emailRegex.test(email) || password.length < 6) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  next();
};

export const validUserLoged = (req: Request, res: Response, next: NextFunction) => {
  // const { email } = req.body;
  const { authorization } = req.headers;
  // console.log('user: ', user?.role);

  if (!authorization) {
    return res.status(400).json({ message: 'Token must be provided' });
  }

  try {
    const payload = jwt.verify(authorization as any, JWT_SECRET);
    req.body.user = payload;
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  next();
};
