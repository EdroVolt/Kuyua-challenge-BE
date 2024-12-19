import mongoose from 'mongoose';
import { BaseRepo } from '../repositories/base.repo';

export abstract class BaseService<schema> {
  abstract readonly _repoObj: BaseRepo<schema>;

  async findAll(page: number = 1, noPagination: boolean = false, filter = {}) {
    try {
      if (noPagination) {
        const docs = await this._repoObj.findAll(filter, undefined, undefined);
        return { data: docs };
      }

      const limit = 10;

      const skip = (page - 1) * limit;
      const docs = await this._repoObj.findAll(filter, skip, limit);
      const count = await this._repoObj.countDocuments(filter);

      const numOfPages = Math.ceil(count / limit);
      return { data: docs, numOfPages };
    } catch (err: Error | any) {
      throw new Error(err.message);
    }
  }

  async findOne(_id: mongoose.Types.ObjectId) {
    try {
      const doc = await this._repoObj.findById(_id);
      return doc;
    } catch (err: Error | any) {
      throw new Error(err.message);
    }
  }

  async createOne(data: schema) {
    try {
      const doc = await this._repoObj.create(data);
      return doc;
    } catch (err: Error | any) {
      throw new Error(err.message);
    }
  }
}
