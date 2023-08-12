import User from '../models/User';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import CustomError from '../utils/CustomErrorInterface';
import Logger from '../library/Logger';

const readUser = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await User.findById({ _id: userId });
  Logger.warn('getting user info');
  user
    ? res.status(200).json({ user, cookies: req.cookies })
    : res.status(404).json({ message: 'user not found' });
});
const readAll = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find();
  res.status(200).json({ users });
});
const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const tempUser = await User.findOne({ email });
  if (tempUser) {
    const error: CustomError = new Error(
      'A user Already Exists with the provided Email , please try again.'
    );
    error.statusCode = 409;
    throw error;
  }
  const user = new User({ username, email, password });
  await user.save();
  res.status(201).json({ user });
});
const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await User.findByIdAndUpdate({ _id: userId }, req.body, {
    new: true,
  });
  if (!user) {
    throw Error('User Not Found');
  }
  res.status(201).json({ user });
});
const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await User.findById({ _id: userId });
  if (!user) {
    throw Error('User Not Found');
  } else {
    await User.deleteOne({ _id: userId });
    res.status(201).json({ message: 'User Deleted' });
  }
});

const controllers = { readUser, readAll, createUser, updateUser, deleteUser };
export default controllers;
