import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import joi, { ObjectSchema } from 'joi';
import { IUser } from '../models/User';

export const ValidateSchema = (schema: ObjectSchema) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      await schema.validateAsync(req.body);
      next();
    }
  );
};

export const Schemas = {
  user: {
    create: joi.object<IUser>({
      username: joi
        .string()
        .required()
        .regex(/^[a-zA-Z0-9]{8,16}$/),
      email: joi.string().required().email(),
      password: joi
        .string()
        .required()
        .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,20}$/),
    }),
    update: joi.object<IUser>({
      username: joi
        .string()
        .required()
        .regex(/^[a-zA-Z0-9]{8,16}$/),
      email: joi.string().required().email(),
      password: joi
        .string()
        .required()
        .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,20}$/),
    }),
    logIn: joi.object<IUser>({
      email: joi.string().required().email(),
      password: joi.string().required(),
    }),
  },
};
