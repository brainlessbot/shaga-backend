import { Request, Response, NextFunction } from 'express';
import { ResponseStatus } from '../common/types';
import AlreadySubmittedError from '../errors/AlreadySubmittedError';
import Message from '../models/Message';

const createMessage = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { name, phone, content } = req.body;

  Message.find({
    name,
    phone,
    content,
    createdAt: {
      $gte: new Date(new Date().getTime() - 60 * 60 * 1000),
    },
  })
    .then((existingData) => {
      if (existingData.length > 0) {
        throw new AlreadySubmittedError();
      }

      return Message.create({ name, phone, content })
        .then((createdData) => res.status(ResponseStatus.CREATED).json(createdData));
    })
    .catch(next);
};

export {
  createMessage,
};
