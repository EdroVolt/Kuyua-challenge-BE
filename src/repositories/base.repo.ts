import mongoose, { model } from 'mongoose';

export abstract class BaseRepo<schema> {
  abstract readonly _collectionName: string;
  abstract readonly _model: Object;

  findAll(filter: Object = {}, skip?: number, limit?: number) {
    return new Promise((resolve, reject) => {
      const query = model(this._collectionName).find(filter);

      if (typeof skip === 'number' && typeof limit === 'number') {
        query.sort({ createdAt: -1 }).skip(skip).limit(limit);
      } else {
        query.sort({ createdAt: -1 });
      }

      query
        .exec()
        .then((docs) => resolve(docs))
        .catch((err) => reject(err));
    });
  }

  findById(_id: mongoose.Types.ObjectId) {
    return new Promise((resolve, reject) => {
      model(this._collectionName)
        .findById(_id)
        .exec()
        .then((doc) => resolve(doc))
        .catch((err) => reject(err));
    });
  }

  create(data: schema) {
    return new Promise((resolve, reject) => {
      model(this._collectionName)
        .create(data)
        .then((doc) => resolve(doc))
        .catch((err) => reject(err));
    });
  }

  countDocuments(filter: {} = {}): Promise<number> {
    return new Promise((resolve, reject) => {
      model(this._collectionName)
        .countDocuments(filter)
        .exec()
        .then((count) => resolve(count))
        .catch((err) => reject(err));
    });
  }
}
