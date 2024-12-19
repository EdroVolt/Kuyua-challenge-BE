import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { BaseService } from '../services/base.service';

export abstract class BaseController<schema> {
  abstract readonly _serviceObj: BaseService<schema>;

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    const { page = 1, noPagination = false } = req.query;
    try {
      const data = await this._serviceObj.findAll(
        +page,
        noPagination as boolean
      );

      console.log(data.data, 'edroData');

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const _id = new mongoose.Types.ObjectId(req.params.id);
      const data = await this._serviceObj.findOne(_id);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    const doc: schema = req.body;

    try {
      const data = await this._serviceObj.createOne(doc);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };
}
