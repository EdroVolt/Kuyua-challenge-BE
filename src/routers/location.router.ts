import { LocationController } from '../controllers/location.controller';
import { IRouterCustom } from '../core/interface/router.interface';
import { Router, IRouter } from 'express';

const locationsController = new LocationController();

export class LocationRouter implements IRouterCustom {
  getRouter(): IRouter {
    const locationsRouter = Router();

    locationsRouter.route('/locations').get(locationsController.getAll);

    return locationsRouter;
  }
}
