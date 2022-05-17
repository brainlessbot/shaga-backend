import AppError from './AppError';
import { ResponseStatus } from '../common/types';

class AlreadySubmittedError extends AppError {
  constructor() {
    super(
      'הטופס כבר נשלח והתקבל.',
      ResponseStatus.BAD_REQUEST,
    );
  }
}

export default AlreadySubmittedError;
