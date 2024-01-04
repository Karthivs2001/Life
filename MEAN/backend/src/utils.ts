import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from './models/user.model';
export const baseUrl = () =>
  process.env.BASE_URL
    ? process.env.BASE_URL
    : process.env.NODE_ENV !== 'production'
    ? 'http://localhost:4200'
    : 'https://yourdomain.com';
export const generateToken = (user: User) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || 'somethingsecret',
    {
      expiresIn: '30d',
    }
  );
};

export const isAuth = (req: Request, res: Response, next: Function) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); 
    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET || 'somethingsecret'
    );
    req.user = decode;
    next();
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};
export const isAdmin = (req: Request, res: Response, next: Function) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};
