import { NextFunction, Response } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { token_secret } from '../config';

interface DecodedToken {
  _id: string;
  email: string;
}

interface CustomRequest extends Request {
  user?: DecodedToken;
  token?: any;
}

interface CustomResponse extends Response {}

// Blacklist to store invalidated tokens
const tokenBlacklist: Set<string> = new Set();

export const verifyToken: any = async (
  req: CustomRequest,
  res: CustomResponse,
  next: NextFunction,
) => {
  try {
    const token = (req?.headers as any)?.authorization?.split(' ')?.[1];

    if (!token) {
      return res.status(401).json({
        status: 'fail',
        error: 'You are not logged in',
      });
    }

    // Check if the token is in the blacklist
    if (tokenBlacklist.has(token)) {
      return res
        .status(401)
        .json({
          status: 'fail',
          error: 'Token has been invalidated',
        })
        .redirect('/signin');
    }
    if (token) {
      const decoded = jwt.verify(token, token_secret);
      req.token = decoded;

      if (!decoded) {
        return res.status(403).json({
          status: 'fail',
          error: 'Invalid token',
        });
      }
      req.user = decoded as DecodedToken;
      next();
    }
  } catch (error) {
    if ((error as VerifyErrors).name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'fail',
        error: 'Token has expired',
      });
    }
    next(error);
  }
};

// Function to invalidate a token
export const invalidateToken = (token: string) => {
  tokenBlacklist.add(token);
};
