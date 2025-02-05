import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
dotenv.config();

export const AuthenticationError = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
}

export const authenticateTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || '') as { _id: string; username: string };
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};


export const authenticateToken = (req: Request) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return null; 
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY || '') as { _id: string; username: string };
  } catch (err) {
    console.log('Invalid token', err);
    return null;
  }
};

export const signToken = ({ username, email, _id }: { username: string, email: string, _id: unknown }) => {
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY || '';

  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};
