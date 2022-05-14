import express from 'express';
import { ResponseStatus } from '../common/types';
import AlreadySubmittedError from '../errors/AlreadySubmittedError';
import Message from '../models/Message';

const createMessage = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { name, phone, content } = req.body;

  Message.find({
    name,
    phone,
    content,
    createdAt: {
      $gte: new Date(new Date().getTime() - 60 * 60 * 1000),
    },
  })
    .orFail()
    .then(() => next(new AlreadySubmittedError()))
    .catch(() => {
      Message.create({ name, phone, content })
        .then((data) => res.status(ResponseStatus.CREATED).json(data))
        .catch(next);
    });
};

export {
  createMessage,
};
