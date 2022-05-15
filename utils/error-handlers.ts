import { Request, Response, NextFunction } from 'express';
import mongoose, { MongooseError } from 'mongoose';
import { ResponseStatus } from '../common/types';
import AppError from '../errors/AppError';

const dbErrorHandler = (
  error: MongooseError | Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { ValidationError } = mongoose.Error;

  if (error instanceof ValidationError) {
    res.status(ResponseStatus.BAD_REQUEST).json({ message: error.message });
    return;
  }

  next(error);
};

const appErrorHandler = (
  error: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }

  res.status(ResponseStatus.SERVER_ERROR).json({ message: 'ארעה שגיאה בשרת.' });
};

export {
  dbErrorHandler,
  appErrorHandler,
};
