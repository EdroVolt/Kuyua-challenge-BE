import { ILocation } from '../models/location.model';
import { LocationService } from '../services/location.service';
import { BaseController } from './base.controller';

export class LocationController extends BaseController<ILocation> {
  _serviceObj: LocationService = new LocationService();
}
