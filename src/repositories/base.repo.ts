import mongoose, { model } from 'mongoose';

export abstract class BaseRepo<schema> {
  abstract readonly _collectionName: string;
  abstract readonly _model: Object;

  findAll(filter: Object = {}, skip: number = 0, limit: number = 10) {
    return new Promise((resolve, reject) => {
      model(this._collectionName)
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
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
