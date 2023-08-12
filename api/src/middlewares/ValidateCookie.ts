import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { CustomError, verifyToken } from '../utils/utils';

function validateCookie() {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { userId } = req.params;
      const { token } = req.cookies;
      const decodedToken: any = await verifyToken(
        token,
        process.env.SECRET_KEY
      );
      if (decodedToken._id == userId) {
        next();
      } else {
        throw CustomError('Access denied 😤', 401);
      }
    }
  );
}

export { validateCookie };
