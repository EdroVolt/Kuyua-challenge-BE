import mongoose from 'mongoose';
import { ILocation } from '../models/location.model';
import { LocationRepo } from '../repositories/location.repo';
import { BaseService } from './base.service';

export class LocationService extends BaseService<ILocation> {
  _repoObj: LocationRepo = new LocationRepo();
}
