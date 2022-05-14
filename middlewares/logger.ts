import winston from 'winston';
import expressWinston from 'express-winston';
import config from '../common/config';

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: config.logs.requestFilename }),
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: config.logs.errorFilename }),
  ],
  format: winston.format.json(),
});

export {
  requestLogger,
  errorLogger,
};
