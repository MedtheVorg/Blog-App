import bcrypt from 'bcryptjs';
import Logger from '../library/Logger';
import CustomErrorInterface from './CustomErrorInterface';
import jwt from 'jsonwebtoken';

export async function passwordHash(password: string) {
  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  } catch (error: any) {
    Logger.error(error.message);
    throw CustomError('Internal Server Error', 500);
  }
}

export async function passwordCheck(password: string, hash: any) {
  try {
    const isValid = await bcrypt.compare(password, hash);
    return isValid;
  } catch (error: any) {
    Logger.error(error.message);
    throw CustomError('Internal Server Error', 500);
  }
}

export function CustomError(message: string, statusCode: number) {
  const error: CustomErrorInterface = new Error(message);
  error.statusCode = statusCode;

  return error;
}

export async function signToken(
  payload: string | object | Buffer,
  secret: any,
  options = {}
) {
  try {
    const token = jwt.sign(payload, secret, options);

    return token;
  } catch (error: any) {
    Logger.error(error.message);
    Logger.warn('Error Occurred while signing a token');
    throw CustomError('Internal Server Error', 500);
  }
}

export async function verifyToken(token: string, secret: any) {
  try {
    const decodedToken = jwt.verify(token, secret);
    return decodedToken;
  } catch (error) {
    throw CustomError('Internal Server Error', 500);
  }
}
