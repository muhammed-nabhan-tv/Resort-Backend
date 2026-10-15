import mongoose, { Schema, Document } from "mongoose";

export interface IResort extends Document {
  name: string;
  description: string;
  location: string;
  pricePerNight: number;
  images: string[];
  amenities: string[];
  rating: number;
  isAvailable: boolean;
}

const resortSchema = new Schema<IResort>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    pricePerNight: {
      type: Number,
      required: true,
      min: 0,
    },
    images: {
      type: [String],
      default: [],
    },
    amenities: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Resort = mongoose.model<IResort>("Resort", resortSchema);

export default Resort;