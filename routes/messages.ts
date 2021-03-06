import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { createMessage } from '../controllers/messages';
import validateRecaptcha from '../middlewares/recaptcha';

const router = Router();

router.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(64).required(),
    phone: Joi.string().min(8).max(16).required(),
    content: Joi.string().optional().allow('').max(4096),
  }).unknown(),
}), validateRecaptcha, createMessage);

export default router;
