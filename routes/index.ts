import express from 'express';
import celebrate from 'celebrate';
import messageRoutes from './messages';
import ResourceNotFoundError from '../errors/ResourceNotFoundError';
import { requestLogger, errorLogger } from '../middlewares/logger';
import { dbErrorHandler, appErrorHandler } from '../utils/error-handlers';

const router = express.Router();

router.use(requestLogger);

router.use('/messages', messageRoutes);

router.use('*', () => {
  throw new ResourceNotFoundError();
});

router.use(errorLogger);

router.use(celebrate.errors());
router.use(dbErrorHandler);
router.use(appErrorHandler);

export default router;
