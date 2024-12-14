import { IMiddleware } from 'core/interface/middleware.interface';
import morgan from 'morgan';

export class HTTPLoggerMiddleware implements IMiddleware {
  getMiddleware() {
    return morgan('dev');
  }
}
