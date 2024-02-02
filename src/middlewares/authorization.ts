import { Request, Response, NextFunction } from 'express';

interface User {
  role: string;
  // Add other properties of the user if needed
}

export const authorization = (...role: string[]) => {
  return (
    req: Request & { user?: User },
    res: Response,
    next: NextFunction,
  ) => {
    const userRole: string | undefined = req.user?.role;

    if (!userRole || !role.includes(userRole)) {
      return res.status(403).json({
        status: 'fail',
        error: 'You are not authorized to access this',
      });
    }

    next();
  };
};
