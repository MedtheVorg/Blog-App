import jwt from 'jsonwebtoken';
import { CustomRequest } from '../utils/CustomRequest';
import { NextFunction, Response } from 'express';
import AsyncHandler from 'express-async-handler';
import { CustomError, verifyToken } from '../utils/utils';

export default function ValidateUser() {
  return AsyncHandler(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      try {
        const { token } = req.cookies;
        const decodedToken: any = await verifyToken(
          token,
          process.env.SECRET_KEY
        );

        req.userId = decodedToken._id;
        next();
      } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
          throw CustomError('Internal Server Error', 500);
        } else {
          throw CustomError('Access denied 😤', 403);
        }
      }
    }
  );
}
