import { ResponseStatus } from '../common/types';

class AppError extends Error {
  statusCode: ResponseStatus;

  constructor(message: string, statusCode: ResponseStatus) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default AppError;
