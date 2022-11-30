import { NextFunction, Request, Response } from 'express';
import jwt = require('jsonwebtoken');
// import Teams from '../database/models/Teams';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

export const validToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  try {
    jwt.verify(authorization as any, JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  next();
};

// Só para o lint não reclamar
export const getAll = async () => {};
