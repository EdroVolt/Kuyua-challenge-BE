import { Handler } from 'express';

export interface IMiddleware {
  getMiddleware(): Handler;
}
