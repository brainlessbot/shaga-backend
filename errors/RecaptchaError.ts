import AppError from './AppError';
import { ResponseStatus } from '../common/types';

class RecaptchaError extends AppError {
  constructor() {
    super(
      'ארעה שגיאה באימות, בבקשה נסו שנית.',
      ResponseStatus.BAD_REQUEST,
    );
  }
}

export default RecaptchaError;
