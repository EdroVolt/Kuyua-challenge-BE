import { ILocation, LocationModel } from '../models/location.model';
import { BaseRepo } from './base.repo';

export class LocationRepo extends BaseRepo<ILocation> {
  _collectionName: string = 'locations';
  _model: Object = LocationModel;
}
