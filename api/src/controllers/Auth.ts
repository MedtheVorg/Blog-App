import asyncHandler from 'express-async-handler';

import User from '../models/User';
import { Request, Response } from 'express';
import { passwordCheck, signToken, verifyToken } from '../utils/utils';
import { CustomError } from '../utils/utils';
import Logger from '../library/Logger';

const logInUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw CustomError(
      'Account not found. Please check your email and password or create a new account.',
      409
    );
  }
  const isValidPassword = await passwordCheck(password, user.password);

  if (!isValidPassword) {
    throw CustomError(
      'Invalid credentials. Please check your email and password.',
      401
    );
  }
  const token = await signToken(
    { _id: user._id, username: user.username, email: user.email },
    process.env.SECRET_KEY
  );
  Logger.warn(token);

  res.cookie('token', token, { sameSite: 'none', secure: true }).json({ user });
});
const logOutUser = asyncHandler(async (req: Request, res: Response) => {
  Logger.warn(req.cookies);
  res.clearCookie('token', { sameSite: 'none', secure: true });
  res.json({ cookieCleared: true });
});

const getUserByCookie = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { token } = req.cookies;
    const decodedToken = await verifyToken(token, process.env.SECRET_KEY);
    res.json({
      message: 'from token',
      token: req.cookies,
      decoded: decodedToken,
    });
  } catch (error) {
    res.status(200).json({
      error: 'Token verification failed',
      message:
        'The provided token is invalid or has expired. Please log in again.',
    });
  }
});

export { logInUser, logOutUser, getUserByCookie };
