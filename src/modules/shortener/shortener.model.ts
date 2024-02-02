import { Schema, model } from 'mongoose';
import { IShortener } from './shortener.interface';
import { v4 as uuidv4 } from 'uuid';

function generateShortUuid() {
  const fullUuid = uuidv4();
  return fullUuid.substring(0, 8); // Use only the first 6 characters
}
const demoSchema = new Schema<IShortener>({
  fullUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    default: generateShortUuid,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
});

export const Shortener = model<IShortener>('Shortener', demoSchema);
