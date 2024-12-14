import { IRouter } from 'express';

export interface IRouterCustom {
  getRouter(): IRouter;
}
