// import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm;

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
  const { email } = req.body;
  const { authorization } = req.headers;
  // console.log('user: ', user?.role);

  if (!authorization) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (!email) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  next();
};

// export const validUserLogedMatch = (req: Request, res: Response, next: NextFunction) => {
//   const { authorization } = req.headers;

//   try {
//     const verifyToken = verify(authorization as any, JWT_SECRET);
//     verifyToken as JwtPayload;
//   } catch (err) {
//     return res.status(401).json({ message: 'Token must be a valid token' });
//   }

//   next();
// };
