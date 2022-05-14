import express from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { createMessage } from '../controllers/messages';

const router = express.Router();

router.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(64).required(),
    phone: Joi.string().min(8).max(16).required(),
    content: Joi.string().max(4096),
  }),
}), createMessage);

export default router;
