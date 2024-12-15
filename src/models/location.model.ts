import mongoose from 'mongoose';

export interface ILocation {
  _id?: mongoose.Types.ObjectId;
  name: string;
  address: string;
  score: number;
  latitude: number;
  longitude: number;
}

const schema = new mongoose.Schema(
  {
    name: String,
    address: String,
    score: Number,
    latitude: Number,
    longitude: Number,
  },
  { timestamps: true }
);

export const LocationModel = mongoose.model<ILocation>('locations', schema);
