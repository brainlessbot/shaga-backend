import AppError from './AppError';
import { ResponseStatus } from '../common/types';

class ResourceNotFoundError extends AppError {
  constructor() {
    super('המשאב המבוקש אינו נמצא.', ResponseStatus.NOT_FOUND);
  }
}

export default ResourceNotFoundError;
